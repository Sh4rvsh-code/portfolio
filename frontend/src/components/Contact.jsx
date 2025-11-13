import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Contact = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Format time for IST (Indian Standard Time)
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      
      // Format date
      const dateString = now.toLocaleDateString('en-US', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).toUpperCase();
      
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const contactLinks = [
    {
      number: '01',
      label: 'TWITTER',
      handle: '[X]',
      link: 'https://twitter.com/sharveshraja',
    },
    {
      number: '02',
      label: 'LINKEDIN',
      handle: '',
      link: 'https://linkedin.com/in/sharveshraja',
    },
    {
      number: '03',
      label: 'SAVEE',
      handle: '',
      link: 'https://savee.it/sharveshraja',
    },
    {
      number: '04',
      label: 'INSTAGRAM',
      handle: '',
      link: 'https://instagram.com/sharveshraja',
    },
  ];

  return (
    <section id="contact" className="h-screen bg-black py-8 px-6 md:px-12 flex flex-col overflow-hidden">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between">
        {/* Top Section - Header Info and Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side - Navigation Style */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Section Number */}
            <div className="text-sm tracking-widest text-gray-400 font-mono">
              <sup>04</sup> CONTACT
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-light text-white leading-tight">
                Let's collaborate
              </h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl md:text-4xl font-light text-white">↳</span>
                <a 
                  href="mailto:sharveshhraja@gmail.com"
                  className="text-3xl md:text-4xl font-light text-white hover:text-gray-300 transition-colors duration-300 border-b-2 border-transparent hover:border-white"
                >
                  sharveshhraja@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Header Info and Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Header Info */}
            <div className="flex justify-between items-start text-sm font-mono">
              <div className="space-y-1">
                <p className="text-white tracking-wide">SHARVESH RAJA A.E</p>
                <p className="text-gray-400 tracking-wide">BACKEND AI ENGINEER</p>
              </div>
              <div className="text-right space-y-1">
                <p className="text-white tracking-wide">{currentTime} [IST]</p>
                <p className="text-gray-400 tracking-wide">{currentDate}</p>
              </div>
            </div>

            {/* Contact Links - Top Right */}
            <div className="space-y-4 border-t border-white/20 pt-6">
              {contactLinks.map((link, index) => (
                <motion.a
                  key={link.number}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between py-2 border-b border-white/10 hover:border-white/50 transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs font-mono text-gray-500 group-hover:text-white transition-colors">
                      [{link.number}]
                    </span>
                    <span className="text-lg tracking-wide text-white group-hover:text-gray-300 transition-colors font-light">
                      {link.label}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 group-hover:text-white transition-colors">
                    {link.handle}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Large "Connect" Typography */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 mb-0"
        >
          <div className="relative overflow-hidden -mx-6 md:-mx-12 -mb-8">
            <div 
              className="text-[15rem] md:text-[20rem] lg:text-[25rem] xl:text-[30rem] font-serif leading-none text-white select-none"
              style={{ 
                fontFamily: 'Times New Roman, serif',
                fontWeight: '400',
                letterSpacing: '-0.08em'
              }}
            >
              Connect
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
