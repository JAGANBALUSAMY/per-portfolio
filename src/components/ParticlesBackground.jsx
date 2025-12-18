import { useEffect, useRef } from "react";
import "./ParticlesBackground.css";

export default function ParticlesBackground({ theme = "light" }) {
  const particleCount = useRef(20); // Initial value

  useEffect(() => {
    // Remove any existing script to avoid duplicates
    const existingScript = document.querySelector('script[src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"]');
    if (existingScript) existingScript.remove();

    // Remove existing particles canvas if present
    const existingCanvas = document.querySelector('#particles-js canvas');
    if (existingCanvas) existingCanvas.remove();

    // Determine the mode based on the number of particles
    const currentCount = particleCount.current;
    const clickMode = currentCount > 100 ? "remove" : "push";

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js";
    script.async = true;
    script.onload = () => {
      if (window.particlesJS) {
        window.particlesJS("particles-js", {
          particles: {
            number: { value: currentCount, density: { enable: true, value_area: 800 } },
            color: { value:"#fff"},
            shape: {
              type: "circle",
              stroke: { width: 2, color: "#fff"},
              polygon: { nb_sides: 6 }
            },
            opacity: {
              value: 0.8,
              random: false,
              anim: { enable: false }
            },
            size: {
              value: 8,
              random: true,
              anim: { enable: false }
            },
            line_linked: {
              enable: true,
              distance: 120,
              color: theme === "dark" ? "#fff" : "#222",
              opacity: 0.5,
              width: 2
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: false,
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: { enable: false }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "bubble" },
              onclick: { enable: true, mode: "repulse" },
              resize: true
            },
            modes: {
              grab: { distance: 200, line_linked: { opacity: 0.7 } },
              bubble: { distance: 300, size: 10, duration: 3, opacity: 1, speed: 4 },
              repulse: { distance: 300, duration: 0.6 },
              push: { particles_nb: 3 },
              remove: { particles_nb: 1 }
            }
          },
          retina_detect: true
        });
      }
    };
    document.body.appendChild(script);
  }, [theme]);

  return <div id="particles-js"></div>;
} 