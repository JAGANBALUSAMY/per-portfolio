// App.jsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { loadFull } from "tsparticles";
import './App.css';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Achievements from './components/Achievements/Achievements';
import Projects from './components/Projects/Projects';
import Skills from './components/Skills/Skills';
import Certificates from './components/Certificates/Certificates';
import CodingPlatforms from './components/CodingPlatforms/CodingPlatforms';
import Contact from './components/Contact/Contact';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import ParticlesBackground from './components/ParticlesBackground';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const navItems = ['Home', 'About', 'Achievements', 'Projects', 'Skills', 'International Certificates', 'Coding Platforms', 'Contact'];

const projects = [
  { title: 'Restaurant Menu', description: 'A full-stack restaurant menu web app with React featuring menu browsing, search, wish list, cart, and backend order management.', link: 'https://github.com/JAGANBALUSAMY/FULLSATCK' },
  { title: 'Diabetics Prediction using ML', description: 'A machine learning model to predict diabetes using multiple classifiers with hyper parameter tuning to increase the accuracy.', link: 'https://github.com/JAGANBALUSAMY/Diabetecs-Prediction-using-ML' },
  { title: 'Road Sign Detection using Deep Learning', description: 'A Python based deep learning application using CNN and OpenCV for road sign detection and classification.', link: 'https://github.com/JAGANBALUSAMY/Road-Sign' },
];

const skills = [
  { 
    category: 'Programming Languages', 
    items: ['Java', 'C', 'C++', 'Python'] 
  },
  { 
    category: 'Web Development', 
    items: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'HTML', 'CSS', 'JS', 'MySQL', 'php'] 
  },
  { 
    category: 'Algorithms', 
    items: ['Sorting', 'Searching', 'Dynamic Programming', 'Backtracking', 'Linked list', 'Trees'] 
  },
  { 
    category: 'AI/ML', 
    items: ['Machine Learning', 'Deep Learning'] 
  },
  { 
    category: 'Tools', 
    items: ['Figma'] 
  }
];

const achievements = [
  { title: 'Published a research paper in IEEE', organization: 'IEEE', date: '2024', description: 'Published a research paper titled "Optimized Machine Learning Models for Diabetes Prediction: A Hyper parameter- Tuned Comparative Study."', link: 'https://ieeexplore.ieee.org/document/11089171' },
  { title: 'Top 20 in C Programming Assessment', organization: 'Kongu Engineering College', date: '2024', description: 'Selected among top 20 participants in C Programming Assessment conducted by Kongu Engineering College in association with Codetantra Tech Solutions Pvt. Ltd.' },
];

const certificates = [
  { title: 'MongoDB Associate Developer', description: 'MongoDB Associate Developer certification demonstrating proficiency in MongoDB database design, development, and administration.', viewLink: '/MongoDB_Associate_Developer.pdf', downloadLink: '/MongoDB_Associate_Developer.pdf', downloadName: 'MongoDB_Associate_Developer_Certificate.pdf' },
  { title: 'Azure AI Engineer Associate', description: 'Microsoft Azure AI Engineer Associate certification demonstrating expertise in AI and machine learning solutions on Azure platform.', viewLink: '/azure-jagan.pdf', downloadLink: '/azure-jagan.pdf', downloadName: 'Azure_AI_Engineer_Associate_Certificate.pdf' },
  { title: 'Oracle APEX Cloud Developer', description: 'Oracle APEX Cloud Developer certification showcasing skills in building cloud-native applications using Oracle APEX platform.', viewLink: '/eCertificate.pdf', downloadLink: '/eCertificate.pdf', downloadName: 'Oracle_APEX_Cloud_Developer_Certificate.pdf' },
];

const App = () => {
  const [activeSection, setActiveSection] = useState('Home');
  const [isResumeDropdownOpen, setIsResumeDropdownOpen] = useState(false);
  const [isHeroResumeDropdownOpen, setIsHeroResumeDropdownOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [sparks, setSparks] = useState([]);
  const sectionRefs = useRef({});
  const particlesInit = useRef(null);
  const particlesLoaded = useRef(null);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    // Initialize particles
    particlesInit.current = async (engine) => {
      await loadFull(engine);
    };

    particlesLoaded.current = (container) => {
      console.log("Particles container loaded", container);
    };

    // Mouse move tracking
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      const sections = navItems.map(item => ({ name: item, id: item.toLowerCase().replace(' ', '-') }));
      sections.unshift({ name: 'Home', id: 'home' });
      let currentSection = 'Home';
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const mouseY = e.clientY;
          if (mouseY >= rect.top && mouseY <= rect.bottom) {
            currentSection = section.name;
          }
        }
      });
      setActiveSection(currentSection);
    };
    
    // Click outside dropdown handler
    const handleClickOutside = (e) => {
      if (!e.target.closest('.resume-dropdown')) {
        setIsResumeDropdownOpen(false);
        setIsHeroResumeDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const scrollToSection = (sectionName) => {
    setActiveSection(sectionName);
    const sectionId = sectionName.toLowerCase().replace(' ', '-');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      <ParticlesBackground theme={theme} />
      
      {/* Click sparks */}
      {sparks.map(spark => (
        <motion.div
          key={spark.id}
          className="spark"
          style={{
            backgroundColor: spark.color,
            width: spark.size,
            height: spark.size,
          }}
          initial={{ 
            x: spark.x - spark.size/2, 
            y: spark.y - spark.size/2,
            scale: 1,
            opacity: 1,
          }}
          animate={{ 
            x: spark.x + spark.velocity.x * 50,
            y: spark.y + spark.velocity.y * 50,
            scale: 0,
            opacity: 0
          }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        />
      ))}

      <Sidebar />
      <Navbar
        navItems={navItems}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        isResumeDropdownOpen={isResumeDropdownOpen}
        setIsResumeDropdownOpen={setIsResumeDropdownOpen}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <Hero
        isHeroResumeDropdownOpen={isHeroResumeDropdownOpen}
        setIsHeroResumeDropdownOpen={setIsHeroResumeDropdownOpen}
      />
      <About />
      <Achievements achievements={achievements} />
      <Projects projects={projects} />
      <Skills
        skills={skills}
        containerVariants={containerVariants}
        itemVariants={itemVariants}
      />
      <Certificates certificates={certificates} />
      <CodingPlatforms />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;