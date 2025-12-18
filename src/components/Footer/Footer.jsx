import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <p>© {new Date().getFullYear()} Jagan. All rights reserved.</p>
      <p>Designed with <span className="heart">❤️</span> and React</p>
      
      <div className="footer-signature">
        Crafted with modern web technologies
      </div>
    </div>
  </footer>
);

export default Footer;