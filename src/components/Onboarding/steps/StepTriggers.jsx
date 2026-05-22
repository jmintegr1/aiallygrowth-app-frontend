import React from 'react';

function StepTriggers({ value, onChange }) {
  return (
    <div className="onboarding-step">
      <h2 className="onboarding-heading">When do you feel yourself slipping?</h2>
      <p className="onboarding-subtext">
        Describe the places, times of day, or emotional states that put you at risk —
        the moments when the pull toward old patterns feels strongest.
      </p>
      <textarea
        className="onboarding-textarea"
        placeholder="e.g. Late at night when I'm alone. Walking past the bakery. When I'm stressed or bored at work."
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

export default StepTriggers;
