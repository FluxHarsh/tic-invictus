import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';


function Toggle({ on }) {
  return (
    <div style={{
      width:42, height:23, borderRadius:12,
      background: on ? 'linear-gradient(135deg,#4CAF85,#2E8B6A)' : '#D8C8D0',
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

export default function WHFProfile() {
  const { user, logout, addNotification } = useApp();
  const navigate = useNavigate();

  const name = user?.name || 'Sunita';
  const [notifOn,  setNotifOn]  = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [lang,     setLang]     = useState('English');

  const LANGS = ['English', 'हिन्दी', 'मराठी', 'తెలుగు'];

  
  const STATS = [
    { label:'Patients Helped', value:'87' },
    { label:'Monthly Income',  value:'₹8.4K' },
    { label:'Rating',          value:'4.9 ⭐' },
  ];


  const MENU = [
    {
      icon:'🔔', label:'Notifications',
      right: () => (
        <div onClick={() => { setNotifOn(n => !n); addNotification(notifOn ? 'Notifications off' : 'Notifications on 🔔'); }}>
          <Toggle on={notifOn} />
        </div>
      ),
    },
    {
      icon:'🌐', label:'Language',
      right: () => (
        <span style={{ color:'#9A7A88', fontSize:'0.84rem', fontWeight:600 }}>
          {lang} ›
        </span>
      ),
      onClick: () => setLangOpen(l => !l),
    },
    {
      icon:'🔒', label:'Privacy & Data',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
    },
    {
      icon:'❓', label:'Help & Support',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
    },
    {
      icon:'⭐', label:'Rate SHEALTH',
      right: () => <span style={{ color:'#C8C0C4' }}>›</span>,
      onClick: () => addNotification('Thank you for your support! 🌸'),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#F0FFF8,#F8F5FF,#FFF8F0)',
      paddingBottom:100,
    }}>

   
      <div style={{
        background:'linear-gradient(135deg,#4CAF85,#2E8B6A)',
        padding:'56px 22px 36px',
        position:'relative', overflow:'hidden',
      }}>
   
        <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
        <div style={{ position:'absolute', bottom:-60, left:-20, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>

       
        <button
          onClick={() => navigate('/whf')}
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

       
        <div style={{ textAlign:'center', position:'relative', zIndex:1 }}>
          <div style={{
            width:80, height:80, borderRadius:'50%',
            background:'rgba(255,255,255,0.25)', backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 12px',
            border:'3px solid rgba(255,255,255,0.42)',
            boxShadow:'0 4px 18px rgba(0,0,0,0.18)',
            fontSize:'2.4rem',
          }}>
            🧕
          </div>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'1.65rem', color:'white', fontWeight:700, marginBottom:3,
          }}>
            {name} 
          </h2>
          <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.82rem' }}>
            WHF Facilitator · Rampur Block
          </p>

         
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            background:'rgba(255,255,255,0.2)', backdropFilter:'blur(8px)',
            borderRadius:9999, padding:'5px 14px', marginTop:9,
          }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#C8F0C8' }}/>
            <span style={{ color:'white', fontSize:'0.78rem', fontWeight:700 }}>Active</span>
          </div>
        </div>

      
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          gap:0, marginTop:22,
          background:'rgba(255,255,255,0.15)',
          borderRadius:16, overflow:'hidden',
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign:'center', padding:'12px 6px',
              borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}>
              <div style={{ fontWeight:800, fontSize:'1.05rem', color:'white' }}>{s.value}</div>
              <div style={{ fontSize:'0.65rem', color:'rgba(255,255,255,0.72)', marginTop:2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

    
      <div style={{ padding:'18px 20px 0', display:'flex', flexDirection:'column', gap:10 }}>
        {MENU.map((item, i) => (
          <button
            key={i}
            onClick={item.onClick || (() => {})}
            style={{
              display:'flex', alignItems:'center', gap:13,
              background:'rgba(255,255,255,0.87)',
              borderRadius:18, padding:'15px 16px',
              border:'1px solid rgba(76,175,133,0.09)',
              width:'100%', textAlign:'left',
              cursor:'pointer', boxShadow:'0 2px 7px rgba(0,0,0,0.05)',
              transition:'all 0.18s ease',
              fontFamily:'Nunito,sans-serif',
            }}
            onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.99)'; }}
            onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)';    }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    }}
          >
     
            <div style={{
              width:38, height:38, borderRadius:13,
              background:'rgba(76,175,133,0.10)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'1.15rem', flexShrink:0,
            }}>
              {item.icon}
            </div>
            <div style={{ fontWeight:600, fontSize:'0.92rem', color:'#3D1F2E', flex:1 }}>
              {item.label}
            </div>
            {item.right()}
          </button>
        ))}

       
        {langOpen && (
          <div style={{
            background:'rgba(255,255,255,0.96)',
            borderRadius:18, padding:'10px',
            boxShadow:'0 4px 14px rgba(0,0,0,0.09)',
            animation:'fadeUp 0.28s ease',
          }}>
            {LANGS.map(l => (
              <button
                key={l}
                onClick={() => { setLang(l); setLangOpen(false); addNotification(`Language set to ${l}`); }}
                style={{
                  display:'block', width:'100%',
                  padding:'11px 14px', border:'none', borderRadius:13,
                  background: lang === l ? 'rgba(76,175,133,0.10)' : 'transparent',
                  color:      lang === l ? '#4CAF85'               : '#4A3040',
                  fontFamily:'Nunito,sans-serif',
                  fontWeight: lang === l ? 800 : 500,
                  fontSize:'0.92rem', cursor:'pointer',
                  textAlign:'left', transition:'all 0.14s ease',
                }}
              >
                {l} {lang === l && '✓'}
              </button>
            ))}
          </div>
        )}

       
        <div style={{ textAlign:'center', padding:'10px 0 6px' }}>
          <div style={{
            fontFamily:'Cormorant Garamond,serif',
            fontWeight:700, fontSize:'1.05rem',
            background:'linear-gradient(135deg,#4CAF85,#2E8B6A)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            marginBottom:3,
          }}>
            SHEALTH v1.0
          </div>
          <div style={{ fontSize:'0.72rem', color:'#B8A0A8' }}>
            Empowering women's healthcare 🌸
          </div>
        </div>

      
        <button
          onClick={handleLogout}
          style={{
            width:'100%', padding:'15px', borderRadius:9999,
            border:'2px solid rgba(76,175,133,0.28)', background:'transparent',
            color:'#4CAF85', fontFamily:'Nunito,sans-serif',
            fontWeight:800, fontSize:'0.96rem', cursor:'pointer',
            transition:'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(76,175,133,0.08)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          Sign Out
        </button>
      </div>

    
      <div style={{
        position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:430, padding:'10px 0 22px',
        background:'rgba(255,255,255,0.96)', backdropFilter:'blur(20px)',
        borderTop:'1px solid rgba(76,175,133,0.10)',
        display:'flex', justifyContent:'space-around', zIndex:100,
      }}>
        {[
          ['🏠', 'Home',     '/whf'         ],
          ['💓', 'Vitals',   '/whf/vitals'  ],
          // ['💰', 'Earnings', '/whf/earnings'],
          ['👤', 'Profile',  null           ],
        ].map(([em, lbl, path]) => (
          <button
            key={lbl}
            onClick={() => path && navigate(path)}
            style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'8px 14px', borderRadius:13, border:'none',
              background: lbl === 'Profile' ? 'rgba(76,175,133,0.12)' : 'transparent',
              color:       lbl === 'Profile' ? '#4CAF85'               : '#9A7A88',
              cursor: path ? 'pointer' : 'default',
              fontFamily:'Nunito,sans-serif', fontSize:'0.67rem', fontWeight:700,
            }}
          >
            <span style={{ fontSize:'1.1rem' }}>{em}</span>
            {lbl}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
