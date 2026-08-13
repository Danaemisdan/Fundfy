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
import HarshaPoster from './pages/HarshaPoster';
import PresentationPoster from './pages/PresentationPoster';
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

      const trackClick = async () => {
        try {
          // First try RPC
          const { error: rpcError } = await supabase.rpc('increment_click', { ref_code: ref });
          if (rpcError) {
            // Fallback to select + update
            const { data: profile } = await supabase.from('profiles').select('id, clicks').eq('referral_code', ref.toUpperCase()).single();
            if (profile) {
              await supabase.from('profiles').update({ clicks: (profile.clicks || 0) + 1 }).eq('id', profile.id);
            }
          }
        } catch (err) {
          console.error('Failed to track referral click:', err);
        }
      };

      trackClick();
    }
  }, [location]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('hasSeenSplash'));

  useEffect(() => {
    if (!showSplash) {
      document.body.style.overflow = 'unset';
      return;
    }

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
  }, [showSplash]);

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
        <Route path="/harsha-poster/:id" element={<HarshaPoster />} />
        <Route path="/presentation-poster/:id" element={<PresentationPoster />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
