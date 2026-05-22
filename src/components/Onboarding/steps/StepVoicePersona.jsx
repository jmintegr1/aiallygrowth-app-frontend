import React from 'react';

function StepVoicePersona({ value, onChange }) {
  return (
    <div className="onboarding-step">
      <h2 className="onboarding-heading">How should Ally speak to you?</h2>
      <p className="onboarding-subtext">
        Describe the coaching style you want. Tough love? Warm and encouraging?
        Straight-talking? It's your call.
      </p>
      <textarea
        className="onboarding-textarea"
        placeholder="e.g. Be direct with me. Don't sugarcoat things, but remind me of my strengths when I'm spiraling."
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

export default StepVoicePersona;
