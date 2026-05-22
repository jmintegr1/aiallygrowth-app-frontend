import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import StepWelcome from './steps/StepWelcome';
import StepGoals from './steps/StepGoals';
import StepTriggers from './steps/StepTriggers';
import StepPainPoints from './steps/StepPainPoints';
import StepIdentityStatement from './steps/StepIdentityStatement';
import StepVoicePersona from './steps/StepVoicePersona';
import StepComplete from './steps/StepComplete';
import './OnboardingContainer.css';

const TOTAL_STEPS = 7;

function OnboardingContainer() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [goals, setGoals] = useState('');
  const [triggers, setTriggers] = useState('');
  const [painPoints, setPainPoints] = useState('');
  const [identityStatement, setIdentityStatement] = useState('');
  const [voicePersona, setVoicePersona] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isLastStep = step === TOTAL_STEPS - 1;

  function canAdvance() {
    if (step === 3) return painPoints.trim().length > 0;
    return true;
  }

  async function handleSave() {
    if (!user) return;
    setLoading(true);
    setError('');
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        goals: goals.trim() ? [goals.trim()] : [],
        triggers: triggers.trim() ? [triggers.trim()] : [],
        painPoints: painPoints.trim() ? [painPoints.trim()] : [],
        identityStatement: identityStatement.trim() || null,
        voicePersona: voicePersona.trim() || null,
        onboardingComplete: true,
      });
      navigate('/home');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  function handleNext() {
    if (isLastStep) {
      handleSave();
      return;
    }
    setStep((s) => s + 1);
  }

  function handleBack() {
    setError('');
    setStep((s) => s - 1);
  }

  return (
    <div className="onboarding-container">
      <div className="onboarding-card">
        <div
          className="onboarding-progress"
          role="progressbar"
          aria-valuenow={step + 1}
          aria-valuemax={TOTAL_STEPS}
        >
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`onboarding-progress-dot${i <= step ? ' active' : ''}`}
            />
          ))}
        </div>

        {step === 0 && <StepWelcome />}
        {step === 1 && <StepGoals value={goals} onChange={setGoals} />}
        {step === 2 && <StepTriggers value={triggers} onChange={setTriggers} />}
        {step === 3 && <StepPainPoints value={painPoints} onChange={setPainPoints} />}
        {step === 4 && <StepIdentityStatement value={identityStatement} onChange={setIdentityStatement} />}
        {step === 5 && <StepVoicePersona value={voicePersona} onChange={setVoicePersona} />}
        {step === 6 && <StepComplete />}

        {error && <div className="onboarding-error">{error}</div>}

        <div className="onboarding-actions">
          {step > 0 && (
            <button
              className="onboarding-back-btn"
              type="button"
              onClick={handleBack}
              disabled={loading}
            >
              Back
            </button>
          )}
          <button
            className="onboarding-next-btn"
            type="button"
            onClick={handleNext}
            disabled={!canAdvance() || loading}
          >
            {loading ? 'Saving…' : isLastStep ? 'Start my journey' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OnboardingContainer;
