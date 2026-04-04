const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const api = async (path, options = {}) => {
  const token = localStorage.getItem('shealth_token');

  const res = await fetch(BASE + path, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });

  const data = await res.json();
  if (!data.success) throw new Error(data.message || 'Request failed');
  return data;
};

//  Auth 
export const sendOTP = (phone, role, name) =>
  api('/api/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, role, name }),
  });

export const verifyOTP = (phone, otp) =>
  api('/api/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  });

export const getMe = () => api('/api/auth/me');

//  Assessment 
export const startAssessment = (patientId) =>
  api('/api/assessment/start', {
    method: 'POST',
    body: JSON.stringify({ patientId }),
  });

export const submitAnswer = (assessmentId, answer) =>
  api(`/api/assessment/${assessmentId}/answer`, {
    method: 'POST',
    body: JSON.stringify({ answer }),
  });

export const completeAssessment = (assessmentId) =>
  api(`/api/assessment/${assessmentId}/complete`, { method: 'POST' });

export const getAssessment = (assessmentId) =>
  api(`/api/assessment/${assessmentId}`);

export const getMyAssessmentHistory = () =>
  api('/api/assessment/my-history');

//  Vitals 
export const recordVitals = (data) =>
  api('/api/vitals', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const getPatientVitals = (patientId) =>
  api(`/api/vitals/patient/${patientId}`);

//  Consultation 
export const bookConsultation = (assessmentId, doctorId) =>
  api('/api/consult/book', {
    method: 'POST',
    body: JSON.stringify({ assessmentId, doctorId }),
  });

export const getDoctorQueue = () =>
  api('/api/consult/queue');

export const getConsultation = (id) =>
  api(`/api/consult/${id}`);

export const startCall = (id) =>
  api(`/api/consult/${id}/start`, { method: 'PATCH' });

export const endCall = (id) =>
  api(`/api/consult/${id}/end`, { method: 'PATCH' });

export const submitNotes = (id, notes) =>
  api(`/api/consult/${id}/notes`, {
    method: 'PATCH',
    body: JSON.stringify(notes),
  });

export const getMyConsultations = () =>
  api('/api/consult/my-history');

//  WHF 
export const getWHFDashboard = () =>
  api('/api/whf/dashboard');

export const getWHFEarnings = (month, year) =>
  api(`/api/whf/earnings?month=${month}&year=${year}`);

export const getVillagePatients = () =>
  api('/api/whf/patients');

//  Diagnostics 
export const getPatientDiagnostics = (patientId) =>
  api(`/api/diagnostics/patient/${patientId}`);

//  AI (proxied through backend) 
export const analyzeImage = (base64_image, mime_type, context) =>
  api('/api/ai/image/analyze', {
    method: 'POST',
    body: JSON.stringify({ base64_image, mime_type, context }),
  });

export const transcribeVoice = (base64_audio, mime_type = 'audio/webm', language = 'hi') =>
  api('/api/ai/voice/transcribe', {
    method: 'POST',
    body: JSON.stringify({ base64_audio, mime_type, language }),
  });

export const speakText = (text, language = 'hi') =>
  api('/api/ai/voice/speak', {
    method: 'POST',
    body: JSON.stringify({ text, language }),
  });

export const downloadReportPDF = (assessmentId) =>
  `${BASE}/api/ai/report/pdf/${assessmentId}`;
