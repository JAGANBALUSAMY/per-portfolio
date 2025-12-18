import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaDownload } from 'react-icons/fa';
import './Certificates.css';

const Certificates = ({ certificates, createSpark }) => (
  <section id="international-certificates" className="international-certificates section-dark section-common">
    <div className="container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        International Certificates
      </motion.h2>
      <div className="cards-grid">
        {certificates.map((certificate, idx) => (
          <motion.div
            key={certificate.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            className="certificate-card"
            onClick={createSpark}
            viewport={{ once: true }}
          >
            <h3 className="certificate-title">{certificate.title}</h3>
            <p className="certificate-description">{certificate.description}</p>
            <div className="certificate-buttons">
              <motion.a
                href={certificate.viewLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="cert-button view"
                onClick={(e) => {
                  e.stopPropagation();
                  createSpark(e);
                }}
              >
                <FaEye />
                View Certificate
              </motion.a>
              <motion.a
                href={certificate.downloadLink}
                download={certificate.downloadName}
                whileHover={{ scale: 1.05 }}
                className="cert-button download"
                onClick={(e) => {
                  e.stopPropagation();
                  createSpark(e);
                }}
              >
                <FaDownload />
                Download
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Certificates; 