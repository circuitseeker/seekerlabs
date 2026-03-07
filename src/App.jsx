import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Vision from './components/Vision';
import LogoScroll from './components/LogoScroll';
import Alliance from './components/Alliance';
import Contact from './components/Contact';
import TechStack from './components/TechStack';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <LogoScroll />
      <Services />
      <Vision />
      <Alliance />
      <Contact />
      <TechStack />
      <Footer />
    </div>
  );
}

export default App;
