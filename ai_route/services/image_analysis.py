"""
Image Analysis Service - Gemini Vision
Patient clicks photo (wound, rash, tongue, eye, prescription etc.)
Gemini analyses it and returns structured observations to enrich the report.
"""

import json
import re

from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI

from config import GEMINI_API_KEY


vision_model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    google_api_key=GEMINI_API_KEY,
    temperature=0,
)

IMAGE_ANALYSIS_PROMPT = """You are a medical AI assistant helping rural Indian doctors.
Analyze this patient image carefully.

Respond ONLY with valid JSON (no markdown, no extra text):
{
  "imageType": "<what type of image: wound|rash|eye|tongue|prescription|report|other>",
  "visualObservations": ["<observation 1>", "<observation 2>"],
  "possibleIndicators": ["<non-diagnostic flag e.g. 'Pallor in conjunctiva suggesting possible anemia'>"],
  "urgencyFlag": "<none|monitor|consult_soon|urgent>",
  "additionalContext": "<1-2 sentences for the doctor>",
  "recommendedQuestions": ["<follow-up question to ask patient>"]
}

Rules:
- Do NOT diagnose. Use "may suggest", "pattern consistent with", "possible indicator"
- Be concise — doctor reads this before video call
- If image is unclear/not medical, set imageType to "unclear" and explain in additionalContext
- If prescription/lab report image: extract key values if readable
"""


async def analyze_image(base64_image: str, mime_type: str, context: str = None) -> dict:
    """
    Send image to Gemini Vision, get structured medical observations.
    base64_image: pure base64 string
    mime_type: image/jpeg | image/png | image/webp
    """
    raw = ""
    try:
        # Build prompt with optional patient context
        prompt = IMAGE_ANALYSIS_PROMPT
        if context:
            prompt += f"\n\nAdditional patient context: {context}"

        data_url = f"data:{mime_type};base64,{base64_image}"
        response = await vision_model.ainvoke(
            [
                HumanMessage(
                    content=[
                        {"type": "text", "text": prompt},
                        {"type": "image_url", "image_url": {"url": data_url}},
                    ]
                )
            ]
        )

        content = response.content
        if isinstance(content, str):
            raw = content.strip()
        elif isinstance(content, list):
            raw = "\n".join(
                part.get("text", "") for part in content if isinstance(part, dict)
            ).strip()
        else:
            raw = str(content).strip()

        # Strip markdown code fences if Gemini adds them
        raw = re.sub(r"^```(?:json)?\s*", "", raw, flags=re.IGNORECASE)
        raw = re.sub(r"\s*```$", "", raw)

        result = json.loads(raw)
        return {"success": True, "analysis": result}

    except json.JSONDecodeError:
        # Return raw text if JSON parse fails
        return {
            "success": True,
            "analysis": {
                "imageType": "other",
                "visualObservations": [raw] if raw else [],
                "possibleIndicators": [],
                "urgencyFlag": "none",
                "additionalContext": raw or "Model returned non-JSON output.",
                "recommendedQuestions": [],
            },
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
    
