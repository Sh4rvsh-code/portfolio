import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, Building2 } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      id: 1,
      title: 'AI Engineer Certification',
      issuer: 'OneRoadmap',
      date: 'Jul 2025',
      credentialId: null,
      description: 'Comprehensive certification covering AI engineering principles, machine learning algorithms, and practical implementation.',
      skills: [],
      image: '/certificates/ai-engineer.jpg',
      verifyLink: '#',
    },
    {
      id: 2,
      title: 'Tata - GenAI Powered Data Analytics Job Simulation',
      issuer: 'Forage',
      date: 'Jul 2025',
      credentialId: 'hPQPcDKKbJg4c398P',
      description: 'Hands-on job simulation focusing on data analytics powered by generative AI technologies.',
      skills: [],
      image: '/certificates/tata-genai.jpg',
      verifyLink: '#',
    },
    {
      id: 3,
      title: 'Academy Accreditation - Generative AI Fundamentals',
      issuer: 'Databricks',
      date: 'May 2025',
      expires: 'May 2027',
      credentialId: '143278802',
      description: 'Fundamental concepts and applications of generative AI technologies and their implementation.',
      skills: [],
      image: '/certificates/databricks-genai.jpg',
      verifyLink: '#',
    },
    {
      id: 4,
      title: 'Data Analytics Essentials',
      issuer: 'Cisco',
      date: 'May 2025',
      credentialId: null,
      description: 'Essential data analytics concepts and techniques for business intelligence.',
      skills: ['Dashboards', 'Data Analysis', 'Data Storytelling', 'Data Visualization', 'Microsoft Excel', 'SQL', 'Tableau'],
      image: '/certificates/cisco-data-analytics.jpg',
      verifyLink: '#',
    },
    {
      id: 5,
      title: 'Python Essentials 1',
      issuer: 'Cisco',
      date: 'May 2025',
      credentialId: null,
      description: 'Foundation course covering Python programming language basics and essential concepts.',
      skills: ['Python (Programming Language)'],
      image: '/certificates/cisco-python1.jpg',
      verifyLink: '#',
    },
    {
      id: 6,
      title: 'Python Essentials 2',
      issuer: 'Cisco',
      date: 'May 2025',
      credentialId: null,
      description: 'Advanced Python programming concepts and practical applications.',
      skills: ['Python (Programming Language)'],
      image: '/certificates/cisco-python2.jpg',
      verifyLink: '#',
    },
    {
      id: 7,
      title: 'Responsible AI in the Generative AI Era',
      issuer: 'Fractal',
      date: 'May 2025',
      credentialId: 'RFCAH2LT0GR1',
      description: 'Ethics and responsible practices in implementing generative AI technologies.',
      skills: [],
      image: '/certificates/fractal-responsible-ai.jpg',
      verifyLink: '#',
    },
    {
      id: 8,
      title: 'SQL(Basic)',
      issuer: 'HackerRank',
      date: 'May 2025',
      credentialId: null,
      description: 'Basic SQL querying and database management skills.',
      skills: ['SQL'],
      image: '/certificates/hackerrank-sql.jpg',
      verifyLink: '#',
    },
    {
      id: 9,
      title: 'Data Visualization Fundamentals',
      issuer: 'Microsoft',
      date: 'Apr 2025',
      credentialId: 'EF20ZC7LED3Y',
      description: 'Fundamentals of data visualization and creating compelling data stories.',
      skills: ['Microsoft Power BI', 'Report Design', 'Data Storytelling', 'Data Visualization', 'Chart creation'],
      image: '/certificates/microsoft-data-viz.jpg',
      verifyLink: '#',
    },
    {
      id: 10,
      title: 'Foundations of User Experience (UX) Design',
      issuer: 'Google',
      date: 'Apr 2025',
      credentialId: 'AB30UWS6FI0S',
      description: 'Foundation course covering core principles and practices of user experience design.',
      skills: ['User Experience (UX)', 'UX Research'],
      image: '/certificates/google-ux-foundations.jpg',
      verifyLink: '#',
    },
    {
      id: 11,
      title: 'Start the UX Design Process: Empathize, Define, and Ideate',
      issuer: 'Google',
      date: 'Apr 2025',
      credentialId: 'E9UVX4F4QKTP',
      description: 'Deep dive into the UX design process focusing on user empathy, problem definition, and ideation.',
      skills: ['UX Research', 'Usability Testing', 'Prototype Framework'],
      image: '/certificates/google-ux-process.jpg',
      verifyLink: '#',
    },
  ];

  return (
    <section id="certificates" className="relative py-24 bg-black">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="text-sm tracking-widest text-gray-400 font-mono mb-6">
            <sup>04</sup> CREDENTIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            Certifications
          </h2>
          <p className="text-gray-400 text-base font-light max-w-3xl mx-auto leading-relaxed">
            Professional certifications and courses that validate my expertise across various domains
          </p>
        </motion.div>

        {/* Certificates Grid - Show only first 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.slice(0, 4).map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 h-full">
                {/* Certificate Image/Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-white/[0.03] to-white/[0.01] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-pink-900/10" />
                  <Award className="w-16 h-16 text-white/20 group-hover:text-white/30 transition-colors duration-300" />
                  {/* If you have actual certificate images, replace the above with:
                  <img 
                    src={cert.image} 
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  /> */}
                </div>

                {/* Certificate Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-normal text-white mb-2 leading-relaxed group-hover:text-gray-100 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-gray-400 font-light flex items-center gap-2 mb-2">
                      <Building2 className="w-3.5 h-3.5" />
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-gray-500 font-light flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {cert.date}
                      {cert.expires && ` · Expires ${cert.expires}`}
                    </p>
                  </div>

                  <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 font-light mb-2">Skills:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-white/[0.03] border border-white/[0.08] rounded text-gray-400 text-xs font-light"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="mb-4 pb-4 border-b border-white/[0.05]">
                      <p className="text-xs text-gray-500 font-light">
                        Credential ID: <span className="text-gray-400">{cert.credentialId}</span>
                      </p>
                    </div>
                  )}

                  {/* Verify Link */}
                  <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300 font-light"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Show Credential
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/certificates"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full text-base font-medium hover:bg-gray-200 transition-all duration-300 shadow-lg"
          >
            View All Certificates
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
