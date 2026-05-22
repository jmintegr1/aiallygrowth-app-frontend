import React from 'react';

function StepIdentityStatement({ value, onChange }) {
  return (
    <div className="onboarding-step">
      <h2 className="onboarding-heading">Who are you becoming?</h2>
      <p className="onboarding-subtext">
        Complete this sentence: <em>"I am someone who…"</em>
      </p>
      <textarea
        className="onboarding-textarea"
        placeholder="…shows up every day, even when it's hard."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        maxLength={300}
        autoFocus
      />
      <p className="onboarding-char-count">{value.length} / 300</p>
    </div>
  );
}

export default StepIdentityStatement;
