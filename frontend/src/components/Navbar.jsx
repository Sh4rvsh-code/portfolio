import { useState, useEffect } from 'react';
import { Sparkles, Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`transition-all duration-300 rounded-full ${
          scrolled
            ? 'bg-black/40 backdrop-blur-xl shadow-2xl border border-white/20'
            : 'bg-black/20 backdrop-blur-md border border-white/10'
        }`}
      >
        <div className="flex items-center justify-center gap-1 px-8 py-3">
          {/* Animated Logo/Name */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer mr-12"
            onClick={() => scrollToSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="text-xl font-bold text-white tracking-wide"
              style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
              animate={{
                textShadow: [
                  '0 0 10px rgba(255,255,255,0.3)',
                  '0 0 20px rgba(255,255,255,0.5)',
                  '0 0 10px rgba(255,255,255,0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Sharvesh Raja
            </motion.span>
            <motion.span
              className="text-base font-light text-white/80 tracking-widest uppercase"
              style={{ fontFamily: '"Outfit", "Inter", sans-serif', letterSpacing: '0.15em' }}
              animate={{
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Portfolio
            </motion.span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full relative ${
                  activeSection === link.id
                    ? 'text-black bg-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="https://drive.google.com/file/d/1QqlfDCHP75MyN1cFQBISj5JLL50GEqsk/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-6 px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Resume
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.div>


      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden fixed top-20 left-4 right-4 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeSection === link.id
                      ? 'bg-white text-black font-medium'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <a
                href="https://drive.google.com/file/d/1QqlfDCHP75MyN1cFQBISj5JLL50GEqsk/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-black rounded-xl text-center font-medium hover:bg-gray-200 mt-2"
              >
                <FileText className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
