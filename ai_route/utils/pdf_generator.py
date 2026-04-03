import io
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.units import cm
from models.schemas import ReportRequest


SEVERITY_COLORS = {"mild": "#22C55E", "moderate": "#F59E0B", "severe": "#EF4444"}
URGENCY_COLORS  = {"routine": "#6B7280", "priority": "#F59E0B", "urgent": "#EF4444"}
PURPLE          = "#6B4EFF"
PURPLE_LIGHT    = "#E0D8FF"
PURPLE_BG       = "#F3F0FF"


def build_pdf(req: ReportRequest, report: dict) -> io.BytesIO:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=A4,
                            rightMargin=2*cm, leftMargin=2*cm,
                            topMargin=2*cm, bottomMargin=2*cm)

    styles = getSampleStyleSheet()
    story  = []

    # styles
    s_title   = ParagraphStyle("title",   parent=styles["Title"],   fontSize=20, textColor=colors.HexColor(PURPLE), spaceAfter=4)
    s_sub     = ParagraphStyle("sub",     parent=styles["Normal"],  fontSize=10, textColor=colors.grey, spaceAfter=12)
    s_section = ParagraphStyle("section", parent=styles["Heading2"],fontSize=12, textColor=colors.HexColor("#4B3BCC"), spaceBefore=12, spaceAfter=4)
    s_disc    = ParagraphStyle("disc",    parent=styles["Normal"],  fontSize=8,  textColor=colors.grey)

    def hr():
        return HRFlowable(width="100%", thickness=0.5, color=colors.HexColor(PURPLE_LIGHT))

    # ── Header ──
    story += [
        Paragraph("✦ SHEALTH — AI Health Summary", s_title),
        Paragraph("AI-Powered Pre-Consultation Report", s_sub),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor(PURPLE_LIGHT)),
        Spacer(1, 0.3*cm),
        Paragraph(f"Assessment ID: {req.assessmentId}", styles["Normal"]),
        Spacer(1, 0.3*cm),
    ]

    # ── Severity / Urgency badges ──
    sev = report.get("severity", "mild")
    urg = report.get("urgencyLevel", "routine")
    badge = [
        [Paragraph("<b>Severity</b>", styles["Normal"]),  Paragraph("<b>Urgency</b>", styles["Normal"])],
        [
            Paragraph(f"<font color='{SEVERITY_COLORS.get(sev, '#333')}'><b>{sev.upper()}</b></font>", styles["Normal"]),
            Paragraph(f"<font color='{URGENCY_COLORS.get(urg,  '#333')}'><b>{urg.upper()}</b></font>", styles["Normal"]),
        ],
    ]
    t = Table(badge, colWidths=[8*cm, 8*cm])
    t.setStyle(TableStyle([
        ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor(PURPLE_BG)),
        ("ALIGN",         (0, 0), (-1,-1), "CENTER"),
        ("BOX",           (0, 0), (-1,-1), 1, colors.HexColor(PURPLE_LIGHT)),
        ("GRID",          (0, 0), (-1,-1), 0.5, colors.HexColor(PURPLE_LIGHT)),
        ("TOPPADDING",    (0, 0), (-1,-1), 8),
        ("BOTTOMPADDING", (0, 0), (-1,-1), 8),
    ]))
    story += [t, Spacer(1, 0.4*cm)]

    # ── Text sections ──
    def add_text(title, content):
        story += [Paragraph(title, s_section), hr(), Spacer(1, 0.2*cm),
                  Paragraph(content or "—", styles["Normal"]), Spacer(1, 0.2*cm)]

    def add_list(title, items):
        story += [Paragraph(title, s_section), hr(), Spacer(1, 0.2*cm)]
        for item in (items or []):
            story.append(Paragraph(f"• {item}", styles["Normal"]))
        story.append(Spacer(1, 0.2*cm))

    add_text("Symptoms Summary", report.get("symptomsSummary"))
    add_text("Duration",         report.get("duration"))
    add_list("Key Observations", report.get("keyObservations", []))
    add_list("Possible Concerns", report.get("possibleConcerns", []))
    add_list("Recommended Tests (Doctor decides final)", report.get("recommendedTests", []))

    # ── Vitals table ──
    if req.vitals:
        v = req.vitals
        rows = [["Metric", "Value"]]
        if v.bp:          rows.append(["Blood Pressure", v.bp])
        if v.hemoglobin:  rows.append(["Hemoglobin",    f"{v.hemoglobin} g/dL"])
        if v.bloodSugar:  rows.append(["Blood Sugar",   f"{v.bloodSugar} mg/dL"])
        if v.weight:      rows.append(["Weight",        f"{v.weight} kg"])
        if len(rows) > 1:
            story += [Paragraph("Vitals at Assessment", s_section), hr(), Spacer(1, 0.2*cm)]
            vt = Table(rows, colWidths=[8*cm, 8*cm])
            vt.setStyle(TableStyle([
                ("BACKGROUND",    (0, 0), (-1, 0), colors.HexColor("#4B3BCC")),
                ("TEXTCOLOR",     (0, 0), (-1, 0), colors.white),
                ("ROWBACKGROUNDS",(0, 1), (-1,-1), [colors.HexColor("#F9F8FF"), colors.white]),
                ("BOX",           (0, 0), (-1,-1), 1, colors.HexColor(PURPLE_LIGHT)),
                ("GRID",          (0, 0), (-1,-1), 0.5, colors.HexColor(PURPLE_LIGHT)),
                ("TOPPADDING",    (0, 0), (-1,-1), 6),
                ("BOTTOMPADDING", (0, 0), (-1,-1), 6),
                ("LEFTPADDING",   (0, 0), (-1,-1), 8),
            ]))
            story.append(vt)

    # ── Q&A Transcript ──
    story += [Spacer(1, 0.4*cm), Paragraph("Assessment Q&A Transcript", s_section), hr(), Spacer(1, 0.2*cm)]
    for i, item in enumerate(req.qa, 1):
        story.append(Paragraph(f"<b>Q{i}:</b> {item.question}", styles["Normal"]))
        if item.answer:
            story.append(Paragraph(f"<b>A:</b> {item.answer}", styles["Normal"]))
        story.append(Spacer(1, 0.15*cm))

    # ── Disclaimer ──
    story += [
        Spacer(1, 0.4*cm),
        HRFlowable(width="100%", thickness=1, color=colors.HexColor(PURPLE_LIGHT)),
        Paragraph(
            "⚠ This report is AI-generated for pre-consultation context only. "
            "Not a medical diagnosis. Final decisions are made by the consulting doctor.",
            s_disc,
        ),
    ]

    doc.build(story)
    buffer.seek(0)
    return buffer
