"""
POST /voice/transcribe  → audio base64 → text  (patient speaks their answer)
POST /voice/speak       → text → audio base64  (app reads question aloud)
"""

from fastapi import APIRouter, HTTPException
from models.schemas import VoiceTranscribeRequest, VoiceSynthesisRequest
from services.voice import transcribe_audio, synthesize_speech

router = APIRouter(prefix="/voice", tags=["Voice"])


@router.post("/transcribe")
async def transcribe(req: VoiceTranscribeRequest):
    """
    Patient records voice → send base64 audio → get text back.
    Supports Hindi, Hinglish, English.
    No ffmpeg — Gemini handles audio natively.

    Frontend usage:
      // Record with MediaRecorder API (webm format)
      const base64 = btoa(String.fromCharCode(...new Uint8Array(audioBlob)))
      fetch('/voice/transcribe', { body: JSON.stringify({ base64_audio: base64, language: 'hi' }) })
    """
    if not req.base64_audio:
        raise HTTPException(400, "base64_audio is required")

    result = await transcribe_audio(
        base64_audio=req.base64_audio,
        mime_type=req.mime_type,
        language=req.language,
    )

    if not result["success"]:
        raise HTTPException(500, f"Transcription failed: {result.get('error')}")

    return result


@router.post("/speak")
async def speak(req: VoiceSynthesisRequest):
    """
    AI question text → mp3 base64 → frontend plays it.
    Useful for WHF reading questions aloud to illiterate patients.
    Supports: hi, en, mr, gu, ta, te, bn

    Frontend usage:
      const { audio_base64 } = await response.json()
      const audio = new Audio(`data:audio/mpeg;base64,${audio_base64}`)
      audio.play()
    """
    if not req.text:
        raise HTTPException(400, "text is required")

    result = synthesize_speech(text=req.text, language=req.language)

    if not result["success"]:
        raise HTTPException(500, f"Speech synthesis failed: {result.get('error')}")

    return result