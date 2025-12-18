import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaDownload, FaEye } from 'react-icons/fa';
import './Hero.css';
import profileImg from '../../assets/photo.jpg';

const Hero = ({ isHeroResumeDropdownOpen, setIsHeroResumeDropdownOpen, createSpark }) => (
  <section id="home" className="hero section-common">
    <div className="hero-content-row">
      <motion.img 
        src={profileImg}
        alt="Profile"
        className="hero-photo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <div className="hero-content-details">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Jagan B</p>
        </motion.h1>
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          AI & DS Student
        </motion.p>
        <motion.div 
          className="project-repo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3>Project Repository</h3>
          <motion.a
            href="https://github.com/JAGANBALUSAMY"
            target="_blank"
            rel="noopener noreferrer"
            className="github-button"
            onClick={createSpark}
            whileHover={{ scale: 1.05 }}
          >
            <FaGithub />
            <span>GitHub</span>
          </motion.a>
        </motion.div>
        <div className="hero-buttons-row">
          <motion.a
            href="#contact"
            className="cta-button"
            onClick={createSpark}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            Get in Touch
          </motion.a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero; 