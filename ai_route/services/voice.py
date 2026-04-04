"""
Voice Service — NO ffmpeg needed
- Transcription : Gemini 1.5 Flash (accepts audio natively as base64)
- Synthesis     : gTTS (Google Text-to-Speech) → returns mp3 bytes
                  Simple, lightweight, supports Hindi + English
"""

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from gtts import gTTS
from config import GEMINI_API_KEY
import io, base64

audio_model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0,
)



TRANSCRIBE_PROMPT = """Transcribe this audio accurately.
The speaker may be speaking Hindi, Hinglish, or English.
Return ONLY the transcribed text, nothing else.
If speech is unclear, return your best attempt."""

TRANSCRIBE_PROMPT_HI = """यह audio transcribe करें।
बोलने वाला Hindi, Hinglish, या English में बोल सकता है।
केवल transcribed text return करें, कुछ और नहीं।"""


async def transcribe_audio(base64_audio: str, mime_type: str, language: str = "hi") -> dict:
    """
    Transcribe patient voice using Gemini (supports audio natively).
    No ffmpeg — Gemini handles webm/wav/mp4 directly.

    base64_audio : pure base64 string of recorded audio
    mime_type    : "audio/webm" | "audio/wav" | "audio/mp4"
    language     : "hi" for Hindi prompt, "en" for English
    """
    try:
        prompt = TRANSCRIBE_PROMPT_HI if language == "hi" else TRANSCRIBE_PROMPT

        response = await audio_model.ainvoke(
            [
                HumanMessage(
                    content=[
                        {"type": "text", "text": prompt},
                        {
                            "type": "media",
                            "mime_type": mime_type,
                            "data": base64_audio,
                        },
                    ]
                )
            ]
        )

        content = response.content
        if isinstance(content, str):
            transcribed_text = content.strip()
        elif isinstance(content, list):
            transcribed_text = "\n".join(
                part.get("text", "") for part in content if isinstance(part, dict)
            ).strip()
        else:
            transcribed_text = str(content).strip()

        return {
            "success": True,
            "text": transcribed_text,
            "language": language,
        }

    except Exception as e:
        return {"success": False, "error": str(e)}




LANG_MAP = {
    "hi": "hi",  
    "en": "en",   
    "mr": "mr",   
    "gu": "gu",  
    "ta": "ta",   
    "te": "te",   
    "bn": "bn",   
}


def synthesize_speech(text: str, language: str = "hi") -> dict:
    """
    Convert text to speech using gTTS — returns base64 encoded mp3.
    No ffmpeg needed. Frontend plays it directly via <audio> tag.

    Returns base64 mp3 so it works over JSON API easily.
    """
    try:
        lang_code = LANG_MAP.get(language, "hi")

        tts = gTTS(text=text, lang=lang_code, slow=False)

        # Write to in-memory bytes buffer
        mp3_buffer = io.BytesIO()
        tts.write_to_fp(mp3_buffer)
        mp3_buffer.seek(0)

        mp3_bytes = mp3_buffer.read()
        mp3_base64 = base64.b64encode(mp3_bytes).decode("utf-8")

        return {
            "success": True,
            "audio_base64": mp3_base64,
            "mime_type": "audio/mpeg",
            "language": language,
            
        }

    except Exception as e:
        return {"success": False, "error": str(e)}
    

