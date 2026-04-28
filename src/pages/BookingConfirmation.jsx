import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Plane, Download, Share2, MapPin, CalendarDays, Ticket } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from') || 'New Delhi (DEL)';
  const to = queryParams.get('to') || 'Mumbai (BOM)';
  const seat = queryParams.get('seat') || '1A';
  const price = queryParams.get('price') || '25900';
  const fromCode = from.match(/\((.*?)\)/)?.[1] || 'DEL';
  const toCode = to.match(/\((.*?)\)/)?.[1] || 'BOM';
  const fromCity = from.split(' (')[0];
  const toCity = to.split(' (')[0];

  const bookingId = "AL-7489-XY"; // Mock booking ID


  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");

    // Background
    const grad = ctx.createLinearGradient(0, 0, 1200, 630);
    grad.addColorStop(0, '#050b14');
    grad.addColorStop(1, '#0a1120');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 630);

    // Gold Theme Accent
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 15;
    ctx.strokeRect(30, 30, 1140, 570);

    // Branding
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 60px Arial';
    ctx.fillText('AERO LUXE', 80, 120);
    
    ctx.fillStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillText('PRIVATE AVIATION ROYALE', 80, 170);

    // Trip 
    ctx.font = 'bold 120px Arial';
    ctx.fillText(fromCode, 80, 380);
    
    ctx.fillStyle = '#d4af37';
    ctx.font = '80px Arial';
    ctx.fillText('\u2708', 530, 370);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 120px Arial';
    ctx.fillText(toCode, 800, 380);

    // Details Box
    ctx.fillStyle = 'rgba(212, 175, 55, 0.1)';
    ctx.fillRect(50, 430, 1100, 120);
    
    ctx.fillStyle = '#888';
    ctx.font = '20px Arial';
    ctx.fillText('PASSENGER', 80, 470);
    ctx.fillText('BOOKING ID', 400, 470);
    ctx.fillText('SEAT', 740, 470);
    ctx.fillText('CLASS', 940, 470);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 30px Arial';
    ctx.fillText('ELITE MEMBER', 80, 520);
    ctx.fillText(bookingId, 400, 520);
    ctx.fillText(seat, 740, 520);
    ctx.fillText('FIRST ROYALE', 940, 520);

    // QR Code Integration
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`;
    
    qrImg.onload = () => {
      // Draw white base for QR
      ctx.fillStyle = 'white';
      ctx.fillRect(1005, 75, 130, 130);
      ctx.drawImage(qrImg, 1010, 80, 120, 120);

      // Trigger PDF Download using jsPDF
      if (window.jspdf) {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [1200, 630]
        });
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 1200, 630);
        pdf.save(`AeroLuxe_Ticket_${bookingId}.pdf`);
      } else {
        // Fallback to PNG if jsPDF fails to load
        const link = document.createElement('a');
        link.download = `AeroLuxe_BoardingPass_${bookingId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      }
    };
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'AeroLuxe Flight Confirmed',
          text: `I'm flying to ${toCity} with AeroLuxe! Booking ID: ${bookingId}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      alert('Booking link copied to clipboard! (Simulation)');
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--color-bg-primary)', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Success Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ width: '80px', height: '80px', background: 'color-mix(in srgb, var(--color-accent), transparent 90%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px' }}>
            <CheckCircle size={40} color="var(--color-accent)" />
          </div>
          <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '15px' }}>Booking Confirmed!</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto' }}>Your premium journey with AeroLuxe is ready. We've sent the e-ticket to your email.</p>
        </div>

        {/* E-Ticket Design */}
        <ScrollReveal animation="reveal">
          <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--glass-border)', position: 'relative' }}>
            
            {/* Ticket Header */}
            <div style={{ background: 'color-mix(in srgb, var(--color-accent), transparent 95%)', padding: '30px 40px', borderBottom: '1px dashed var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Plane color="var(--color-accent)" size={24} style={{ transform: 'rotate(-45deg)' }} />
                <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '1px' }}>AERO<span style={{ color: 'var(--color-accent)' }}>LUXE</span></span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Booking ID</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{bookingId}</div>
              </div>
            </div>

            {/* Ticket Main Content */}
            <div style={{ padding: '40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              
              <div style={{ flex: '2 1 400px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                  <div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{fromCode}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>{fromCity}</div>
                  </div>
                  <div style={{ textAlign: 'center', flex: 1, px: '20px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '1px', background: 'var(--glass-border)', borderTop: '1px dashed var(--glass-border)' }}></div>
                    <Plane size={20} color="var(--color-accent)" style={{ position: 'relative', zIndex: 1, background: 'var(--color-bg-primary)', padding: '5px' }} />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>{toCode}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>{toCity}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Flight</div>
                    <div style={{ fontWeight: 700 }}>AL-202</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Date</div>
                    <div style={{ fontWeight: 700 }}>Oct 15, 2026</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Gate</div>
                    <div style={{ fontWeight: 700 }}>T3 - G12</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Seat</div>
                    <div style={{ fontWeight: 700, color: 'var(--color-accent)' }}>{seat} Royale</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Boarding</div>
                    <div style={{ fontWeight: 700 }}>05:15 AM</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '5px' }}>Class</div>
                    <div style={{ fontWeight: 700 }}>First Class Royale</div>
                  </div>
                </div>
              </div>

              {/* QR Code Area */}
              <div style={{ flex: '1 1 200px', background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: '150px', height: '150px', marginBottom: '15px' }}>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${bookingId}`} alt="QR Code" style={{ width: '100%', height: '100%' }} />
                </div>
                <div style={{ color: '#050b14', fontSize: '0.85rem', fontWeight: 600 }}>Scan to Board</div>
              </div>

            </div>

            {/* Ticket Footer / Action Strip */}
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '30px 40px', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '25px' }}>
                  <button 
                    onClick={handleDownload}
                    className="btn btn-primary" 
                    style={{ display: 'flex', gap: '10px', padding: '15px 30px', fontSize: '1rem', fontWeight: 700 }}
                  >
                    <Download size={20} /> Download Ticket (PDF)
                  </button>
                  <button 
                    onClick={handleShare}
                    className="btn btn-outline" 
                    style={{ display: 'flex', gap: '8px', padding: '12px 25px', fontSize: '0.9rem' }}
                  >
                    <Share2 size={18} /> Share Booking
                  </button>
                </div>
                <button onClick={() => navigate('/')} className="btn btn-outline" style={{ padding: '12px 30px', opacity: 0.7 }}>Back to Home</button>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};

export default BookingConfirmation;
