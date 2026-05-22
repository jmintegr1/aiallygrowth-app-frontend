import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { AuthProvider, useAuth } from './context/AuthContext';
import { db } from './firebase/config';
import WelcomePage from './components/WelcomePage';
import SignUp from './components/auth/SignUp';
import LogIn from './components/auth/LogIn';
import ProtectedRoute from './components/ProtectedRoute';
import OnboardingContainer from './components/Onboarding/OnboardingContainer';

// Redirects logged-in users away from public-only pages (/, /signup, /login)
function PublicOnlyRoute({ children }) {
  const { user } = useAuth();
  if (user === undefined) return null;
  if (user) return <Navigate to="/home" replace />;
  return children;
}

// Skips onboarding if the user has already completed it
function OnboardingGuard({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, 'users', user.uid)).then((snap) => {
      if (snap.exists() && snap.data().onboardingComplete) {
        navigate('/home', { replace: true });
      } else {
        setChecking(false);
      }
    });
  }, [user, navigate]);

  if (checking) return null;
  return children;
}

function HomePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <h2 style={{ color: '#1a1a2e', fontFamily: 'sans-serif' }}>Welcome back! Home page coming soon.</h2>
    </div>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <WelcomePage onBegin={() => navigate('/signup')} />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignUp />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LogIn />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <OnboardingGuard>
              <OnboardingContainer />
            </OnboardingGuard>
          </ProtectedRoute>
        }
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
