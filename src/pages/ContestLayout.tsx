import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { getContestConfig } from '../data/contests';
import Header from '../components/layout/Header';
import { MotionButton } from '../components/ui/MotionButton';

// Event Components
import EventHero from '../components/contests/EventHero';
import EventAbout from '../components/contests/EventAbout';
import EventWhyParticipate from '../components/contests/EventWhyParticipate';
import EventResources from '../components/contests/EventResources';
import EventRewards from '../components/contests/EventRewards';
import EventTimeline from '../components/contests/EventTimeline';
import EventJudging from '../components/contests/EventJudging';
import EventFAQ from '../components/contests/EventFAQ';
import EventRegistration from '../components/contests/EventRegistration';
import Footer from '../components/layout/Footer';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ContestLayout() {
  const { id } = useParams();
  const navigate = useNavigate();
  const config = getContestConfig(id || '');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    if (config) {
      document.title = config.seo.title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', config.seo.description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = config.seo.description;
        document.head.appendChild(meta);
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowSticky(true);
      } else {
        setShowSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [config]);

  if (!config) {
    return <Navigate to="/" replace />;
  }

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const ref = params.get('ref');

  useEffect(() => {
    // If a user clicks a shared contest link with a referral code, bounce them to the Home page first!
    if (ref && !sessionStorage.getItem('hasVisitedHome')) {
      navigate(`/?contest=${config.id}&ref=${ref}`, { replace: true });
    }
  }, [ref, navigate, config.id]);

  const registrationPath = `/register?contest=${config.id}${ref ? `&ref=${ref}` : ''}`;

  const handleRegisterClick = () => {
    navigate(registrationPath);
  };

  const logoUrl = `/?contest=${config.id}${ref ? `&ref=${ref}` : ''}`;

  return (
    <div className="min-h-screen w-full bg-[#050505] font-sans relative">
      {/* Global Progress Bar */}
      <motion.div 
        className={`fixed top-0 left-0 right-0 h-1 z-50 bg-${config.theme.primaryAccent} origin-left`}
        style={{ scaleX }}
      />

      <Header 
        registrationUrl={registrationPath}
        buttonText={config.registration.buttonText} 
        onRegisterClick={handleRegisterClick}
        logoUrl={logoUrl}
      />
      
      <main className="w-full relative z-10 flex flex-col">
        {/* 1. Massive Hero */}
        <EventHero data={config} theme={config.theme} onRegisterClick={handleRegisterClick} />
        
        {/* 2. About the Challenge */}
        {config.description && (
          <EventAbout data={config} />
        )}
        
        {/* 3. Why Participate */}
        {config.whyParticipate && config.whyParticipate.length > 0 && (
          <EventWhyParticipate data={config} />
        )}
        
        {/* 3.5 Premium Resources */}
        {config.resources && config.resources.length > 0 && (
          <EventResources data={config} />
        )}
        
        {/* 4. Rewards */}
        {config.rewards && config.rewards.length > 0 && (
          <EventRewards data={config} />
        )}
        
        {/* 5. How To Participate (Timeline) */}
        {config.timeline && config.timeline.length > 0 && (
          <EventTimeline data={config} />
        )}
        
        {/* 6. Judging */}
        {config.judgingCriteria && config.judgingCriteria.length > 0 && (
          <EventJudging data={config} />
        )}
        
        {/* 7. FAQ */}
        {config.faqs && config.faqs.length > 0 && (
          <EventFAQ data={config} />
        )}
        
        {/* 8. Registration */}
        <EventRegistration data={config} theme={config.theme} />
      </main>

      <Footer />

      {/* Sticky Register Button (Only if not coming soon) */}
      {config.status !== 'COMING_SOON' && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showSticky ? 0 : 100, opacity: showSticky ? 1 : 0 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <MotionButton 
            onClick={handleRegisterClick}
            label={config.registration.buttonText}
          />
        </motion.div>
      )}
    </div>
  );
}
