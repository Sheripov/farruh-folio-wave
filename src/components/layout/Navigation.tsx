import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, Code } from 'lucide-react';
import styles from './Navigation.module.css';

// Throttle function for performance
const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'strengths', label: 'Strengths' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleScroll = useCallback(
    throttle(() => {
      // Find the scroll container
      const scrollContainer = window;
      if (!scrollContainer) return;

      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPos = window.scrollY + 100;
      
      // Update scroll state for background effect
      setIsScrolled(window.scrollY > 50);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    }, 100),
    [navItems]
  );

  useEffect(() => {
    // Listen to scroll events on window
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
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
    // Only animate out and close if mobile menu is actually open
    if (isOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimatingOut(false);
      }, 250);
    }
  };

  const toggleMenu = () => {
    if (isOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimatingOut(false);
      }, 250);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <nav 
      className={`${styles.nav} ${isScrolled ? styles.scrolled : styles.notScrolled} transition-all duration-300`}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <div 
            className={styles.logoButton}
            onClick={() => scrollToSection('hero')}
          >
            <div className={styles.logoIconWrapper}>
              <Code className="h-5 w-5 text-blue-300" />
            </div>
            <span className={styles.logoText}>
              FusionCode
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopNav}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${styles.navButton} ${activeSection === item.id ? styles.navButtonActive : styles.navButtonInactive}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.menuToggleWrapper}>
            <button
              className={styles.menuToggle}
              onClick={toggleMenu}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {(isOpen || isAnimatingOut) && (
          <div
            className={`${styles.mobileNav} ${isAnimatingOut ? styles.mobileNavLeave : styles.mobileNavEnter}`}
          >
            <div className={styles.mobileNavContent}>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${styles.mobileNavItem} ${activeSection === item.id ? styles.navButtonActive : styles.navButtonInactive}`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
