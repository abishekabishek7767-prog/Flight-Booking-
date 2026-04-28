import React from 'react';
import { Filter, ChevronDown, CheckCircle, Clock, Plane, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ScrollReveal from '../components/animations/ScrollReveal';

const cityToRegion = {
  "New Delhi (DEL)": "North", "Srinagar (SXR)": "North", "Lucknow (LKO)": "North", "Chandigarh (IXC)": "North", "Amritsar (ATQ)": "North", "Shimla (SLV)": "North", "Dehradun (DED)": "North", "Varanasi (VNS)": "North",
  "Mumbai (BOM)": "West", "Ahmedabad (AMD)": "West", "Jaipur (JAI)": "West", "Udaipur (UDR)": "West", "Pune (PNQ)": "West", "Indore (IDR)": "West",
  "Bengaluru (BLR)": "South", "Chennai (MAA)": "South", "Hyderabad (HYD)": "South", "Kochi (COK)": "South", "Thiruvananthapuram (TRV)": "South", "Goa (GOI)": "South",
  "Kolkata (CCU)": "East", "Guwahati (GAU)": "East", "Patna (PAT)": "East", "Bhubaneswar (BBI)": "East", "Ranchi (IXR)": "East"
};

const calculateBasePrice = (from, to) => {
  const reg1 = cityToRegion[from] || "North";
  const reg2 = cityToRegion[to] || "North";
  if (reg1 === reg2) return 4500;
  if ((reg1 === "North" && reg2 === "West") || (reg1 === "West" && reg2 === "North")) return 6500;
  if ((reg1 === "North" && reg2 === "South") || (reg1 === "South" && reg2 === "North")) return 14500;
  return 8500;
};

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const from = queryParams.get('from') || 'Mumbai (BOM)';
  const to = queryParams.get('to') || 'Bengaluru (BLR)';
  const passengers = queryParams.get('passengers') || '1';
  
  const fromCode = from.match(/\((.*?)\)/)?.[1] || 'DEL';
  const toCode = to.match(/\((.*?)\)/)?.[1] || 'BOM';

  const basePrice = calculateBasePrice(from, to);

  const dynamicFlights = [
    { id: 1, airline: 'Air India Maharaja', depart: '06:00 AM', arrive: '08:15 AM', duration: '2h 15m', stops: 'Direct', base: basePrice * 1.5, class: 'First Class Royale' },
    { id: 2, airline: 'Vistara Business Elite', depart: '09:30 AM', arrive: '11:45 AM', duration: '2h 15m', stops: 'Direct', base: basePrice * 1.2, class: 'Business Class' },
    { id: 3, airline: 'AeroLuxe Prime', depart: '10:45 AM', arrive: '01:00 PM', duration: '2h 15m', stops: 'Direct', base: basePrice * 1.8, class: 'First Class Suite' },
    { id: 10, airline: 'IndiGo Prime', depart: '04:30 PM', arrive: '06:45 PM', duration: '2h 15m', stops: 'Direct', base: basePrice * 0.9, class: 'Economy Premium' }
  ];

  const [maxPrice, setMaxPrice] = React.useState(100000);
  const [selectedAirlines, setSelectedAirlines] = React.useState(['Air India', 'Vistara', 'IndiGo', 'AeroLuxe']);

  const toggleAirline = (airline) => {
    setSelectedAirlines(prev => prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]);
  };

  const filteredFlights = dynamicFlights.filter(f => f.base <= maxPrice && selectedAirlines.some(a => f.airline.includes(a)));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-primary)', position: 'relative' }}>
      {/* Background Decorative Blob */}
      <div className="bg-glow" style={{ top: '10%', left: '10%' }}></div>
      <div className="bg-glow" style={{ bottom: '10%', right: '10%', background: 'radial-gradient(circle, color-mix(in srgb, #3498db, transparent 95%) 0%, transparent 70%)' }}></div>

      <div style={{ 
        padding: '120px 0 60px', 
        background: 'linear-gradient(to bottom, rgba(10, 17, 32, 0.8), var(--color-bg-primary))',
        borderBottom: '1px solid var(--glass-border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Plane Trail in Header */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '-10%',
          width: '120%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)',
          opacity: 0.1,
          transform: 'rotate(-5deg)',
          zIndex: 0
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal animation="reveal">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--color-accent)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 800 }}>
                   <Plane size={16} /> Elite Journey Found
                </div>
                <h1 className="text-gradient" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px', lineHeight: 1.1 }}>
                  {from.split(' (')[0].toUpperCase()} <span style={{ color: 'white', fontStyle: 'italic', fontWeight: 300 }}>to</span> {to.split(' (')[0].toUpperCase()}
                </h1>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem', marginTop: '15px', letterSpacing: '1px' }}>
                  {passengers} PASSENGER(S) • PREMIER FIRST CLASS CABIN • {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase()}
                </p>
              </div>
              <Link to="/" className="btn btn-outline" style={{ borderRadius: '15px', padding: '15px 30px' }}>Modify Search</Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) 3fr', gap: '50px', padding: '60px 0' }}>
        <aside style={{ height: 'fit-content', position: 'sticky', top: '120px' }}>
           <ScrollReveal animation="reveal" delay={200}>
             <div className="glass-panel" style={{ padding: '35px', borderRadius: '30px' }}>
               <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', letterSpacing: '1px' }}>
                 <Filter size={20} color="var(--color-accent)" /> REFINE
               </h3>
               
               <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                     <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>MAXIMUM PRICE</span>
                     <span style={{ color: 'var(--color-accent)', fontWeight: 800 }}>₹{maxPrice.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" 
                    min="5000" 
                    max="100000" 
                    value={maxPrice} 
                    onChange={e => setMaxPrice(parseInt(e.target.value))} 
                    style={{ width: '100%', accentColor: 'var(--color-accent)', height: '4px', cursor: 'pointer' }} 
                  />
               </div>

               <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '20px', fontWeight: 600, letterSpacing: '1px' }}>PREFERRED FLEET</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {['Air India', 'Vistara', 'IndiGo', 'AeroLuxe'].map(a => (
                      <label key={a} style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: '0.2s' }}>
                        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <input 
                            type="checkbox" 
                            checked={selectedAirlines.includes(a)} 
                            onChange={() => toggleAirline(a)} 
                            style={{ 
                              width: '22px', 
                              height: '22px', 
                              cursor: 'pointer', 
                              appearance: 'none', 
                              border: '1px solid var(--glass-border)', 
                              borderRadius: '6px', 
                              background: selectedAirlines.includes(a) ? 'var(--color-accent)' : 'transparent',
                              transition: '0.2s'
                            }} 
                          />
                          {selectedAirlines.includes(a) && <CheckCircle size={14} style={{ position: 'absolute', color: 'var(--color-bg-primary)' }} />}
                        </div>
                        <span style={{ fontSize: '1rem', fontWeight: 500, color: selectedAirlines.includes(a) ? 'white' : 'var(--color-text-muted)' }}>{a}</span>
                      </label>
                    ))}
                  </div>
               </div>
             </div>
           </ScrollReveal>
        </aside>

        <main style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
           {filteredFlights.length > 0 ? filteredFlights.map((flight, idx) => (
             <ScrollReveal key={flight.id} animation="reveal" delay={idx * 150}>
                <div className="glass-panel" style={{ 
                  padding: '0', 
                  borderRadius: '30px', 
                  overflow: 'hidden', 
                  border: '1px solid var(--glass-border)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(10,17,32,0.6) 100%)'
                }}>
                   <div style={{ display: 'flex', height: '100%' }}>
                      <div style={{ flex: '3', padding: '40px', borderRight: '1px dashed var(--glass-border)', position: 'relative' }}>
                        {/* Decorative ticket punches */}
                        <div style={{ position: 'absolute', top: '-15px', right: '-15px', width: '30px', height: '30px', background: 'var(--color-bg-primary)', borderRadius: '50%' }}></div>
                        <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', width: '30px', height: '30px', background: 'var(--color-bg-primary)', borderRadius: '50%' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                             <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'color-mix(in srgb, var(--color-accent), transparent 90%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plane size={24} color="var(--color-accent)" />
                             </div>
                             <div>
                               <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 800, letterSpacing: '2px' }}>{flight.class}</span>
                               <h4 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{flight.airline}</h4>
                             </div>
                          </div>
                          <div style={{ textAlign: 'right', display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                             <Clock size={14} /> <span>{flight.duration}</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                           <div style={{ textAlign: 'left' }}>
                              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>{flight.depart}</div>
                              <div style={{ fontSize: '1rem', color: 'var(--color-accent)', fontWeight: 700 }}>{fromCode}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '5px' }}>{from.split(' (')[0]}</div>
                           </div>
                           
                           <div style={{ flex: 1, padding: '0 40px', position: 'relative', textAlign: 'center' }}>
                              <div style={{ height: '2px', background: 'linear-gradient(90deg, transparent, var(--glass-border) 40%, var(--glass-border) 60%, transparent)', width: '100%', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-bg-primary)', padding: '0 10px' }}>
                                   <Plane size={20} style={{ color: 'var(--color-accent)', transform: 'rotate(90deg)' }} />
                                </div>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', marginTop: '15px', fontWeight: 600, letterSpacing: '2px' }}>{flight.stops.toUpperCase()}</div>
                           </div>

                           <div style={{ textAlign: 'right' }}>
                              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>{flight.arrive}</div>
                              <div style={{ fontSize: '1rem', color: 'var(--color-accent)', fontWeight: 700 }}>{toCode}</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '5px' }}>{to.split(' (')[0]}</div>
                           </div>
                        </div>
                      </div>

                      <div style={{ flex: '1', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'rgba(212, 175, 55, 0.02)' }}>
                         <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '5px', fontWeight: 600 }}>TOTAL FARE</div>
                         <div style={{ fontSize: '2.2rem', fontWeight: 900, color: 'white', marginBottom: '20px' }}>₹{Math.floor(flight.base).toLocaleString()}</div>
                         <Link 
                          to={`/booking/${flight.id}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&price=${Math.floor(flight.base)}&passengers=${passengers}`} 
                          className="btn btn-primary" 
                          style={{ width: '100%', padding: '18px', borderRadius: '15px', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}
                         >
                           Select Seat
                         </Link>
                      </div>
                   </div>
                </div>
             </ScrollReveal>
           )) : (
             <div style={{ textAlign: 'center', padding: '100px', background: 'rgba(255,255,255,0.02)', borderRadius: '30px', border: '1px dashed var(--glass-border)' }}>
                <Info size={60} style={{ color: 'var(--color-accent)', opacity: 0.3, marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>No Elite Flights Found</h3>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '10px' }}>Adjust your filters to discover other luxury options.</p>
             </div>
           )}
        </main>
      </div>
    </div>
  );
};

export default SearchResults;
