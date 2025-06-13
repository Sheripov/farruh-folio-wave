import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Code } from 'lucide-react';
import styles from './Navigation.module.css';

/* --- menu items list --- */
const navItems = [
  { id: 'hero',        label: 'Home' },
  { id: 'about',       label: 'About' },
  { id: 'experience',  label: 'Experience' },
  { id: 'projects',    label: 'Projects' },
  { id: 'skills',      label: 'Skills' },
  { id: 'strengths',   label: 'Strengths' },
  { id: 'education',   label: 'Education' },
  { id: 'contact',     label: 'Contact' },
];

export const Navigation = () => {
  /* --- state --- */
  const [isOpen, setIsOpen]               = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled]       = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  /* -------------------------------------------------------------------- */
  /*    1. synchronize actual navbar height with CSS variable              */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    const syncHeight = () => {
      if (navRef.current) {
        const h = navRef.current.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${h}px`);
      }
    };
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  /* -------------------------------------------------------------------- */
  /*    2. change navbar background on scroll                              */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* -------------------------------------------------------------------- */
  /*    3. determine active section using IntersectionObserver             */
  /* -------------------------------------------------------------------- */
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const navHeight = navRef.current?.offsetHeight ?? 0;
    const observer  = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection((entry.target as HTMLElement).id);
          }
        });
      },
      {
        rootMargin: `-${navHeight}px 0px 0px 0px`, // accounting for header height
        threshold : 0.6,                           // 60% of block visible → active
      }
    );

    navItems.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------------------- */
  /*    4. helper functions                                                */
  /* -------------------------------------------------------------------- */
  /** Closes mobile menu with a short animation */
  const closeMobileMenu = () => {
    if (isOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimatingOut(false);
      }, 250);
    }
  };

  /** Smoothly scrolls to section with adjustment for actual navbar height */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navH   = navRef.current?.offsetHeight ?? 0;
      const target = Math.min(
        el.getBoundingClientRect().top + window.pageYOffset - navH,
        document.body.scrollHeight - window.innerHeight
      );
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  /** Opens/closes burger menu */
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

  /* -------------------------------------------------------------------- */
  /*    5. markup                                                         */
  /* -------------------------------------------------------------------- */
  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${isScrolled ? styles.scrolled : styles.notScrolled} transition-all duration-300`}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logoButton} onClick={() => scrollToSection('hero')}>
            <div className={styles.logoIconWrapper}>
              <Code className="h-5 w-5 text-blue-300" />
            </div>
            <span className={styles.logoText}>FusionCode</span>
          </div>

          {/* Desktop menu */}
          <div className={styles.desktopNav}>
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`${styles.navButton} ${
                  activeSection === item.id ? styles.navButtonActive : styles.navButtonInactive
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Burger menu button */}
          <div className={styles.menuToggleWrapper}>
            <button className={styles.menuToggle} onClick={toggleMenu}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {(isOpen || isAnimatingOut) && (
          <div
            className={`${styles.mobileNav} ${
              isAnimatingOut ? styles.mobileNavLeave : styles.mobileNavEnter
            }`}
          >
            <div className={styles.mobileNavContent}>
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`${styles.mobileNavItem} ${
                    activeSection === item.id ? styles.navButtonActive : styles.navButtonInactive
                  }`}
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
