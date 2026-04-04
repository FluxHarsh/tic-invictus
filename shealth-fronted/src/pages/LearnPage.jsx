import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from './PatientHome';


const MOODS = [
  { emoji:'😌', label:'I feel calm',    color:'#D4F0E8', accent:'#4CAF85' },
  { emoji:'😰', label:'I feel anxious', color:'#FFF0D4', accent:'#F0A000' },
  { emoji:'😢', label:'I feel low',     color:'#EDE8F8', accent:'#8B72C8' },
  { emoji:'😤', label:'I feel stressed',color:'#FFE8E8', accent:'#D63030' },
];


const TIPS = [
  { emoji:'💧', title:'Stay Hydrated',    tag:'Wellness',     color:'#D4EEF8', accent:'#2196F3',
    body:'Drink at least 8 glasses of water daily. Dehydration worsens headaches, fatigue and mood.' },
  { emoji:'🥗', title:'Iron-Rich Foods',  tag:'Nutrition',    color:'#D4F0E8', accent:'#4CAF85',
    body:'Include spinach, lentils, jaggery and sesame seeds in your diet to fight anemia naturally.' },
  { emoji:'🧘', title:'Breathe & Reset',  tag:'Mental Health',color:'#EDE8F8', accent:'#8B72C8',
    body:'5 minutes of deep breathing daily reduces cortisol and helps with anxiety and sleep quality.' },
  { emoji:'🌙', title:'Sleep Matters',    tag:'Wellness',     color:'#FFF0D4', accent:'#F0A000',
    body:'Aim for 7–8 hours. Poor sleep is linked to hormonal imbalance, weight gain and mood disorders.' },
  { emoji:'🩺', title:'Regular Check-ups',tag:'Prevention',   color:'#FFE8F0', accent:'#C8426D',
    body:'Schedule vital checks (BP, hemoglobin, blood sugar) every 3 months even when feeling well.' },
];


const VIDEOS = [
  { emoji:'🎬', title:'Understanding Anemia',       duration:'4:32', views:'12K',  tag:'Health'    },
  { emoji:'🎬', title:'Pregnancy Nutrition Guide',  duration:'7:18', views:'8.4K', tag:'Maternal'  },
  { emoji:'🎬', title:'Managing Period Pain',       duration:'5:45', views:'22K',  tag:'Menstrual' },
];

