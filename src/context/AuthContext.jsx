import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user session and registered users on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('aero_user');
    const savedRegisteredUsers = localStorage.getItem('aero_registered_users');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedRegisteredUsers) {
      setRegisteredUsers(JSON.parse(savedRegisteredUsers));
    } else {
      // Default mock users
      const defaults = [
        { email: 'admin@aeroluxe.com', password: 'password123', name: 'Admin User', initials: 'A' },
        { email: 'user@test.com', password: 'password123', name: 'Test User', initials: 'T' }
      ];
      setRegisteredUsers(defaults);
      localStorage.setItem('aero_registered_users', JSON.stringify(defaults));
    }
    
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
          const sessionUser = { ...foundUser };
          delete sessionUser.password; // Don't store password in session
          setUser(sessionUser);
          localStorage.setItem('aero_user', JSON.stringify(sessionUser));
          resolve(sessionUser);
        } else {
          reject(new Error('Invalid email or password. Please check your credentials.'));
        }
      }, 1000);
    });
  };

  const register = (userData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = registeredUsers.some(u => u.email === userData.email);
        if (exists) {
          reject(new Error('User already exists with this email.'));
        } else {
          const newUser = { 
            ...userData, 
            initials: (userData.name ? userData.name[0] : userData.email[0]).toUpperCase() 
          };
          const updatedUsers = [...registeredUsers, newUser];
          setRegisteredUsers(updatedUsers);
          localStorage.setItem('aero_registered_users', JSON.stringify(updatedUsers));
          
          // Log in automatically after registration
          const sessionUser = { ...newUser };
          delete sessionUser.password;
          setUser(sessionUser);
          localStorage.setItem('aero_user', JSON.stringify(sessionUser));
          
          resolve(sessionUser);
        }
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aero_user');
  };

  const updateUser = (newData) => {
    setUser(prev => {
      const updatedUser = { ...prev, ...newData };
      localStorage.setItem('aero_user', JSON.stringify(updatedUser));
      
      // Also update in registered list
      const updatedList = registeredUsers.map(u => u.email === prev.email ? { ...u, ...newData } : u);
      setRegisteredUsers(updatedList);
      localStorage.setItem('aero_registered_users', JSON.stringify(updatedList));
      
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading, registeredUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
