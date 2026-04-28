import React, { useState } from 'react';
import { Plane, ArrowRight, Globe, Send, Camera, User, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterModal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(5, 11, 20, 0.85)',
      backdropFilter: 'blur(20px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }} onClick={onClose}>
      <div 
        className="glass-panel" 
        style={{ 
          maxWidth: '600px', 
          width: '100%', 
          padding: '60px', 
          position: 'relative',
          animation: 'modalReveal 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '25px',
          right: '25px',
          background: 'transparent',
          border: 'none',
          color: 'var(--color-text-muted)',
          cursor: 'pointer',
          padding: '10px'
        }}><X size={24} /></button>

        <h4 style={{ color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '15px' }}>Information</h4>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '25px' }}>{content.title}</h2>
        <div style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '40px' }}>
          {content.body}
        </div>
        <button className="btn btn-primary" onClick={onClose} style={{ padding: '15px 40px', borderRadius: '12px' }}>Return to AeroLuxe</button>

        <style>{`
          @keyframes modalReveal {
            from { opacity: 0; transform: translateY(40px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
};

const Footer = () => {
  const [modal, setModal] = useState({ isOpen: false, title: '', body: '' });
  const [email, setEmail] = useState('');

  const openModal = (title, body) => {
    setModal({ isOpen: true, title, body });
  };

  const socialStyles = {
    display: 'flex',
    gap: '20px',
    marginTop: '25px'
  };

  const listStyle = {
    listStyle: 'none',
    padding: 0
  };

  const listItemStyle = {
    marginBottom: '12px'
  };

  return (
    <footer style={{
      background: 'var(--color-bg-secondary)',
      padding: '80px 0 30px',
      borderTop: '1px solid var(--glass-border)',
      marginTop: 'auto',
      position: 'relative',
      zIndex: 10
    }}>
      <FooterModal isOpen={modal.isOpen} onClose={() => setModal({ ...modal, isOpen: false })} content={modal} />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '60px',
        marginBottom: '80px'
      }}>
        
        <div>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
             <Plane color="var(--color-accent)" size={28} style={{ transform: 'rotate(-45deg)' }} />
             <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '2px' }}>AERO<span style={{ color: 'var(--color-accent)' }}>LUXE</span></span>
          </Link>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
            Elevating the art of global travel. Experience the unparalleled luxury, comfort, and service on your next journey with AeroLuxe Prime.
          </p>
          <div style={socialStyles}>
            <a href="#" className="social-icon-link"><Globe size={20} /></a>
            <a href="#" className="social-icon-link"><Send size={20} /></a>
            <a href="#" className="social-icon-link"><Camera size={20} /></a>
            <a href="#" className="social-icon-link"><User size={20} /></a>
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '30px', fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Services</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('Private Jet Charter', 'The ultimate in personalized travel. Choose your aircraft, schedule, and menu for a bespoke journey across the globe.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >Private Jet Charter</button>
            </li>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('First Class Booking', 'Luxury defined by comfort and elegance. Experience our award-winning First Class Royale suites and curated dining.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >First Class Booking</button>
            </li>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('Corporate Travel', 'Tailored travel solutions for elite businesses. Priority scheduling and dedicated logistics for your global operations.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >Corporate Travel</button>
            </li>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('Baggage Services', 'Pristine care for your belongings. Our concierge handles your luggage from doorstep to destination with total security.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >Baggage Services</button>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '30px', fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Company</h4>
          <ul style={listStyle}>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('About Us', 'AeroLuxe Aviation has been the pinnacle of luxury travel since 2012, setting global standards for service and safety.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >About Us</button>
            </li>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('Our Fleet', 'A modern collection of standard-setting aircraft, from long-range executive jets to regional luxury charters.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >Our Fleet</button>
            </li>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('Sustainability', 'Committed to net-zero luxury. Our fleet utilizes SAF and carbon offset programs for every mile flown.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >Sustainability</button>
            </li>
            <li style={listItemStyle}>
              <button 
                onClick={() => openModal('Careers', 'Join the most elite team in aviation. We are always looking for exceptional hospitality and operations talent.')} 
                className="footer-link" 
                style={{ background: 'transparent', border: 'none', padding: 0 }}
              >Careers</button>
            </li>
          </ul>
        </div>

        <div>
          <h4 style={{ marginBottom: '30px', fontSize: '1.1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Newsletter</h4>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '25px', fontSize: '0.9rem' }}>
            Subscribe to receive inspired travel ideas and special offers.
          </p>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            <input 
              type="text" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'white', outline: 'none', flex: 1, fontSize: '0.95rem' }} 
            />
            <ArrowRight 
              size={20} 
              color="var(--color-accent)" 
              style={{ cursor: 'pointer', transition: '0.3s' }} 
              className="social-icon-link" 
              onClick={() => {
                if (email.includes('@')) {
                  openModal('Subscription Confirmed', 'Thank you for subscribing to the AeroLuxe newsletter. You will now receive our exclusive travel updates and offers.');
                  setEmail('');
                } else {
                  openModal('Invalid Email', 'Please enter a valid email address to subscribe to our newsletter.');
                }
              }}
            />
          </div>
        </div>

      </div>
      
      <div className="container" style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '30px' }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>&copy; 2026 AEROLUXE Aviation. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '30px', fontSize: '0.85rem' }}>
            <button 
              onClick={() => openModal('Privacy Policy', 'Your data is protected by the highest standards of international privacy law and military-grade encryption.')} 
              className="footer-link" 
              style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.8rem' }}
            >Privacy Policy</button>
             <button 
              onClick={() => openModal('Terms of Service', 'Standard agreements for our world-class charters and ticketing services. Luxury is a relationship of mutual excellence.')} 
              className="footer-link" 
              style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.8rem' }}
            >Terms of Service</button>
            <button 
              onClick={() => openModal('Cookie Policy', 'We use cookies only to enhance your personalized luxury experience on our platform.')} 
              className="footer-link" 
              style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.8rem' }}
            >Cookie Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
