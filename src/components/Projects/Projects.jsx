import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const Projects = ({ projects, createSpark }) => (
  <section id="projects" className="section-dark section-common">
    <div className="container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>
      <div className="cards-grid">
        {projects.map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className={`project-card ${project.featured ? 'featured' : ''}`}
            onClick={createSpark}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="project-header">
              <div className="project-icon">
                <FaCode />
              </div>
              <h3 className="project-title">{project.title}</h3>
            </div>
            <p className="project-description">{project.description}</p>
            {project.link && (
              <motion.a
                href={project.link}
                className="project-link"
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  createSpark(e);
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaExternalLinkAlt />
                View Project
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;