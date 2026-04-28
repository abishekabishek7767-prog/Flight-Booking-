import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DestinationSlider3D = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const handleBookNow = (destination) => {
    const from = encodeURIComponent("New Delhi (DEL)");
    const to = encodeURIComponent(destination);
    navigate(`/search?from=${from}&to=${to}`);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative', width: '100%', height: '550px', perspective: '1500px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      
      {/* Slider Container */}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transformStyle: 'preserve-3d' }}>
        
        {items.map((item, index) => {
          // Calculate relative position to active index
          let offset = index - activeIndex;
          if (offset > items.length / 2) offset -= items.length;
          if (offset < -items.length / 2) offset += items.length;

          const isActive = index === activeIndex;
          const absOffset = Math.abs(offset);
          
          // Only show items within range
          if (absOffset > 2) return null;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                position: 'absolute',
                width: '350px',
                height: '480px',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isActive ? 1 : 0.6 - (absOffset * 0.2),
                zIndex: 10 - absOffset,
                transform: `
                  translateX(${offset * 320}px)
                  translateZ(${-absOffset * 250}px)
                  rotateY(${offset * -15}deg)
                  scale(${1 - absOffset * 0.1})
                `,
                boxShadow: isActive ? '0 30px 60px rgba(0,0,0,0.5), 0 0 40px var(--color-accent)' : '0 15px 30px rgba(0,0,0,0.3)',
                border: isActive ? '2px solid var(--color-accent)' : '1px solid var(--glass-border)'
              }}
            >
              {/* Image with zoom effect on hover if active */}
              <div 
                style={{
                  position: 'absolute', inset: 0,
                  background: `url(${item.image}) center/cover no-repeat`,
                  transition: 'transform 0.6s ease'
                }}
                className="slider-image"
              />
              
              {/* Dark Overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 40%, transparent 100%)' }} />
              
              {/* Content */}
              <div style={{ position: 'absolute', bottom: '40px', left: '30px', right: '30px', transform: `translateY(${isActive ? '0' : '20px'})`, opacity: isActive ? 1 : 0, transition: 'all 0.5s ease 0.2s' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-accent)', marginBottom: '10px' }}>
                  <MapPin size={16} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Explore</span>
                </div>
                <h3 style={{ fontSize: '2.4rem', fontWeight: 700, marginBottom: '8px', lineHeight: 1.1 }}>{item.name}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem', color: 'var(--color-accent)', fontWeight: 600 }}>Luxury from {item.price}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleBookNow(item.name); }} 
                    className="btn btn-primary" 
                    style={{ padding: '8px 16px', fontSize: '0.9rem' }}
                  >Book Now</button>
                </div>
              </div>

              {/* Inactive overlay tint */}
              {!isActive && (
                <div style={{ 
                  position: 'absolute', inset: 0, 
                  backgroundColor: 'rgba(0,0,0,0.4)', 
                  transition: 'opacity 0.6s ease' 
                }} />
              )}
            </div>
          );
        })}
      </div>


      {/* Navigation Buttons */}
      <div style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '20px', zIndex: 100 }}>
        <button 
          onClick={prevSlide}
          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition-fast)' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition-fast)' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-accent)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--glass-border)'}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div style={{ position: 'absolute', top: '20px', right: '40px', display: 'flex', gap: '10px' }}>
         {items.map((_, i) => (
           <div 
            key={i} 
            style={{ 
              width: i === activeIndex ? '30px' : '8px', 
              height: '4px', 
              background: i === activeIndex ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)',
              borderRadius: '2px',
              transition: 'all 0.4s ease'
            }} 
           />
         ))}
      </div>
    </div>
  );
};

export default DestinationSlider3D;
