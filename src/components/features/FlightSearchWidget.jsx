import React, { useState } from 'react';
import { PlaneTakeoff, PlaneLanding, CalendarDays, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const indianStates = [
  "Mumbai (BOM)", "Bengaluru (BLR)", "Chennai (MAA)", "Kolkata (CCU)",
  "Hyderabad (HYD)", "Ahmedabad (AMD)", "Goa (GOI)", "Jaipur (JAI)", "Kochi (COK)",
  "Lucknow (LKO)", "Varanasi (VNS)", "Amritsar (ATQ)", "Guwahati (GAU)", "Patna (PAT)",
  "Bhubaneswar (BBI)", "Indore (IDR)", "Chandigarh (IXC)", "Ranchi (IXR)", "Pune (PNQ)",
  "Thiruvananthapuram (TRV)", "Srinagar (SXR)", "Udaipur (UDR)", "Shimla (SLV)", "Dehradun (DED)"
];

const FlightSearchWidget = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [origin, setOrigin] = useState("Mumbai (BOM)");
  const [destination, setDestination] = useState("Mumbai (BOM)");
  const [passengerCount, setPassengerCount] = useState(1);
  const navigate = useNavigate();

  const isSameLocation = origin === destination;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!isSameLocation) {
      const from = encodeURIComponent(origin);
      const to = encodeURIComponent(destination);
      navigate(`/search?from=${from}&to=${to}&passengers=${passengerCount}`);
    }
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: 'none',
    color: 'white',
    outline: 'none',
    width: '100%',
    padding: '12px 10px',
    fontSize: '0.95rem',
    borderRadius: '8px',
    marginTop: '10px',
    border: isSameLocation ? '1px solid #ef4444' : '1px solid var(--glass-border)',
    appearance: 'none',
    cursor: 'pointer',
    transition: 'var(--transition-fast)'
  };

  const labelStyle = {
    color: 'var(--color-text-muted)',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  return (
    <div className="glass-panel" style={{ 
      padding: '50px', 
      maxWidth: '1200px', 
      width: '100%', 
      margin: '0 auto', 
      position: 'relative', 
      zIndex: 10,
      background: 'rgba(10, 17, 32, 0.7)',
      borderRadius: '40px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 40px 100px rgba(0,0,0,0.4), inset 0 0 20px rgba(212, 175, 55, 0.05)'
    }}>
      {/* Decorative top bar */}
      <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)', opacity: 0.3 }}></div>

      {/* Search Header Options */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '25px' }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          {['Round-trip', 'One-way'].map((type) => {
            const value = type.toLowerCase().replace(' ', '-');
            const isActive = tripType === value;
            return (
              <span 
                key={value}
                onClick={() => setTripType(value)}
                style={{
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: isActive ? 800 : 500,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}
                onMouseOver={e => !isActive && (e.currentTarget.style.color = 'white')}
                onMouseOut={e => !isActive && (e.currentTarget.style.color = 'var(--color-text-muted)')}
              >
                {type}
                <span style={{
                  position: 'absolute',
                  bottom: '-26px',
                  left: '0',
                  width: isActive ? '100%' : '0',
                  height: '3px',
                  background: 'var(--color-accent)',
                  boxShadow: '0 0 15px var(--color-accent)',
                  transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  borderRadius: '10px'
                }} />
              </span>
            );
          })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-accent)', background: 'rgba(212, 175, 55, 0.08)', padding: '10px 20px', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', border: '1px solid rgba(212, 175, 55, 0.2)' }}>
           <ShieldCheck size={16} /> Elite Guaranteed
        </div>
      </div>

      <form onSubmit={handleSearch}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginBottom: '50px' }}>
          
          <div className="input-group">
            <label style={labelStyle}><PlaneTakeoff size={16} color="var(--color-accent)" /> Departing From</label>
            <div style={{ position: 'relative' }}>
              <select 
                style={{ ...inputStyle, padding: '15px 20px', borderRadius: '15px' }} 
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              >
                {indianStates.map(state => <option key={state} value={state} style={{ background: '#0a1120' }}>{state}</option>)}
              </select>
            </div>
          </div>
          
          <div className="input-group">
            <label style={labelStyle}><PlaneLanding size={16} color="var(--color-accent)" /> Destination</label>
            <div style={{ position: 'relative' }}>
              <select 
                style={{ ...inputStyle, padding: '15px 20px', borderRadius: '15px' }} 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                {indianStates.map(state => <option key={state} value={state} style={{ background: '#0a1120' }}>{state}</option>)}
              </select>
              {isSameLocation && (
                <div style={{ color: '#ff4b4b', fontSize: '0.7rem', marginTop: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', animation: 'fade-in 0.3s ease' }}>
                  <div style={{ background: '#ff4b4b', width: '6px', height: '6px', borderRadius: '50%' }}></div> Different origin required
                </div>
              )}
            </div>
          </div>
 
          <div className="input-group">
            <label style={labelStyle}><CalendarDays size={16} color="var(--color-accent)" /> Journey Date</label>
            <input 
              type="date" 
              style={{ ...inputStyle, padding: '15px 20px', borderRadius: '15px' }} 
              defaultValue="2026-10-15" 
              className="calendar-input"
            />
          </div>
 
          <div className="input-group">
            <label style={labelStyle}><Users size={16} color="var(--color-accent)" /> Elite Group</label>
            <select 
              style={{ ...inputStyle, padding: '15px 20px', borderRadius: '15px' }} 
              defaultValue="1"
              onChange={(e) => setPassengerCount(parseInt(e.target.value))}
            >
              <option value="1" style={{ background: '#0a1120' }}>1 Passenger, Royale</option>
              <option value="2" style={{ background: '#0a1120' }}>2 Passengers, Royale</option>
              <option value="3" style={{ background: '#0a1120' }}>3 Passengers, Royale</option>
              <option value="4" style={{ background: '#0a1120' }}>Charter Group (4+)</option>
            </select>
          </div>
        </div>
 
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button 
            type="submit" 
            disabled={isSameLocation}
            className="btn btn-primary" 
            style={{ 
              padding: '22px 80px', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '20px', 
              fontSize: '1.2rem', 
              fontWeight: 900,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              opacity: isSameLocation ? 0.3 : 1,
              cursor: isSameLocation ? 'not-allowed' : 'pointer',
              background: isSameLocation ? 'var(--color-text-muted)' : 'var(--color-accent)',
              boxShadow: isSameLocation ? 'none' : '0 20px 40px rgba(212, 175, 55, 0.3)'
            }}
            onMouseOver={e => !isSameLocation && (e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)')}
            onMouseOut={e => !isSameLocation && (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
          >
            {isSameLocation ? 'Review Destinations' : 'Find Private Flights'} <ArrowRight size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchWidget;
