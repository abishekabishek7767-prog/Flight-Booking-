import React, { useState } from 'react';
import { X, Mail, Lock, User, ArrowRight, Eye, EyeOff, Loader2, Phone, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ScrollReveal from '../animations/ScrollReveal';

const AuthModal = ({ isOpen, onClose }) => {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    dob: ''
  });

  if (!isOpen) return null;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (activeTab === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          dob: formData.dob
        });
      }
      setIsLoading(false);
      onClose();
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const modalOverlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    animation: 'fade-in 0.3s ease'
  };

  const modalContentStyle = {
    width: '100%',
    maxWidth: '480px',
    background: 'var(--color-bg-secondary)',
    border: '1px solid var(--glass-border)',
    borderRadius: '24px',
    padding: '50px',
    position: 'relative',
    boxShadow: '0 40px 100px rgba(0,0,0,0.6), 0 0 40px color-mix(in srgb, var(--color-accent), transparent 90%)',
    overflow: 'hidden'
  };

  const tabStyle = (tab) => ({
    padding: '10px 25px',
    fontSize: '1rem',
    fontWeight: 700,
    cursor: 'pointer',
    color: activeTab === tab ? 'var(--color-accent)' : 'var(--color-text-muted)',
    borderBottom: activeTab === tab ? '2px solid var(--color-accent)' : '2px solid transparent',
    transition: 'var(--transition-fast)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  });

  const inputStyle = {
    width: '100%',
    padding: '15px 15px 15px 45px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const socialBtnStyle = {
    flex: 1,
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--glass-border)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'var(--transition-fast)',
    color: 'white',
    fontSize: '0.9rem'
  };

  return (
    <div style={modalOverlayStyle} onClick={onClose}>
      <ScrollReveal animation="scale-up">
        <div style={modalContentStyle} onClick={e => e.stopPropagation()}>
          
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '25px', right: '25px', background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', padding: '5px' }}
          >
            <X size={24} />
          </button>

          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
             <h2 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px', letterSpacing: '-2px' }}>
                {activeTab === 'login' ? 'WELCOME BACK' : 'JOIN THE ELITE'}
             </h2>
             <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', letterSpacing: '1px' }}>
                {activeTab === 'login' ? 'Enter your credentials to access luxury.' : 'Create an account for the first-class journey.'}
             </p>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', marginBottom: '35px', justifyContent: 'center', gap: '20px' }}>
            <div onClick={() => handleTabChange('login')} style={tabStyle('login')}>Login</div>
            <div onClick={() => handleTabChange('signup')} style={tabStyle('signup')}>Sign Up</div>
          </div>

          {error && (
            <div style={{ 
              background: 'rgba(255, 75, 75, 0.1)', 
              border: '1px solid rgba(255, 75, 75, 0.3)', 
              color: '#ff4b4b', 
              padding: '12px', 
              borderRadius: '8px', 
              marginBottom: '20px', 
              fontSize: '0.85rem',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          {activeTab === 'login' && !error && (
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center', marginBottom: '20px' }}>
              Hint: Use <b>admin@aeroluxe.com</b> / <b>password123</b>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {activeTab === 'signup' && (
              <>
                <div style={{ marginBottom: '25px' }}>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                    <input 
                      style={inputStyle} 
                      type="text" 
                      placeholder="Full Name" 
                      required={activeTab === 'signup'}
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                    <input 
                      style={inputStyle} 
                      type="tel" 
                      placeholder="Phone Number" 
                      required={activeTab === 'signup'}
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '25px' }}>
                  <div style={{ position: 'relative' }}>
                    <Calendar size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                    <input 
                      className="calendar-input"
                      style={inputStyle} 
                      type="date" 
                      placeholder="Date of Birth" 
                      required={activeTab === 'signup'}
                      value={formData.dob}
                      onChange={e => setFormData({...formData, dob: e.target.value})}
                    />
                  </div>
                </div>
              </>
            )}

            <div style={{ marginBottom: '25px' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                <input 
                  style={inputStyle} 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent)' }} />
                <input 
                  style={inputStyle} 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  required
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="btn btn-primary" 
              style={{ width: '100%', padding: '16px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: 700, marginBottom: '30px', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}
            >
              {isLoading ? (
                <>Authenticating <Loader2 size={18} className="spin" /></>
              ) : (
                <>{activeTab === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div style={{ position: 'relative', textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '1px', background: 'var(--glass-border)' }}></div>
            <span style={{ position: 'relative', padding: '0 15px', background: 'var(--color-bg-secondary)', fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Continue With One Click</span>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button style={socialBtnStyle}> <Mail size={18} /> Google</button>
            <button style={socialBtnStyle}> <User size={18} /> Social</button>
          </div>
        </div>
      </ScrollReveal>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AuthModal;
