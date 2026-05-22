import React from 'react';

function StepGoals({ value, onChange }) {
  return (
    <div className="onboarding-step">
      <h2 className="onboarding-heading">What do you want to achieve?</h2>
      <p className="onboarding-subtext">
        Describe your goals in your own words. What does growth look like for you?
      </p>
      <textarea
        className="onboarding-textarea"
        placeholder="e.g. I want to build a daily workout habit and stop second-guessing myself at work."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        maxLength={500}
        autoFocus
      />
      <p className="onboarding-char-count">{value.length} / 500</p>
    </div>
  );
}

export default StepGoals;
