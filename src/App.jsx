import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Vision from './components/Vision';
import Alliance from './components/Alliance';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Vision />
      <Alliance />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
