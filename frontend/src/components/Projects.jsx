import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Bot, Search, CheckCircle, Coffee, Flame, Users, Palette } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI Engineering' },
    { id: 'web', label: 'Web Development' },
    { id: 'design', label: 'UI/UX Design' },
  ];

  const projects = [
    {
      id: 1,
      title: 'RAG Bot',
      category: 'ai',
      description: 'Intelligent Retrieval-Augmented Generation chatbot using LangChain and vector databases for context-aware responses.',
      icon: Bot,
      technologies: ['Python', 'LangChain', 'Vector DB', 'FastAPI', 'OpenAI'],
      github: '#',
      demo: '#',
    },
    {
      id: 2,
      title: 'Research Assistant',
      category: 'ai',
      description: 'AI-powered research assistant that helps analyze documents, summarize papers, and extract key insights using NLP.',
      icon: Search,
      technologies: ['Python', 'NLP', 'Transformers', 'PyTorch', 'FastAPI'],
      github: '#',
      demo: '#',
    },
    {
      id: 3,
      title: 'AI Evaluation',
      category: 'ai',
      description: 'Comprehensive evaluation system for AI models with performance metrics, benchmarking, and automated testing.',
      icon: CheckCircle,
      technologies: ['Python', 'TensorFlow', 'MLflow', 'Pandas', 'Scikit-learn'],
      github: '#',
      demo: '#',
    },
    {
      id: 4,
      title: 'Brewfolio',
      category: 'web',
      description: 'Modern portfolio website for coffee enthusiasts with interactive UI, brew guides, and recipe management.',
      icon: Coffee,
      technologies: ['React', 'Next.js', 'Tailwind CSS', 'MongoDB', 'Node.js'],
      github: '#',
      demo: '#',
    },
    {
      id: 5,
      title: 'Spice Haven',
      category: 'web',
      description: 'E-commerce platform for spices with shopping cart, payment integration, and inventory management system.',
      icon: Flame,
      technologies: ['React', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
      github: '#',
      demo: '#',
    },
    {
      id: 6,
      title: 'JointDev Website',
      category: 'web',
      description: 'Collaborative development platform website with team management, project tracking, and real-time updates.',
      icon: Users,
      technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Socket.io'],
      github: '#',
      demo: '#',
    },
    {
      id: 7,
      title: 'Yeluri Foundation',
      category: 'design',
      description: 'NGO website design with intuitive navigation, donation flows, and impact storytelling for a charitable organization.',
      icon: Palette,
      technologies: ['Figma', 'UI Design', 'Prototyping', 'UX Research'],
      github: null,
      demo: '#',
    },
    {
      id: 8,
      title: 'SaaS Dashboard for Accounting',
      category: 'design',
      description: 'Modern dashboard interface for accounting software with data visualization, financial reporting, and user-friendly workflows.',
      icon: Palette,
      technologies: ['Figma', 'Dashboard Design', 'Data Visualization', 'UI/UX'],
      github: null,
      demo: '#',
    },
    {
      id: 9,
      title: 'Coin Flip Landing Page',
      category: 'design',
      description: 'Engaging landing page design for crypto platform with bold visuals, clear CTAs, and modern aesthetic.',
      icon: Palette,
      technologies: ['Figma', 'Landing Page', 'UI Design', 'Prototyping'],
      github: null,
      demo: '#',
    },
    {
      id: 10,
      title: 'Aura.co Landing Page',
      category: 'design',
      description: 'Clean and modern landing page design with focus on conversion optimization and seamless user experience.',
      icon: Palette,
      technologies: ['Figma', 'Landing Page', 'UX Research', 'Prototyping'],
      github: null,
      demo: '#',
    },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((project) => project.category === filter);

  // Show only first 4 projects (2x2 grid) on homepage
  const featuredProjects = filteredProjects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="text-sm tracking-widest text-gray-400 font-mono mb-6">
            <sup>03</sup> PORTFOLIO
          </div>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-white tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>My Work</h2>
          <p className="text-gray-400 text-base font-light max-w-2xl mx-auto leading-relaxed">A selection of my recent work spanning AI engineering, web development, and UI/UX design</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button key={category.id} onClick={() => setFilter(category.id)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === category.id ? 'bg-white text-black shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'}`}>
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => {
              const ProjectIcon = project.icon;
              return (
                <motion.div key={project.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1, duration: 0.5 }} whileHover={{ y: -10, scale: 1.02 }} className="group">
                  <div className="h-full bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-white/30 hover:shadow-2xl hover:shadow-white/5">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                        <ProjectIcon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-light text-white mb-3 tracking-tight">{project.title}</h3>
                    <p className="text-gray-400 mb-6 leading-relaxed text-sm font-light">{project.description}</p>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="px-2 py-1 text-xs font-medium bg-white/5 text-gray-300 rounded-md border border-white/10">{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-4">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors duration-200 text-sm">
                          <Github className="w-4 h-4" />Code
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm font-medium">
                          <ExternalLink className="w-4 h-4" />{project.isNotion ? 'View Portfolio' : 'Demo'}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full text-base font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg"
          >
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
