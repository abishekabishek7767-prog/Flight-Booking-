import React, { useState, useEffect } from 'react';
import { Plane } from 'lucide-react';

const SideScrollPlane = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollDistance = Math.max(1, documentHeight - windowHeight);
      const percentage = (scrollTop / scrollDistance) * 100;
      setScrollPercent(Math.min(100, Math.max(0, percentage)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="side-scroll-container">
      {/* Path Trail (Progress) */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${scrollPercent}%`,
        background: 'var(--color-accent)',
        boxShadow: '0 0 10px var(--color-accent)',
        opacity: 0.5,
        transition: 'height 0.1s ease-out'
      }}></div>

      {/* The Scroll Plane */}
      <div style={{
        position: 'absolute',
        top: `${scrollPercent}%`,
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(180deg)',
        color: 'var(--color-accent)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'top 0.1s ease-out',
        filter: 'drop-shadow(0 0 10px var(--color-accent))'
      }}>
        <Plane size={24} fill="currentColor" />
        <div style={{ 
          fontSize: '0.6rem', 
          fontWeight: 800, 
          marginTop: '5px', 
          background: 'var(--color-accent)', 
          color: 'var(--color-bg-primary)', 
          padding: '2px 6px', 
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          transform: 'rotate(180deg)' // Counter-rotate text back to normal
        }}>
          {Math.round(scrollPercent)}%
        </div>
      </div>
    </div>
  );
};

export default SideScrollPlane;
