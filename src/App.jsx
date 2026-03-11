import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tagline from './components/Tagline';
import About from './components/About';
import LogoScroll from './components/LogoScroll';
import Services from './components/Services';
import Vision from './components/Vision';
import TechStack from './components/TechStack';
import Alliance from './components/Alliance';
import Contact from './components/Contact';
import Footer from './components/Footer';
import VoiceAgent from './components/VoiceAgent';
import DashboardApp from './dashboard/DashboardApp';

// Track page visits — deferred to not block critical path
function useTracker() {
  const location = useLocation();
  useEffect(() => {
    // Use requestIdleCallback (or 3s timeout fallback) so tracking never blocks LCP
    const send = () => {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/track', JSON.stringify({
          site: window.location.hostname,
          page: location.pathname,
          referrer: document.referrer,
          ua: navigator.userAgent.slice(0, 120),
        }));
      } else {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            site: window.location.hostname,
            page: location.pathname,
            referrer: document.referrer,
            ua: navigator.userAgent.slice(0, 120),
          }),
          keepalive: true,
        }).catch(() => {});
      }
    };
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(send, { timeout: 3000 })
      : setTimeout(send, 2000);
    return () => {
      typeof requestIdleCallback !== 'undefined' ? cancelIdleCallback(id) : clearTimeout(id);
    };
  }, [location.pathname]);
}

function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  useTracker();

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  return (
    <>
      {showSplash && <Splash onComplete={handleSplashComplete} />}
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <Tagline />
        <About />
        <LogoScroll />
        <Services />
        <Vision />
        <TechStack />
        <Alliance />
        <Contact />
        <Footer />
      </div>
      <VoiceAgent />
    </>
  );
}

function DashboardPage() {
  useTracker();
  return <DashboardApp />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
