from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import assessment, report, image, voice

app = FastAPI(title="SHEALTH AI Service", version="2.0.0")

# Allow Node backend (port 5000) + React frontend (port 5173) to reach this
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://localhost:5173", "*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(assessment.router)   # /assessment/start, /assessment/next-question
app.include_router(report.router)       # /report/generate, /report/generate-pdf
app.include_router(image.router)        # /image/analyze
app.include_router(voice.router)        # /voice/transcribe, /voice/speak


@app.get("/health")
async def health():
    return {"status": "ok", "service": "SHEALTH AI", "version": "2.0.0"}