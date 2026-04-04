Technocrats Innovation Challenge - 2k26

# SHEALTH — Rural Women's Health Platform

> AI-powered healthcare for rural Indian women, connecting patients with community health workers and doctors through an adaptive assessment, video consultation, and real-time vitals monitoring system.

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://tic-invictus.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://tic-invictus.onrender.com)
[![AI Service](https://img.shields.io/badge/AI_Service-Render-46E3B7?logo=render)](https://tic-invictus-1.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [User Roles](#user-roles)
- [Contributing](#contributing)

---

## Overview

SHEALTH addresses a critical gap in rural Indian healthcare — specifically for women in remote villages who lack access to timely medical consultation. The platform provides:

- **AI-driven health assessment** — adaptive questioning powered by Gemini 2.5 Flash
- **Three-role system** — Patient, Women's Health Facilitator (WHF), and Doctor
- **Video consultation** — integrated Jitsi video calls, no account needed
- **Vitals monitoring** — blood pressure, hemoglobin, blood sugar tracking
- **Multilingual voice support** — Hindi & English voice input/output
- **Image analysis** — camera-based symptom capture with Gemini Vision

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│                  tic-invictus.vercel.app                     │
└───────────┬────────────────────────────┬────────────────────┘
            │ REST API calls              │ Direct AI calls
            ▼                            ▼
┌───────────────────────┐   ┌───────────────────────────────┐
│   Node.js Backend     │──▶│     Python AI Service         │
│  (Express + MongoDB)  │   │   (FastAPI + Gemini 2.5)      │
│ tic-invictus.onrender │   │ tic-invictus-1.onrender.com   │
└───────────────────────┘   └───────────────────────────────┘
            │
            ▼
┌───────────────────────┐
│   MongoDB Atlas       │
│  (Users, Assessments, │
│   Vitals, Consults)   │
└───────────────────────┘
```

The frontend talks to the Node backend for all authentication, data persistence, and proxied AI calls (image, voice, PDF). The `AssessmentPage` also calls the AI service directly for real-time question generation.

---

## Features

### For Patients
- OTP-based phone login (no password needed)
- Multilingual splash screen with language selection
- AI health assessment — adaptive 8-question session with voice input and camera capture
- Structured pre-consultation report generation
- Video call with assigned doctor via Jitsi
- Vitals history and lab results viewer
- Community page and health education content

### For Women's Health Facilitators (WHF)
- Dashboard with patient task queue
- Assisted vitals recording (BP, hemoglobin, blood sugar, weight)
- AI assessment proxy — conduct assessment on behalf of a patient
- Earnings tracker

### For Doctors
- Patient queue with urgency levels (urgent / priority / routine)
- AI-generated pre-consultation report per patient
- Live video consultation
- Prescription writing
- PDF report download

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite 5, React Router v6 |
| Styling | Vanilla CSS, inline styles (mobile-first) |
| Backend | Node.js, Express 4, Mongoose 9 |
| Database | MongoDB Atlas |
| AI Service | Python 3, FastAPI, LangChain, Gemini 2.5 Flash |
| Voice | gTTS (synthesis), Gemini native audio (transcription) |
| Image | Gemini Vision via LangChain |
| PDF | ReportLab |
| Video | Jitsi Meet (public, no account) |
| Auth | JWT (7-day expiry), OTP via phone |
| Frontend hosting | Vercel |
| Backend hosting | Render (free tier) |

---

## Project Structure

```
tic-invictus/
├── shealth-fronted/          # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SplashPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PatientHome.jsx
│   │   │   ├── AssessmentPage.jsx   ← AI assessment (calls AI service directly)
│   │   │   ├── ReportPage.jsx
│   │   │   ├── VideoCallPage.jsx
│   │   │   ├── VitalsPage.jsx
│   │   │   ├── WHFDashboard.jsx
│   │   │   ├── DoctorPortal.jsx
│   │   │   ├── DoctorVideoCall.jsx
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── api.js              ← all backend calls (uses VITE_API_URL)
│   │   │   └── data.js             ← static questions + mock data
│   │   ├── context/
│   │   │   └── AppContext.jsx      ← global state (user, role, aiReport)
│   │   └── App.jsx                 ← routes + role guards
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node.js REST API
│   └── src/
│       ├── controllers/
│       │   ├── auth.controller.js
│       │   ├── assessment.controller.js
│       │   ├── ai.controller.js    ← proxies image/voice/PDF to AI service
│       │   ├── vitals.controller.js
│       │   ├── consult.controller.js
│       │   └── ...
│       ├── routes/
│       ├── models/             ← Mongoose schemas
│       ├── middleware/
│       │   ├── auth.js         ← JWT protect + role authorize
│       │   └── validate.js
│       ├── utils/
│       │   ├── otp.js
│       │   ├── jwt.js
│       │   └── vitalsAlert.js
│       ├── app.js
│       ├── server.js
│       └── config/db.js
│
├── ai_route/                 # Python FastAPI AI service
│   ├── main.py               ← FastAPI app, CORS config
│   ├── config.py             ← loads GEMINI_API_KEY from env
│   ├── routers/
│   │   ├── assessment.py     ← POST /assessment/start, /assessment/next-question
│   │   ├── report.py         ← POST /report/generate, /report/generate-pdf
│   │   ├── image.py          ← POST /image/analyze
│   │   └── voice.py          ← POST /voice/transcribe, /voice/speak
│   ├── services/
│   │   ├── llm.py            ← LangChain chains (Gemini 2.5 Flash)
│   │   ├── image_analysis.py ← Gemini Vision
│   │   └── voice.py          ← gTTS + Gemini audio
│   ├── models/schemas.py     ← Pydantic request models
│   ├── utils/
│   │   ├── helpers.py
│   │   └── pdf_generator.py
│   └── requirements.txt
│
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- MongoDB Atlas account (free tier works)
- Google Gemini API key — [get one here](https://aistudio.google.com/app/apikey)

### 1. Clone the repository

```bash
git clone https://github.com/FluxHarsh/tic-invictus.git
cd tic-invictus
```

### 2. Start the AI service

```bash
cd ai_route
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env
echo 'GEMINI_API_KEY=your_key_here' > .env
echo 'PORT=8000' >> .env

uvicorn main:app --reload --port 8000
```

AI service will be live at `http://localhost:8000`. Check `http://localhost:8000/docs` for the auto-generated Swagger UI.

### 3. Start the backend

```bash
cd backend
npm install

# Create .env (see Environment Variables section below)
cp .env.example .env   # then fill in your values

npm run dev
```

Backend will be live at `http://localhost:3000`.

### 4. Start the frontend

```bash
cd shealth-fronted
npm install

# Create .env.local
echo 'VITE_API_URL=http://localhost:3000' > .env.local
echo 'VITE_AI_URL=http://localhost:8000' >> .env.local

npm run dev
```

Frontend will be live at `http://localhost:5173`.

---

## Environment Variables

### AI Service (`ai_route/.env`)

| Variable | Description | Example |
|---|---|---|
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `PORT` | Port to run on | `8000` |

### Backend (`backend/.env`)

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port to run on | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `JWT_SECRET` | Secret for signing JWTs | `your-secret-key-min-32-chars` |
| `JWT_EXPIRE` | JWT expiry duration | `7d` |
| `AI_SERVICE_URL` | URL of the Python AI service | `https://tic-invictus-1.onrender.com` |
| `AI_API_KEY` | Shared key for backend→AI auth | `shealth_ai_key_123` |
| `FRONTEND_URL` | Frontend origin for CORS | `https://tic-invictus.vercel.app/` |
| `JITSI_DOMAIN` | Jitsi server domain | `meet.jit.si` |
| `USE_MOCK_OTP` | Skip real SMS in dev/demo | `true` |
| `MOCK_OTP` | Fixed OTP when mock is on | `1234` |

### Frontend (`shealth-fronted/.env.local`)

> **Important:** Vite only exposes variables prefixed with `VITE_` to the browser.

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Node backend base URL | `https://tic-invictus.onrender.com` |
| `VITE_AI_URL` | Python AI service base URL | `https://tic-invictus-1.onrender.com` |

---

## API Reference

### Backend (Node.js) — base: `https://tic-invictus.onrender.com`

#### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/send-otp` | Send OTP to phone number |
| POST | `/api/auth/verify-otp` | Verify OTP, returns JWT |
| GET | `/api/auth/me` | Get current user (requires JWT) |

#### Assessment
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/assessment/start` | Start new AI assessment |
| POST | `/api/assessment/:id/answer` | Submit answer, get next question |
| POST | `/api/assessment/:id/complete` | Generate final report |
| GET | `/api/assessment/:id` | Get assessment by ID |
| GET | `/api/assessment/my-history` | Patient's past assessments |

#### Vitals
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/vitals` | Record vitals for a patient |
| GET | `/api/vitals/patient/:id` | Get patient's vitals history |

#### Consultation
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/consult/book` | Book a doctor consultation |
| GET | `/api/consult/queue` | Doctor's patient queue |
| PATCH | `/api/consult/:id/start` | Start video call |
| PATCH | `/api/consult/:id/end` | End video call |
| PATCH | `/api/consult/:id/notes` | Submit doctor notes |

#### AI Proxy
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/image/analyze` | Analyze symptom image |
| POST | `/api/ai/voice/transcribe` | Transcribe patient audio |
| POST | `/api/ai/voice/speak` | Text-to-speech for questions |
| GET | `/api/ai/report/pdf/:id` | Download assessment PDF |

---

### AI Service (FastAPI) — base: `https://tic-invictus-1.onrender.com`

Interactive docs at `/docs` (Swagger UI).

| Method | Endpoint | Description |
|---|---|---|
| POST | `/assessment/start` | Generate first adaptive question |
| POST | `/assessment/next-question` | Generate next question or signal done |
| POST | `/report/generate` | Generate structured JSON report |
| POST | `/report/generate-pdf` | Generate downloadable PDF report |
| POST | `/image/analyze` | Analyze base64 image with Gemini Vision |
| POST | `/voice/transcribe` | Transcribe base64 audio (Hindi/English) |
| POST | `/voice/speak` | Synthesize speech from text (gTTS) |
| GET | `/health` | Health check |

---

## Deployment

### Frontend → Vercel

1. Connect the `FluxHarsh/tic-invictus` GitHub repo to Vercel
2. Set **Root Directory** to `shealth-fronted`
3. Add environment variables in Vercel dashboard:
   - `VITE_API_URL` = `https://tic-invictus.onrender.com`
   - `VITE_AI_URL` = `https://tic-invictus-1.onrender.com`
4. Deploy from the `main` branch

### Backend → Render (Node service)

1. Create a new **Web Service** on Render
2. Connect repo, set **Root Directory** to `backend`
3. **Build command:** `npm install`
4. **Start command:** `npm start`
5. Add all backend environment variables from the table above
6. Make sure `AI_SERVICE_URL` has **no trailing slash**

### AI Service → Render (Python service)

1. Create a new **Web Service** on Render
2. Connect repo, set **Root Directory** to `ai_route`
3. **Build command:** `pip install -r requirements.txt`
4. **Start command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add environment variables: `GEMINI_API_KEY` and `PORT=8000`

> **Note:** Render free tier services spin down after 15 minutes of inactivity. The first request after spin-down may take 30–60 seconds to respond. Consider upgrading to a paid instance for production use.

---

## User Roles

| Role | Login Method | Access |
|---|---|---|
| `patient` | Phone OTP | AI assessment, video call, vitals history, lab results, community |
| `whf` | Phone OTP | Patient task queue, vitals recording, assisted assessments, earnings |
| `doctor` | Phone + password | Patient queue, AI reports, video consultation, prescriptions |

During demo mode (`USE_MOCK_OTP=true`), all roles can log in with OTP `1234`.

---

## Known Limitations

- OTP store is in-memory — on Render free tier, server restarts clear pending OTPs. Use `USE_MOCK_OTP=true` for demos.
- Free Render instances have cold start delays (~30–60 seconds after inactivity).
- Password login for doctors is defined but the bcrypt pre-save hook is commented out for the demo phase — doctors log in via OTP like patients.
- `data.js` `AI_ENDPOINT` fallback URL is a placeholder; set `VITE_AI_URL` in Vercel to override it.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request against `main`

Please keep PRs focused — one feature or fix per PR. For large changes, open an issue first to discuss the approach.

---

## License

MIT © 2026 FluxHarsh / Harsh Jagtap

---

<p align="center">Built for rural Indian women who deserve better healthcare access.</p>
