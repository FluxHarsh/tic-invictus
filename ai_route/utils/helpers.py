from typing import Optional
from models.schemas import QAItem, Vitals


def format_qa(qa: list[QAItem]) -> str:
    lines = []
    for i, item in enumerate(qa, 1):
        lines.append(f"Q{i} [{item.category or 'general'}]: {item.question}")
        if item.answer:
            lines.append(f"A{i}: {item.answer}")
    return "\n".join(lines)


def format_vitals(vitals: Optional[Vitals]) -> str:
    if not vitals:
        return "No vitals recorded."
    parts = []
    if vitals.bp:          parts.append(f"BP: {vitals.bp}")
    if vitals.hemoglobin:  parts.append(f"Hemoglobin: {vitals.hemoglobin} g/dL")
    if vitals.bloodSugar:  parts.append(f"Blood Sugar: {vitals.bloodSugar} mg/dL")
    if vitals.weight:      parts.append(f"Weight: {vitals.weight} kg")
    return ", ".join(parts) if parts else "No vitals recorded."