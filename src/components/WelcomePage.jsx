import React from 'react';
import './WelcomePage.css';

function WelcomePage({ onBegin }) {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="welcome-headline">
          This is the beginning of something real.
        </h1>
        <p className="welcome-subheading">
          Thousands of people just like you are benefiting from AI Ally.
        </p>
        <button className="welcome-button" onClick={onBegin}>
          Begin Your Journey!
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