export default function LearnPage() {
  const navigate     = useNavigate();
  const [activeTab,  setActiveTab]  = useState('learn');
  const [moodSel,    setMoodSel]    = useState(null);
  const [checkedIn,  setCheckedIn]  = useState(false);

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#FEF0F5,#F5EEFF,#FFF5EC)',
      paddingBottom:100,
    }}>


      <div style={{
        background:'rgba(255,255,255,0.92)', backdropFilter:'blur(16px)',
        padding:'52px 22px 18px',
        borderBottom:'1px solid rgba(200,66,109,0.08)',
      }}>
        <h2 style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'1.75rem', fontWeight:700, color:'#3D1F2E', marginBottom:3,
        }}>
          Learn &amp; Wellness 📚
        </h2>
        <p style={{ color:'#9A7A88', fontSize:'0.83rem' }}>
          Health tips, videos &amp; mental wellness
        </p>
      </div>

      <div style={{ padding:'18px 20px 0' }}>

       
        <div style={{
          background:'linear-gradient(135deg,#EDE8F8,#F7D5E0)',
          borderRadius:22, padding:'18px', marginBottom:22,
          border:'1px solid rgba(139,114,200,0.2)',
          animation:'fadeUp 0.4s ease',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
            <span style={{ fontSize:'1.25rem' }}>🧠</span>
            <h3 style={{ fontWeight:700, color:'#3D1F2E', fontSize:'0.97rem' }}>
              Mental Wellness Check-In
            </h3>
          </div>

          {!checkedIn ? (
            <>
              <p style={{ color:'#9A7A88', fontSize:'0.83rem', marginBottom:13 }}>
                How are you feeling emotionally today?
              </p>
              {/* 2x2 mood grid */}
              <div style={{
                display:'grid', gridTemplateColumns:'1fr 1fr', gap:9, marginBottom:13,
              }}>
                {MOODS.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setMoodSel(m.label)}
                    style={{
                      padding:'11px 9px', borderRadius:14,
                      border: moodSel === m.label
                        ? `2px solid ${m.accent}`
                        : '2px solid transparent',
                      background: moodSel === m.label ? m.color : 'rgba(255,255,255,0.72)',
                      cursor:'pointer', transition:'all 0.18s ease',
                      fontFamily:'Nunito,sans-serif', fontWeight:700, fontSize:'0.83rem',
                      color: moodSel === m.label ? m.accent : '#4A3040',
                      display:'flex', alignItems:'center', gap:8,
                      transform: moodSel === m.label ? 'scale(1.03)' : 'scale(1)',
                    }}
                  >
                    <span style={{ fontSize:'1.15rem' }}>{m.emoji}</span>
                    {m.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => moodSel && setCheckedIn(true)}
                disabled={!moodSel}
                style={{
                  width:'100%', padding:'12px', borderRadius:9999, border:'none',
                  background: moodSel
                    ? 'linear-gradient(135deg,#8B72C8,#6B52A8)'
                    : 'rgba(139,114,200,0.22)',
                  color:  moodSel ? 'white' : '#C0A8D8',
                  fontFamily:'Nunito,sans-serif', fontWeight:700, fontSize:'0.88rem',
                  cursor: moodSel ? 'pointer' : 'not-allowed',
                  boxShadow: moodSel ? '0 4px 14px rgba(139,114,200,0.42)' : 'none',
                  transition:'all 0.22s ease',
                }}
              >
                Submit Check-In
              </button>
            </>
          ) : (
           
            <div style={{ textAlign:'center', padding:'8px 0' }}>
              <div style={{ fontSize:'2rem', marginBottom:7 }}>🌸</div>
              <p style={{ fontWeight:700, color:'#8B72C8', fontSize:'0.92rem', marginBottom:4 }}>
                Thank you for checking in!
              </p>
              <p style={{ color:'#9A7A88', fontSize:'0.80rem', lineHeight:1.5 }}>
                You selected: <strong>{moodSel}</strong>. It's okay to not be okay.
                You can talk to a mental health expert via SHEALTH anytime.
              </p>
            </div>
          )}
        </div>


        <h3 style={{ fontWeight:700, color:'#3D1F2E', fontSize:'0.95rem', marginBottom:12 }}>
          Today's Health Tips 💡
        </h3>
        <div style={{ display:'flex', flexDirection:'column', gap:11, marginBottom:22 }}>
          {TIPS.map((tip, i) => (
            <div
              key={i}
              style={{
                background: tip.color, borderRadius:18, padding:'15px',
                border:`1px solid ${tip.accent}22`,
                animation:`fadeUp 0.4s ${i * 0.06}s ease both`,
              }}
            >
              <div style={{ display:'flex', alignItems:'flex-start', gap:11 }}>
                <div style={{ fontSize:'1.5rem', flexShrink:0 }}>{tip.emoji}</div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontWeight:800, fontSize:'0.88rem', color:'#3D1F2E' }}>
                      {tip.title}
                    </span>
                    <span style={{
                      background:`${tip.accent}1A`, color:tip.accent,
                      padding:'2px 8px', borderRadius:9999,
                      fontSize:'0.63rem', fontWeight:700,
                    }}>
                      {tip.tag}
                    </span>
                  </div>
                  <p style={{ color:'#4A3040', fontSize:'0.80rem', lineHeight:1.5, margin:0 }}>
                    {tip.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

   
        <h3 style={{ fontWeight:700, color:'#3D1F2E', fontSize:'0.95rem', marginBottom:12 }}>
          Health Videos 🎥
        </h3>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {VIDEOS.map((v, i) => (
            <div
              key={i}
              style={{
                background:'rgba(255,255,255,0.87)', borderRadius:18, padding:'13px 15px',
                display:'flex', alignItems:'center', gap:13,
                boxShadow:'0 2px 9px rgba(0,0,0,0.055)',
                cursor:'pointer', transition:'all 0.18s ease',
                animation:`fadeUp 0.4s ${i * 0.06}s ease both`,
              }}
              onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)';    }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    }}
            >
        
              <div style={{
                width:54, height:54, borderRadius:15, flexShrink:0,
                background:'linear-gradient(135deg,#C8426D,#9E2F52)',
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 2px 10px rgba(200,66,109,0.38)',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              </div>

              <div style={{ flex:1, minWidth:0 }}>
                <div style={{
                  fontWeight:700, fontSize:'0.88rem', color:'#3D1F2E',
                  marginBottom:3, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                }}>
                  {v.title}
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  <span style={{ fontSize:'0.70rem', color:'#9A7A88' }}>⏱ {v.duration}</span>
                  <span style={{ fontSize:'0.70rem', color:'#9A7A88' }}>👁 {v.views} views</span>
                  <span style={{
                    background:'rgba(200,66,109,0.10)', color:'#C8426D',
                    padding:'2px 8px', borderRadius:9999,
                    fontSize:'0.62rem', fontWeight:700,
                  }}>
                    {v.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
        role="patient"
      />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
