

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import './index.css';

import SplashPage from './pages/SplashPage';
import LoginPage  from './pages/LoginPage';


import PatientHome    from './pages/PatientHome';
import AssessmentPage from './pages/AssessmentPage';
import ReportPage     from './pages/ReportPage';
import VideoCallPage  from './pages/VideoCallPage';
import WHFDashboard from './pages/WHFDashboard';
import VitalsPage   from './pages/VitalsPage';
import WHFProfile   from './pages/WHFProfile';

import DoctorPortal    from './pages/DoctorPortal';
import DoctorAIReport  from './pages/DoctorAIReport';
import DoctorVideoCall from './pages/DoctorVideoCall';
import PrescribePage   from './pages/PrescribePage';


function Guard({ children, role: need }) {
  const { role } = useApp();
  if (!role) return <Navigate to="/login" replace />;
  if (need && role !== need) return <Navigate to="/login" replace />;
  return children;
}


function Toast() {
  const { notification } = useApp();
  if (!notification) return null;
  return <div className="toast">{notification}</div>;
}


function ComingSoon({ label }) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(160deg,#FEF0F5,#F5EEFF,#FFF5EC)',
      gap: 16, padding: 24,
    }}>
      <div style={{ fontSize: '3rem' }}>🚧</div>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '1.8rem', color: '#3D1F2E', textAlign: 'center',
      }}>
        {label}
      </h2>
      <p style={{ color: '#9A7A88', fontSize: '0.9rem' }}>Building in next commit…</p>
    </div>
  );
}


function Shell() {
  return (
    <div className="app-shell">
      
      <Toast />
      <Routes>
      
        <Route path="/"      element={<SplashPage />} />
        <Route path="/login" element={<LoginPage />}  />


        <Route path="/patient"
          element={<Guard role="patient"><PatientHome /></Guard>} />
        <Route path="/patient/assessment"
          element={<Guard role="patient"><AssessmentPage /></Guard>} />
        <Route path="/patient/report"
          element={<Guard role="patient"><ReportPage /></Guard>} />
        <Route path="/patient/video-call"
          element={<Guard role="patient"><VideoCallPage /></Guard>} />
        <Route path="/patient/diagnostics"
          element={<Guard role="patient"><VideoCallPage startOnDiagnostics /></Guard>} />


      
        
        <Route path="/patient/results"     element={<Guard role="patient"><ComingSoon label="Lab Results" /></Guard>} />
        <Route path="/patient/learn"       element={<Guard role="patient"><ComingSoon label="Learn" /></Guard>} />
        <Route path="/patient/community"   element={<Guard role="patient"><ComingSoon label="Community" /></Guard>} />
        <Route path="/patient/profile"     element={<Guard role="patient"><ComingSoon label="Profile" /></Guard>} />

      
        <Route path="/whf"          element={<Guard role="whf"><WHFDashboard /></Guard>} />
        <Route path="/whf/vitals"   element={<Guard role="whf"><VitalsPage /></Guard>} />
        
        <Route path="/whf/profile"  element={<Guard role="whf"><WHFProfile /></Guard>} />
       <Route path="/doctor"
          element={<Guard role="doctor"><DoctorPortal /></Guard>} />
      
        <Route path="/doctor/ai-report"
          element={<Guard role="doctor"><DoctorAIReport /></Guard>} />
      
        <Route path="/doctor/video-call"
          element={<Guard role="doctor"><DoctorVideoCall /></Guard>} />
    
        <Route path="/doctor/prescribe"
          element={<Guard role="doctor"><PrescribePage /></Guard>} />
       
        <Route path="/doctor/profile"
          element={<Guard role="doctor"><ComingSoon label="Doctor Profile" /></Guard>} />

      
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </AppProvider>
  );
}
