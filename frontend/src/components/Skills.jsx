import { motion } from 'framer-motion';
import { Brain, Palette, Code, Database, Cloud, Container, Cpu, Layers, FileCode, Layout, Palette as PaletteIcon, Users, Search, Smartphone, Globe, Server, Box } from 'lucide-react';
import { useState } from 'react';

const Skills = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techDetails = {
    // Backend AI Engineer
    'Python': { icon: FileCode, description: 'Primary language for AI/ML development and backend systems' },
    'FastAPI': { icon: Server, description: 'High-performance Python framework for building APIs' },
    'TensorFlow': { icon: Cpu, description: 'Deep learning framework for building neural networks' },
    'PyTorch': { icon: Cpu, description: 'Flexible deep learning framework with dynamic computation' },
    'LangChain': { icon: Brain, description: 'Framework for building LLM-powered applications' },
    'Hugging Face': { icon: Brain, description: 'Platform for NLP models and transformers' },
    'Docker': { icon: Container, description: 'Containerization for consistent deployments' },
    'PostgreSQL': { icon: Database, description: 'Powerful relational database for structured data' },
    'Redis': { icon: Database, description: 'In-memory data store for caching and real-time data' },
    'AWS': { icon: Cloud, description: 'Cloud infrastructure for scalable AI deployments' },
    'Vector DBs': { icon: Database, description: 'Specialized databases for embedding storage and similarity search' },
    
    // UI/UX Designer
    'Figma': { icon: Layout, description: 'Collaborative interface design and prototyping tool' },
    'Adobe XD': { icon: Layout, description: 'Design and prototyping tool for user experiences' },
    'Sketch': { icon: PaletteIcon, description: 'Vector-based design tool for interfaces' },
    'Prototyping': { icon: Layers, description: 'Creating interactive mockups and user flows' },
    'Wireframing': { icon: Box, description: 'Low-fidelity design for structure and layout' },
    'Design Systems': { icon: Layers, description: 'Scalable component libraries and guidelines' },
    'User Research': { icon: Users, description: 'Understanding user needs and behaviors' },
    'Usability Testing': { icon: Search, description: 'Validating designs with real users' },
    
    // Web Developer
    'React': { icon: Code, description: 'Component-based library for building UIs' },
    'Next.js': { icon: Globe, description: 'React framework with SSR and routing' },
    'Node.js': { icon: Server, description: 'JavaScript runtime for backend development' },
    'TypeScript': { icon: FileCode, description: 'Typed superset of JavaScript for safer code' },
    'Tailwind CSS': { icon: PaletteIcon, description: 'Utility-first CSS framework for rapid styling' },
    'MongoDB': { icon: Database, description: 'NoSQL database for flexible data storage' },
    'Express': { icon: Server, description: 'Minimal Node.js framework for APIs' },
    'REST APIs': { icon: Server, description: 'RESTful web services for client-server communication' },
    'GraphQL': { icon: Server, description: 'Query language for efficient data fetching' },
  };

  const skills = [
    {
      icon: Brain,
      title: 'Backend AI Engineer',
      description:
        'Specialized in building robust AI backends, developing scalable machine learning pipelines, LLM integration, RAG systems, and deploying intelligent APIs using modern frameworks and cloud infrastructure.',
      gradient: 'from-gray-600 to-gray-400',
      skills: [
        'Python',
        'FastAPI',
        'TensorFlow',
        'PyTorch',
        'LangChain',
        'Hugging Face',
        'Docker',
        'PostgreSQL',
        'Redis',
        'AWS',
        'Vector DBs',
      ],
      projects: ['LLM APIs', 'RAG Systems', 'ML Pipelines'],
    },
    {
      icon: Palette,
      title: 'UI/UX Designer',
      description:
        'Creating beautiful, intuitive, and accessible interfaces with user-centered design principles, rapid prototyping, and comprehensive design systems that scale.',
      gradient: 'from-gray-500 to-gray-300',
      skills: [
        'Figma',
        'Adobe XD',
        'Sketch',
        'Prototyping',
        'Wireframing',
        'Design Systems',
        'User Research',
        'Usability Testing',
      ],
      projects: ['Design Systems', 'Mobile Apps', 'Web Interfaces'],
    },
    {
      icon: Code,
      title: 'Web Developer',
      description:
        'Building modern, responsive web applications with cutting-edge technologies. Expertise in full-stack development, performance optimization, and creating seamless user experiences.',
      gradient: 'from-gray-400 to-gray-200',
      skills: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'Tailwind CSS',
        'MongoDB',
        'Express',
        'REST APIs',
        'GraphQL',
      ],
      projects: ['Full-Stack Apps', 'SaaS Platforms', 'E-commerce Sites'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="skills" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-sm tracking-widest text-gray-400 font-mono mb-6">
            <sup>02</sup> EXPERTISE
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-white tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            What I Do Best
          </h2>
          <p className="text-gray-400 text-base font-light max-w-2xl mx-auto leading-relaxed">
            Combining technical excellence with creative problem-solving to deliver exceptional results
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group relative"
            >
              {/* Card */}
              <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5">
                {/* White overlay on hover */}
                <div
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300"
                />

                {/* Icon */}
                <div className="relative mb-6">
                  <div
                    className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                  >
                    <skill.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-light text-white mb-4 tracking-tight">
                  {skill.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {skill.description}
                </p>

                {/* Skills List - Icons Only with Name Tooltip */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {skill.skills.map((tech) => {
                      const TechIcon = techDetails[tech]?.icon || Code;
                      
                      return (
                        <div
                          key={tech}
                          className="relative group/tech"
                          onMouseEnter={() => setHoveredTech(tech)}
                          onMouseLeave={() => setHoveredTech(null)}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-200 cursor-pointer"
                          >
                            <TechIcon className="w-6 h-6 text-white" />
                          </motion.div>
                          
                          {/* Tooltip - Show Tech Name */}
                          {hoveredTech === tech && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none"
                            >
                              {tech}
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                                <div className="border-4 border-transparent border-t-white"></div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Project Tags */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    Specializations:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skill.projects.map((project) => (
                      <span
                        key={project}
                        className="px-3 py-1 text-xs font-medium bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-200"
                      >
                        {project}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
