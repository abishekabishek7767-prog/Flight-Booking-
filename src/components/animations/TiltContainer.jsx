import React, { useState, useRef } from 'react';

const TiltContainer = ({ children, amount = 20, shine = true }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [shineX, setShineX] = useState(50);
  const [shineY, setShineY] = useState(50);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rX = ((y - centerY) / centerY) * -amount;
    const rY = ((x - centerX) / centerX) * amount;
    
    setRotateX(rX);
    setRotateY(rY);
    setShineX((x / rect.width) * 100);
    setShineY((y / rect.height) * 100);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '2000px',
        transformStyle: 'preserve-3d',
        width: '100%'
      }}
    >
      <div 
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: 'transform 0.1s ease-out',
          transformStyle: 'preserve-3d',
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      >
        {children}
        
        {/* Dynamic Light Shine Overlay */}
        {shine && (
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.15) 0%, transparent 80%)`,
            zIndex: 20
          }} />
        )}
      </div>
    </div>
  );
};

export default TiltContainer;
