"""
POST /image/analyze
Frontend sends base64 image → Gemini Vision analyses → returns structured observations
These observations can be passed as `context` when generating the report.
"""

from fastapi import APIRouter, HTTPException
from models.schemas import ImageAnalysisRequest
from services.image_analysis import analyze_image

router = APIRouter(prefix="/image", tags=["Image Analysis"])


@router.post("/analyze")
async def analyze_patient_image(req: ImageAnalysisRequest):
    """
    Accepts base64 image from frontend camera/upload.
    Returns structured medical observations for doctor context.

    Frontend usage:
      const base64 = canvas.toDataURL('image/jpeg').split(',')[1]
      fetch('/image/analyze', { body: JSON.stringify({ base64_image: base64, context: 'fever 3 days' }) })
    """
    if not req.base64_image:
        raise HTTPException(400, "base64_image is required")

    result = await analyze_image(
        base64_image=req.base64_image,
        mime_type=req.mime_type,
        context=req.context,
    )

    if not result["success"]:
        raise HTTPException(500, f"Image analysis failed: {result.get('error')}")

    return result