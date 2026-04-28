import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, setCurrentTheme, themes } = useTheme();

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Flight Color:
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setCurrentTheme(theme)}
            title={theme.name}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: theme.color,
              border: currentTheme.name === theme.name ? '2px solid white' : '1px solid rgba(255,255,255,0.2)',
              cursor: 'pointer',
              padding: 0,
              transition: 'var(--transition-fast)',
              transform: currentTheme.name === theme.name ? 'scale(1.2)' : 'scale(1)',
              boxShadow: currentTheme.name === theme.name ? `0 0 10px ${theme.color}` : 'none'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
