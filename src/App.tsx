import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ContestLayout from './pages/ContestLayout';
import SplashScreen from './components/SplashScreen';

import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Poster from './pages/Poster';
import { AuthProvider } from './contexts/AuthContext';

import { supabase } from './lib/supabase';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ReferralTracker() {
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const ref = searchParams.get('ref');

    if (ref) {
      // Always store it so the user gets the discount during registration
      sessionStorage.setItem('referral_code', ref);

      // Only track the click once per session to avoid spamming the DB
      const trackedKey = `tracked_click_${ref}`;
      if (!sessionStorage.getItem(trackedKey)) {
        sessionStorage.setItem(trackedKey, 'true');

        const trackClick = async () => {
          try {
            await supabase.rpc('increment_referral_click', { ref_code: ref });
          } catch (err) {
            console.error('Failed to track referral click:', err);
          }
        };

        trackClick();
      }
    }
  }, [location]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      setShowSplash(false);
      document.body.style.overflow = 'unset';
      window.scrollTo(0, 0);
    }, 7200);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AuthProvider>
      <ScrollToTop />
      <ReferralTracker />
      {showSplash && <SplashScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests/:id" element={<ContestLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/poster/:id" element={<Poster />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
