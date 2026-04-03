
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const LANGUAGES = ['English', 'हिन्दी', 'मराठी', 'తెలుగు'];

const S = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(170deg, #FDF0F4 0%, #F0E8F8 50%, #FFF0E5 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 24px',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'absolute', top: -80, right: -80,
    width: 280, height: 280, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,184,232,0.55) 0%, transparent 70%)',
    filter: 'blur(22px)', pointerEvents: 'none',
  },
  blob2: {
    position: 'absolute', bottom: 120, left: -70,
    width: 230, height: 230, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(255,203,164,0.5) 0%, transparent 70%)',
    filter: 'blur(22px)', pointerEvents: 'none',
  },
  blob3: {
    position: 'absolute', top: '42%', left: -40,
    width: 160, height: 160, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,66,109,0.14) 0%, transparent 70%)',
    filter: 'blur(16px)', pointerEvents: 'none',
  },
  content: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    paddingTop: '11vh', zIndex: 1, width: '100%',
  },
  logoWrap: {
    width: 92, height: 92,
    background: 'linear-gradient(135deg, #C8426D 0%, #E8799A 100%)',
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(200,66,109,0.42)',
    marginBottom: 22,
    animation: 'float 3s ease-in-out infinite',
  },
  title: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '3rem', fontWeight: 700,
    background: 'linear-gradient(135deg, #C8426D 0%, #9E2F52 100%)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    letterSpacing: '3px', marginBottom: 8,
    animation: 'fadeUp 0.6s 0.1s ease both',
  },
  tagline: {
    color: '#9A7A88', fontSize: '1rem', textAlign: 'center',
    fontStyle: 'italic', marginBottom: 44,
    animation: 'fadeUp 0.6s 0.2s ease both',
  },
  langLabel: {
    textAlign: 'center', color: '#9A7A88',
    fontSize: '0.72rem', fontWeight: 700,
    letterSpacing: '1.5px', marginBottom: 14,
    textTransform: 'uppercase',
    animation: 'fadeUp 0.6s 0.3s ease both',
  },
  langGrid: {
    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
    width: '100%',
    animation: 'fadeUp 0.6s 0.3s ease both',
  },
  bottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: '0 24px 38px', zIndex: 1,
  },
  btn: {
    width: '100%', padding: '17px 24px',
    background: 'linear-gradient(135deg, #C8426D 0%, #9E2F52 100%)',
    color: 'white', border: 'none', borderRadius: 9999,
    fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem', fontWeight: 800,
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    boxShadow: '0 8px 28px rgba(200,66,109,0.45)',
    cursor: 'pointer', transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    animation: 'fadeUp 0.6s 0.5s ease both',
  },
  sub: {
    textAlign: 'center', color: '#B8909C', fontSize: '0.83rem',
    marginTop: 14, animation: 'fadeUp 0.6s 0.6s ease both',
  },
};

export default function SplashPage() {
  const { setLanguage } = useApp();
  const [selected, setSelected] = useState('English');
  const navigate = useNavigate();

  const handleStart = () => {
    setLanguage(selected);
    navigate('/login');
  };

  return (
    <div style={S.page}>
     
      <div style={S.blob1} />
      <div style={S.blob2} />
      <div style={S.blob3} />

    
      <div style={S.content}>
      
        <div style={{ animation: 'fadeUp 0.6s ease both', marginBottom: 0 }}>
          <div style={S.logoWrap}>
            <svg width="46" height="46" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
              <path d="M12 8v8M8 12h8" strokeWidth="2.6"/>
            </svg>
          </div>
        </div>

        
        <h1 style={S.title}>SHEALTH</h1>
        <p style={S.tagline}>Her location doesn't decide her lifespan</p>

       
        <p style={S.langLabel}>Select Your Language</p>
        <div style={S.langGrid}>
          {LANGUAGES.map((lang) => {
            const isSelected = selected === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelected(lang)}
                style={{
                  padding: '17px 14px',
                  borderRadius: 22,
                  border: isSelected
                    ? '2px solid #C8426D'
                    : '2px solid rgba(200,66,109,0.12)',
                  background: isSelected
                    ? 'linear-gradient(135deg, #6DD5C9 0%, #5BB8AE 100%)'
                    : 'rgba(255,255,255,0.86)',
                  color: isSelected ? 'white' : '#4A3040',
                  fontFamily: 'Nunito, sans-serif',
                  fontSize: '1rem', fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  transition: 'all 0.22s ease',
                  boxShadow: isSelected
                    ? '0 4px 18px rgba(109,213,201,0.38)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  transform: isSelected ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                <span>{lang}</span>
                {isSelected && (
                  <div style={{
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.28)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="3.5">
                      <polyline points="20,6 9,17 4,12"/>
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>

    
        <div style={{ display: 'flex', gap: 8, marginTop: 36,
          animation: 'fadeUp 0.6s 0.4s ease both' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: i === 0 ? 24 : 8, height: 8,
              borderRadius: 4,
              background: i === 0 ? '#C8426D' : 'rgba(200,66,109,0.22)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>

    
      <div style={S.bottom}>
        <button
          style={S.btn}
          onClick={handleStart}
          onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.97)'; }}
          onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)';    }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    }}
        >
          Get Started
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12,5 19,12 12,19"/>
          </svg>
        </button>
        <p style={S.sub}>Join 10k+ women securing their health 🌸</p>
      </div>

      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0px);   }
          50%      { transform: translateY(-10px); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}
