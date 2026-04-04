import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK } from '../services/data';

export default function DoctorVideoCall() {
  const navigate = useNavigate();
  const r        = MOCK.doctor.aiReport; // patient's AI report (shown in drawer)

  // ── Video refs ────────────────────────────────────────────
  const localVideoRef  = useRef(null);
  const remoteVideoRef = useRef(null);
  const streamRef      = useRef(null);

  // ── UI state ──────────────────────────────────────────────
  const [muted,      setMuted]      = useState(false);
  const [camOff,     setCamOff]     = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [chatOpen,   setChatOpen]   = useState(false);
  const [chatMsg,    setChatMsg]    = useState('');
  const [chatLog,    setChatLog]    = useState([
    { from:'Patient', text:"Hello doctor, I've been feeling very tired lately." },
  ]);
  const [callState, setCallState] = useState('connecting'); // 'connecting' | 'live'
  const [elapsed,   setElapsed]   = useState(0);
  const [ended,     setEnded]     = useState(false);

  // ── Start webcam on mount ─────────────────────────────────
  useEffect(() => {
    let timer;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video:true, audio:true });
        streamRef.current = stream;
        // Doctor's own camera → local video
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
          localVideoRef.current.muted = true;
        }
        // Simulate patient remote video after 2 s
        setTimeout(() => {
          if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
          setCallState('live');
        }, 2000);
      } catch {
        // No camera available — still show UI in live state
        setCallState('live');
      }
    })();
    // Elapsed timer
    timer = setInterval(() => setElapsed(s => s + 1), 1000);
    // Cleanup — stop tracks when doctor leaves page
    return () => {
      clearInterval(timer);
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const toggleMic = () => {
    streamRef.current?.getAudioTracks().forEach(t => { t.enabled = muted; });
    setMuted(m => !m);
  };
  const toggleCam = () => {
    streamRef.current?.getVideoTracks().forEach(t => { t.enabled = camOff; });
    setCamOff(c => !c);
  };
  const sendChat = () => {
    if (!chatMsg.trim()) return;
    setChatLog(l => [...l, { from:'Doctor', text:chatMsg }]);
    setChatMsg('');
  };
  const fmt = s =>
    `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  // ── Call ended → redirect to prescription ─────────────────
  if (ended) {
    return (
      <div style={{
        minHeight:'100vh', background:'#3D1F2E',
        display:'flex', alignItems:'center', justifyContent:'center',
      }}>
        <div style={{ textAlign:'center', color:'white', animation:'fadeIn 0.5s ease' }}>
          <div style={{ fontSize:'3.2rem', marginBottom:14 }}>👋</div>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif', fontSize:'1.75rem', marginBottom:8,
          }}>
            Call Ended
          </h2>
          <p style={{ color:'rgba(255,255,255,0.58)', fontSize:'0.88rem' }}>
            Redirecting to prescription…
          </p>
        </div>
        <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
      </div>
    );
  }

  return (
    <div style={{
      minHeight:'100vh', background:'#2A1020',
      display:'flex', flexDirection:'column',
    }}>

      {/* ── Top bar ── */}
      <div style={{
        padding:'46px 20px 11px',
        display:'flex', alignItems:'center', justifyContent:'space-between',
      }}>
        {/* Logo */}
        <div style={{ display:'flex', alignItems:'center', gap:7 }}>
          <div style={{
            width:28, height:28, borderRadius:'50%',
            background:'linear-gradient(135deg,#C8426D,#E8799A)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
              <path d="M12 8v8M8 12h8"/>
            </svg>
          </div>
          <span style={{
            fontFamily:'Cormorant Garamond,serif', fontWeight:700,
            fontSize:'0.92rem', color:'rgba(255,255,255,0.82)',
          }}>
            SHEALTH
          </span>
        </div>

        {/* Title + live timer */}
        <div style={{ textAlign:'center' }}>
          <div style={{ color:'white', fontWeight:700, fontSize:'0.86rem' }}>
            Video Consultation
          </div>
          {callState === 'live' && (
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
              <div style={{
                width:7, height:7, borderRadius:'50%', background:'#4CAF85',
                animation:'pulse 1.5s infinite',
              }}/>
              <span style={{ color:'rgba(255,255,255,0.62)', fontSize:'0.70rem' }}>
                Live · {fmt(elapsed)}
              </span>
            </div>
          )}
          {callState === 'connecting' && (
            <span style={{ color:'rgba(255,255,255,0.42)', fontSize:'0.70rem' }}>
              Connecting…
            </span>
          )}
        </div>
        <div style={{ width:36 }}/> {/* spacer */}
      </div>

      {/* ── Video + controls ── */}
      <div style={{ padding:'0 15px', flex:1, display:'flex', flexDirection:'column', gap:8 }}>

        {/* Patient (remote) video — main large box */}
        <div style={{
          position:'relative', borderRadius:20, overflow:'hidden',
          background:'linear-gradient(135deg,#4A1F3A,#2A1020)',
          flex:1, minHeight:250,
          boxShadow:'0 8px 36px rgba(0,0,0,0.52)',
        }}>
          <video ref={remoteVideoRef} autoPlay playsInline style={{
            width:'100%', height:'100%', objectFit:'cover',
            display: callState === 'live' ? 'block' : 'none',
          }}/>

          {/* Connecting state placeholder */}
          {callState !== 'live' && (
            <div style={{
              position:'absolute', inset:0,
              display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
            }}>
              <div style={{ fontSize:'2.6rem', marginBottom:9, animation:'pulse 1.5s infinite' }}>
                🙍‍♀️
              </div>
              <div style={{ color:'rgba(255,255,255,0.62)', fontSize:'0.84rem' }}>
                Waiting for patient…
              </div>
              <div style={{ display:'flex', gap:5, marginTop:9 }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{
                    width:8, height:8, borderRadius:'50%',
                    background:'rgba(255,255,255,0.42)',
                    animation:`bounce 1s ${i * 0.15}s infinite`,
                  }}/>
                ))}
              </div>
            </div>
          )}

          {/* Patient name overlay */}
          <div style={{
            position:'absolute', bottom:11, left:11,
            background:'rgba(0,0,0,0.55)', backdropFilter:'blur(6px)',
            borderRadius:9, padding:'5px 11px', pointerEvents:'none',
          }}>
            <div style={{ color:'white', fontWeight:700, fontSize:'0.78rem' }}>
              {r.patient}, Age {r.age}
            </div>
            <div style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.67rem' }}>
              {r.village}
            </div>
          </div>

          {/* Doctor PiP (own camera — bottom right) */}
          <div style={{
            position:'absolute', bottom:11, right:11,
            width:84, height:112, borderRadius:12, overflow:'hidden',
            border:'2px solid rgba(255,255,255,0.22)',
            background:'#3D1F2E',
          }}>
            <video ref={localVideoRef} autoPlay playsInline muted style={{
              width:'100%', height:'100%', objectFit:'cover',
              display: !camOff ? 'block' : 'none',
            }}/>
            {camOff && (
              <div style={{
                width:'100%', height:'100%',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'1.6rem',
              }}>
                👩‍⚕️
              </div>
            )}
          </div>
        </div>

        {/* ── AI Report drawer ── */}
        <button
          onClick={() => setShowReport(s => !s)}
          style={{
            width:'100%', padding:'11px 15px',
            background:'rgba(255,255,255,0.09)', backdropFilter:'blur(10px)',
            border:'1px solid rgba(255,255,255,0.14)', borderRadius:13,
            display:'flex', alignItems:'center', justifyContent:'space-between',
            cursor:'pointer', color:'white',
            fontFamily:'Nunito,sans-serif', fontWeight:700, fontSize:'0.84rem',
          }}
        >
          <span>📋 Patient AI Report {showReport ? '(Expanded)' : '(Collapsed)'}</span>
          <span style={{ opacity:0.6 }}>{showReport ? '▲' : '▼'}</span>
        </button>

        {showReport && (
          <div style={{
            background:'rgba(255,255,255,0.09)', backdropFilter:'blur(12px)',
            borderRadius:13, padding:'12px 14px',
            border:'1px solid rgba(255,255,255,0.11)',
            animation:'fadeUp 0.3s ease',
          }}>
            {/* symptom tags */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:7 }}>
              {r.symptoms.map(s => (
                <span key={s} style={{
                  background:'rgba(200,66,109,0.32)', color:'#FFB0C8',
                  padding:'3px 9px', borderRadius:9999,
                  fontSize:'0.72rem', fontWeight:600,
                }}>
                  {s}
                </span>
              ))}
            </div>
            <p style={{
              color:'rgba(255,255,255,0.70)', fontSize:'0.78rem', margin:0, lineHeight:1.5,
            }}>
              Severity: <strong style={{ color:'#FFD280' }}>{r.severity}</strong>{' '}
              · Duration: {r.duration}
              {r.riskLevel === 'high' && (
                <span style={{
                  marginLeft:8, background:'rgba(240,160,0,0.35)',
                  color:'#FFD280', padding:'2px 8px', borderRadius:9999,
                  fontSize:'0.70rem', fontWeight:700,
                }}>
                  ⚠️ HIGH RISK
                </span>
              )}
            </p>
          </div>
        )}

        {/* ── In-call chat ── */}
        {chatOpen && (
          <div style={{
            background:'rgba(255,255,255,0.08)', backdropFilter:'blur(12px)',
            borderRadius:13, overflow:'hidden',
            border:'1px solid rgba(255,255,255,0.10)',
            animation:'fadeUp 0.3s ease',
          }}>
            <div style={{
              padding:'9px 12px', maxHeight:120,
              overflowY:'auto', display:'flex', flexDirection:'column', gap:6,
            }}>
              {chatLog.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.from === 'Doctor' ? 'flex-end' : 'flex-start',
                }}>
                  <div style={{ fontSize:'0.62rem', color:'rgba(255,255,255,0.38)', marginBottom:2 }}>
                    {m.from}
                  </div>
                  <div style={{
                    background: m.from === 'Doctor'
                      ? 'linear-gradient(135deg,#C8426D,#9E2F52)'
                      : 'rgba(255,255,255,0.16)',
                    color:'white', padding:'6px 10px',
                    borderRadius:10, fontSize:'0.78rem', maxWidth:195,
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              display:'flex', gap:6, padding:'6px 10px',
              borderTop:'1px solid rgba(255,255,255,0.08)',
            }}>
              <input
                value={chatMsg}
                onChange={e => setChatMsg(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendChat()}
                placeholder="Type a message…"
                style={{
                  flex:1, background:'rgba(255,255,255,0.10)',
                  border:'none', borderRadius:9999, padding:'6px 12px',
                  color:'white', fontFamily:'Nunito,sans-serif',
                  fontSize:'0.80rem', outline:'none',
                }}
              />
              <button onClick={sendChat} style={{
                width:32, height:32, borderRadius:'50%',
                background:'#C8426D', border:'none',
                color:'white', cursor:'pointer', fontSize:'0.88rem',
              }}>
                ↑
              </button>
            </div>
          </div>
        )}

        {/* ── Control buttons ── */}
        <div style={{
          display:'flex', alignItems:'center',
          justifyContent:'center', gap:12, paddingBottom:26,
        }}>
          <Ctrl icon={muted   ? '🔇' : '🎙️'} label={muted   ? 'Unmute' : 'Mute'}  active={muted}   onClick={toggleMic} />
          <Ctrl icon={camOff  ? '📵' : '📷'} label="Camera"                        active={camOff}  onClick={toggleCam} />
          <Ctrl icon="💬"                     label="Chat"                          active={chatOpen} onClick={() => setChatOpen(c => !c)} />

          {/* End call — red */}
          <button
            onClick={() => {
              setEnded(true);
              // stop camera tracks
              streamRef.current?.getTracks().forEach(t => t.stop());
              // redirect to prescription after 1.2 s
              setTimeout(() => navigate('/doctor/prescribe'), 1200);
            }}
            onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.91)'; }}
            onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)';    }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    }}
            style={{
              width:60, height:60, borderRadius:'50%', border:'none',
              background:'linear-gradient(135deg,#D63030,#A00)',
              fontSize:'1.45rem', cursor:'pointer',
              boxShadow:'0 4px 16px rgba(214,48,48,0.58)',
              transition:'transform 0.15s ease',
            }}
          >
            📵
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse  { 0%,100%{opacity:1}  50%{opacity:0.38} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(11px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

// ── Small circular control button ────────────────────────────
function Ctrl({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} title={label} style={{
      width:50, height:50, borderRadius:'50%', border:'none',
      background: active ? 'rgba(200,66,109,0.36)' : 'rgba(255,255,255,0.12)',
      backdropFilter:'blur(8px)',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      cursor:'pointer', fontSize:'1.18rem', gap:2,
      transition:'all 0.18s ease',
      boxShadow: active ? '0 0 0 2px rgba(200,66,109,0.5)' : 'none',
    }}>
      {icon}
      <span style={{
        color:'rgba(255,255,255,0.5)',
        fontSize:'0.52rem', fontFamily:'Nunito,sans-serif', fontWeight:700,
      }}>
        {label}
      </span>
    </button>
  );
}
