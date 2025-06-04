import React from 'react';
import { Download, Mail, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParallax } from '@/hooks/useParallax';
import styles from './Hero.module.css';

export const Hero = () => {
  const { getCombinedParallaxStyle } = useParallax();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      // Calculate the absolute position of the element
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const target = Math.min(elementTop - 80, maxScroll); // Account for navigation height
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      // Calculate the absolute position of the element
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const target = Math.min(elementTop - 80, maxScroll);
      window.scrollTo({
        top: target,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className={styles.hero}>
      {/* Minimal background elements */}
      <div className={styles.backgroundElement1}></div>
      <div className={styles.backgroundElement2}></div>

      {/* Very subtle floating elements */}
      <div className={styles.floatingElements}>
        <div 
          className={styles.floatingElement1}
          style={getCombinedParallaxStyle(0.03, 0.01)}
        />
        <div 
          className={styles.floatingElement2}
          style={getCombinedParallaxStyle(0.04, -0.01)}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.fadeIn}>
          {/* Clean header */}
          <div className={styles.header}>
            <div className={styles.badge}>
              <span 
                className={styles.badgeSpan}
              >
                Senior Software Engineer
              </span>
            </div>
            
            <h1 className={styles.mainTitle}>
              Farruh Sheripov
            </h1>
            
            <h2 className={styles.subtitle}>
              Python Backend Developer & Cloud Architect
            </h2>
          </div>

          {/* Simple description */}
          <div className={styles.description}>
            <p className={styles.descriptionText}>
              Specialized in designing and implementing enterprise-grade backend systems using Django and Google Cloud Platform. 
              Proven track record of delivering scalable solutions that drive business growth.
            </p>
          </div>

          {/* Clear, readable buttons */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.primaryButton}
              onClick={() => window.open('/farruh-sheripov-cv.pdf', '_blank')}
            >
              <Download className={styles.buttonIcon} />
              Download Resume
            </button>
            <button
              className={styles.secondaryButton}
              onClick={scrollToContact}
            >
              <Mail className={styles.buttonIcon} />
              Get In Touch
            </button>
          </div>

          {/* Simple stats */}
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.blue}`}>6+</div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.emerald}`}>50+</div>
              <div className={styles.statLabel}>Projects Delivered</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.purple}`}>10K+</div>
              <div className={styles.statLabel}>Users Served</div>
            </div>
          </div>

          {/* Simple scroll indicator */}
          <div className={styles.scrollIndicator}>
            <div className={styles.scrollText}>
              Explore my work
            </div>
            <button
              onClick={scrollToAbout}
              className={styles.scrollButton}
            >
              <ArrowDown className={styles.scrollIcon} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
