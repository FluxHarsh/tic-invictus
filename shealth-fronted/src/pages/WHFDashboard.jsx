import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MOCK } from '../services/data';
import { BottomNav } from './PatientHome'; 


const TASK_CONFIG = {
  vitals:     { icon:'❤️',  label:'Record vitals',    color:'#FFE8E8', accent:'#D63030' },
  ai_session: { icon:'🤖',  label:'Assist AI session', color:'#EDE8F8', accent:'#8B72C8' },
  sample:     { icon:'🧪',  label:'Sample collection', color:'#E8F8F2', accent:'#4CAF85' },
  camp:       { icon:'📢',  label:'Health camp alert', color:'#FFF0E6', accent:'#E07B00' },
};


const STATUS_CONFIG = {
  urgent:  { label:'Urgent',  bg:'#FFE8E8', color:'#D63030' },
  pending: { label:'Pending', bg:'#EDE8F8', color:'#8B72C8' },
  new:     { label:'New',     bg:'#E8F8F2', color:'#4CAF85' },
};

export default function WHFDashboard() {
  const { user } = useApp();
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const name  = user?.name || 'Sunita';
  const tasks = MOCK.whf.tasks; 

  return (
    <div style={{
      minHeight:'100vh',
    
      background:'linear-gradient(160deg,#F0FFF8 0%,#F8F5FF 50%,#FFF8F0 100%)',
      paddingBottom:90, position:'relative', overflow:'hidden',
    }}>

     
      <div style={{
        position:'absolute', top:-60, right:-60, width:220, height:220,
        borderRadius:'50%',
        background:'radial-gradient(circle,rgba(168,230,207,0.5) 0%,transparent 70%)',
        filter:'blur(30px)', pointerEvents:'none',
      }}/>
      <div style={{
        position:'absolute', bottom:100, left:-60, width:200, height:200,
        borderRadius:'50%',
        background:'radial-gradient(circle,rgba(201,184,232,0.4) 0%,transparent 70%)',
        filter:'blur(25px)', pointerEvents:'none',
      }}/>

      
      <div style={{
        background:'rgba(255,255,255,0.87)', backdropFilter:'blur(16px)',
        padding:'52px 22px 18px',
        borderBottom:'1px solid rgba(76,175,133,0.12)',
        display:'flex', justifyContent:'space-between', alignItems:'flex-end',
      }}>
       
        <div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
       
            <div style={{
              width:34, height:34,
              background:'linear-gradient(135deg,#C8426D,#E8799A)',
              borderRadius:'50%',
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="white" strokeWidth="2.2" strokeLinecap="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0112 2a8 8 0 018 8.2c0 7.3-8 11.8-8 11.8z"/>
                <path d="M12 8v8M8 12h8"/>
              </svg>
            </div>
            <span style={{
              fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontSize:'1.1rem',
              background:'linear-gradient(135deg,#C8426D,#9E2F52)',
              WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent',
            }}>
              SHEALTH
            </span>
          </div>
          <h2 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'1.45rem', fontWeight:700, color:'#3D1F2E',
          }}>
            WHF Facilitator Dashboard
          </h2>
        </div>

        
        <div style={{ textAlign:'right' }}>
          <div style={{ color:'#9A7A88', fontSize:'0.78rem' }}>Good morning,</div>
          <div style={{ fontWeight:800, color:'#3D1F2E', fontSize:'0.96rem' }}>
            {name}! 🌸
          </div>
         
          <div style={{
            width:40, height:40, borderRadius:'50%',
            background:'linear-gradient(135deg,#A8E6CF,#4CAF85)',
            display:'flex', alignItems:'center', justifyContent:'center',
            marginLeft:'auto', marginTop:6,
            color:'white', fontWeight:800, fontSize:'1rem',
            boxShadow:'0 2px 10px rgba(76,175,133,0.4)',
          }}>
            {name[0]}
          </div>
        </div>
      </div>

      <div style={{ padding:'18px 20px 0', animation:'fadeUp 0.5s ease' }}>

        <div style={{
          background:'rgba(255,255,255,0.82)',
          borderRadius:22, padding:'14px 18px',
          display:'flex', alignItems:'center', gap:10, marginBottom:18,
          border:'1px solid rgba(76,175,133,0.2)',
          boxShadow:'0 2px 10px rgba(0,0,0,0.05)',
        }}>
          <span style={{ fontSize:'1.25rem' }}>🌟</span>
          <span style={{ fontWeight:600, color:'#3D1F2E', fontSize:'0.92rem' }}>
            You've helped{' '}
            <strong style={{ color:'#4CAF85' }}>3 patients</strong> today.
          </span>
        </div>

      
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          gap:10, marginBottom:22,
        }}>
          {[
            { label:'Vitals Recorded',   value:'5',    icon:'❤️', color:'#FFE8E8', accent:'#D63030' },
            { label:'Sessions Assisted', value:'2',    icon:'🎙️', color:'#EDE8F8', accent:'#8B72C8' },
            { label:'Earnings',          value:'₹340', icon:'💰', color:'#E8F8F2', accent:'#4CAF85' },
          ].map((s, i) => (
            <div key={i} style={{
              background: s.color, borderRadius:18, padding:'14px 10px',
              border:`1px solid ${s.accent}28`,
              animation:`fadeUp 0.5s ${i * 0.08}s ease both`,
            }}>
              <div style={{ fontSize:'1.35rem', marginBottom:5 }}>{s.icon}</div>
              <div style={{ fontWeight:800, fontSize:'1.25rem', color:s.accent, lineHeight:1 }}>
                {s.value}
              </div>
              <div style={{ fontSize:'0.68rem', color:'#9A7A88', marginTop:3, fontWeight:600 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

      
        <h3 style={{ fontWeight:700, color:'#3D1F2E', fontSize:'1rem', marginBottom:13 }}>
          Task List
        </h3>

       
        <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
          {tasks.map((task, i) => {
            const tc = TASK_CONFIG[task.type];  
            const sc = STATUS_CONFIG[task.status]; 
            return (
              <div
                key={task.id}
                style={{
                  background:'rgba(255,255,255,0.87)',
                  borderRadius:18, padding:'15px',
                  boxShadow:'0 2px 10px rgba(0,0,0,0.055)',
                  border:'1px solid rgba(255,255,255,0.92)',
                  backdropFilter:'blur(10px)',
                  animation:`fadeUp 0.5s ${i * 0.08}s ease both`,
                }}
              >
             
                <div style={{ display:'flex', alignItems:'center', gap:11, marginBottom:10 }}>
                 
                  <div style={{
                    width:42, height:42, borderRadius:13,
                    background:tc.color,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.25rem', flexShrink:0,
                  }}>
                    {tc.icon}
                  </div>

                
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{
                      fontWeight:700, fontSize:'0.87rem', color:'#3D1F2E',
                      whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                    }}>
                      {i + 1}. {tc.label} for {task.patient}
                    </div>
                  </div>

              
                  <div style={{ display:'flex', alignItems:'center', gap:7, flexShrink:0 }}>
                    <span style={{
                      background:sc.bg, color:sc.color,
                      padding:'3px 9px', borderRadius:9999,
                      fontSize:'0.70rem', fontWeight:800,
                    }}>
                      {sc.label}
                    </span>
                    <button
                      onClick={() => {
                       
                        if (task.type === 'vitals') navigate('/whf/vitals');
                        else if (task.type === 'ai_session') navigate('/whf/vitals');
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,66,109,0.14)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,66,109,0.07)'; }}
                      style={{
                        padding:'7px 13px', borderRadius:9999,
                        border:'1px solid rgba(200,66,109,0.3)',
                        background:'rgba(200,66,109,0.07)',
                        color:'#C8426D', fontFamily:'Nunito,sans-serif',
                        fontSize:'0.73rem', fontWeight:700, cursor:'pointer',
                        whiteSpace:'nowrap', transition:'all 0.18s ease',
                      }}
                    >
                      {task.type === 'vitals'     ? 'Start Task'   :
                       task.type === 'ai_session'  ? 'Join Session' :
                                                     'View Details'}
                    </button>
                  </div>
                </div>

              
                <div style={{
                  background:'rgba(200,66,109,0.10)',
                  borderRadius:9999, height:4,
                }}>
                  <div style={{
                    height:'100%', borderRadius:9999,
                    background:`linear-gradient(90deg,${tc.accent},${tc.accent}99)`,
                    width:`${task.progress}%`,
                    transition:'width 0.5s ease',
                  }}/>
                </div>
              </div>
            );
          })}
        </div>

      
        <div
          onClick={() => navigate('/whf/earnings')}
          style={{
            marginTop:16, padding:'16px 18px',
            background:'linear-gradient(135deg,#4CAF85,#2E8B6A)',
            borderRadius:20, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            boxShadow:'0 5px 20px rgba(76,175,133,0.4)',
            animation:'fadeUp 0.5s 0.3s ease both',
          }}
        >
          <div>
            <div style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.75rem', marginBottom:2 }}>
              This month's earnings
            </div>
            <div style={{ color:'white', fontWeight:800, fontSize:'1rem' }}>
              ₹1,610 earned so far →
            </div>
          </div>
          <span style={{ fontSize:'1.8rem' }}>💰</span>
        </div>
      </div>

     
      <BottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
        role="whf"
      />

      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0);    }
        }
      `}</style>
    </div>
  );
}
