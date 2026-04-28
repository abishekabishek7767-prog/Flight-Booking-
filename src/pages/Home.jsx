import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/animations/ScrollReveal';
import FlightSearchWidget from '../components/features/FlightSearchWidget';
import DestinationSlider3D from '../components/animations/DestinationSlider3D';
import TiltContainer from '../components/animations/TiltContainer';
import { Star, ShieldCheck, Clock, MapPin, Plane } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const destinations = [
  { id: 1, name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800', price: '₹12,450', desc: 'The Pink City' },
  { id: 2, name: 'Chennai', image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=800', price: '₹10,200', desc: 'Gateway to the South' },
  { id: 3, name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', price: '₹14,200', desc: 'Serene Backwaters' },
  { id: 4, name: 'Goa', image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&q=80&w=800', price: '₹9,800', desc: 'Golden Beaches' },
  { id: 5, name: 'Udaipur', image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&q=80&w=800', price: '₹15,900', desc: 'Regal Lake Palaces' },
  { id: 6, name: 'Mumbai', image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800', price: '₹8,800', desc: 'Gateway of India' },
  { id: 7, name: 'Srinagar', image: 'https://images.unsplash.com/photo-1510253687831-0f982d7862fc?auto=format&fit=crop&q=80&w=800', price: '₹18,100', desc: 'Paradise on Earth' }
];

const Home = () => {
  const planeRef = useRef(null);
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const { currentTheme } = useTheme();

  const [serviceImageIndex, setServiceImageIndex] = useState(0);
  const serviceImages = [
    "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1200"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setServiceImageIndex(prev => (prev + 1) % serviceImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (planeRef.current) {
        const scrolled = window.scrollY;
        const moveX = -(scrolled * 2.8);
        const moveY = -(scrolled * 1.5);
        const scale = 1 + (scrolled * 0.0005);
        const rotate = 10 + (scrolled * 0.015);
        planeRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale}) rotate(${rotate}deg)`;
      }

      const clouds = document.getElementById('cloud-layer');
      if (clouds) {
        clouds.style.transform = `translateX(${window.scrollY * 0.3}px)`;
      }

      if (bgRef.current) {
        const scrolled = window.scrollY;
        const zoomScale = Math.max(1, 1.1 - (scrolled * 0.0003));
        bgRef.current.style.transform = `scale(${zoomScale})`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100%', position: 'relative', overflowX: 'hidden' }}>
      <div 
        id="cloud-layer"
        style={{
          position: 'fixed',
          top: '20%',
          left: '-20%',
          width: '140%',
          height: '60%',
          backgroundImage: 'url(https://www.transparenttextures.com/patterns/clouds-2.png)',
          opacity: 0.1,
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(4px)',
          transition: 'transform 0.1s linear'
        }}
      />

      <div 
        ref={planeRef}
        style={{
          position: 'fixed',
          top: '90%',
          right: '-600px',
          opacity: 0.8,
          zIndex: 1,
          pointerEvents: 'none',
          willChange: 'transform',
          transition: 'transform 0.1s linear'
        }}
      >
        <div 
          style={{ 
            width: '800px',
            height: '300px',
            backgroundColor: 'var(--color-accent)',
            maskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            filter: 'drop-shadow(0 0 40px var(--color-accent))',
            transition: 'var(--transition-smooth)'
          }} 
        />
      </div>
      
      <section 
        ref={heroRef}
        onMouseMove={(e) => {
          if (bgRef.current) {
            const { width, height } = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - width/2) / (width/2) * 25;
            const y = (e.clientY - height/2) / (height/2) * 25;
            bgRef.current.style.transform = `scale(1.1) translate(${-x}px, ${-y}px)`;
          }
        }}
        style={{ 
          position: 'relative', 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          paddingTop: '80px',
          overflow: 'hidden'
        }}
      >
        <div 
          ref={bgRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'var(--color-bg-primary)',
            backgroundImage: `url(${currentTheme.bgImage})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            transform: 'scale(1.1)',
            transition: 'transform 0.1s ease-out, background-image 0.8s ease-in-out',
            zIndex: 0
          }}
        />

        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: `linear-gradient(to bottom, color-mix(in srgb, var(--color-accent), transparent 98%) 0%, rgba(5,11,20,0.05) 40%, rgba(5,11,20,0.4) 100%)`, 
          zIndex: 1 
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <ScrollReveal animation="reveal" delay={100}>
            <div style={{ position: 'relative' }}>
               <div style={{
                  position: 'absolute',
                  top: '-50%',
                  left: '-10%',
                  width: '300px',
                  height: '300px',
                  background: 'color-mix(in srgb, var(--color-accent), transparent 90%)',
                  filter: 'blur(100px)',
                  zIndex: -1,
                  borderRadius: '50%'
               }}></div>
               <h1 className="text-gradient" style={{ fontSize: '5rem', fontWeight: 900, lineHeight: 1.0, marginBottom: '20px', letterSpacing: '-4px' }}>
                 REDEFINING <br />
                 TRUE <span style={{ fontStyle: 'italic', color: 'white' }}>LUXURY</span>
               </h1>
            </div>
          </ScrollReveal>
          
          <ScrollReveal animation="reveal" delay={300}>
            <p style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '50px', color: 'var(--color-text-muted)', lineHeight: 1.6, letterSpacing: '0.5px' }}>
              Discover the pinnacle of elite aviation. Where every mile is a masterpiece and your comfort is our only standard.
            </p>
          </ScrollReveal>

          <ScrollReveal animation="scale-up" delay={500}>
            <div style={{ position: 'relative' }}>
               <div style={{ 
                  position: 'absolute', 
                  inset: '-20px', 
                  background: 'linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.1), transparent)', 
                  filter: 'blur(30px)', 
                  zIndex: -1 
               }}></div>
               <FlightSearchWidget />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section id="destinations" style={{ padding: '120px 0', background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <ScrollReveal animation="reveal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px' }}>
              <div>
                <h4 style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '10px' }}>Curated Experiences</h4>
                <h2 style={{ fontSize: '3rem', fontWeight: 700 }}>Featured Destinations</h2>
              </div>
              <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                 <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', maxWidth: '300px' }}>Our hand-picked selection of the world's most elite travel experiences.</p>
                 <Link to="/search" className="btn btn-outline" style={{ textDecoration: 'none' }}>Explore All</Link>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="scale-up" delay={200}>
            <DestinationSlider3D items={destinations} />
          </ScrollReveal>
        </div>
      </section>

      <section id="experience" style={{ padding: '120px 0', background: 'var(--color-bg-secondary)' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 450px' }}>
            <ScrollReveal animation="reveal">
              <h4 style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '10px' }}>Why Choose Us</h4>
              <h2 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '40px' }}>Excellence in <br />Every Mile</h2>
            </ScrollReveal>

            <div style={{ display: 'grid', gap: '30px' }}>
              {[
                { icon: <Star />, title: '5-Star Comfort', desc: 'Experience award-winning luxury that redefines travel.' },
                { icon: <ShieldCheck />, title: 'Elite Security', desc: 'Your safety and privacy are our absolute priorities.' },
                { icon: <Clock />, title: 'Seamless Booking', desc: 'Effortless reservations in seconds, around the clock.' }
              ].map((item, i) => (
                <ScrollReveal key={i} animation="reveal" delay={i * 200}>
                  <TiltContainer amount={10} shine={true}>
                    <div className="glass-panel" style={{ padding: '25px', display: 'flex', gap: '25px', alignItems: 'center' }}>
                      <div className="float-animation" style={{ color: 'var(--color-accent)', background: 'color-mix(in srgb, var(--color-accent), transparent 90%)', width: '60px', height: '60px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {item.icon}
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '5px' }}>{item.title}</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>{item.desc}</p>
                      </div>
                    </div>
                  </TiltContainer>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div style={{ flex: '1 1 400px' }}>
            <ScrollReveal animation="reveal">
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', position: 'relative', aspectRatio: '16/10' }}>
                {serviceImages.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`Service ${idx}`} 
                    style={{ 
                      position: idx === 0 ? 'relative' : 'absolute',
                      top: 0, left: 0,
                      width: '100%', height: '100%', objectFit: 'cover',
                      display: 'block',
                      opacity: serviceImageIndex === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out',
                      zIndex: serviceImageIndex === idx ? 1 : 0
                    }} 
                  />
                ))}
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Home;
