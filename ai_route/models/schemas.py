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


class ImageAnalysisRequest(BaseModel):
    """
    Frontend sends base64 image + optional context.
    base64_image: pure base64 string (no data:image/... prefix needed)
    mime_type: "image/jpeg" | "image/png" | "image/webp"
    context: optional extra info e.g. "patient has fever since 2 days"
    """
    base64_image: str
    mime_type: str = "image/jpeg"
    context: Optional[str] = None
    patientId: Optional[str] = None
 
 
class VoiceTranscribeRequest(BaseModel):
    """
    Frontend sends base64 audio (webm/wav recorded in browser).
    base64_audio: pure base64 string
    mime_type: "audio/webm" | "audio/wav" | "audio/mp4"
    language: hint for transcription e.g. "hi" for Hindi, "en" for English
    """
    base64_audio: str
    mime_type: str = "audio/webm"
    language: str = "hi"  
 
 
class VoiceSynthesisRequest(BaseModel):
    """
    Text → speech using gTTS (no ffmpeg needed).
    text: text to speak
    language: "hi" Hindi | "en" English
    """
    text: str
    language: str = "hi"
    