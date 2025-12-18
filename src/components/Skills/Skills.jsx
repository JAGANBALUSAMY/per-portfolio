import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as SiIcons from 'react-icons/si';
import {FaJava , FaSortAmountDown, FaSearch, FaProjectDiagram, FaUndoAlt, FaLink, FaTree, FaRobot, FaBrain } from 'react-icons/fa';
import './Skills.css';

const getSkillIcon = (skillName) => {
  // Map algorithm and AI/ML skills to Font Awesome icons
  const faIconMap = {
    'Sorting': FaSortAmountDown,
    'Searching': FaSearch,
    'Dynamic Programming': FaProjectDiagram,
    'Backtracking': FaUndoAlt,
    'Linked list': FaLink,
    'Trees': FaTree,
    'Machine Learning': FaRobot,
    'Deep Learning': FaBrain,
    'Java': FaJava,
  };
  
  // Check if it's an algorithm or AI/ML skill
  if (faIconMap[skillName]) {
    const IconComponent = faIconMap[skillName];
    return <IconComponent />;
  }
  
  // Map other skills to Simple Icons
  const siIconMap = {
    
    'C': 'SiC',
    'C++': 'SiCplusplus',
    'Python': 'SiPython',
    'MongoDB': 'SiMongodb',
    'Express.js': 'SiExpress',
    'React.js': 'SiReact',
    'Node.js': 'SiNodedotjs',
    'HTML': 'SiHtml5',
    'CSS': 'SiCss3',
    'JS': 'SiJavascript',
    'MySQL': 'SiMysql',
    'php': 'SiPhp',
    'Figma': 'SiFigma'
  };
  
  const iconName = siIconMap[skillName];
  if (iconName && SiIcons[iconName]) {
    const IconComponent = SiIcons[iconName];
    return <IconComponent />;
  }
  return null;
};

const Skills = ({ skills, createSpark, containerVariants, itemVariants }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Flatten all skills for the "All" category
  const allSkills = skills.flatMap(category => category.items);
  
  // Get skills for the active category
  const filteredSkills = activeCategory === 'All' 
    ? allSkills 
    : skills.find(cat => cat.category === activeCategory)?.items || [];
  
  // Get all categories including "All"
  const categories = ['All', ...skills.map(cat => cat.category)];
  
  return (
    <section id="skills" className="section section-common">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>
        
        {/* Category Navigation */}
        <div className="skills-category-nav">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Skills Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill}
              className="skill-card"
              onClick={createSpark}
            >
              <div className="skill-icon">
                {getSkillIcon(skill) || (
                  <div className="skill-letter-container">
                    <span className="skill-letter">
                      {skill.split(' ').map(word => word.charAt(0)).join('')}
                    </span>
                  </div>
                )}
              </div>
              <div className="skill-name">{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 