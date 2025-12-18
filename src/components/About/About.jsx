import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => (
  <section id="about" className="section section-common">
    {/* Floating background elements */}
    <div className="floating-element"></div>
    <div className="floating-element"></div>
    <div className="floating-element"></div>
    
    <div className="container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        About <span className="text-gradient">Me</span>
      </motion.h2>
      <motion.p 
        className="section-description"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        I am currently pursuing B.tech AIDS in Kongu Engineering College. 
        I am a quick learner and best in team work with strong programming skills. 
        Eager to apply academic knowledge and creativity to solve real-world challenges 
        while continuously learning and growing professionally. Focused on achieving 
        results that matter, with a strong commitment to continuous learning and ethical practices.
      </motion.p>
    </div>
  </section>
);

export default About; 