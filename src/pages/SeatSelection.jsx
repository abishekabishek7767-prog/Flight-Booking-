import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Info, User } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/layout/AuthModal';

const SeatSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from') || 'New Delhi (DEL)';
  const to = queryParams.get('to') || 'Mumbai (BOM)';
  const price = queryParams.get('price') || '25900';
  const passengers = parseInt(queryParams.get('passengers') || '1');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Generate mock seats (A to F, rows 1 to 10 for first/business)
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  // Randomly mark some seats as occupied
  const occupiedSeats = ['1A', '1B', '2D', '4C', '5F', '8A', '7B', '10E', '3C'];

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(s => s !== seatId);
      }
      if (prev.length < passengers) {
        return [...prev, seatId];
      }
      return prev; 
    });
  };

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.includes(seatId)) return 'occupied';
    if (selectedSeats.includes(seatId)) return 'selected';
    return 'available';
  };

  const totalPrice = parseInt(price) * (selectedSeats.length || passengers); // Multiplies base by count

  const handleProceed = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    navigate(`/passenger-details?seats=${selectedSeats.join(',')}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&price=${totalPrice}`);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg-primary)', paddingBottom: '100px' }}>
      
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <button onClick={() => navigate(-1)} className="btn btn-outline" style={{ padding: '10px' }}><ArrowLeft size={20} /></button>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Select Your Seat</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>Air India Royale • Flight AI-{id} • {from} → {to}</p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Airplane Layout */}
          <div style={{ flex: '1 1 600px', display: 'flex', justifyContent: 'center' }}>
            <div className="glass-panel" style={{ 
              width: '450px', 
              padding: '60px 40px', 
              borderRadius: '200px 200px 40px 40px', // Airplane nose shape
              background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
              border: '1px solid var(--glass-border)',
              position: 'relative',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
            }}>
              
              {/* Cockpit area */}
              <div style={{ textAlign: 'center', marginBottom: '60px', opacity: 0.5 }}>
                 <div style={{ width: '100px', height: '4px', background: 'var(--glass-border)', margin: '0 auto 20px', borderRadius: '10px' }}></div>
                 <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '3px' }}>Cockpit</h4>
              </div>

              {/* Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {rows.map(row => (
                  <div key={row} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', position: 'absolute', left: '-30px' }}>{row}</div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {cols.slice(0, 3).map(col => {
                        const seatId = `${row}${col}`;
                        const status = getSeatStatus(seatId);
                        return (
                          <div 
                            key={seatId} 
                            onClick={() => handleSeatClick(seatId)}
                            style={{
                              width: '45px', height: '45px', borderRadius: '8px', 
                              cursor: status === 'occupied' ? 'not-allowed' : 'pointer',
                              background: status === 'selected' ? 'var(--color-accent)' : status === 'occupied' ? 'rgba(255,255,255,0.05)' : 'transparent',
                              border: `1px solid ${status === 'selected' ? 'var(--color-accent)' : 'var(--glass-border)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s ease',
                              boxShadow: status === 'selected' ? '0 0 15px var(--color-accent)' : 'none'
                            }}
                          >
                            <User size={16} opacity={status === 'occupied' ? 0.3 : 0.8} color={status === 'selected' ? 'black' : 'white'} />
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ width: '40px' }}></div> {/* Aisle */}

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {cols.slice(3, 6).map(col => {
                        const seatId = `${row}${col}`;
                        const status = getSeatStatus(seatId);
                        return (
                          <div 
                            key={seatId} 
                            onClick={() => handleSeatClick(seatId)}
                            style={{
                              width: '45px', height: '45px', borderRadius: '8px', 
                              cursor: status === 'occupied' ? 'not-allowed' : 'pointer',
                              background: status === 'selected' ? 'var(--color-accent)' : status === 'occupied' ? 'rgba(255,255,255,0.05)' : 'transparent',
                              border: `1px solid ${status === 'selected' ? 'var(--color-accent)' : 'var(--glass-border)'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s ease',
                              boxShadow: status === 'selected' ? '0 0 15px var(--color-accent)' : 'none'
                            }}
                          >
                            <User size={16} opacity={status === 'occupied' ? 0.3 : 0.8} color={status === 'selected' ? 'black' : 'white'} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div style={{ flex: '1 1 350px' }}>
            <ScrollReveal animation="reveal">
              <div className="glass-panel" style={{ padding: '40px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}><Info size={24} color="var(--color-accent)" /> Legend</h3>
                
                <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '20px', height: '20px', background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '4px' }}></div>
                    <span style={{ color: 'var(--color-text-muted)' }}>Available Seat</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '20px', height: '20px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px' }}></div>
                    <span style={{ color: 'var(--color-text-muted)' }}>Occupied</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '20px', height: '20px', background: 'var(--color-accent)', borderRadius: '4px' }}></div>
                    <span style={{ color: 'var(--color-text-muted)' }}>Your Selection</span>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '30px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Selected Seats ({selectedSeats.length}/{passengers})</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {selectedSeats.length > 0 ? selectedSeats.join(', ') : '--'}
                    </div>
                    {selectedSeats.length < passengers && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: '8px', fontStyle: 'italic' }}>
                        Please select {passengers - selectedSeats.length} more seat(s)
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>Total Amount</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>₹{totalPrice.toLocaleString()}</span>
                  </div>

                  <button 
                    disabled={selectedSeats.length !== passengers}
                    onClick={handleProceed}
                    className="btn btn-primary" 
                    style={{ width: '100%', padding: '15px', borderRadius: '12px', fontSize: '1.1rem', opacity: selectedSeats.length === passengers ? 1 : 0.5, cursor: selectedSeats.length === passengers ? 'pointer' : 'not-allowed' }}
                  >
                    Confirm & Proceed
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default SeatSelection;
