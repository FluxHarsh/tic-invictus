import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HISTORY = [
  { date:'Today',     tasks:['Vitals – Priya Sharma', 'AI session – Anjali Patel', 'Sample – Sangeeta Devi'], earned:340 },
  { date:'Yesterday', tasks:['Vitals – Kamla Devi', 'Video assist – Rekha Kumari'],                           earned:220 },
  { date:'Mar 29',    tasks:['Vitals – 3 patients', 'Sample collection – morning slot'],                      earned:480 },
  { date:'Mar 28',    tasks:['Vitals – 2 patients', 'Health camp – village drive'],                           earned:310 },
  { date:'Mar 27',    tasks:['AI session × 2', 'Sample – evening slot'],                                      earned:260 },
];


const RATE_CARD = [
  { task:'Vital recording (per patient)', rate:'₹40'  },
  { task:'AI session assistance',         rate:'₹80'  },
  { task:'Sample collection slot',        rate:'₹60'  },
  { task:'Health camp attendance',        rate:'₹150' },
  { task:'Medicine delivery assist',      rate:'₹50'  },
];

const GOAL = 12000; 
export default function EarningsPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('history'); 

  
  const total = HISTORY.reduce((sum, h) => sum + h.earned, 0);

 
  const pct = Math.min((total / GOAL) * 100, 100);

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#F0FFF8,#F8F5FF,#FFF8F0)',
      paddingBottom:100,
    }}>

     
      <div style={{
        background:'linear-gradient(135deg,#4CAF85,#2E8B6A)',
        padding:'56px 22px 26px',
        position:'relative', overflow:'hidden',
      }}>
      
        <div style={{
          position:'absolute', top:-30, right:-30,
          width:150, height:150, borderRadius:'50%',
          background:'rgba(255,255,255,0.08)',
        }}/>

    
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
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12,19 5,12 12,5"/>
          </svg>
        </button>

      
        <div style={{ textAlign:'center' }}>
          <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'0.83rem', marginBottom:5 }}>
            This month's earnings
          </p>
          <h1 style={{
            fontFamily:'Cormorant Garamond,serif',
            fontSize:'3rem', fontWeight:700, color:'white', marginBottom:5,
          }}>
          
            ₹{total.toLocaleString()}
          </h1>
          <p style={{ color:'rgba(255,255,255,0.68)', fontSize:'0.78rem' }}>
            Goal: ₹{GOAL.toLocaleString()}/month
          </p>
        </div>

     
        <div style={{
          margin:'16px 0 0',
          background:'rgba(255,255,255,0.22)',
          borderRadius:9999, height:8,
        }}>
          <div style={{
            height:'100%', borderRadius:9999,
            background:'white',
            width:`${pct}%`,
            transition:'width 0.8s ease',
          }}/>
        </div>
        <p style={{
          color:'rgba(255,255,255,0.68)', fontSize:'0.70rem',
          marginTop:5, textAlign:'right',
        }}>
          {Math.round(pct)}% of monthly goal
        </p>
      </div>

    
      <div style={{
        padding:'14px 20px 0',
        display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
        gap:10, marginBottom:16,
      }}>
        {[
          ['📅', 'Tasks',    '23'    ],
          ['💰', 'Per day',  '~₹282' ],
          ['🏅', 'Rank',     'Top 12%'],
        ].map(([icon, lbl, val]) => (
          <div key={lbl} style={{
            background:'rgba(255,255,255,0.9)',
            borderRadius:18, padding:'13px 10px',
            textAlign:'center',
            boxShadow:'0 2px 9px rgba(0,0,0,0.055)',
          }}>
            <div style={{ fontSize:'1.2rem', marginBottom:3 }}>{icon}</div>
            <div style={{ fontWeight:800, fontSize:'1.02rem', color:'#3D1F2E' }}>{val}</div>
            <div style={{ fontSize:'0.68rem', color:'#9A7A88' }}>{lbl}</div>
          </div>
        ))}
      </div>

   
      <div style={{ padding:'0 20px', marginBottom:14 }}>
        <div style={{
          display:'flex',
          background:'rgba(255,255,255,0.72)',
          borderRadius:9999, overflow:'hidden',
          border:'1px solid rgba(76,175,133,0.2)',
        }}>
          {['history', 'rates'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex:1, padding:'11px',
                border:'none', borderRadius:9999,
                background: tab === t
                  ? 'linear-gradient(135deg,#4CAF85,#2E8B6A)'
                  : 'transparent',
                color:  tab === t ? 'white' : '#9A7A88',
                fontFamily:'Nunito,sans-serif',
                fontWeight:700, fontSize:'0.84rem',
                cursor:'pointer', transition:'all 0.22s ease',
              }}
            >
              {t === 'history' ? '📜 History' : '💳 Rate Card'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding:'0 20px' }}>

    
        {tab === 'history' && (
          <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
            {HISTORY.map((h, i) => (
              <div key={i} style={{
                background:'rgba(255,255,255,0.92)',
                borderRadius:20, padding:'16px',
                boxShadow:'0 2px 10px rgba(0,0,0,0.055)',
                border:'1px solid rgba(76,175,133,0.10)',
              }}>
           
                <div style={{
                  display:'flex', justifyContent:'space-between', marginBottom:9,
                }}>
                  <span style={{ fontWeight:700, color:'#3D1F2E', fontSize:'0.88rem' }}>
                    {h.date}
                  </span>
                  <span style={{ fontWeight:800, color:'#4CAF85', fontSize:'1.02rem' }}>
                    +₹{h.earned}
                  </span>
                </div>
            
                {h.tasks.map((t, j) => (
                  <div key={j} style={{
                    display:'flex', alignItems:'center',
                    gap:8, marginBottom:4,
                  }}>
                    <div style={{
                      width:6, height:6, borderRadius:'50%',
                      background:'#4CAF85', flexShrink:0,
                    }}/>
                    <span style={{ fontSize:'0.78rem', color:'#6B5060' }}>{t}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

     
        {tab === 'rates' && (
          <div style={{
            background:'rgba(255,255,255,0.92)',
            borderRadius:20, overflow:'hidden',
            boxShadow:'0 2px 10px rgba(0,0,0,0.055)',
            border:'1px solid rgba(76,175,133,0.10)',
          }}>
            {RATE_CARD.map((r, i) => (
              <div key={i} style={{
                display:'flex', alignItems:'center',
                justifyContent:'space-between',
                padding:'15px 17px',
           
                borderBottom: i < RATE_CARD.length - 1
                  ? '1px solid rgba(76,175,133,0.08)'
                  : 'none',
              }}>
                <span style={{ fontSize:'0.86rem', color:'#4A3040' }}>{r.task}</span>
                <span style={{ fontWeight:800, color:'#4CAF85', fontSize:'0.98rem' }}>
                  {r.rate}
                </span>
              </div>
            ))}
          
            <div style={{
              padding:'14px 17px',
              background:'rgba(76,175,133,0.08)',
              borderTop:'2px solid rgba(76,175,133,0.14)',
            }}>
              <p style={{ fontSize:'0.76rem', color:'#4CAF85', fontWeight:600, margin:0 }}>
                💡 Earn ₹10,000–₹12,000/month by completing 25–30 tasks
              </p>
            </div>
          </div>
        )}

     
        <button
          style={{
            width:'100%', padding:'16px', borderRadius:9999, border:'none',
            background:'linear-gradient(135deg,#4CAF85,#2E8B6A)',
            color:'white', fontFamily:'Nunito,sans-serif',
            fontWeight:800, fontSize:'0.96rem', cursor:'pointer',
            boxShadow:'0 4px 18px rgba(76,175,133,0.42)',
            marginTop:18, transition:'all 0.22s ease',
          }}
          onMouseDown={e  => { e.currentTarget.style.transform = 'scale(0.97)'; }}
          onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)';    }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    }}
        >
          💳 Request Withdrawal — ₹{total.toLocaleString()}
        </button>
        <p style={{
          textAlign:'center', color:'#9A7A88',
          fontSize:'0.73rem', marginTop:9,
        }}>
          Payments processed every Friday via UPI / Bank Transfer
        </p>
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
          ['💰', 'Earnings', null            ], 
          ['👤', 'Profile',  '/whf/profile' ],
        ].map(([em, lbl, path]) => (
          <button
            key={lbl}
            onClick={() => path && navigate(path)}
            style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'8px 14px', borderRadius:13, border:'none',
              background: lbl === 'Earnings' ? 'rgba(76,175,133,0.12)' : 'transparent',
              color:       lbl === 'Earnings' ? '#4CAF85'               : '#9A7A88',
              cursor: path ? 'pointer' : 'default',
              fontFamily:'Nunito,sans-serif', fontSize:'0.67rem', fontWeight:700,
            }}
          > 
            <span style={{ fontSize:'1.1rem' }}>{em}</span>
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}
