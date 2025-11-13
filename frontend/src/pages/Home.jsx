import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Certificates from '../components/Certificates';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <Hero />
      <Experience />
      <Skills />
      <Certificates />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
