import React from 'react';
import { Plane, Calendar, MapPin, Clock, ArrowRight, Download, ChevronRight, Share2 } from 'lucide-react';
import ScrollReveal from '../components/animations/ScrollReveal';

const MyBookings = () => {
  const bookings = [
    {
      id: 'AL8829',
      from: 'Mumbai (BOM)',
      to: 'London (LHR)',
      date: '24 Oct 2026',
      time: '10:30 AM',
      status: 'Confirmed',
      class: 'First Class',
      gate: 'B12'
    },
    {
      id: 'AL3345',
      from: 'Chennai (MAA)',
      to: 'Udaipur (UDR)',
      date: '12 Nov 2026',
      time: '04:15 PM',
      status: 'Upcoming',
      class: 'Business Class',
      gate: 'A05'
    }
  ];

  const handleDownload = (booking) => {
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

    // Border
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 10;
    ctx.strokeRect(40, 40, 1120, 550);

    // Header
    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 50px Arial';
    ctx.fillText('AEROLUXE PRIVATE AVIATION', 100, 120);

    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '30px Arial';
    ctx.fillText('CONFIRMED E-TICKET', 100, 170);

    // Trip Info
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.fillText(booking.from.split(' (')[0], 100, 320);
    
    ctx.fillStyle = '#d4af37';
    ctx.font = '50px Arial';
    ctx.fillText(' \u2708 ', 500, 315);

    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.fillText(booking.to.split(' (')[0], 650, 320);

    // Details Grid
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('PASSENGER', 100, 450);
    ctx.fillText('FLIGHT ID', 350, 450);
    ctx.fillText('SEAT', 600, 450);
    ctx.fillText('DATE', 820, 450);

    ctx.font = 'bold 32px Arial';
    ctx.fillText('Elite Member', 100, 500);
    ctx.fillText(booking.id, 350, 500);
    ctx.fillText('1A Royale', 600, 500);
    ctx.fillText(booking.date, 820, 500);

    // QR Code
    const qrImg = new Image();
    qrImg.crossOrigin = "anonymous";
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${booking.id}`;
    
    qrImg.onload = () => {
      // Draw white background for QR
      ctx.fillStyle = 'white';
      ctx.fillRect(1000, 410, 140, 140);
      ctx.drawImage(qrImg, 1010, 420, 120, 120);

      // Trigger Download
      const link = document.createElement('a');
      link.download = `AeroLuxe_Ticket_${booking.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
  };

  const handleShare = async (bookingId) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My AeroLuxe Flight',
          text: `Check out my upcoming AeroLuxe flight: ${bookingId}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed:', err);
      }
    } else {
      alert(`Booking ID: ${bookingId} copied to clipboard! (Simulation)`);
    }
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="container">
        <ScrollReveal animation="reveal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>
                My <span style={{ color: 'var(--color-accent)' }}>Bookings</span>
              </h1>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '10px' }}>Manage and track your upcoming journeys.</p>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button className="btn btn-outline" style={{ fontSize: '0.9rem' }}>Past Trips</button>
              <button className="btn btn-primary" style={{ fontSize: '0.9rem' }}>Upcoming Only</button>
            </div>
          </div>
        </ScrollReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {bookings.map((booking, i) => (
            <ScrollReveal key={booking.id} animation="scale-up" delay={i * 200}>
              <div className="glass-panel" style={{ padding: '0', overflow: 'hidden', display: 'flex' }}>
                {/* Left Accent */}
                <div style={{ width: '8px', background: 'var(--color-accent)', boxShadow: '0 0 20px var(--color-accent)' }}></div>
                
                <div style={{ padding: '30px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <div style={{ background: 'color-mix(in srgb, var(--color-accent), transparent 90%)', color: 'var(--color-accent)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plane size={20} />
                      </div>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Flight ID</span>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{booking.id}</h4>
                      </div>
                    </div>
                    <div style={{ background: booking.status === 'Confirmed' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(255, 193, 7, 0.1)', color: booking.status === 'Confirmed' ? '#4caf50' : '#ffc107', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, border: `1px solid ${booking.status === 'Confirmed' ? '#4caf5044' : '#ffc10744'}` }}>
                      {booking.status}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{booking.from.split(' ')[0]}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{booking.from}</p>
                    </div>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                      <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)', position: 'absolute', top: '50%', zIndex: 0 }}></div>
                      <Plane size={20} style={{ background: 'var(--color-bg-primary)', padding: '0 10px', position: 'relative', zIndex: 1, color: 'var(--color-accent)' }} />
                    </div>

                    <div style={{ flex: 1, textAlign: 'right' }}>
                      <h4 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{booking.to.split(' ')[0]}</h4>
                      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{booking.to}</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                    <div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}><Calendar size={12} /> Date</span>
                      <p style={{ fontWeight: 600 }}>{booking.date}</p>
                    </div>
                    <div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}><Clock size={12} /> Time</span>
                      <p style={{ fontWeight: 600 }}>{booking.time}</p>
                    </div>
                    <div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}><Plane size={12} /> Class</span>
                      <p style={{ fontWeight: 600 }}>{booking.class}</p>
                    </div>
                    <div>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}><MapPin size={12} /> Gate</span>
                      <p style={{ fontWeight: 600 }}>{booking.gate}</p>
                    </div>
                  </div>
                </div>

                <div style={{ width: '100px', borderLeft: '1px dashed var(--glass-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '25px', background: 'rgba(255,255,255,0.01)' }}>
                  <button 
                    onClick={() => handleDownload(booking)}
                    title="Download Ticket" 
                    style={{ background: 'transparent', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', transition: '0.2s' }} 
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} 
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Download size={24} />
                  </button>
                  <button 
                    onClick={() => handleShare(booking.id)}
                    title="Share Booking" 
                    style={{ background: 'transparent', border: 'none', color: '#00a8ff', cursor: 'pointer', transition: '0.2s' }} 
                    onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} 
                    onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Share2 size={24} />
                  </button>
                  <button title="View Details" style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', transition: '0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.2)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
