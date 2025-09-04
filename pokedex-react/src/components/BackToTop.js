import React from 'react';

const BackToTop = ({ onClick }) => {
  return (
    <div className="back-to-top-button" onClick={onClick}>
      <img src="./assets/arrow-up-icon.png" alt="Back to top" />
    </div>
  );
};

export default BackToTop;
