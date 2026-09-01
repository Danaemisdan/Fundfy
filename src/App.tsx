import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useParams, useSearchParams, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ContestLayout from './pages/ContestLayout';
import SplashScreen from './components/SplashScreen';

// import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Poster from './pages/Poster';
import HarshaPoster from './pages/HarshaPoster';
import PresentationPoster from './pages/PresentationPoster';
import IDCard from './pages/IDCard';
import PresentationPDF from './pages/PresentationPDF';
import PresentationPDFNew from './pages/PresentationPDF_new';
import MOUPDF from './pages/MOUPDF';
import { AuthProvider } from './contexts/AuthContext';

import { supabase } from './lib/supabase';

// Redirect /contests/:id?ref=xxx → /?contest=:id&ref=xxx
// so users land on the home page and only hit the contest page via "Register Now"
function ContestRedirect() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');
  const target = `/?contest=${id}${ref ? `&ref=${ref}` : ''}`;
  return <Navigate to={target} replace />;
}

// Redirect old ai-education-innovation-contest links → career-accelerator-program
function OldEducationRedirect() {
  const [searchParams] = useSearchParams();
  const ref = searchParams.get('ref');
  const target = `/contest/career-accelerator-program${ref ? `?ref=${ref}` : ''}`;
  return <Navigate to={target} replace />;
}

// Redirect /:refCode → /?contest=career-accelerator-program&ref=:refCode
function ReferralRedirect() {
  const { refCode } = useParams<{ refCode: string }>();
  return <Navigate to={`/?contest=career-accelerator-program&ref=${refCode}`} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function ReferralTracker() {
  const [searchParams] = useSearchParams();
  // Only read the ref param — don't depend on the whole location object.
  // This means the effect only re-runs when the actual ?ref= value changes,
  // not on every route navigation.
  const ref = searchParams.get('ref');

  useEffect(() => {
    if (!ref) return;

    // ── 1. Always persist the code so the registration discount works ──
    sessionStorage.setItem('referral_code', ref);

    // ── 2. Session-level dedup: one count per ref code per browser tab session ──
    const sessionKey = `clicked_ref_${ref}`;
    if (sessionStorage.getItem(sessionKey)) return;

    // ── 3. Device-level dedup: 24 h cooldown per ref code per device ──
    const localKey = `clicked_ref_ts_${ref}`;
    const lastTracked = Number(localStorage.getItem(localKey) || 0);
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    if (Date.now() - lastTracked < TWENTY_FOUR_HOURS) {
      // Already counted recently — still mark session so we don't keep checking
      sessionStorage.setItem(sessionKey, 'true');
      return;
    }

    const trackClick = async () => {
      try {
        const { error: rpcError } = await supabase.rpc('increment_click', { ref_code: ref });
        if (rpcError) {
          // RPC not available — fallback to manual select + update
          const { data: profile } = await supabase
            .from('profiles')
            .select('id, clicks')
            .eq('referral_code', ref.toUpperCase())
            .single();
          if (profile) {
            await supabase
              .from('profiles')
              .update({ clicks: (profile.clicks || 0) + 1 })
              .eq('id', profile.id);
          }
        }
        // Mark as tracked so we don't double-count
        sessionStorage.setItem(sessionKey, 'true');
        localStorage.setItem(localKey, String(Date.now()));
      } catch (err) {
        console.error('Failed to track referral click:', err);
      }
    };

    trackClick();
  }, [ref]); // ← only re-runs if the actual ref VALUE changes

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
        <Route path="/contests/:id" element={<ContestRedirect />} />
        <Route path="/contest/ai-education-innovation-contest" element={<OldEducationRedirect />} />
        <Route path="/contest/:id" element={<ContestLayout />} />
        <Route path="/register" element={<Navigate to="/#registration-section" replace />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/poster/:id" element={<Poster />} />
        <Route path="/harsha-poster/:id" element={<HarshaPoster />} />
        <Route path="/presentation-poster/:id" element={<PresentationPoster />} />
        <Route path="/id-card/:ref" element={<IDCard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/pdf-presentation" element={<PresentationPDF />} />
        <Route path="/pdf-presentation-new" element={<PresentationPDFNew />} />
        <Route path="/pdf-mou" element={<MOUPDF />} />
        <Route path="/:refCode" element={<ReferralRedirect />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
