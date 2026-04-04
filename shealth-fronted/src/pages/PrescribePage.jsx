import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DoctorBottomNav } from './DoctorPortal';

// ── Creates a blank medicine object ──────────────────────────
const emptyMed = () => ({
  name:      '',
  dosage:    '',
  duration:  '',
  morning:   false,
  afternoon: false,
  night:     false,
});

// ── Shared input style ────────────────────────────────────────
const inp = {
  width:'100%', padding:'11px 14px',
  border:'2px solid rgba(200,66,109,0.15)',
  borderRadius:13,
  fontFamily:'Nunito,sans-serif',
  fontSize:'0.9rem', color:'#4A3040',
  background:'rgba(255,255,255,0.82)',
  outline:'none', transition:'border-color 0.18s ease',
};

export default function PrescribePage() {
  const { addNotification } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('queue'); // bottom nav

  // ── Form state ────────────────────────────────────────────
  const [patientName, setPatientName] = useState('Anita Sharma');
  const [diagnosis,   setDiagnosis]   = useState('');
  const [medicines,   setMedicines]   = useState([emptyMed()]);
  const [notes,       setNotes]       = useState('');
  const [sent,        setSent]        = useState(false);

  // ── Update one field inside a specific medicine ───────────
  // updateMed(0, 'name', 'Paracetamol')
  const updateMed = (idx, key, val) =>
    setMedicines(ms => ms.map((m, i) => i === idx ? { ...m, [key]: val } : m));

  // ── Add another medicine card ─────────────────────────────
  const addMed = () => setMedicines(ms => [...ms, emptyMed()]);

  // ── Remove a medicine card ────────────────────────────────
  const removeMed = (idx) =>
    setMedicines(ms => ms.filter((_, i) => i !== idx));

  // ── Send prescription ─────────────────────────────────────
  const handleSend = () => {
    // TODO: POST to /api/doctor/prescribe
    // body: { patientName, diagnosis, medicines, notes }
    console.log('Sending prescription:', { patientName, diagnosis, medicines, notes });
    setSent(true);
  };

  // ════════════════════════════════════════════════════════════
  // SUCCESS SCREEN
  // ════════════════════════════════════════════════════════════
  if (sent) {
    return (
      <div style={{
        minHeight:'100vh',
        background:'linear-gradient(160deg,#E8F8F2,#FEF0F5)',
        display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', padding:24,
      }}>
        <div style={{ textAlign:'center', animation:'scaleIn 0.5s ease' }}>
          <div style={{ fontSize:'3.8rem', marginBottom:16 }}>✅</div>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'2rem', color:'#3D1F2E', marginBottom:10,
          }}>
            Prescription Sent!
          </h2>
          <p style={{ color:'#9A7A88', fontSize:'0.88rem', lineHeight:1.6, marginBottom:26 }}>
            The patient will receive the prescription<br />
            on their SHEALTH app instantly.
          </p>
          <button
            onClick={() => navigate('/doctor')}
            style={{
              padding:'15px 38px', borderRadius:9999, border:'none',
              background:'linear-gradient(135deg,#C8426D,#9E2F52)',
              color:'white', fontFamily:'Nunito,sans-serif',
              fontWeight:800, fontSize:'0.95rem', cursor:'pointer',
              boxShadow:'0 4px 18px rgba(200,66,109,0.42)',
            }}
          >
            Back to Queue
          </button>
        </div>
        <style>{`
          @keyframes scaleIn { from{opacity:0;transform:scale(0.84)} to{opacity:1;transform:scale(1)} }
        `}</style>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════
  // PRESCRIPTION FORM
  // ════════════════════════════════════════════════════════════
  return (
    <div style={{
      minHeight:'100vh',
      background:'#FDF8F5',
      paddingBottom:100,
    }}>

      {/* ── Rose header ── */}
      <div style={{
        background:'linear-gradient(135deg,#C8426D,#9E2F52)',
        padding:'52px 22px 18px',
        display:'flex', alignItems:'center', gap:13,
      }}>
        <button
          onClick={() => navigate('/doctor')}
          style={{
            width:40, height:40, borderRadius:'50%',
            background:'rgba(255,255,255,0.2)', border:'none',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
        </button>

        <div>
          <div style={{
            fontFamily:'Cormorant Garamond,serif',
            fontWeight:700, fontSize:'0.9rem',
            color:'rgba(255,255,255,0.78)', marginBottom:2,
          }}>
            SHEALTH
          </div>
          <div style={{ color:'white', fontWeight:700, fontSize:'1rem' }}>
            Doctor Prescription Portal
          </div>
        </div>
      </div>

      <div style={{ padding:'22px 20px', display:'flex', flexDirection:'column', gap:16 }}>

        {/* ── SECTION: Patient Details ── */}
        <Section title="Patient Details">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:11 }}>
            <Field label="Patient Name">
              <input
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                placeholder="Patient name"
                style={inp}
                onFocus={e  => { e.target.style.borderColor = '#E8799A'; }}
                onBlur={e   => { e.target.style.borderColor = 'rgba(200,66,109,0.15)'; }}
              />
            </Field>
            <Field label="Diagnosis">
              <input
                value={diagnosis}
                onChange={e => setDiagnosis(e.target.value)}
                placeholder="e.g. Primary Hypertension"
                style={inp}
                onFocus={e  => { e.target.style.borderColor = '#E8799A'; }}
                onBlur={e   => { e.target.style.borderColor = 'rgba(200,66,109,0.15)'; }}
              />
            </Field>
          </div>
        </Section>

        {/* ── SECTION: Prescription ── */}
        <Section title="Prescription">

          {/* Add medicine button */}
          <button
            onClick={addMed}
            style={{
              display:'flex', alignItems:'center', gap:7,
              padding:'8px 16px', borderRadius:9999,
              border:'2px dashed rgba(200,66,109,0.32)',
              background:'transparent', color:'#C8426D',
              fontFamily:'Nunito,sans-serif', fontWeight:700,
              fontSize:'0.84rem', cursor:'pointer', marginBottom:13,
              transition:'all 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,66,109,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            + Add Medicine
          </button>

          {/* Medicine cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
            {medicines.map((med, idx) => (
              <div key={idx} style={{
                background:'rgba(255,255,255,0.96)',
                borderRadius:18, padding:'16px',
                boxShadow:'0 2px 10px rgba(0,0,0,0.055)',
                border:'1px solid rgba(200,66,109,0.08)',
              }}>
                {/* Card header: "Medicine 1" + remove button */}
                <div style={{
                  display:'flex', justifyContent:'space-between',
                  marginBottom:11,
                }}>
                  <span style={{
                    fontWeight:700, color:'#3D1F2E', fontSize:'0.88rem',
                  }}>
                    Medicine {idx + 1}
                  </span>
                  {/* Only show remove if more than 1 medicine */}
                  {medicines.length > 1 && (
                    <button
                      onClick={() => removeMed(idx)}
                      style={{
                        border:'none', background:'none',
                        color:'#9A7A88', cursor:'pointer', fontSize:'0.95rem',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Name | Dosage | Duration — 3 columns */}
                <div style={{
                  display:'grid', gridTemplateColumns:'2fr 1fr 1fr',
                  gap:9, marginBottom:11,
                }}>
                  <Field label="Medicine Name">
                    <input
                      value={med.name}
                      onChange={e => updateMed(idx, 'name', e.target.value)}
                      placeholder="e.g. Amlodipine"
                      style={{ ...inp, fontSize:'0.85rem', padding:'9px 11px' }}
                      onFocus={e  => { e.target.style.borderColor = '#E8799A'; }}
                      onBlur={e   => { e.target.style.borderColor = 'rgba(200,66,109,0.15)'; }}
                    />
                  </Field>
                  <Field label="Dosage">
                    <input
                      value={med.dosage}
                      onChange={e => updateMed(idx, 'dosage', e.target.value)}
                      placeholder="5mg"
                      style={{ ...inp, fontSize:'0.85rem', padding:'9px 11px' }}
                      onFocus={e  => { e.target.style.borderColor = '#E8799A'; }}
                      onBlur={e   => { e.target.style.borderColor = 'rgba(200,66,109,0.15)'; }}
                    />
                  </Field>
                  <Field label="Duration">
                    <input
                      value={med.duration}
                      onChange={e => updateMed(idx, 'duration', e.target.value)}
                      placeholder="30 days"
                      style={{ ...inp, fontSize:'0.85rem', padding:'9px 11px' }}
                      onFocus={e  => { e.target.style.borderColor = '#E8799A'; }}
                      onBlur={e   => { e.target.style.borderColor = 'rgba(200,66,109,0.15)'; }}
                    />
                  </Field>
                </div>

                {/* Timing toggles: Morning / Afternoon / Night */}
                <div style={{ display:'flex', gap:7 }}>
                  {[
                    { key:'morning',   label:'☀️ Morning'   },
                    { key:'afternoon', label:'🌤 Afternoon' },
                    { key:'night',     label:'🌙 Night'     },
                  ].map(t => (
                    <button
                      key={t.key}
                      onClick={() => updateMed(idx, t.key, !med[t.key])}
                      style={{
                        flex:1, padding:'8px 4px', borderRadius:9999, border:'none',
                        background: med[t.key]
                          ? 'linear-gradient(135deg,#C8426D,#E8799A)'
                          : 'rgba(200,66,109,0.09)',
                        color:  med[t.key] ? 'white' : '#9A7A88',
                        fontFamily:'Nunito,sans-serif',
                        fontWeight:700, fontSize:'0.73rem',
                        cursor:'pointer', transition:'all 0.18s ease',
                        boxShadow: med[t.key] ? '0 2px 8px rgba(200,66,109,0.35)' : 'none',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── SECTION: Doctor's Notes ── */}
        <Section title="Doctor's Notes">
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={4}
            placeholder="Patient advised to monitor blood pressure regularly, maintain a low-sodium diet…"
            style={{ ...inp, resize:'none', lineHeight:1.6 }}
            onFocus={e  => { e.target.style.borderColor = '#E8799A'; }}
            onBlur={e   => { e.target.style.borderColor = 'rgba(200,66,109,0.15)'; }}
          />
        </Section>

        {/* ── CTA buttons ── */}
        <div style={{ display:'flex', gap:11 }}>
          {/* Primary: Send prescription */}
          <button
            onClick={handleSend}
            onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.97)'; }}
            onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)';    }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    }}
            style={{
              flex:2, padding:'16px', borderRadius:9999, border:'none',
              background:'linear-gradient(135deg,#C8426D,#9E2F52)',
              color:'white', fontFamily:'Nunito,sans-serif',
              fontWeight:800, fontSize:'0.97rem', cursor:'pointer',
              boxShadow:'0 4px 18px rgba(200,66,109,0.42)',
              transition:'transform 0.15s ease',
            }}
          >
            📤 Send Digital Prescription
          </button>

          {/* Secondary: Schedule follow-up */}
          <button
            onClick={() => addNotification('Follow-up scheduled! 📅')}
            style={{
              flex:1, padding:'16px', borderRadius:9999,
              border:'2px solid rgba(200,66,109,0.28)', background:'transparent',
              color:'#C8426D', fontFamily:'Nunito,sans-serif',
              fontWeight:700, fontSize:'0.85rem', cursor:'pointer',
              transition:'all 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,66,109,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Schedule Follow-up
          </button>
        </div>
      </div>

      {/* ── Doctor bottom nav ── */}
      <DoctorBottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
      />
    </div>
  );
}

// ── Reusable white section card ───────────────────────────────
function Section({ title, children }) {
  return (
    <div style={{
      background:'rgba(255,255,255,0.87)',
      borderRadius:22, padding:'18px',
      boxShadow:'0 2px 10px rgba(0,0,0,0.055)',
      border:'1px solid rgba(200,66,109,0.07)',
    }}>
      <h3 style={{ fontWeight:700, color:'#3D1F2E', marginBottom:14, fontSize:'0.98rem' }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

// ── Reusable label + input wrapper ───────────────────────────
function Field({ label, children }) {
  return (
    <div>
      <label style={{
        display:'block', fontSize:'0.72rem', fontWeight:700,
        color:'#9A7A88', marginBottom:5,
        textTransform:'uppercase', letterSpacing:'0.4px',
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}
