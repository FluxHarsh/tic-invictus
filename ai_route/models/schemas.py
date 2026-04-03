from pydantic import BaseModel
from typing import Optional


class StartRequest(BaseModel):
    patientId: str


class QAItem(BaseModel):
    questionId: str
    question: str
    answer: Optional[str] = None
    category: Optional[str] = None


class Vitals(BaseModel):
    bp: Optional[str] = None
    hemoglobin: Optional[float] = None
    bloodSugar: Optional[float] = None
    weight: Optional[float] = None


class NextQuestionRequest(BaseModel):
    assessmentId: str
    qa: list[QAItem]
    questionNumber: int


class ReportRequest(BaseModel):
    assessmentId: str
    qa: list[QAItem]
    vitals: Optional[Vitals] = None
