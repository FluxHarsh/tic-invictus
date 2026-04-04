import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DoctorBottomNav } from './DoctorPortal';


function Toggle({ on, color = '#C8426D' }) {
  return (
    <div style={{
      width:42, height:23, borderRadius:12,
      background: on ? color : '#D8C8D0',
      position:'relative', transition:'background 0.28s ease', flexShrink:0,
    }}>
      <div style={{
        position:'absolute', top:3,
        left: on ? 22 : 3,
        width:17, height:17, borderRadius:'50%',
        background:'white', boxShadow:'0 1px 4px rgba(0,0,0,0.22)',
        transition:'left 0.28s ease',
      }}/>
    </div>
  );
}

export default function DoctorProfile() {
  const { logout, addNotification, user } = useApp();
  const name = user?.name || 'Doctor';
  const navigate   = useNavigate();
  const [activeTab,   setActiveTab]   = useState('profile');
  const [available,   setAvailable]   = useState(true);
  const [notifOn,     setNotifOn]     = useState(true);
  const [langOpen,    setLangOpen]    = useState(false);
  const [lang,        setLang]        = useState('English');

  const LANGS = ['English', 'हिन्दी', 'मराठी', 'తెలుగు'];

  const STATS = [
    { label:'Patients Seen',   value:'1,240' },
    { label:'Consultations',   value:'892'   },
    { label:'Rating',          value:'4.9 ★' },
    { label:'Years Active',    value:'7'     },
  ];

  const MENU = [
    {
      icon:'🟢', label:'Availability',
      sub: available ? 'Currently accepting patients' : 'Not accepting patients',
      right: () => (
        <div onClick={() => setAvailable(a => !a)}>
          <Toggle on={available} color="#4CAF85" />
        </div>
      ),
    },
    {
      icon:'🔔', label:'Notifications',
      sub: notifOn ? 'On' : 'Off',
      onClick: () => { setNotifOn(n => !n); addNotification(notifOn ? 'Notifications off' : 'Notifications on'); },
      right: () => <Toggle on={notifOn} />,
    },
    {
      icon:'🌐', label:'Language',
      sub: lang,
      onClick: () => setLangOpen(l => !l),
      right: () => <span style={{ color:'#9A7A88', fontSize:'0.84rem', fontWeight:600 }}>{lang} ›</span>,
    },
    {
      icon:'📋', label:'Consultation History',
      sub: '892 past consultations',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
    },
    {
      icon:'💊', label:'My Specializations',
      sub: 'Gynecology, Obstetrics',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
    },
    {
      icon:'🔒', label:'Privacy & Security',
      sub: 'Manage your data',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
    },
    {
      icon:'❓', label:'Help & Support',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#FFF8F0,#FFF0F5)',
      paddingBottom:100,
    }}>

   
      <div style={{
        background:'linear-gradient(135deg,#FFCBA4,#FF8A65,#C8426D)',
        padding:'56px 22px 32px',
        position:'relative', overflow:'hidden',
        textAlign:'center',
      }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
        <div style={{ position:'absolute', bottom:-55, left:-18, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>

      
        <button
          onClick={() => navigate('/doctor')}
          style={{
            position:'absolute', top:52, left:20,
            width:40, height:40, borderRadius:'50%',
            background:'rgba(255,255,255,0.22)', border:'none',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer',
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
        </button>

   
        <div style={{
          width:82, height:82, borderRadius:'50%',
          background:'rgba(255,255,255,0.24)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 12px',
          border:'3px solid rgba(255,255,255,0.4)',
          boxShadow:'0 4px 18px rgba(0,0,0,0.18)',
          fontSize:'2.4rem', position:'relative', zIndex:1,
        }}>
          👩‍⚕️
        </div>
        <h2 style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'1.65rem', color:'white', fontWeight:700, marginBottom:3, position:'relative', zIndex:1,
        }}>
          Dr. {name}
        </h2>
        <p style={{ color:'rgba(255,255,255,0.76)', fontSize:'0.80rem', position:'relative', zIndex:1 }}>
          Gynecologist &amp; Obstetrician · SHEALTH Network
        </p>

     
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6,
          background:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)',
          borderRadius:9999, padding:'5px 14px', marginTop:10, position:'relative', zIndex:1,
        }}>
          <div style={{
            width:8, height:8, borderRadius:'50%',
            background: available ? '#C8F0C8' : '#FFB0B0',
          }}/>
          <span style={{ color:'white', fontSize:'0.78rem', fontWeight:700 }}>
            {available ? 'Accepting patients' : 'Not available'}
          </span>
        </div>

   
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr',
          gap:0, marginTop:20,
          background:'rgba(255,255,255,0.14)',
          borderRadius:14, overflow:'hidden', position:'relative', zIndex:1,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign:'center', padding:'11px 4px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.18)' : 'none',
            }}>
              <div style={{ fontWeight:800, fontSize:'1rem', color:'white' }}>{s.value}</div>
              <div style={{ fontSize:'0.60rem', color:'rgba(255,255,255,0.70)', marginTop:2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

  
      <div style={{ padding:'18px 20px 0', display:'flex', flexDirection:'column', gap:9 }}>
        {MENU.map((item, i) => (
          <button
            key={i}
            onClick={item.onClick || (() => {})}
            style={{
              display:'flex', alignItems:'center', gap:13,
              background:'rgba(255,255,255,0.88)',
              borderRadius:17, padding:'14px 15px',
              border:'1px solid rgba(200,66,109,0.07)',
              width:'100%', textAlign:'left', cursor:'pointer',
              boxShadow:'0 2px 6px rgba(0,0,0,0.04)',
              transition:'all 0.18s ease', fontFamily:'Nunito,sans-serif',
            }}
            onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.99)'; }}
            onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div style={{
              width:38, height:38, borderRadius:13,
              background:'rgba(200,66,109,0.08)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.1rem', flexShrink:0,
            }}>
              {item.icon}
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:600, fontSize:'0.9rem', color:'#3D1F2E' }}>
                {item.label}
              </div>
              {item.sub && (
                <div style={{ fontSize:'0.70rem', color:'#9A7A88', marginTop:1 }}>
                  {item.sub}
                </div>
              )}
            </div>
            {item.right()}
          </button>
        ))}

   
        {langOpen && (
          <div style={{
            background:'rgba(255,255,255,0.96)',
            borderRadius:17, padding:'9px',
            boxShadow:'0 4px 14px rgba(0,0,0,0.09)',
            animation:'fadeUp 0.25s ease',
          }}>
            {LANGS.map(l => (
              <button key={l}
                onClick={() => { setLang(l); setLangOpen(false); addNotification(`Language: ${l}`); }}
                style={{
                  display:'block', width:'100%', padding:'10px 13px',
                  border:'none', borderRadius:12,
                  background: lang === l ? 'rgba(200,66,109,0.09)' : 'transparent',
                  color:      lang === l ? '#C8426D'               : '#4A3040',
                  fontFamily:'Nunito,sans-serif',
                  fontWeight: lang === l ? 800 : 500,
                  fontSize:'0.9rem', cursor:'pointer', textAlign:'left',
                }}>
                {l} {lang === l && '✓'}
              </button>
            ))}
          </div>
        )}


        <div style={{ textAlign:'center', padding:'8px 0 4px' }}>
          <div style={{
            fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontSize:'1.02rem',
            background:'linear-gradient(135deg,#C8426D,#9E2F52)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:3,
          }}>
            SHEALTH v1.0
          </div>
          <div style={{ fontSize:'0.70rem', color:'#B8A0A8' }}>
            Team Invictus · MANIT Bhopal 🌸
          </div>
        </div>

        
        <button
          onClick={handleLogout}
          style={{
            width:'100%', padding:'14px', borderRadius:9999,
            border:'2px solid rgba(200,66,109,0.28)', background:'transparent',
            color:'#C8426D', fontFamily:'Nunito,sans-serif',
            fontWeight:800, fontSize:'0.95rem', cursor:'pointer',
            transition:'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,66,109,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Sign Out
        </button>
      </div>

      <DoctorBottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
      />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}