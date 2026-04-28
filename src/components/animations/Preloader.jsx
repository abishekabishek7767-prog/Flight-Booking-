import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 800);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#050b14',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      visibility: fadeOut ? 'hidden' : 'visible',
      transition: 'opacity 0.8s ease-in-out, visibility 0.8s'
    }}>
      {/* Persistent Side-to-Side Flying Plane */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '-150px',
        width: '120px',
        opacity: 1,
        animation: 'fastFly 5s linear infinite',
        zIndex: 5
      }}>
        <svg viewBox="0 0 24 24" fill="var(--color-accent)" style={{ width: '100%', filter: 'drop-shadow(0 0 15px var(--color-accent))' }}>
          <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
        </svg>
      </div>

      <div style={{ position: 'relative', width: '400px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Central Floating Aircraft */}
        <div style={{
          width: '180px',
          animation: 'cruise 4s ease-in-out infinite',
          zIndex: 2,
          position: 'relative'
        }}>
           <svg viewBox="0 0 24 24" fill="var(--color-accent)" style={{ width: '100%', filter: 'drop-shadow(0 0 30px var(--color-accent))' }}>
             <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
           </svg>
        </div>
      </div>

      <div style={{ 
        marginTop: '60px', 
        textAlign: 'center',
        zIndex: 10
      }}>
        <h2 style={{ 
          fontSize: '3rem', 
          fontWeight: 900, 
          letterSpacing: '10px', 
          color: 'white',
          marginBottom: '15px',
          textShadow: '0 0 20px rgba(255,255,255,0.3)',
          animation: 'fadeInUp 1s ease-out forwards'
        }}>
          AERO<span style={{ color: 'var(--color-accent)' }}>LUXE</span>
        </h2>
        <div style={{ width: '300px', height: '4px', background: 'rgba(255,255,255,0.05)', margin: '0 auto', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ 
            position: 'absolute', 
            top: 0, left: 0, height: '100%', 
            background: 'linear-gradient(to right, var(--color-accent), #fff)',
            animation: 'loaderProgress 2.8s cubic-bezier(0.65, 0, 0.35, 1) forwards'
          }}></div>
        </div>
        <p style={{ 
          color: 'var(--color-accent)', 
          fontSize: '1rem', 
          fontWeight: 700,
          textTransform: 'uppercase', 
          letterSpacing: '5px',
          marginTop: '25px',
          animation: 'pulseText 2s infinite'
        }}>
          Preparing Royale Experience...
        </p>
      </div>

      <style>{`
        @keyframes cloudPass {
          from { left: -500px; opacity: 0; }
          20% { opacity: 0.8; }
          to { left: 1500px; opacity: 0; }
        }
        @keyframes fastFly {
          from { left: -200px; transform: scale(0.5) rotate(95deg); }
          to { left: 120%; transform: scale(1.5) rotate(85deg); }
        }
        @keyframes cruise {
          0%, 100% { transform: translateY(0) rotate(-92deg) scale(1.2); }
          50% { transform: translateY(-30px) rotate(-88deg) scale(1.3); }
        }
        @keyframes engineGlow {
          from { opacity: 0.5; transform: scale(1); box-shadow: 0 0 15px 5px white; }
          to { opacity: 1; transform: scale(1.3); box-shadow: 0 0 30px 10px white; }
        }
        @keyframes pulseText {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderProgress {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
