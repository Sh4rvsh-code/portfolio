import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, MapPin, Award, Code } from 'lucide-react';

const Experience = () => {
  const education = [
    {
      type: 'education',
      degree: 'Bachelor of Technology - BTech, Electrical, Electronic and Communications Engineering Technology/Technician',
      university: 'International Institute of Information Technology, Bhubaneswar',
      location: 'Bhubaneswar, Odisha, India',
      duration: '2022 - 2026',
      description: 'Pursuing Bachelor of Technology with specialization in Electronics and Communication Engineering, with strong focus on software development and emerging technologies.',
      achievements: [
        'Active member of technical clubs and innovation labs',
        'Participated in various hackathons and technical events',
        'Developed multiple full-stack projects',
        'Strong foundation in both hardware and software domains',
      ],
      relevantCourses: [
        'Java',
        'Object-Oriented Programming (OOP)',
        'Data Structures & Algorithms',
        'Web Development',
        'Database Management',
        'Digital Electronics',
      ],
    },
  ];

  const experiences = [
    {
      type: 'work',
      title: 'UI/UX Designer',
      company: 'Nuacem AI',
      employmentType: 'Internship',
      location: 'Hyderabad, Telangana, India',
      locationType: 'On-site',
      duration: 'Jun 2024 - Aug 2024',
      durationLength: '3 mos',
      description: 'Designed user-centric interfaces and conducted extensive UX research to enhance product usability and user satisfaction.',
      responsibilities: [
        'Conducted comprehensive UX research and user testing sessions',
        'Designed intuitive user interfaces using Figma',
        'Created wireframes, prototypes, and high-fidelity mockups',
        'Collaborated with development team to implement designs',
        'Analyzed user feedback and iteratively improved designs',
      ],
      skills: ['UX Research', 'Figma (Software)', 'User Interface Design', 'Prototyping', 'Wireframing', 'User Testing'],
    },
  ];

  return (
    <section id="experience" className="relative py-24 bg-black">
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
            <sup>01</sup> BACKGROUND
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight" style={{ fontFamily: 'Times New Roman, serif' }}>
            Education & Experience
          </h2>
          <p className="text-gray-400 text-base font-light max-w-3xl mx-auto leading-relaxed">
            My academic foundation and professional journey in technology and design
          </p>
        </motion.div>

        {/* Education Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-xl font-light text-gray-400 mb-1 tracking-wide flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Education
            </h3>
          </motion.div>

          <div className="space-y-6">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-8 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                  {/* Header */}
                  <div className="mb-5">
                    <h4 className="text-xl font-normal text-white mb-2 leading-relaxed">
                      {edu.degree}
                    </h4>
                    <p className="text-base text-gray-300 font-light mb-4">
                      {edu.university}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {edu.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h5 className="text-sm font-normal text-gray-300 mb-3 uppercase tracking-wider">
                      Highlights
                    </h5>
                    <ul className="space-y-2">
                      {edu.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                          <span className="text-gray-600 mt-1.5">—</span>
                          <span className="font-light">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills */}
                  <div>
                    <h5 className="text-sm font-normal text-gray-300 mb-3 uppercase tracking-wider">
                      Key Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.relevantCourses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded text-gray-400 text-xs font-light tracking-wide"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h3 className="text-xl font-light text-gray-400 mb-1 tracking-wide flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Experience
            </h3>
          </motion.div>
          
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-8 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
                  {/* Header */}
                  <div className="mb-5">
                    <h4 className="text-xl font-normal text-white mb-2 leading-relaxed">
                      {exp.title}
                    </h4>
                    <p className="text-base text-gray-300 font-light mb-1">
                      {exp.company} · {exp.employmentType}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-1">
                      <span>{exp.duration} · {exp.durationLength}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.location} · {exp.locationType}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  {exp.responsibilities && (
                    <div className="mb-6">
                      <h5 className="text-sm font-normal text-gray-300 mb-3 uppercase tracking-wider">
                        Responsibilities
                      </h5>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-400 text-sm">
                            <span className="text-gray-600 mt-1.5">—</span>
                            <span className="font-light">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {exp.skills && (
                    <div>
                      <h5 className="text-sm font-normal text-gray-300 mb-3 uppercase tracking-wider">
                        Skills
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 bg-white/[0.03] border border-white/[0.08] rounded text-gray-400 text-xs font-light tracking-wide"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
