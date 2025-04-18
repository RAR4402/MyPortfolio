import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Initial certificate data (customizable)
const initialCertificates = [
  {
    id: 1,
    title: 'Full Stack Web Development',
    issuer: 'Coursera',
    date: 'March 2024',
    imageUrl: 'https://www.w3webschool.com/wp-content/uploads/2024/02/Full-Stack-Web-Development-Course-in-Kolkata.webp',
    fileUrl: '/certificates/cert1.pdf',
  },
  {
    id: 2,
    title: 'JavaScript Algorithms & Data Structures',
    issuer: 'freeCodeCamp',
    date: 'June 2023',
    imageUrl: '/images/cert2.jpg',
    fileUrl: '/certificates/cert2.pdf',
  },
  {
    id: 3,
    title: 'React - The Complete Guide',
    issuer: 'Udemy',
    date: 'January 2025',
    imageUrl: '/images/cert3.jpg',
    fileUrl: '/certificates/cert3.pdf',
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 100, rotateX: 15 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } },
};
const sectionVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const Certificates = () => {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', image: null, file: null });
  const controls = useAnimation();

  // Play section animation on mount
  useEffect(() => {
    controls.start('visible');
  }, [controls]);

  const handleInputChange = (e) => {
    const { name, files, value } = e.target;
    if (files) {
      setNewCert((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setNewCert((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCertificate = (e) => {
    e.preventDefault();
    const { title, issuer, date, image, file } = newCert;
    if (!title || !issuer || !date || !image || !file) return;
    const nextId = certificates.length ? Math.max(...certificates.map((c) => c.id)) + 1 : 1;
    const imageUrl = URL.createObjectURL(image);
    const fileUrl = URL.createObjectURL(file);

    setCertificates((prev) => [
      ...prev,
      { id: nextId, title, issuer, date, imageUrl, fileUrl },
    ]);
    setNewCert({ title: '', issuer: '', date: '', image: null, file: null });
    setIsFormOpen(false);
  };

  return (
    <motion.section
      id="certificates"
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      style={styles.section}
    >
      <h2 style={styles.heading}>Certificates</h2>
      <button style={styles.addButton} onClick={() => setIsFormOpen(true)}>
        + Add Certificate
      </button>
      {isFormOpen && (
        <motion.form
          style={styles.form}
          onSubmit={handleAddCertificate}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <input
            type="text"
            name="title"
            placeholder="Certificate Title"
            value={newCert.title}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="issuer"
            placeholder="Issuer"
            value={newCert.issuer}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="month"
            name="date"
            value={newCert.date}
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleInputChange}
            style={styles.input}
            required
          />
          <div style={styles.formActions}>
            <button type="submit" style={styles.submitButton}>Save</button>
            <button type="button" style={styles.cancelButton} onClick={() => setIsFormOpen(false)}>Cancel</button>
          </div>
        </motion.form>
      )}
      <motion.div
        style={styles.grid}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {certificates.map((cert) => (
          <motion.div
            key={cert.id}
            style={styles.card}
            variants={cardVariants}
            whileHover={{ scale: 1.05, rotateZ: 1 }}
          >
            <img src={cert.imageUrl} alt={cert.title} style={styles.cardImage} />
            <div style={styles.cardContent}>
              <h3 style={styles.title}>{cert.title}</h3>
              <p style={styles.issuer}>{cert.issuer} | {cert.date}</p>
              <a
                href={cert.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.viewLink}
              >View PDF</a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Certificates;

// Styles
const styles = {
  section: {
    padding: '60px 20px',
    backgroundColor: '#f0f4f8',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#222',
  },
  addButton: {
    marginBottom: '30px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '40px',
    gap: '10px',
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    maxWidth: '320px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  formActions: {
    display: 'flex',
    gap: '10px',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    justifyItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: '280px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    textAlign: 'left',
    transformStyle: 'preserve-3d',
  },
  cardImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
  },
  cardContent: {
    padding: '15px',
  },
  title: {
    fontSize: '1.2rem',
    color: '#111',
    margin: '0 0 5px 0',
  },
  issuer: {
    fontSize: '0.9rem',
    color: '#555',
    margin: 0,
  },
  viewLink: {
    display: 'inline-block',
    marginTop: '10px',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: 'bold',
  },
};
