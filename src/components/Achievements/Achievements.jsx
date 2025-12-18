import React from 'react';
import { motion } from 'framer-motion';
import './Achievements.css';

const Achievements = ({ achievements, createSpark }) => (
  <section id="achievements" className="section section-common">
    <div className="container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Achievements
      </motion.h2>
      <div className="cards-grid">
        {achievements.map((achievement, idx) => (
          <motion.div
            key={achievement.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="achievement-card"
            onClick={createSpark}
            viewport={{ once: true }}
          >
            <h3 className="achievement-title">{achievement.title}</h3>
            <p className="achievement-description">{achievement.description}</p>
            {achievement.link && (
              <a 
                href={achievement.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="achievement-link"
                onClick={(e) => e.stopPropagation()}
              >
                View Publication
              </a>
            )}
            <p className="achievement-meta">{achievement.organization}</p>
            <p className="achievement-date">{achievement.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Achievements; 