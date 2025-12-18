import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ createSpark }) => (
  <section id="contact" className="contact-section section-common">
    <div className="container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Contact
      </motion.h2>
      <div className="contact-two-column">
        <div className="contact-info-column">
          <motion.a
            href="mailto:jaganbalusamy@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="contact-item email"
            title="Email"
            onClick={createSpark}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <FaEnvelope /> jaganbalusamy@gmail.com
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/jagan-b-1aa945323/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="contact-item linkedin"
            title="LinkedIn"
            onClick={createSpark}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <FaLinkedin /> Jagan B
          </motion.a>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="contact-item phone"
            title="Phone"
            onClick={createSpark}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <FaPhone /> +91 9943045408
          </motion.div>
        </div>
        <form className="contact-form-column" onSubmit={e => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Info</label>
            <input type="text" id="contact" name="contact" placeholder="Email or phone" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" placeholder="How can I help you?" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  </section>
);

export default Contact; 