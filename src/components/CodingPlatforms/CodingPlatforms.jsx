import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiHackerrank, SiGithub, SiGeeksforgeeks } from 'react-icons/si';
import './CodingPlatforms.css';

const CodingPlatforms = ({ createSpark }) => {
  const platforms = [
    {
      name: "LeetCode",
      icon: <SiLeetcode />,
      statsImage: true,
      imageUrl: "https://leetcard.jacoblin.cool/Jagan2006?ext=heatmap",
      imageAlt: "LeetCode Stats Card",
      link: "https://leetcode.com/u/Jagan2006/"
    },
    {
      name: "GitHub",
      icon: <SiGithub />,
      heatmapImage: true,
      heatmapUrl: "https://ghchart.rshah.org/jaganbalusamy",
      heatmapAlt: "GitHub Contribution Heatmap",
      statsImage: true,
      imageUrl: "https://github-readme-stats.vercel.app/api?username=jaganbalusamy&show_icons=true&theme=radical&border_radius=10&hide_title=true&count_private=true",
      imageAlt: "GitHub Stats Card",
      link: "https://github.com/jaganbalusamy"
    }
  ];

  // Track image loading state for each platform
  const [imageLoadStates, setImageLoadStates] = useState({});

  const handleImageError = (platformName, imageType = 'stats') => {
    setImageLoadStates(prev => ({
      ...prev,
      [`${platformName}-${imageType}`]: 'error'
    }));
  };

  const handleImageLoad = (platformName, imageType = 'stats') => {
    setImageLoadStates(prev => ({
      ...prev,
      [`${platformName}-${imageType}`]: 'loaded'
    }));
  };

  return (
    <section id="coding-platforms" className="coding-platforms section section-common">
      <div className="container">
        <h2 className="section-title">Coding Platforms</h2>
        <div className="single-column-layout">
          {platforms.map((platform, idx) => (
            <div className={`platform-single ${platform.name.toLowerCase()}`} key={platform.name}>
              <motion.div 
                className="platform-card-single"
                onClick={createSpark}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="platform-header">
                  <div className="platform-icon">{platform.icon}</div>
                  <h3>My {platform.name} Stats</h3>
                  <a href={platform.link} target="_blank" rel="noopener noreferrer" className="cta-button" onClick={(e) => {e.stopPropagation(); createSpark(e); }}> Visit Profile </a>
                </div>

                {/* Conditional rendering for GitHub - show heatmap first */}
                {platform.name === 'GitHub' ? (
                  <>
                    {/* Heatmap Section for GitHub (shown first) */}
                    {platform.heatmapImage && (
                      <div className="platform-heatmap-section">
                        <h4>Contribution Activity</h4>
                        {imageLoadStates && imageLoadStates[`${platform.name}-heatmap`] !== 'error' ? (
                          <img 
                            alt={platform.heatmapAlt} 
                            className="platform-heatmap-img" 
                            loading="lazy" 
                            src={platform.heatmapUrl} 
                            onError={() => handleImageError(platform.name, 'heatmap')}
                            onLoad={() => handleImageLoad(platform.name, 'heatmap')}
                          />
                        ) : (
                          <div className="heatmap-fallback">
                            <p>Contribution heatmap currently unavailable</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Main Stats Image */}
                    <div className="platform-stats-section">
                      {imageLoadStates && imageLoadStates[`${platform.name}-stats`] !== 'error' ? (
                        <div className="stats-container">
                          <img 
                            alt={platform.imageAlt} 
                            className="platform-stats-img" 
                            loading="lazy" 
                            src={platform.imageUrl} 
                            onError={() => handleImageError(platform.name, 'stats')}
                            onLoad={() => handleImageLoad(platform.name, 'stats')}
                          />
                        </div>
                      ) : (
                        <div className="stats-fallback">
                          <p>Stats currently unavailable</p>
                        </div>
                      )}
                    </div>
                    
                  </>
                ) : (
                  <>
                    {/* Main Stats Image */}
                    <div className="platform-stats-section">
                      {imageLoadStates && imageLoadStates[`${platform.name}-stats`] !== 'error' ? (
                        <div className="stats-container">
                          <img 
                            alt={platform.imageAlt} 
                            className="platform-stats-img" 
                            loading="lazy" 
                            src={platform.imageUrl} 
                            onError={() => handleImageError(platform.name, 'stats')}
                            onLoad={() => handleImageLoad(platform.name, 'stats')}
                          />
                        </div>
                      ) : (
                        <div className="stats-fallback">
                          <p>Stats currently unavailable</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Heatmap Section for GitHub */}
                    {platform.heatmapImage && (
                      <div className="platform-heatmap-section">
                        <h4>Contribution Activity</h4>
                        {imageLoadStates && imageLoadStates[`${platform.name}-heatmap`] !== 'error' ? (
                          <img 
                            alt={platform.heatmapAlt} 
                            className="platform-heatmap-img" 
                            loading="lazy" 
                            src={platform.heatmapUrl} 
                            onError={() => handleImageError(platform.name, 'heatmap')}
                            onLoad={() => handleImageLoad(platform.name, 'heatmap')}
                          />
                        ) : (
                          <div className="heatmap-fallback">
                            <p>Contribution heatmap currently unavailable</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CodingPlatforms; 