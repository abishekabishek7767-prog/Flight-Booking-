import React from 'react';

const BackgroundDriftPlanes = () => {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      
      {/* Plane 1: Top Slow Drift with Glow */}
      <div className="drift-plane" style={{ 
        position: 'absolute', top: '15%', left: '-10%', 
        width: '120px', height: '40px', 
        opacity: 0.1, 
        backgroundColor: 'var(--color-accent)',
        maskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
        maskSize: 'contain', 
        maskRepeat: 'no-repeat',
        WebkitMaskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        animation: 'drift-right 40s linear infinite, float-v 6s ease-in-out infinite',
        filter: 'drop-shadow(0 0 10px var(--color-accent))',
      }}>
        <div style={{ position: 'absolute', top: '50%', right: '100%', width: '150px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4))', filter: 'blur(2px)' }} />
      </div>

      {/* Plane 2: Middle Dynamic Drift */}
      <div className="drift-plane" style={{ 
        position: 'absolute', top: '45%', right: '-15%', 
        width: '200px', height: '70px', 
        opacity: 0.08, 
        backgroundColor: 'var(--color-accent)',
        maskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
        maskSize: 'contain', 
        maskRepeat: 'no-repeat',
        WebkitMaskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        animation: 'drift-left 30s linear infinite, float-v 8s ease-in-out infinite reverse',
        filter: 'drop-shadow(0 0 20px var(--color-accent))',
        transform: 'rotate(180deg)' 
      }}>
        <div style={{ position: 'absolute', top: '50%', right: '100%', width: '250px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3))', filter: 'blur(3px)' }} />
      </div>

      {/* Plane 3: Distance Drift */}
      <div className="drift-plane" style={{ 
        position: 'absolute', top: '75%', left: '-15%', 
        width: '90px', height: '30px', 
        opacity: 0.12, 
        backgroundColor: 'var(--color-accent)',
        maskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
        maskSize: 'contain', 
        maskRepeat: 'no-repeat',
        WebkitMaskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
        WebkitMaskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        animation: 'drift-right 55s linear infinite, float-v 10s ease-in-out infinite',
        filter: 'drop-shadow(0 0 5px var(--color-accent))',
      }}>
        <div style={{ position: 'absolute', top: '50%', right: '100%', width: '100px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.2))' }} />
      </div>

      <style>{`
        @keyframes drift-right {
          from { left: -20%; }
          to { left: 120%; }
        }
        @keyframes drift-left {
          from { right: -20%; }
          to { right: 120%; }
        }
        @keyframes float-v {
          0%, 100% { transform: translateY(0) rotate(5deg); }
          50% { transform: translateY(-30px) rotate(8deg); }
        }
      `}</style>
    </div>
  );
};

export default BackgroundDriftPlanes;
