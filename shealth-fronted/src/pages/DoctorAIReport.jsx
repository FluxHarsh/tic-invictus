import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK } from '../services/data';

// ── 6 rotating tag colors ─────────────────────────────────────
const TAG_BG     = ['#F7D5E0','#D4EEF8','#D4F0E8','#FFF0D4','#EDE8F8','#FFE8D4'];
const TAG_ACCENT = ['#C8426D','#2196F3','#4CAF85','#F0A000','#8B72C8','#E07B00'];

export default function DoctorAIReport() {
  const navigate = useNavigate();
  const r        = MOCK.doctor.aiReport; // pre-built mock report
  const isHigh   = r.riskLevel === 'high';

  return (
    <div style={{
      minHeight:'100vh',
      background:'#FAF8FF',
      paddingBottom:40,
    }}>

      {/* ── Header ── */}
      <div style={{
        background:'rgba(255,255,255,0.95)', backdropFilter:'blur(14px)',
        padding:'52px 22px 18px',
        borderBottom:'1px solid rgba(200,66,109,0.08)',
        display:'flex', alignItems:'center', gap:13,
      }}>
        {/* back button */}
        <button
          onClick={() => navigate('/doctor')}
          style={{
            width:40, height:40, borderRadius:'50%',
            background:'rgba(255,255,255,0.82)', border:'none',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="#4A3040" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
        </button>

        <div>
          {/* patient meta info */}
          <div style={{ fontSize:'0.72rem', color:'#9A7A88', marginBottom:2 }}>
            Patient: {r.patient} | Age: {r.age} | Village: {r.village}
          </div>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'1.55rem', fontWeight:700, color:'#3D1F2E',
          }}>
            AI Pre-Consult Report
          </h2>
        </div>
      </div>

      <div style={{ padding:'20px 20px' }}>

        {/* ── 3-column grid: Symptoms | Duration & Severity | Key Observations ── */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          gap:11, marginBottom:13,
        }}>

          {/* ── Symptoms card ── */}
          <div style={{
            background:'rgba(247,213,224,0.42)',
            borderRadius:18, padding:'15px',
            border:'1px solid rgba(200,66,109,0.14)',
            animation:'fadeUp 0.4s ease',
          }}>
            <h3 style={{
              fontWeight:700, fontSize:'0.83rem',
              color:'#3D1F2E', marginBottom:9,
            }}>
              Symptoms
            </h3>
            {/* colored pill tags for each symptom */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
              {r.symptoms.map((s, i) => (
                <span key={s} style={{
                  background: TAG_BG[i % 6],
                  color:      TAG_ACCENT[i % 6],
                  padding:'3px 9px', borderRadius:9999,
                  fontSize:'0.70rem', fontWeight:700,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* ── Duration & Severity card ── */}
          <div style={{
            background:'rgba(247,213,224,0.42)',
            borderRadius:18, padding:'15px',
            border:'1px solid rgba(200,66,109,0.14)',
            animation:'fadeUp 0.4s 0.05s ease both',
          }}>
            <h3 style={{
              fontWeight:700, fontSize:'0.83rem',
              color:'#3D1F2E', marginBottom:9,
            }}>
              Duration &amp; Severity
            </h3>
            <div style={{ fontSize:'0.78rem', color:'#4A3040', marginBottom:7 }}>
              Severity: <strong>{r.severity}</strong>
            </div>

            {/* severity progress bar */}
            <div style={{
              background:'rgba(200,66,109,0.14)',
              borderRadius:9999, height:6, marginBottom:8,
            }}>
              <div style={{
                height:'100%', borderRadius:9999,
                background:'linear-gradient(90deg,#C8426D,#E8799A)',
                // Moderate = ~55%, High = ~80%
                width: r.riskLevel === 'high' ? '78%' : '55%',
              }}/>
            </div>

            <div style={{ fontSize:'0.78rem', color:'#4A3040' }}>
              Duration: <strong>{r.duration}</strong>
            </div>
          </div>

          {/* ── Key Observations card ── */}
          <div style={{
            background:'rgba(247,213,224,0.42)',
            borderRadius:18, padding:'15px',
            border:'1px solid rgba(200,66,109,0.14)',
            animation:'fadeUp 0.4s 0.10s ease both',
          }}>
            <h3 style={{
              fontWeight:700, fontSize:'0.83rem',
              color:'#3D1F2E', marginBottom:9,
            }}>
              Key Observations
            </h3>
            <ul style={{ margin:0, paddingLeft:14 }}>
              {r.keyObservations.map((o, i) => (
                <li key={i} style={{
                  fontSize:'0.73rem', color:'#4A3040',
                  marginBottom:5, lineHeight:1.4,
                }}>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Risk Flags (only shown when high risk) ── */}
        {isHigh && (
          <div style={{
            background:'rgba(255,235,150,0.88)',
            borderRadius:18, padding:'15px',
            border:'1px solid rgba(240,160,0,0.38)',
            marginBottom:20,
            animation:'fadeUp 0.4s 0.15s ease both',
          }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:7 }}>
              <span style={{ fontSize:'1.15rem' }}>⚠️</span>
              <h3 style={{ fontWeight:800, fontSize:'0.92rem', color:'#8A5C00' }}>
                Risk Flags
              </h3>
            </div>
            <p style={{
              color:'#8A5C00', fontSize:'0.82rem', lineHeight:1.5, margin:0,
            }}>
              {r.riskFlags}
            </p>
          </div>
        )}

        {/* ── Action buttons ── */}
        <div style={{
          display:'flex', gap:11,
          animation:'fadeUp 0.4s 0.2s ease both',
        }}>
          {/* Primary: Begin Consultation */}
          <button
            onClick={() => navigate('/doctor/video-call')}
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
            Begin Consultation
          </button>

          {/* Secondary: Order Diagnostics (skip call, go to prescribe) */}
          <button
            onClick={() => navigate('/doctor/prescribe')}
            style={{
              flex:1, padding:'16px', borderRadius:9999,
              border:'2px solid rgba(200,66,109,0.3)', background:'transparent',
              color:'#C8426D', fontFamily:'Nunito,sans-serif',
              fontWeight:700, fontSize:'0.87rem', cursor:'pointer',
              transition:'all 0.18s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,66,109,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            Order Diagnostics
          </button>
        </div>
      </div> 

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0);    }
        }
      `}</style>
    </div>
  );
}
