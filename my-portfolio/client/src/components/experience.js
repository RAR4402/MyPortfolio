import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Sample experience data (customize as needed)
const experiences = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'TechCorp Solutions',
    duration: 'Jan 2022 - Present',
    description: 'Building responsive, accessible UIs with React and modern CSS. Collaborating with designers and backend teams to deliver seamless user experiences.',
    logoUrl: '/logos/techcorp.png',
  },
  {
    id: 2,
    role: 'UI/UX Intern',
    company: 'Creative Minds',
    duration: 'Jun 2021 - Dec 2021',
    description: 'Assisted in wireframing and prototyping user flows. Conducted usability tests and iterated designs based on feedback.',
    logoUrl: '/logos/creativeminds.png',
  },
  {
    id: 3,
    role: 'Web Developer',
    company: 'Freelance',
    duration: 'Mar 2020 - May 2021',
    description: 'Delivered end-to-end web solutions for small businesses, including portfolio sites, e-commerce landing pages, and custom WordPress themes.',
    logoUrl: '/logos/freelance.png',
  },
];

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 50, rotateX: 10 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
};

const Experience = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  return (
    <motion.section
      id="experience"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      style={styles.section}
    >
      <h2 style={styles.heading}>Experience</h2>
      <motion.div
        style={styles.grid}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            style={styles.card}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
          >
            <img src={exp.logoUrl} alt={exp.company} style={styles.logo} />
            <div style={styles.content}>
              <h3 style={styles.role}>{exp.role}</h3>
              <p style={styles.company}>{exp.company}</p>
              <span style={styles.duration}>{exp.duration}</span>
              <p style={styles.description}>{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Experience;

// Styles
const styles = {
  section: {
    padding: '60px 20px',
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '40px',
    color: '#222',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
    justifyItems: 'center',
  },
  card: {
    backgroundColor: '#f9fafb',
    borderRadius: '10px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    padding: '20px',
    maxWidth: '350px',
    textAlign: 'left',
    transformStyle: 'preserve-3d',
  },
  logo: {
    width: '60px',
    height: '60px',
    objectFit: 'contain',
    marginBottom: '15px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  role: {
    fontSize: '1.25rem',
    margin: 0,
    color: '#111',
  },
  company: {
    fontSize: '1rem',
    color: '#555',
    margin: 0,
  },
  duration: {
    fontSize: '0.9rem',
    color: '#888',
  },
  description: {
    fontSize: '0.9rem',
    color: '#666',
    marginTop: '10px',
  },
};