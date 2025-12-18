import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaPhone } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ createSpark }) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      // Prepare form data for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('contact', formData.contact);
      formDataToSend.append('description', formData.description);
      
      // Convert FormData to JSON for our self-hosted endpoint
      const jsonData = {
        name: formData.name,
        contact: formData.contact,
        description: formData.description
      };
      
      // For development, use localhost:3001
      // For production, use your Render backend URL
      // TODO: Replace 'your-render-backend-app-name' with your actual Render backend app name
      const backendUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-render-backend-app-name.onrender.com/api/contact' 
        : 'http://localhost:3001/api/contact';
      
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(jsonData)
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        setFormData({ name: '', contact: '', description: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              href="mailto:jaganbalusamy@gmail.com?subject=Portfolio Contact"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="contact-item email"
              title="Email"
              onClick={(e) => {
                createSpark(e);
                // Fallback for mailto issues
                if (window.confirm('Click OK to open your email client, or Cancel to copy the email address')) {
                  // If mailto fails, copy email to clipboard
                  navigator.clipboard.writeText('jaganbalusamy@gmail.com');
                }
              }}
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
          <form className="contact-form-column" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                placeholder="Enter your name" 
                required 
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact Info</label>
              <input 
                type="text" 
                id="contact" 
                name="contact" 
                placeholder="Email or phone" 
                required 
                value={formData.contact}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description" 
                name="description" 
                placeholder="How can I help you?" 
                rows="5" 
                required
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
              ></textarea>
            </div>
            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <div className="form-message success">
                Thank you for your message! I will get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="form-message error">
                Oops! Something went wrong. Please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 