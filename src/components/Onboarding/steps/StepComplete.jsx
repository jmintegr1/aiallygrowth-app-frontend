import React from 'react';

function StepComplete() {
  return (
    <div className="onboarding-step onboarding-step--complete">
      <div className="onboarding-icon onboarding-icon--complete">✓</div>
      <h2 className="onboarding-heading">You're ready.</h2>
      <p className="onboarding-subtext">
        Ally knows what matters to you now. Every conversation, every check-in,
        every nudge — shaped by what you just shared.
      </p>
      <p className="onboarding-subtext">Let's build something real.</p>
    </div>
  );
}

export default StepComplete;
