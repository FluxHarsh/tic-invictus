import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from './PatientHome';


const POSTS = [
  {
    id:1, name:'Rekha D.', village:'Rampur', time:'2h ago', avatar:'🧕',
    topic:'Pregnancy',
    text:'After my second trimester scan, the doctor used SHEALTH to share my report instantly. No more waiting days for results! 🙏',
    likes:14, comments:3, liked:false,
  },
  {
    id:2, name:'Sunita M.', village:'Bholapur', time:'5h ago', avatar:'👩',
    topic:'Anemia',
    text:'My hemoglobin was 8.2 last month. WHF didi helped me understand the report. Started iron supplements, feeling so much better now.',
    likes:22, comments:6, liked:true,
  },
  {
    id:3, name:'Kavita J.', village:'Sundarpur', time:'1d ago', avatar:'🧑‍🦱',
    topic:'Mental Health',
    text:"I was scared to talk about my postpartum depression. SHEALTH's mental wellness section gave me the courage to speak. Thank you all 💗",
    likes:41, comments:11, liked:false,
  },
  {
    id:4, name:'Meena P.', village:'Chandanpur', time:'2d ago', avatar:'👩‍🦳',
    topic:'Diabetes',
    text:'BP and sugar tracking through the WHF didi every week is changing my life. Never knew my numbers were this bad. Early detection saved me.',
    likes:18, comments:4, liked:false,
  },
];


const TOPICS = ['All', 'Pregnancy', 'Anemia', 'Mental Health', 'Diabetes'];


const TOPIC_COLOR = {
  Pregnancy:     { bg:'#F7D5E0', color:'#C8426D' },
  Anemia:        { bg:'#FFE8E8', color:'#D63030' },
  'Mental Health':{ bg:'#EDE8F8', color:'#8B72C8' },
  Diabetes:      { bg:'#FFF0D4', color:'#F0A000' },
};

