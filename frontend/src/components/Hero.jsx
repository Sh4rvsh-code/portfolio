import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, ChevronDown } from 'lucide-react';
import { BackgroundRippleEffect } from './ui/BackgroundRippleEffect';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = ['Backend AI Engineer', 'UI/UX Designer', 'Web Developer'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Github, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: Mail, url: 'mailto:your.email@example.com', label: 'Email' },
    { icon: Twitter, url: 'https://twitter.com/yourusername', label: 'Twitter' },
  ];

  return (
    <section
      id="home"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background Ripple Effect - Full Coverage */}
      <BackgroundRippleEffect rows={20} cols={50} cellSize={100} />

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-5 z-[2] pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1), transparent 50%)`,
        }}
      />

      {/* Subtle glow circles */}
      <div className="absolute inset-0 overflow-hidden z-[2] pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.01, 0.04, 0.01],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        />
      </div>

      {/* Content - Perfectly Centered */}
      <div className="relative z-[10] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-5xl text-gray-400 mb-4 font-light tracking-tight"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Hey there, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            style={{ fontFamily: 'Times New Roman, serif' }}
          >
            Sharvesh Raja
          </motion.h1>

          {/* Animated roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="h-12 mb-4"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={currentRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-xl md:text-2xl font-mono text-gray-400 tracking-wide uppercase"
              >
                {roles[currentRole]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Crafting elegant solutions at the intersection of AI, design, and code
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-white text-black rounded-full text-base font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg"
            >
              View My Work
            </motion.button>
            <motion.a
              href="YOUR_GOOGLE_DRIVE_LINK_HERE"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-white text-white rounded-full text-base font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Download Resume
            </motion.a>
          </motion.div>

          {/* Elegant Divider Line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
            className="flex items-center justify-center space-x-4 mt-8"
          >
            <motion.div 
              className="h-[1px] w-20 bg-gradient-to-r from-transparent via-white/50 to-white/20"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-2 h-2 rounded-full bg-white/40"
            />
            <motion.div 
              className="h-[1px] w-20 bg-gradient-to-l from-transparent via-white/50 to-white/20"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </motion.div>

          {/* Social Media Icons - Bottom Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex gap-6 justify-center items-center mt-12"
          >
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/in/sharvesh-raja-b126c789/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-gray-400 hover:text-gray-200 transition-colors" />
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/Sh4rvsh-code"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700 hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-gray-400 hover:text-gray-200 transition-colors" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer bg-gray-800/30 backdrop-blur-sm rounded-full p-2 border border-gray-700 hover:border-white transition-colors duration-300"
        onClick={() => scrollToSection('skills')}
      >
        <ChevronDown className="w-8 h-8 text-white" />
      </motion.div>
    </section>
  );
};

export default Hero;
