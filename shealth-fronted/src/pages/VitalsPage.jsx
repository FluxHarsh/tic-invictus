import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const iStyle = (accent) => ({
  width:'100%', padding:'10px 12px',
  border:`2px solid ${accent}30`,
  borderRadius:11,
  fontFamily:'Nunito,sans-serif',
  fontSize:'1rem', fontWeight:700, color:'#3D1F2E',
  background:'rgba(255,255,255,0.86)',
  outline:'none', marginBottom:4,
  transition:'border-color 0.18s ease',
});

export default function VitalsPage() {
  const navigate = useNavigate();

 
  const [vals, setVals] = useState({
    systolic:   '',
    diastolic:  '',
    sugar:      '',
    hemoglobin: '',
  });
  const [saved, setSaved] = useState(false); 
 
  const set = (key, value) =>
    setVals(prev => ({ ...prev, [key]: value }));

  
  const allFilled = Object.values(vals).every(v => v.trim() !== '');

 
  const handleSave = () => {
   
    console.log('Saving vitals:', vals);
    setSaved(true);
  };

  
  if (saved) {
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
            fontSize:'2rem', color:'#3D1F2E', marginBottom:9,
          }}>
            Vitals Saved!
          </h2>
          <p style={{ color:'#9A7A88', fontSize:'0.88rem', marginBottom:26 }}>
            Patient record updated successfully.
          </p>
          <button
            onClick={() => navigate('/whf')}
            style={{
              padding:'15px 40px', borderRadius:9999, border:'none',
              background:'linear-gradient(135deg,#4CAF85,#2E8B6A)',
              color:'white', fontFamily:'Nunito,sans-serif',
              fontWeight:800, fontSize:'0.95rem', cursor:'pointer',
              boxShadow:'0 4px 18px rgba(76,175,133,0.42)',
            }}
          >
            Back to Dashboard
          </button>
        </div>
        <style>{`
          @keyframes scaleIn { from{opacity:0;transform:scale(0.84)} to{opacity:1;transform:scale(1)} }
        `}</style>
      </div>
    );
  }

  
  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#FFF8F0,#F8FFFE)',
      paddingBottom:100,
    }}>

   
      <div style={{
        background:'rgba(255,255,255,0.93)', backdropFilter:'blur(14px)',
        padding:'52px 22px 17px',
        borderBottom:'1px solid rgba(76,175,133,0.14)',
        display:'flex', alignItems:'center', gap:13,
      }}>
        <button
          onClick={() => navigate('/whf')}
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
        <div style={{
          fontFamily:'Cormorant Garamond,serif',
          fontWeight:700, fontSize:'1.15rem', color:'#3D1F2E',
        }}>
          WHF Vitals Recording
        </div>
      </div>

      <div style={{ padding:'18px 20px 0' }}>

     
        <div style={{
          display:'flex', alignItems:'center', gap:13,
          background:'rgba(255,255,255,0.92)',
          borderRadius:22, padding:'15px',
          boxShadow:'0 2px 10px rgba(0,0,0,0.055)',
          marginBottom:18,
          border:'1px solid rgba(76,175,133,0.12)',
        }}>
         
          <div style={{
            width:54, height:54, borderRadius:'50%',
            background:'linear-gradient(135deg,#FFCBA4,#FF8A65)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:'1.55rem', boxShadow:'0 2px 10px rgba(255,138,101,0.36)',
          }}>
            🧕
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:800, fontSize:'1.02rem', color:'#3D1F2E' }}>
              Kamla Devi
            </div>
            <div style={{ color:'#9A7A88', fontSize:'0.82rem' }}>
              34 yrs · Chandanpur
            </div>
          </div>
     
          <button style={{
            width:36, height:36, borderRadius:'50%',
            background:'rgba(76,175,133,0.14)',
            border:'1px solid rgba(76,175,133,0.3)',
            display:'flex', alignItems:'center', justifyContent:'center',
            cursor:'pointer', fontSize:'1rem',
          }}>
            ➕
          </button>
        </div>

      
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          gap:11, marginBottom:18,
        }}>

     
          <div style={{
            borderRadius:20, padding:'14px',
            background:'#FFE8E8',
            border:'1px solid rgba(214,48,48,0.16)',
            animation:'fadeUp 0.4s ease',
          }}>
            <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#3D1F2E', marginBottom:11 }}>
              ❤️ Blood Pressure
            </div>

            <label style={{
              display:'block', fontSize:'0.68rem',
              fontWeight:700, color:'#9A7A88', marginBottom:3,
            }}>
              Systolic (mmHg)
            </label>
            <input
              value={vals.systolic}
              onChange={e => set('systolic', e.target.value)}
              placeholder="120"
              type="number"
              style={iStyle('#D63030')}
              onFocus={e  => { e.target.style.borderColor = '#D63030'; }}
              onBlur={e   => { e.target.style.borderColor = 'rgba(214,48,48,0.3)'; }}
            />
            <div style={{ fontSize:'0.62rem', color:'#D63030', marginBottom:9 }}>
              Normal: 90–120
            </div>

            <label style={{
              display:'block', fontSize:'0.68rem',
              fontWeight:700, color:'#9A7A88', marginBottom:3,
            }}>
              Diastolic (mmHg)
            </label>
            <input
              value={vals.diastolic}
              onChange={e => set('diastolic', e.target.value)}
              placeholder="80"
              type="number"
              style={iStyle('#D63030')}
              onFocus={e  => { e.target.style.borderColor = '#D63030'; }}
              onBlur={e   => { e.target.style.borderColor = 'rgba(214,48,48,0.3)'; }}
            />
            <div style={{ fontSize:'0.62rem', color:'#D63030' }}>
              Normal: 60–80
            </div>
          </div>

       
          <div style={{
            borderRadius:20, padding:'14px',
            background:'#FFF3E0',
            border:'1px solid rgba(224,123,0,0.16)',
            animation:'fadeUp 0.4s 0.06s ease both',
          }}>
            <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#3D1F2E', marginBottom:11 }}>
              🩸 Blood Sugar
            </div>
            <label style={{
              display:'block', fontSize:'0.68rem',
              fontWeight:700, color:'#9A7A88', marginBottom:3,
            }}>
              mg/dL
            </label>
            <input
              value={vals.sugar}
              onChange={e => set('sugar', e.target.value)}
              placeholder="110"
              type="number"
              style={iStyle('#E07B00')}
              onFocus={e  => { e.target.style.borderColor = '#E07B00'; }}
              onBlur={e   => { e.target.style.borderColor = 'rgba(224,123,0,0.3)'; }}
            />
            <div style={{ fontSize:'0.62rem', color:'#E07B00' }}>
              Normal: 70–140 mg/dL
            </div>
          </div>

         
          <div style={{
            borderRadius:20, padding:'14px',
            background:'#EDE8F8',
            border:'1px solid rgba(139,114,200,0.18)',
            animation:'fadeUp 0.4s 0.12s ease both',
          }}>
            <div style={{ fontWeight:800, fontSize:'0.82rem', color:'#3D1F2E', marginBottom:11 }}>
              🔬 Hemoglobin
            </div>
            <label style={{
              display:'block', fontSize:'0.68rem',
              fontWeight:700, color:'#9A7A88', marginBottom:3,
            }}>
              g/dL
            </label>
            <input
              value={vals.hemoglobin}
              onChange={e => set('hemoglobin', e.target.value)}
              placeholder="12.5"
              type="number"
              step="0.1"
              style={iStyle('#8B72C8')}
              onFocus={e  => { e.target.style.borderColor = '#8B72C8'; }}
              onBlur={e   => { e.target.style.borderColor = 'rgba(139,114,200,0.3)'; }}
            />
            <div style={{ fontSize:'0.62rem', color:'#8B72C8' }}>
              Normal: 12.0–16.0 g/dL
            </div>
          </div>
        </div>

      
        <button
          onClick={handleSave}
          disabled={!allFilled}
          onMouseDown={e  => allFilled && (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e    => { e.currentTarget.style.transform = 'scale(1)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          style={{
            width:'100%', padding:'16px', borderRadius:9999, border:'none',
            background: allFilled
              ? 'linear-gradient(135deg,#4CAF85,#2E8B6A)'
              : 'rgba(76,175,133,0.22)',
            color:  allFilled ? 'white' : '#9A7A88',
            fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.97rem',
            cursor: allFilled ? 'pointer' : 'not-allowed',
            boxShadow: allFilled ? '0 4px 18px rgba(76,175,133,0.42)' : 'none',
            transition:'all 0.22s ease',
            animation:'fadeUp 0.4s 0.2s ease both',
          }}
        >
          Save &amp; Continue
        </button>
      </div>

    
      <div style={{
        position:'fixed', bottom:0, left:'50%', transform:'translateX(-50%)',
        width:'100%', maxWidth:430, padding:'10px 0 22px',
        background:'rgba(255,255,255,0.96)', backdropFilter:'blur(16px)',
        borderTop:'1px solid rgba(76,175,133,0.12)',
        display:'flex', justifyContent:'space-around', zIndex:100,
      }}>
        {[
          ['🏠', 'Home',    '/whf'],
          ['💓', 'Vitals',  '/whf/vitals'],
          ['💰', 'Earnings','/whf/earnings'],
          ['👤', 'Profile', '/whf/profile'],
        ].map(([em, lbl, path]) => (
          <button
            key={lbl}
            onClick={() => navigate(path)}
            style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:3,
              padding:'8px 14px', borderRadius:13, border:'none',
           
              background: lbl === 'Vitals' ? 'rgba(76,175,133,0.12)' : 'transparent',
              color:       lbl === 'Vitals' ? '#4CAF85'               : '#9A7A88',
              cursor:'pointer', fontFamily:'Nunito,sans-serif',
              fontSize:'0.67rem', fontWeight:700,
            }}
          >
            <span style={{ fontSize:'1.1rem' }}>{em}</span>
            {lbl}
          </button>
        ))}
      </div>

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
