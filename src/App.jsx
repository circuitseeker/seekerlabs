import { useState, useCallback } from 'react';
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

function App() {
  const [showSplash, setShowSplash] = useState(true);

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
    </>
  );
}

export default App;
