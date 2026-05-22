import React from 'react';

function StepWelcome() {
  return (
    <div className="onboarding-step">
      <div className="onboarding-icon">✦</div>
      <h2 className="onboarding-heading">Welcome to AI Ally.</h2>
      <p className="onboarding-subtext">
        Over the next few minutes, you'll tell Ally about yourself — in your own words.
        The more honest you are, the more powerful your experience will be.
      </p>
      <p className="onboarding-subtext">There are no right answers. Just yours.</p>
    </div>
  );
}

export default StepWelcome;
