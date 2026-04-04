import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK } from '../services/data';
import { BottomNav } from './PatientHome';
import { useState } from 'react';


function MetricBar({ label, value, unit, min, max }) {

  const range   = max - min;
  const clamped = Math.min(Math.max(value, min), max);
  const pct     = ((clamped - min) / range) * 100;

  
  const isNormal = value >= min && value <= max;

  return (
    <div style={{ marginBottom: 20 }}>
   
      <div style={{
        display:'flex', justifyContent:'space-between',
        marginBottom: 7,
      }}>
        <span style={{ fontWeight:600, color:'#3D1F2E', fontSize:'0.92rem' }}>
          {label}
        </span>
        <span style={{
          fontWeight:800, fontSize:'0.92rem',
          color: isNormal ? '#4CAF85' : '#D63030',
        }}>
          {value}{' '}
          <span style={{ fontSize:'0.72rem', fontWeight:500, color:'#9A7A88' }}>
            {unit}
          </span>
        </span>
      </div>

  
      <div style={{ position:'relative', height:8, borderRadius:9999 }}>
       
        <div style={{
          position:'absolute', inset:0, borderRadius:9999,
          background:'linear-gradient(90deg,#FF8A8A 0%,#FFD280 28%,#5FD48A 50%,#FFD280 72%,#FF8A8A 100%)',
        }}/>
      
        <div style={{
          position:'absolute', top:'50%',
          left:`${pct}%`,
          transform:'translate(-50%,-50%)',
          width:18, height:18, borderRadius:'50%',
          background: isNormal ? '#4CAF85' : '#D63030',
          border:'3px solid white',
          boxShadow:`0 2px 8px ${isNormal ? 'rgba(76,175,133,0.5)' : 'rgba(214,48,48,0.5)'}`,
          transition:'left 0.6s ease',
        }}/>
      </div>

    
      <div style={{
        display:'flex', justifyContent:'space-between',
        marginTop:5,
      }}>
        <span style={{ fontSize:'0.68rem', color:'#9A7A88' }}>{min}</span>
        <span style={{ fontSize:'0.68rem', color:'#4CAF85', fontWeight:700 }}>Normal</span>
        <span style={{ fontSize:'0.68rem', color:'#9A7A88' }}>{max}</span>
      </div>
    </div>
  );
}

export default function LabResultsPage() {
  const navigate    = useNavigate();
  const [activeTab, setActiveTab] = useState('health');
  const lab         = MOCK.labResults;

  return (
    <div style={{
      minHeight:'100vh',
      background:'#F0EBFF',
      paddingBottom:90,
    }}>


      <div style={{
        background:'linear-gradient(160deg,#EDE8FF,#E0D8FF)',
        padding:'52px 22px 38px',
        textAlign:'center', position:'relative',
      }}>
 
        <button
          onClick={() => navigate('/patient')}
          style={{
            position:'absolute', top:52, left:20,
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

        <h1 style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'2.2rem', fontWeight:700, color:'#3D1F2E',
          animation:'fadeUp 0.5s ease',
        }}>
          Your Lab Results<br />Are Ready
        </h1>
      </div>

  
      <div style={{ padding:'22px 20px' }}>
        <div style={{
          background:'rgba(255,255,255,0.96)',
          borderRadius:26, padding:'22px',
          boxShadow:'0 4px 28px rgba(0,0,0,0.08)',
          animation:'fadeUp 0.5s 0.1s ease both',
        }}>

   
          <div style={{
            display:'flex', justifyContent:'space-between',
            alignItems:'center', marginBottom:18,
            paddingBottom:14,
            borderBottom:'1px solid rgba(200,66,109,0.08)',
          }}>
        
            <div style={{
              display:'inline-flex', alignItems:'center', gap:6,
              background:'#E8F8F2', borderRadius:9999, padding:'5px 13px',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                stroke="#4CAF85" strokeWidth="3">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              <span style={{ color:'#4CAF85', fontWeight:700, fontSize:'0.82rem' }}>
                Normal
              </span>
            </div>
            <span style={{ color:'#9A7A88', fontSize:'0.82rem' }}>{lab.date}</span>
          </div>

        
          <h3 style={{
            fontWeight:700, color:'#3D1F2E',
            fontSize:'1.02rem', marginBottom:22,
          }}>
            {lab.testName}
          </h3>

       
          <MetricBar
            label="Hemoglobin (Hb)"
            value={lab.hemoglobin.value}
            unit={lab.hemoglobin.unit}
            min={lab.hemoglobin.min}
            max={lab.hemoglobin.max}
          />
          <MetricBar
            label="Blood Sugar (Fasting)"
            value={lab.bloodSugar.value}
            unit={lab.bloodSugar.unit}
            min={lab.bloodSugar.min}
            max={lab.bloodSugar.max}
          />

      
          <div style={{
            fontWeight:600, color:'#3D1F2E',
            fontSize:'0.92rem', marginBottom:6,
          }}>
            Blood Pressure
          </div>
          <MetricBar
            label="Systolic"
            value={lab.systolic.value}
            unit={lab.systolic.unit}
            min={lab.systolic.min}
            max={lab.systolic.max}
          />
          <MetricBar
            label="Diastolic"
            value={lab.diastolic.value}
            unit={lab.diastolic.unit}
            min={lab.diastolic.min}
            max={lab.diastolic.max}
          />

     
          <div style={{ display:'flex', gap:12, marginTop:8 }}>
            <button
              onClick={() => navigate('/patient/video-call')}
              style={{
                flex:1, padding:'13px', borderRadius:9999, border:'none',
                background:'linear-gradient(135deg,#8B72C8,#C8426D)',
                color:'white', fontFamily:'Nunito,sans-serif',
                fontWeight:700, fontSize:'0.92rem', cursor:'pointer',
                boxShadow:'0 4px 14px rgba(139,114,200,0.42)',
              }}
            >
              Show Doctor
            </button>
            <button
              style={{
                flex:1, padding:'13px', borderRadius:9999,
                border:'2px solid rgba(200,66,109,0.28)', background:'transparent',
                color:'#C8426D', fontFamily:'Nunito,sans-serif',
                fontWeight:700, fontSize:'0.92rem', cursor:'pointer',
              }}
            >
              Download Report
            </button>
          </div>
        </div>

   
        <div style={{
          background:'rgba(255,255,255,0.72)',
          borderRadius:22, padding:'16px', marginTop:14,
          backdropFilter:'blur(10px)',
          border:'1px solid rgba(200,66,109,0.08)',
          animation:'fadeUp 0.5s 0.2s ease both',
        }}>
          <h3 style={{ fontWeight:700, color:'#3D1F2E', fontSize:'0.92rem', marginBottom:9 }}>
            💡 Health Tip
          </h3>
          <p style={{ color:'#9A7A88', fontSize:'0.83rem', lineHeight:1.6, margin:0 }}>
            Your hemoglobin levels are healthy! Continue eating iron-rich foods
            like spinach, lentils, and jaggery to maintain these levels.
          </p>
        </div>
      </div>

      <BottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
        role="patient"
      />

      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