export default function CommunityPage() {
  const navigate   = useNavigate();
  const [activeTab,  setActiveTab]  = useState('community');
  const [filter,     setFilter]     = useState('All');
  const [posts,      setPosts]      = useState(POSTS);
  const [newPost,    setNewPost]    = useState('');
  const [showInput,  setShowInput]  = useState(false);

  
  const toggleLike = (id) => {
    setPosts(ps => ps.map(p =>
      p.id === id
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

 
  const visible = filter === 'All' ? posts : posts.filter(p => p.topic === filter);

 
  const handlePost = () => {
    if (!newPost.trim()) return;
    const fresh = {
      id: Date.now(), name:'Priya S.', village:'Chandanpur',
      time:'Just now', avatar:'👩', topic:'All',
      text: newPost, likes:0, comments:0, liked:false,
    };
    setPosts(ps => [fresh, ...ps]);
    setNewPost('');
    setShowInput(false);
  };

  return (
    <div style={{
      minHeight:'100vh',
      background:'linear-gradient(160deg,#FEF0F5,#F5EEFF,#FFF5EC)',
      paddingBottom:100,
    }}>

     
      <div style={{
        background:'rgba(255,255,255,0.92)', backdropFilter:'blur(16px)',
        padding:'52px 22px 16px',
        borderBottom:'1px solid rgba(200,66,109,0.08)',
      }}>
        <h2 style={{
          fontFamily:'Cormorant Garamond,serif',
          fontSize:'1.75rem', fontWeight:700, color:'#3D1F2E', marginBottom:3,
        }}>
          Community 👩‍🤝‍👩
        </h2>
        <p style={{ color:'#9A7A88', fontSize:'0.83rem' }}>
          Real stories from women across rural India
        </p>
      </div>

      <div style={{ padding:'16px 20px 0' }}>

        
        <div style={{
          display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginBottom:16,
          scrollbarWidth:'none',
        }}>
          {TOPICS.map(t => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              style={{
                flexShrink:0, padding:'8px 16px', borderRadius:9999,
                border:'none',
                background: filter === t
                  ? 'linear-gradient(135deg,#C8426D,#9E2F52)'
                  : 'rgba(255,255,255,0.85)',
                color:  filter === t ? 'white' : '#9A7A88',
                fontFamily:'Nunito,sans-serif', fontWeight:700,
                fontSize:'0.82rem', cursor:'pointer',
                transition:'all 0.2s ease',
                boxShadow: filter === t
                  ? '0 3px 12px rgba(200,66,109,0.38)'
                  : '0 1px 5px rgba(0,0,0,0.06)',
              }}
            >
              {t}
            </button>
          ))}
        </div>

    
        <div style={{ marginBottom:16 }}>
          {!showInput ? (
            <button
              onClick={() => setShowInput(true)}
              style={{
                width:'100%', padding:'14px 18px',
                background:'rgba(255,255,255,0.87)',
                border:'2px dashed rgba(200,66,109,0.28)',
                borderRadius:18, cursor:'pointer',
                display:'flex', alignItems:'center', gap:12,
                fontFamily:'Nunito,sans-serif', color:'#9A7A88',
                fontSize:'0.88rem', fontWeight:600, textAlign:'left',
                transition:'all 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#C8426D'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(200,66,109,0.28)'; }}
            >
              <span style={{ fontSize:'1.5rem' }}>✍️</span>
              Share your health story with the community…
            </button>
          ) : (
            <div style={{
              background:'rgba(255,255,255,0.92)', borderRadius:18, padding:'14px',
              border:'2px solid rgba(200,66,109,0.28)',
              boxShadow:'0 2px 10px rgba(0,0,0,0.06)',
              animation:'scaleIn 0.3s ease',
            }}>
              <textarea
                value={newPost}
                onChange={e => setNewPost(e.target.value)}
                placeholder="Share your experience, tip or question…"
                rows={3}
                style={{
                  width:'100%', border:'none', outline:'none',
                  fontFamily:'Nunito,sans-serif', fontSize:'0.88rem',
                  color:'#4A3040', resize:'none', background:'transparent',
                  lineHeight:1.5, marginBottom:10,
                }}
              />
              <div style={{ display:'flex', gap:9, justifyContent:'flex-end' }}>
                <button
                  onClick={() => { setShowInput(false); setNewPost(''); }}
                  style={{
                    padding:'8px 18px', borderRadius:9999,
                    border:'2px solid rgba(200,66,109,0.25)', background:'transparent',
                    color:'#C8426D', fontFamily:'Nunito,sans-serif',
                    fontWeight:700, fontSize:'0.82rem', cursor:'pointer',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handlePost}
                  style={{
                    padding:'8px 18px', borderRadius:9999, border:'none',
                    background:'linear-gradient(135deg,#C8426D,#9E2F52)',
                    color:'white', fontFamily:'Nunito,sans-serif',
                    fontWeight:700, fontSize:'0.82rem', cursor:'pointer',
                    boxShadow:'0 3px 10px rgba(200,66,109,0.38)',
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          )}
        </div>

    
        <div style={{ display:'flex', flexDirection:'column', gap:13 }}>
          {visible.map((p, i) => {
            const tc = TOPIC_COLOR[p.topic];
            return (
              <div
                key={p.id}
                style={{
                  background:'rgba(255,255,255,0.9)',
                  borderRadius:20, padding:'16px',
                  boxShadow:'0 2px 11px rgba(0,0,0,0.06)',
                  border:'1px solid rgba(200,66,109,0.07)',
                  animation:`fadeUp 0.4s ${i * 0.06}s ease both`,
                }}
              >
          
                <div style={{
                  display:'flex', alignItems:'center',
                  gap:11, marginBottom:11,
                }}>
                  <div style={{
                    width:42, height:42, borderRadius:'50%',
                    background:'linear-gradient(135deg,#F7D5E0,#EDE8F8)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:'1.3rem', flexShrink:0,
                  }}>
                    {p.avatar}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{
                      fontWeight:700, fontSize:'0.88rem', color:'#3D1F2E',
                      whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',
                    }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize:'0.70rem', color:'#9A7A88' }}>
                      {p.village} · {p.time}
                    </div>
                  </div>
              
                  {tc && (
                    <span style={{
                      background:tc.bg, color:tc.color,
                      padding:'3px 10px', borderRadius:9999,
                      fontSize:'0.68rem', fontWeight:700, flexShrink:0,
                    }}>
                      {p.topic}
                    </span>
                  )}
                </div>

                <p style={{
                  color:'#4A3040', fontSize:'0.85rem',
                  lineHeight:1.55, margin:'0 0 13px 0',
                }}>
                  {p.text}
                </p>

               
                <div style={{
                  display:'flex', gap:18,
                  borderTop:'1px solid rgba(200,66,109,0.08)',
                  paddingTop:11,
                }}>
                  <button
                    onClick={() => toggleLike(p.id)}
                    style={{
                      display:'flex', alignItems:'center', gap:6,
                      background:'none', border:'none', cursor:'pointer',
                      fontFamily:'Nunito,sans-serif',
                      fontSize:'0.82rem', fontWeight:700,
                      color: p.liked ? '#C8426D' : '#9A7A88',
                      transition:'all 0.18s ease',
                    }}
                  >
                    {p.liked ? '❤️' : '🤍'} {p.likes}
                  </button>
                  <button
                    style={{
                      display:'flex', alignItems:'center', gap:6,
                      background:'none', border:'none', cursor:'pointer',
                      fontFamily:'Nunito,sans-serif',
                      fontSize:'0.82rem', fontWeight:700, color:'#9A7A88',
                    }}
                  >
                    💬 {p.comments}
                  </button>
                  <button
                    style={{
                      display:'flex', alignItems:'center', gap:6,
                      background:'none', border:'none', cursor:'pointer',
                      fontFamily:'Nunito,sans-serif',
                      fontSize:'0.82rem', fontWeight:700, color:'#9A7A88',
                      marginLeft:'auto',
                    }}
                  >
                    ↗️ Share
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav
        active={activeTab}
        onSelect={setActiveTab}
        navigate={navigate}
        role="patient"
      />

      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.95)}      to{opacity:1;transform:scale(1)}      }
      `}</style>
    </div>
  );
}
