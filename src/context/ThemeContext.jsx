import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { name: 'Gold', color: '#d4af37', hover: '#f1c40f', bgImage: '/gold-bg-v4.png' },
  { name: 'Emerald', color: '#10b981', hover: '#34d399', bgImage: '/emerald-bg-v4.png' },
  { name: 'Azure', color: '#0ea5e9', hover: '#38bdf8', bgImage: '/azure-bg-v4.png' },
  { name: 'Rose', color: '#fb7185', hover: '#fda4af', bgImage: '/rose-bg-v4.png' },
  { name: 'Platinum', color: '#e5e7eb', hover: '#f9fafb', bgImage: '/platinum-bg-v4.png' }
];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('flight-accent-theme');
    return saved ? JSON.parse(saved) : themes[0];
  });

  useEffect(() => {
    // Update CSS variables on root
    const root = document.documentElement;
    root.style.setProperty('--color-accent', currentTheme.color);
    root.style.setProperty('--color-accent-hover', currentTheme.hover);
    
    // Save to localStorage
    localStorage.setItem('flight-accent-theme', JSON.stringify(currentTheme));
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
