import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User as UserIcon, Mail, Phone, CreditCard, ShieldCheck, Ticket } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useAuth } from '../context/AuthContext';

const PassengerDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from') || 'New Delhi (DEL)';
  const to = queryParams.get('to') || 'Mumbai (BOM)';
  const selectedSeats = queryParams.get('seats') || queryParams.get('seat') || 'N/A';
  const price = queryParams.get('price') || '25900';
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [user, loading, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/confirmation?seat=${selectedSeats}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&price=${price}`);
  };

  const inputGroupStyle = {
    marginBottom: '25px',
    flex: '1 1 300px'
  };

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: 'var(--color-text-muted)',
    marginBottom: '10px',
    fontWeight: 600
  };

  const inputStyle = {
    width: '100%',
    padding: '15px 20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '1rem',
    outline: 'none',
    transition: 'var(--transition-fast)'
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg-primary)', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <div style={{ marginBottom: '50px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>Passenger Details</h2>
          <p style={{ color: 'var(--color-text-muted)' }}>Provide accurate details as they appear on your travel documents.</p>
        </div>

        <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Main Form */}
          <form onSubmit={handleSubmit} style={{ flex: '1 1 600px' }}>
            <ScrollReveal animation="reveal">
              <div className="glass-panel" style={{ padding: '40px', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><UserIcon size={20} color="var(--color-accent)" /> Primary Traveler Information</h3>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Full Name (As on ID)</label>
                    <input style={inputStyle} type="text" defaultValue={user?.name || ''} placeholder="Johnathan Doe" required onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}>Aadhar Card / Passport Number</label>
                    <input style={inputStyle} type="text" placeholder="XXXX-XXXX-XXXX" required onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}><Mail size={14} /> Email Address</label>
                    <input style={inputStyle} type="email" defaultValue={user?.email || ''} placeholder="john@aeroluxe.com" required onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
                  </div>
                  <div style={inputGroupStyle}>
                    <label style={labelStyle}><Phone size={14} /> Mobile Number</label>
                    <input style={inputStyle} type="tel" placeholder="+91 99999 00000" required onFocus={(e) => e.target.style.borderColor = 'var(--color-accent)'} onBlur={(e) => e.target.style.borderColor = 'var(--glass-border)'} />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal" delay={100}>
              <div className="glass-panel" style={{ padding: '40px', marginBottom: '40px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldCheck size={20} color="var(--color-accent)" /> Secure Checkout</h3>
                
                <div style={{ borderRadius: '15px', border: '1px solid var(--glass-border)', padding: '25px', display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '25px', background: 'rgba(255,255,255,0.02)' }}>
                  <CreditCard size={30} color="var(--color-accent)" />
                  <div>
                    <div style={{ fontWeight: 600 }}>Elite Payment Protection</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Encrypted by bank-grade security protocols.</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '30px', fontStyle: 'italic' }}>
                  By clicking "Pay & Finalize Booking," you agree to AeroLuxe's premium travel policy and terms of service.
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '18px', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700 }}>
                  Pay & Finalize Booking
                </button>
              </div>
            </ScrollReveal>
          </form>

          {/* Booking Summary Card */}
          <div style={{ flex: '1 1 300px', position: 'sticky', top: '120px' }}>
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}><Ticket size={20} color="var(--color-accent)" /> Trip Summary</h3>
              
              <div style={{ borderBottom: '1px solid var(--glass-border)', paddingBottom: '20px', marginBottom: '20px' }}>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{from} → {to}</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '8px' }}>Air India Maharaja • Royale</div>
              </div>

              <div style={{ display: 'grid', gap: '15px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Class</span>
                  <span>First Class Royale</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-muted)' }}>Seat Selection</span>
                  <span style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{selectedSeats}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--glass-border)', marginTop: '10px', paddingTop: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600 }}>Total Fare</span>
                    <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>₹{parseInt(price).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
