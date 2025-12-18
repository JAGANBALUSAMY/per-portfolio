import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaEye, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ navItems, activeSection, scrollToSection, isResumeDropdownOpen, setIsResumeDropdownOpen, createSpark, theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (item, e) => {
    e.preventDefault();
    scrollToSection(item);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-content">
        
        <div className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
              onClick={(e) => handleNavClick(item, e)}
            >
              {item}
            </a>
          ))}
          
          {/* Mobile resume dropdown */}
          <div className="resume-dropdown mobile-only">
            <button
              onClick={(e) => {
                setIsResumeDropdownOpen(!isResumeDropdownOpen);
                if (createSpark) createSpark(e);
              }}
              className="resume-button"
            >
              <FaDownload />
              Resume
            </button>
            {isResumeDropdownOpen && (
              <div className="resume-dropdown-menu">
                <a
                  href="/JAGAN-B_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dropdown-item"
                  onClick={() => setIsResumeDropdownOpen(false)}
                >
                  <FaEye />
                  View Resume
                </a>
                <a
                  href="/JAGAN-B_Resume.pdf"
                  download="Jagan_Resume.pdf"
                  className="dropdown-item"
                  onClick={() => setIsResumeDropdownOpen(false)}
                >
                  <FaDownload />
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;