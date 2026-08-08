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
import { AuthProvider } from './contexts/AuthContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    sessionStorage.removeItem('splashPlayed');
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0); // Force top
    
    const timer = setTimeout(() => {
      setShowSplash(false);
      sessionStorage.setItem('splashPlayed', 'true');
      document.body.style.overflow = 'unset';
      window.scrollTo(0, 0); // Snap to top before revealing
    }, 7200);
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, [showSplash]);

  return (
    <AuthProvider>
      <ScrollToTop />
      {showSplash && <SplashScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contests/:id" element={<ContestLayout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/success" element={<RegisterSuccess />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
