import React, { useState } from 'react';
import { User, Mail, MapPin, Calendar, Edit2, Shield, Bell, Save, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ScrollReveal from '../components/animations/ScrollReveal';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [isEditing, setIsEditing] = useState(false);
  const [securityView, setSecurityView] = useState('overview'); // overview, password, 2fa, sessions
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [faSuccess, setFaSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dob: user?.dob || ''
  });

  // Sync formData with user object whenever it changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        dob: user.dob || ''
      });
    }
  }, [user]);

  const [addresses, setAddresses] = useState(user?.addresses || [
    { id: 1, type: 'Home', address: 'Add your home address' },
  ]);

  const [addressView, setAddressView] = useState('list'); // list, form
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({ type: '', address: '' });

  const [sessions, setSessions] = useState([
    { id: 1, device: 'Current Device', info: 'Active Session', current: true }
  ]);

  const [notifications, setNotifications] = useState({
    email: user?.notifications?.email ?? true,
    push: user?.notifications?.push ?? false,
    offers: user?.notifications?.offers ?? true,
    security: user?.notifications?.security ?? true
  });

  const handleSave = () => {
    updateUser({ 
      name: formData.name, 
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return (
      <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="container">
        <ScrollReveal animation="reveal">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '40px' }}>
            Account <span style={{ color: 'var(--color-accent)' }}>Profile</span>
          </h1>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px' }}>
          {/* Sidebar */}
          <ScrollReveal animation="scale-up" delay={200}>
            <div className="glass-panel" style={{ padding: '30px' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ 
                  width: '120px', 
                  height: '120px', 
                  borderRadius: '50%', 
                  background: 'var(--color-accent)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: 'white',
                  boxShadow: '0 0 30px var(--color-accent)'
                }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{user.name}</h3>
                <p style={{ color: 'var(--color-text-muted)' }}>Premium Member</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {[
                  { icon: <User size={18} />, label: 'Personal Info' },
                  { icon: <Shield size={18} />, label: 'Security' },
                  { icon: <Bell size={18} />, label: 'Notifications' },
                  { icon: <MapPin size={18} />, label: 'Addresses' }
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => { setActiveTab(item.label); setIsEditing(false); }}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '15px', 
                      padding: '12px 20px', 
                      borderRadius: '12px',
                      background: activeTab === item.label ? 'rgba(255,255,255,0.05)' : 'transparent',
                      color: activeTab === item.label ? 'var(--color-accent)' : 'inherit',
                      cursor: 'pointer',
                      transition: '0.3s'
                    }}
                  >
                    {item.icon}
                    <span style={{ fontWeight: 600 }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Main Content */}
          <ScrollReveal animation="scale-up" delay={400}>
            <div className="glass-panel" style={{ padding: '40px', minHeight: '500px' }}>
              {activeTab === 'Personal Info' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Personal Details</h3>
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="btn btn-outline" 
                        style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}
                      >
                        <Edit2 size={16} /> Edit Profile
                      </button>
                    ) : (
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="btn btn-outline" 
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', borderColor: 'rgba(255,255,255,0.2)' }}
                        >
                          <X size={16} /> Cancel
                        </button>
                        <button 
                          onClick={handleSave}
                          className="btn btn-primary" 
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}
                        >
                          <Save size={16} /> Save Changes
                        </button>
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Full Name</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                        />
                      ) : (
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{formData.name}</p>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Email Address</label>
                      {isEditing ? (
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                        />
                      ) : (
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{formData.email}</p>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Phone Number</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                        />
                      ) : (
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{formData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Date of Birth</label>
                      {isEditing ? (
                        <input 
                          type="text" 
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                        />
                      ) : (
                        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{formData.dob}</p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '50px', padding: '30px', borderRadius: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)' }}>
                    <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px' }}>Luxe Points Status</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '75%', background: 'var(--color-accent)', borderRadius: '4px', boxShadow: '0 0 15px var(--color-accent)' }}></div>
                      </div>
                      <span style={{ fontWeight: 800, color: 'var(--color-accent)' }}>12,450 / 20,000</span>
                    </div>
                    <p style={{ marginTop: '15px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>You are only 7,550 points away from Platinum status!</p>
                  </div>
                </>
              )}

              {activeTab === 'Security' && (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                    {securityView !== 'overview' && (
                      <button 
                        onClick={() => setSecurityView('overview')}
                        style={{ background: 'transparent', border: 'none', color: 'var(--color-accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}
                      >
                         ← Back
                      </button>
                    )}
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Security Settings</h3>
                  </div>

                  {securityView === 'overview' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                      {[
                        { title: 'Change Password', desc: 'Update your password regularly to keep your account secure', label: 'Update', view: 'password' },
                        { title: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', label: 'Enable', view: '2fa' },
                        { title: 'Active Sessions', desc: 'You are currently logged in on 2 devices', label: 'Manage', view: 'sessions' }
                      ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '15px' }}>
                          <div>
                            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '5px' }}>{item.title}</h4>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
                          </div>
                          <button 
                            onClick={() => setSecurityView(item.view)}
                            className="btn btn-outline" 
                            style={{ fontSize: '0.8rem', padding: '8px 20px' }}
                          >
                            {item.label}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {securityView === 'password' && (
                    <div style={{ maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {passwordSuccess ? (
                        <div style={{ textAlign: 'center', padding: '40px 0', animation: 'scale-up 0.5s ease' }}>
                          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#4caf50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <ShieldCheck size={30} />
                          </div>
                          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '10px' }}>Password Updated!</h4>
                          <p style={{ color: 'var(--color-text-muted)', marginBottom: '25px' }}>Your account security has been successfully updated.</p>
                          <button 
                            onClick={() => { setSecurityView('overview'); setPasswordSuccess(false); }}
                            className="btn btn-primary" 
                            style={{ padding: '10px 30px' }}
                          >
                            Return to Security
                          </button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Current Password</label>
                            <input type="password" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} placeholder="••••••••" />
                          </div>
                          <div>
                            <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>New Password</label>
                            <input type="password" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} placeholder="Enter new password" />
                          </div>
                          <div>
                            <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Confirm New Password</label>
                            <input type="password" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }} placeholder="Confirm new password" />
                          </div>
                          <button 
                            onClick={() => setPasswordSuccess(true)}
                            className="btn btn-primary" 
                            style={{ marginTop: '10px' }}
                          >
                            Update Password
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {securityView === '2fa' && (
                    <div style={{ textAlign: 'center', padding: '40px 0' }}>
                      {faSuccess ? (
                        <div style={{ animation: 'scale-up 0.5s ease' }}>
                          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#4caf50', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 30px rgba(76, 175, 80, 0.3)' }}>
                            <ShieldCheck size={40} />
                          </div>
                          <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>2FA Enabled!</h4>
                          <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
                            Your account is now protected with an extra layer of security. We'll ask for a code when you log in from a new device.
                          </p>
                          <button 
                            onClick={() => { setSecurityView('overview'); setFaSuccess(false); }}
                            className="btn btn-primary" 
                            style={{ padding: '12px 40px' }}
                          >
                            Return to Security
                          </button>
                        </div>
                      ) : (
                        <>
                          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'color-mix(in srgb, var(--color-accent), transparent 90%)', color: 'var(--color-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                            <Shield size={40} />
                          </div>
                          <h4 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>Protect your account</h4>
                          <p style={{ color: 'var(--color-text-muted)', marginBottom: '30px', maxWidth: '400px', margin: '0 auto 30px' }}>
                            Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to log in.
                          </p>
                          <button 
                            onClick={() => setFaSuccess(true)}
                            className="btn btn-primary" 
                            style={{ padding: '12px 40px' }}
                          >
                            Setup 2FA Now
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {securityView === 'sessions' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {sessions.map((session) => (
                        <div key={session.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>{session.device}</h4>
                              {session.current && <span style={{ fontSize: '0.65rem', background: 'var(--color-accent)', color: 'white', padding: '2px 8px', borderRadius: '4px', fontWeight: 800 }}>ACTIVE</span>}
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{session.info}</p>
                          </div>
                          {!session.current && (
                            <button 
                              onClick={() => setSessions(sessions.filter(s => s.id !== session.id))}
                              style={{ background: 'transparent', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                      {sessions.length > 1 && (
                        <button 
                          onClick={() => setSessions(sessions.filter(s => s.current))}
                          className="btn btn-outline" 
                          style={{ marginTop: '20px', color: '#ff4b4b', borderColor: 'rgba(255,75,75,0.3)' }}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(255,75,75,0.05)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                        >
                          Sign Out of All Other Devices
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'Notifications' && (
                <>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '30px' }}>Notification Preferences</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {Object.entries({
                      email: 'Email Notifications',
                      push: 'Push Notifications',
                      offers: 'Special Offers & Promotions',
                      security: 'Security Alerts'
                    }).map(([key, label]) => (
                      <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{label}</span>
                        <div 
                          onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                          style={{ width: '50px', height: '26px', background: notifications[key] ? 'var(--color-accent)' : 'rgba(255,255,255,0.1)', borderRadius: '13px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}
                        >
                          <div style={{ position: 'absolute', top: '3px', left: notifications[key] ? '27px' : '3px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: '0.3s' }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === 'Addresses' && (
                <>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
                      {addressView === 'list' ? 'Saved Addresses' : (editingAddress ? 'Edit Address' : 'Add New Address')}
                    </h3>
                    {addressView === 'list' && (
                      <button 
                        onClick={() => { setAddressView('form'); setEditingAddress(null); setAddressForm({ type: '', address: '' }); }}
                        className="btn btn-primary" 
                        style={{ fontSize: '0.85rem' }}
                      >
                        + Add New
                      </button>
                    )}
                  </div>

                  {addressView === 'list' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                      {addresses.map((addr) => (
                        <div key={addr.id} style={{ padding: '25px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--color-accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>{addr.type}</span>
                            <p style={{ fontSize: '1rem', fontWeight: 600, maxWidth: '400px', lineHeight: 1.5 }}>{addr.address}</p>
                          </div>
                          <div style={{ display: 'flex', gap: '15px' }}>
                            <button 
                              onClick={() => { setEditingAddress(addr); setAddressForm({ type: addr.type, address: addr.address }); setAddressView('form'); }}
                              style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontWeight: 600 }}
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => setAddresses(addresses.filter(a => a.id !== addr.id))}
                              style={{ background: 'transparent', border: 'none', color: '#ff4b4b', cursor: 'pointer', fontWeight: 600 }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Address Label (e.g. Home, Work)</label>
                        <input 
                          type="text" 
                          value={addressForm.type}
                          onChange={(e) => setAddressForm({ ...addressForm, type: e.target.value })}
                          placeholder="e.g. Home"
                          style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', color: 'var(--color-text-muted)', fontSize: '0.85rem', marginBottom: '8px' }}>Full Address</label>
                        <textarea 
                          value={addressForm.address}
                          onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                          placeholder="Enter complete address"
                          style={{ width: '100%', height: '100px', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white', outline: 'none', resize: 'none' }}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                        <button 
                          onClick={() => setAddressView('list')}
                          className="btn btn-outline" 
                          style={{ flex: 1 }}
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => {
                            if (editingAddress) {
                              setAddresses(addresses.map(a => a.id === editingAddress.id ? { ...a, ...addressForm } : a));
                            } else {
                              setAddresses([...addresses, { id: Date.now(), ...addressForm }]);
                            }
                            setAddressView('list');
                          }}
                          className="btn btn-primary" 
                          style={{ flex: 1 }}
                        >
                          {editingAddress ? 'Save Changes' : 'Add Address'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Profile;
