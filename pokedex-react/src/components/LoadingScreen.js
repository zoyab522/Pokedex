import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-div" style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'white',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }}>
      <div style={{ textAlign: 'center' }}>
        <img 
          src="/assets/pokeball-icon.png" 
          alt="Loading" 
          className="loading-ball" 
          style={{ width: '60px', height: '60px' }}
        />
        <p style={{ marginTop: '20px', fontSize: '18px' }}>Loading Pokemon data...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
