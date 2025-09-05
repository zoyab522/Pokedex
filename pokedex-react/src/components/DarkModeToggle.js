import React from 'react';

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
  return (
    <div className="dark-mode-toggle" onClick={onToggle}>
      <div className={`toggle-switch ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="toggle-slider">
          <div className="toggle-icon">
            {isDarkMode ? '🌙' : '☀️'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
