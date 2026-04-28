import React, { useState, useEffect, useRef } from 'react';
import { Plane, Search, User, Menu, X, LogOut, Settings, CreditCard, Heart, MapPin, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeSelector from './ThemeSelector';
import AuthModal from './AuthModal';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : ["Mumbai (BOM)", "Chennai (MAA)", "Bengaluru (BLR)"];
  });
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const indianStates = [
    "Mumbai (BOM)", "Bengaluru (BLR)", "Chennai (MAA)", "Kolkata (CCU)",
    "Hyderabad (HYD)", "Ahmedabad (AMD)", "Goa (GOI)", "Jaipur (JAI)", "Kochi (COK)",
    "Srinagar (SXR)", "Kerala (COK)", "Amritsar (ATQ)", "Guwahati (GAU)", "Patna (PAT)",
    "Bhubaneswar (BBI)", "Indore (IDR)", "Chandigarh (IXC)", "Ranchi (IXR)", "Pune (PNQ)"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowSearchOverlay(false);
        setShowMobileMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (showSearchOverlay && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchOverlay]);

  const handleUserClick = () => {
    if (user) {
      setShowUserDropdown(!showUserDropdown);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserDropdown(false);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = indianStates.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
    setActiveSuggestion(-1);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    const finalQuery = activeSuggestion >= 0 ? suggestions[activeSuggestion] : searchQuery;
    if (finalQuery.trim()) {
      // Update recent searches
      const updatedHistory = [finalQuery, ...recentSearches.filter(s => s !== finalQuery)].slice(0, 5);
      setRecentSearches(updatedHistory);
      localStorage.setItem('recentSearches', JSON.stringify(updatedHistory));

      setShowSearchOverlay(false);
      setSearchQuery('');
      setSuggestions([]);
      navigate(`/search?to=${encodeURIComponent(finalQuery)}`);
    }
  };

  const handleKeyDownInput = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestion(prev => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestion(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter' && activeSuggestion >= 0) {
      e.preventDefault();
      const selected = suggestions[activeSuggestion];
      setSearchQuery(selected);
      setShowSearchOverlay(false);
      setSuggestions([]);
      navigate(`/search?to=${encodeURIComponent(selected)}`);
    }
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        transition: 'var(--transition-smooth)',
        padding: scrolled ? '15px 0' : '25px 0',
        background: scrolled ? 'var(--glass-bg)' : 'rgba(5, 11, 20, 0.8)',
        backdropFilter: 'blur(15px)',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '-200px',
          width: '100px',
          height: '35px',
          background: 'var(--color-accent)',
          maskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
          maskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: 'url(https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Airplane_silhouette.svg/1024px-Airplane_silhouette.svg.png)',
          WebkitMaskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          opacity: 0.4,
          pointerEvents: 'none',
          animation: 'headerFly 12s linear infinite',
          zIndex: 5,
          filter: 'drop-shadow(0 0 15px var(--color-accent))'
        }} />

        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text-main)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Plane color="var(--color-accent)" size={28} style={{ transform: 'rotate(-45deg)' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>AERO<span style={{ color: 'var(--color-accent)' }}>LUXE</span></span>
          </Link>
          
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', gap: '30px' }}>
              <Link to="/search" className="footer-link" style={{ fontWeight: 600 }}>Book a Flight</Link>
              <a href="/#destinations" className="footer-link" style={{ fontWeight: 600 }}>Destinations</a>
              <a href="/#experience" className="footer-link" style={{ fontWeight: 600 }}>Experience</a>
            </div>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', paddingLeft: '20px', borderLeft: '1px solid var(--glass-border)' }}>
              <ThemeSelector />
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', position: 'relative' }}>
                <Search 
                  size={22} 
                  onClick={() => setShowSearchOverlay(true)}
                  style={{ cursor: 'pointer', transition: '0.2s' }} 
                  onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} 
                  onMouseOut={e => e.currentTarget.style.color = 'white'} 
                />
                
                <div style={{ position: 'relative' }} ref={dropdownRef}>
                  <User 
                    size={22} 
                    onClick={handleUserClick}
                    style={{ 
                      cursor: 'pointer', 
                      transition: '0.2s',
                      color: user ? 'var(--color-accent)' : 'white'
                    }} 
                    onMouseOver={e => e.currentTarget.style.color = 'var(--color-accent)'} 
                    onMouseOut={e => e.currentTarget.style.color = user ? 'var(--color-accent)' : 'white'} 
                  />
                  
                  {user && showUserDropdown && (
                    <div className="glass-panel" style={{
                      position: 'absolute',
                      top: '40px',
                      right: '0',
                      width: '220px',
                      padding: '15px',
                      zIndex: 1000,
                      animation: 'slideDown 0.3s ease forwards'
                    }}>
                      <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid var(--glass-border)' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>Logged in as</p>
                        <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{user.name}</p>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div 
                          onClick={() => { navigate('/profile'); setShowUserDropdown(false); }}
                          className="dropdown-item" 
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', cursor: 'pointer', borderRadius: '8px', transition: '0.2s' }}
                        >
                          <Settings size={16} /> <span style={{ fontSize: '0.9rem' }}>Account Profile</span>
                        </div>
                        <div 
                          onClick={() => { navigate('/bookings'); setShowUserDropdown(false); }}
                          className="dropdown-item" 
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', cursor: 'pointer', borderRadius: '8px', transition: '0.2s' }}
                        >
                          <CreditCard size={16} /> <span style={{ fontSize: '0.9rem' }}>My Bookings</span>
                        </div>
                        <div 
                          onClick={() => { navigate('/saved'); setShowUserDropdown(false); }}
                          className="dropdown-item" 
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', cursor: 'pointer', borderRadius: '8px', transition: '0.2s' }}
                        >
                          <Heart size={16} /> <span style={{ fontSize: '0.9rem' }}>Saved Trips</span>
                        </div>
                        <div 
                          onClick={handleLogout}
                          style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '12px', 
                            padding: '8px', 
                            cursor: 'pointer', 
                            borderRadius: '8px', 
                            transition: '0.2s',
                            color: '#ff4b4b',
                            marginTop: '5px'
                          }}
                        >
                          <LogOut size={16} /> <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sign Out</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div 
                  onClick={() => setShowMobileMenu(true)}
                  style={{ 
                    cursor: 'pointer', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '6px', 
                    alignItems: 'flex-end',
                    padding: '5px'
                  }}
                  onMouseOver={e => {
                    const children = e.currentTarget.children;
                    for(let child of children) child.style.background = 'var(--color-accent)';
                  }}
                  onMouseOut={e => {
                    const children = e.currentTarget.children;
                    for(let child of children) child.style.background = 'white';
                  }}
                >
                  <div style={{ width: '24px', height: '2px', background: 'white', transition: '0.3s', borderRadius: '2px' }}></div>
                  <div style={{ width: '18px', height: '2px', background: 'white', transition: '0.3s', borderRadius: '2px' }}></div>
                  <div style={{ width: '12px', height: '2px', background: 'white', transition: '0.3s', borderRadius: '2px' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {showSearchOverlay && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(5, 11, 20, 0.98)',
          backdropFilter: 'blur(40px)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '100px 20px',
          animation: 'fade-in 0.3s ease'
        }}>
          <button 
            onClick={() => setShowSearchOverlay(false)}
            style={{ position: 'absolute', top: '40px', right: '40px', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', opacity: 0.7 }}
          >
            <X size={36} />
          </button>

          <div style={{ width: '100%', maxWidth: '900px' }}>
            <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '50px', textAlign: 'center', letterSpacing: '-2px', textTransform: 'uppercase' }}>
              WHERE TO <span style={{ color: '#00a8ff' }}>NEXT?</span>
            </h2>
            
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginBottom: '80px' }}>
              <div style={{ position: 'relative' }}>
                <Search size={32} style={{ position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)', color: '#00a8ff' }} />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Enter destination or flight..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyDownInput}
                  style={{
                    width: '100%',
                    padding: '30px 40px 30px 90px',
                    fontSize: '1.8rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: suggestions.length > 0 ? '40px 40px 0 0' : '100px',
                    color: 'white',
                    outline: 'none',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                    transition: '0.3s'
                  }}
                  onFocus={e => e.target.style.background = 'rgba(255, 255, 255, 0.08)'}
                  onBlur={e => setTimeout(() => setSuggestions([]), 200)}
                />
                
                {suggestions.length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderTop: 'none',
                    borderRadius: '0 0 40px 40px',
                    overflow: 'hidden',
                    zIndex: 10
                  }}>
                    {suggestions.map((city, idx) => (
                      <div 
                        key={city}
                        onMouseDown={(e) => {
                          e.preventDefault(); // Prevent input onBlur from firing before this
                          setSearchQuery(city);
                          setSuggestions([]);
                          setShowSearchOverlay(false);
                          navigate(`/search?to=${encodeURIComponent(city)}`);
                        }}
                        style={{
                          padding: '20px 40px 20px 90px',
                          fontSize: '1.2rem',
                          cursor: 'pointer',
                          background: idx === activeSuggestion ? 'rgba(0, 168, 255, 0.2)' : 'transparent',
                          transition: '0.2s',
                          borderBottom: idx === suggestions.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                          color: 'white'
                        }}
                        onMouseOver={() => setActiveSuggestion(idx)}
                      >
                        <MapPin size={18} style={{ marginRight: '15px', color: '#00a8ff', verticalAlign: 'middle' }} />
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#00a8ff', marginBottom: '25px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                  <TrendingUp size={20} /> TRENDING
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                   {['Mumbai', 'Chennai', 'Bengaluru', 'Goa', 'Srinagar'].map(city => (
                     <span 
                       key={city} 
                       onClick={() => { 
                         const fullCity = indianStates.find(s => s.startsWith(city)) || city;
                         const updatedHistory = [fullCity, ...recentSearches.filter(s => s !== fullCity)].slice(0, 5);
                         setRecentSearches(updatedHistory);
                         localStorage.setItem('recentSearches', JSON.stringify(updatedHistory));
                         setShowSearchOverlay(false);
                         navigate(`/search?to=${encodeURIComponent(fullCity)}`);
                       }}
                       style={{ 
                         padding: '12px 28px', 
                         borderRadius: '50px', 
                         background: 'rgba(255,255,255,0.05)', 
                         border: '1px solid rgba(255, 255, 255, 0.05)', 
                         cursor: 'pointer', 
                         transition: '0.3s',
                         fontSize: '1rem',
                         fontWeight: 600
                       }}
                       onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                       onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                     >
                       {city}
                     </span>
                   ))}
                </div>
              </div>
              
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#00a8ff', marginBottom: '25px', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                  <Clock size={20} /> RECENT
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {recentSearches.map((item, idx) => (
                    <p 
                      key={idx}
                      onClick={() => {
                        setShowSearchOverlay(false);
                        navigate(`/search?to=${encodeURIComponent(item)}`);
                      }}
                      style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', gap: '10px' }}
                      onMouseOver={e => e.currentTarget.style.color = 'white'}
                      onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                      <Clock size={14} style={{ opacity: 0.5 }} /> {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--color-bg-primary)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          animation: 'fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          overflow: 'hidden'
        }}>
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent), transparent 90%) 0%, transparent 70%)',
            filter: 'blur(80px)',
            zIndex: -1
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-10%',
            left: '-10%',
            width: '50%',
            height: '50%',
            background: 'radial-gradient(circle, color-mix(in srgb, var(--color-accent), transparent 92%) 0%, transparent 70%)',
            filter: 'blur(100px)',
            zIndex: -1
          }}></div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '40px',
            borderBottom: '1px solid var(--glass-border)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <Plane color="var(--color-accent)" size={32} style={{ transform: 'rotate(-45deg)' }} />
              <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '2px' }}>AERO <span style={{ color: 'var(--color-accent)' }}>LUXE</span></span>
            </div>
            <div 
              onClick={() => setShowMobileMenu(false)}
              style={{ 
                cursor: 'pointer', 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                border: '1px solid var(--glass-border)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                transition: '0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
              onMouseOut={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}
            >
              <X size={24} style={{ color: 'var(--color-text-main)' }} />
            </div>
          </div>
          
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            padding: '40px',
            gap: '15px',
            overflowY: 'auto'
          }}>
            {[
              { label: 'Home', desc: 'Return to start', path: '/' },
              { label: 'Book a Flight', desc: 'Secure your next journey', path: '/search' },
              { label: 'Destinations', desc: 'Explore the world', path: '/#destinations' },
              { label: 'Experience', desc: 'Luxury redefined', path: '/#experience' },
              { label: 'Safety', desc: 'Our top priority', path: '/#safety' },
              { label: 'Fleet', desc: 'The royale standard', path: '/#fleet' }
            ].map((item, i) => (
              <a 
                key={item.label}
                href={item.path}
                onClick={() => setShowMobileMenu(false)}
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: '30px',
                  textDecoration: 'none', 
                  color: 'white',
                  padding: '15px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.03)',
                  transition: '0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: 'translateX(0)',
                  animation: `slideInRight 0.5s ease forwards ${i * 0.1}s`
                }}
                className="mobile-menu-item"
                onMouseOver={e => {
                  e.currentTarget.style.transform = 'translateX(20px)';
                  e.currentTarget.style.color = 'var(--color-accent)';
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <span style={{ 
                  fontSize: '0.9rem', 
                  color: 'var(--color-accent)', 
                  fontWeight: 800,
                  opacity: 0.5,
                  minWidth: '30px'
                }}>0{i + 1}</span>
                <div>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '4px' }}>{item.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>{item.desc}</div>
                </div>
              </a>
            ))}
          </div>
          
          <div style={{ 
            padding: '40px', 
            background: 'rgba(255,255,255,0.02)',
            borderTop: '1px solid var(--glass-border)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px' 
          }}>
             {user ? (
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                 <button 
                   className="btn btn-outline" 
                   style={{ padding: '18px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                   onClick={() => { navigate('/profile'); setShowMobileMenu(false); }}
                 >
                   <User size={18} /> My Profile
                 </button>
                 <button 
                   className="btn btn-primary" 
                   style={{ padding: '18px', borderRadius: '15px', background: '#ff4b4b', borderColor: '#ff4b4b', color: 'white' }}
                   onClick={() => { handleLogout(); setShowMobileMenu(false); }}
                 >
                   <LogOut size={18} /> Sign Out
                 </button>
               </div>
             ) : (
               <button 
                 className="btn btn-primary" 
                 style={{ width: '100%', padding: '22px', borderRadius: '18px', fontSize: '1.1rem', letterSpacing: '2px', textTransform: 'uppercase' }}
                 onClick={() => { setShowAuthModal(true); setShowMobileMenu(false); }}
               >
                 Access Luxury / Login
               </button>
             )}
             <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--color-text-muted)', letterSpacing: '1px', marginTop: '10px' }}>
               &copy; 2024 AERO LUXE PRIVATE AVIATION. ALL RIGHTS RESERVED.
             </p>
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
      <style>{`
        @keyframes headerFly {
          from { left: -200px; transform: translateY(-50%) rotate(2deg); }
          to { left: 120%; transform: translateY(-50%) rotate(2deg); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--color-accent);
        }
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
