import React from 'react';

function StepPainPoints({ value, onChange }) {
  return (
    <div className="onboarding-step">
      <h2 className="onboarding-heading">What does it cost you?</h2>
      <p className="onboarding-subtext">
        When you give in to the pattern, what do you actually lose? Think about your
        health, your sleep, your relationships, your self-respect, your future.
        This is what Ally will surface in the moment of temptation.
      </p>
      <textarea
        className="onboarding-textarea"
        placeholder="e.g. I lose sleep and wake up foggy. I lose respect for myself. Every slip steals a day from the person I'm trying to become."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={5}
        maxLength={500}
        autoFocus
      />
      <div className="onboarding-field-footer">
        <span className={`onboarding-required-note${value.trim() ? ' hidden' : ''}`}>
          Required
        </span>
        <span className="onboarding-char-count">{value.length} / 500</span>
      </div>
    </div>
  );
}

export default StepPainPoints;
