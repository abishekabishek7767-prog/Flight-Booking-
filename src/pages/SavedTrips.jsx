import React from 'react';
import { Heart, MapPin, Plane, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/animations/ScrollReveal';

const SavedTrips = () => {
  const savedItems = [
    { id: 1, name: 'Jaipur', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&q=80&w=800', price: '₹12,450', desc: 'The Pink City' },
    { id: 3, name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&q=80&w=800', price: '₹14,200', desc: 'Serene Backwaters' },
    { id: 5, name: 'Udaipur', image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?auto=format&fit=crop&q=80&w=800', price: '₹15,900', desc: 'Regal Lake Palaces' }
  ];

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="container">
        <ScrollReveal animation="reveal">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '10px' }}>
            Saved <span style={{ color: 'var(--color-accent)' }}>Trips</span>
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '50px' }}>Destinations you've bookmarked for later adventures.</p>
        </ScrollReveal>

        {savedItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
            {savedItems.map((item, i) => (
              <ScrollReveal key={item.id} animation="scale-up" delay={i * 150}>
                <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', height: '100%' }}>
                  <div style={{ position: 'relative', height: '200px' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(5, 11, 20, 0.7)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff4b4b', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                      <Heart size={20} fill="#ff4b4b" />
                    </button>
                    <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '20px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                       <span style={{ fontSize: '0.8rem', color: 'var(--color-accent)', fontWeight: 700, textTransform: 'uppercase' }}>Explore</span>
                    </div>
                  </div>
                  
                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{item.name}</h3>
                      <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>{item.price}</span>
                    </div>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '25px', lineHeight: 1.5 }}>{item.desc}</p>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <Link 
                        to={`/search?to=${encodeURIComponent(item.name)}`} 
                        className="btn btn-primary" 
                        style={{ flex: 1, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                      >
                        Book Now <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '80px', textAlign: 'center' }}>
            <Heart size={64} style={{ color: 'var(--glass-border)', marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '10px' }}>No saved trips yet</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px' }}>Start exploring destinations and tap the heart icon to save them here.</p>
            <Link to="/search" className="btn btn-primary" style={{ textDecoration: 'none' }}>Discover Destinations</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedTrips;
