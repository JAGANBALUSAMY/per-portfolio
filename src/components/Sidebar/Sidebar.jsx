import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ createSpark }) => (
  <motion.div 
    className="contact-sidebar"
    initial={{ x: -100, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    <motion.a
      href="https://www.linkedin.com/in/jagan-b-1aa945323/"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="contact-icon"
      title="LinkedIn"
      onClick={createSpark}
    >
      <FaLinkedin />
    </motion.a>
    <motion.a
      href="mailto:jaganbalusamy@gmail.com"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      className="contact-icon"
      title="Email"
      onClick={createSpark}
    >
      <FaEnvelope />
    </motion.a>
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="contact-icon"
      title="Phone"
      onClick={createSpark}
    >
      <FaPhone />
    </motion.div>
  </motion.div>
);

export default Sidebar; 