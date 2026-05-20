import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import './auth.css';

function LogIn() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('email');

  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Phone state
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [phoneStep, setPhoneStep] = useState(1);
  const confirmationResultRef = useRef(null);
  const recaptchaVerifierRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function resetPhoneState() {
    setPhoneStep(1);
    setCode('');
    confirmationResultRef.current = null;
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
      recaptchaVerifierRef.current = null;
    }
  }

  function switchMethod(m) {
    setMethod(m);
    setError('');
    resetPhoneState();
  }

  async function handleEmailLogIn(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleSendCode(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container-login', {
        size: 'invisible',
      });
      confirmationResultRef.current = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifierRef.current
      );
      setPhoneStep(2);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await confirmationResultRef.current.confirm(code);
      navigate('/home');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to continue your journey.</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${method === 'email' ? 'active' : ''}`}
            onClick={() => switchMethod('email')}
            type="button"
          >
            Email
          </button>
          <button
            className={`auth-tab ${method === 'phone' ? 'active' : ''}`}
            onClick={() => switchMethod('phone')}
            type="button"
          >
            Phone
          </button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        {method === 'email' && (
          <form className="auth-form" onSubmit={handleEmailLogIn}>
            <div className="auth-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                required
                autoComplete="current-password"
              />
            </div>
            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>
        )}

        {method === 'phone' && (
          <form
            className="auth-form"
            onSubmit={phoneStep === 1 ? handleSendCode : handleVerifyCode}
          >
            {phoneStep === 1 ? (
              <>
                <div className="auth-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 555 000 0000"
                    required
                    autoComplete="tel"
                  />
                </div>
                <p className="auth-hint">Include your country code, e.g. +1 for US.</p>
                <button className="auth-button" type="submit" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Verification Code'}
                </button>
              </>
            ) : (
              <>
                <div className="auth-field">
                  <label htmlFor="code">Verification Code</label>
                  <input
                    id="code"
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="6-digit code"
                    required
                    autoComplete="one-time-code"
                  />
                </div>
                <p className="auth-hint">Code sent to {phone}.</p>
                <button className="auth-button" type="submit" disabled={loading}>
                  {loading ? 'Verifying…' : 'Verify & Log In'}
                </button>
                <button
                  className="auth-button"
                  type="button"
                  style={{ background: 'none', color: '#4f46e5', boxShadow: 'none', fontWeight: 500 }}
                  onClick={() => { resetPhoneState(); setError(''); }}
                >
                  ← Change number
                </button>
              </>
            )}
          </form>
        )}

        <div id="recaptcha-container-login" />

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential': return 'Incorrect email or password.';
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/user-disabled': return 'This account has been disabled.';
    case 'auth/invalid-phone-number': return 'Please enter a valid phone number with country code.';
    case 'auth/too-many-requests': return 'Too many attempts. Please try again later.';
    case 'auth/invalid-verification-code': return 'Incorrect code. Please try again.';
    case 'auth/code-expired': return 'Code expired. Please request a new one.';
    default: return 'Something went wrong. Please try again.';
  }
}

export default LogIn;
