from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from models.schemas import ReportRequest
from services.llm import report_chain
from utils.helpers import format_qa, format_vitals
from utils.pdf_generator import build_pdf

router = APIRouter(prefix="/report", tags=["Report"])


@router.post("/generate")
async def generate_report(req: ReportRequest):
    """Generates structured JSON pre-consultation report."""
    try:
        report = await report_chain.ainvoke({
            "qa_text":       format_qa(req.qa),
            "vitals_text":   format_vitals(req.vitals),
            "image_context": "No image provided.",
        })
        return {"success": True, "report": report}
    except Exception as e:
        raise HTTPException(500, f"LLM error: {str(e)}")


@router.post("/generate-pdf")
async def generate_pdf(req: ReportRequest):
    """Generates and returns a downloadable PDF of the health report."""
    try:
        report = await report_chain.ainvoke({
            "qa_text":       format_qa(req.qa),
            "vitals_text":   format_vitals(req.vitals),
            "image_context": getattr(req, 'imageContext', None) or "No image provided.",
        })
        buffer = build_pdf(req, report)
        return StreamingResponse(
            buffer,
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=shealth_{req.assessmentId}.pdf"
            },
        )
    except Exception as e:
        raise HTTPException(500, f"PDF generation error: {str(e)}")