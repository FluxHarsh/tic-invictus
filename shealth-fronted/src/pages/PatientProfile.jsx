import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BottomNav } from './PatientHome';


function Toggle({ on }) {
  return (
    <div style={{
      width:42, height:23, borderRadius:12,
      background: on ? 'linear-gradient(135deg,#C8426D,#9E2F52)' : '#D8C8D0',
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


function MenuItem({ icon, label, sub, onClick, right }) {
  return (
    <button
      onClick={onClick || (() => {})}
      style={{
        display:'flex', alignItems:'center', gap:13,
        background:'rgba(255,255,255,0.87)',
        borderRadius:17, padding:'14px 15px',
        border:'1px solid rgba(200,66,109,0.07)',
        width:'100%', textAlign:'left',
        cursor:'pointer', boxShadow:'0 2px 6px rgba(0,0,0,0.04)',
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
        {icon}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontWeight:600, fontSize:'0.9rem', color:'#3D1F2E' }}>{label}</div>
        {sub && <div style={{ fontSize:'0.72rem', color:'#9A7A88', marginTop:1 }}>{sub}</div>}
      </div>
      {right || <span style={{ color:'#C8C0C4', fontSize:'0.9rem' }}>›</span>}
    </button>
  );
}

export default function PatientProfile() {
  const { user, logout, addNotification } = useApp();
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [notifOn,   setNotifOn]   = useState(true);

  const name = user?.name || 'Priya';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#FEF0F5,#F0EBFF,#FFF0E5)',
      paddingBottom:100,
    }}>

 
      <div style={{
        background:'linear-gradient(135deg,#C8426D,#9E2F52)',
        padding:'56px 22px 34px',
        position:'relative', overflow:'hidden',
        textAlign:'center',
      }}>
   
        <div style={{ position:'absolute', top:-40, right:-40, width:180, height:180, borderRadius:'50%', background:'rgba(255,255,255,0.08)' }}/>
        <div style={{ position:'absolute', bottom:-55, left:-18, width:140, height:140, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>

       
        <div style={{
          width:82, height:82, borderRadius:'50%',
          background:'rgba(255,255,255,0.24)', backdropFilter:'blur(8px)',
          display:'flex', alignItems:'center', justifyContent:'center',
          margin:'0 auto 13px',
          border:'3px solid rgba(255,255,255,0.4)',
          boxShadow:'0 4px 18px rgba(0,0,0,0.18)',
          fontSize:'2.4rem', position:'relative', zIndex:1,
        }}>
          👩
        </div>
        <h2 style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'1.65rem', color:'white', fontWeight:700,
          marginBottom:3, position:'relative', zIndex:1,
        }}>
          {name}
        </h2>
        <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'0.8rem', position:'relative', zIndex:1 }}>
          Chandanpur · SHEALTH Member 🌸
        </p>

        <button style={{
          marginTop:12, padding:'8px 22px',
          background:'rgba(255,255,255,0.18)', border:'1px solid rgba(255,255,255,0.36)',
          borderRadius:9999, color:'white', fontFamily:'Nunito,sans-serif',
          fontWeight:700, fontSize:'0.82rem', cursor:'pointer',
          position:'relative', zIndex:1,
        }}>
          ✏️ Edit Profile
        </button>
      </div>

     
      <div style={{ padding:'0 20px', marginTop:-18, position:'relative', zIndex:2 }}>
        <div style={{
          background:'rgba(255,255,255,0.96)',
          borderRadius:22, padding:'16px 18px',
          boxShadow:'0 4px 22px rgba(200,66,109,0.14)',
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          marginBottom:20,
        }}>
          {[
            { label:'Consultations', value:'12' },
            { label:'Tests Done',    value:'4'  },
            { label:'Health Score',  value:'87%'},
          ].map((s, i) => (
            <div key={i} style={{
              textAlign:'center',
              borderRight: i < 2 ? '1px solid rgba(200,66,109,0.10)' : 'none',
            }}>
              <div style={{ fontWeight:800, fontSize:'1.2rem', color:'#C8426D' }}>
                {s.value}
              </div>
              <div style={{ fontSize:'0.70rem', color:'#9A7A88', marginTop:2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        
        <p style={{ fontSize:'0.70rem', fontWeight:700, color:'#9A7A88', textTransform:'uppercase', letterSpacing:'1px', marginBottom:9 }}>
          My Health
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:18 }}>
          <MenuItem icon="📅" label="Menstrual Tracker"  sub="Last period: Mar 1"        onClick={() => navigate('/patient')} />
          <MenuItem icon="🧪" label="Lab Results"        sub="Last test: Oct 24"         onClick={() => navigate('/patient/results')} />
          <MenuItem icon="💊" label="Prescriptions"      sub="1 active prescription"     onClick={() => navigate('/patient')} />
          <MenuItem icon="📋" label="Medical History"    sub="View all records"          onClick={() => navigate('/patient')} />
        </div>

       
        <p style={{ fontSize:'0.70rem', fontWeight:700, color:'#9A7A88', textTransform:'uppercase', letterSpacing:'1px', marginBottom:9 }}>
          Support
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:18 }}>
          <MenuItem icon="🧠" label="Mental Wellness"    sub="Talk to a counsellor"      onClick={() => navigate('/patient/learn')} />
          <MenuItem icon="👩‍🤝‍👩" label="Community"       sub="Connect with women"        onClick={() => navigate('/patient/community')} />
          <MenuItem icon="📚" label="Health Library"     sub="Articles & tips"           onClick={() => navigate('/patient/learn')} />
          <MenuItem icon="🆘" label="Emergency Contact"  sub="Set emergency contact"     onClick={() => {}} />
        </div>

       
        <p style={{ fontSize:'0.70rem', fontWeight:700, color:'#9A7A88', textTransform:'uppercase', letterSpacing:'1px', marginBottom:9 }}>
          Settings
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:9, marginBottom:20 }}>
          <MenuItem
            icon="🔔" label="Notifications"
            sub={notifOn ? 'On' : 'Off'}
            onClick={() => { setNotifOn(n => !n); addNotification(notifOn ? 'Notifications off' : 'Notifications on 🔔'); }}
            right={<Toggle on={notifOn} />}
          />
          <MenuItem icon="🔒" label="Privacy & Security" sub="Manage your data"         onClick={() => {}} />
          <MenuItem icon="⭐" label="Rate the App"       sub="Help us improve"          onClick={() => addNotification('Thank you! 🌸')} />
        </div>

        <div style={{ textAlign:'center', marginBottom:16 }}>
          <div style={{
            fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontSize:'1.02rem',
            background:'linear-gradient(135deg,#C8426D,#9E2F52)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:3,
          }}>
            SHEALTH v1.0
          </div>
          <div style={{ fontSize:'0.70rem', color:'#B8A0A8' }}>
            Her location doesn't decide her lifespan 🌸
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

      <BottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
        role="patient"
      />
    </div>
  );
}