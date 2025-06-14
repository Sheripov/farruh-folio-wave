import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Code } from 'lucide-react';
import styles from './Navigation.module.css';

/* ---------- пункты меню ---------- */
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
  /* -------- состояние -------- */
  const [isOpen, setIsOpen]               = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled]       = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  /* ===================================================================== */
  /* 1. Синхронизируем фактическую высоту навбара с CSS‑переменной         */
  /* ===================================================================== */
  useEffect(() => {
    const syncHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          '--nav-height',
          `${navRef.current.offsetHeight}px`,
        );
      }
    };
    syncHeight();
    window.addEventListener('resize', syncHeight);
    return () => window.removeEventListener('resize', syncHeight);
  }, []);

  /* ===================================================================== */
  /* 2. Фон навбара при прокрутке                                          */
  /* ===================================================================== */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ===================================================================== */
  /* 3. Scroll‑spy — определяем активную секцию                            */
  /* ===================================================================== */
  const calcActiveSection = useCallback(() => {
    const headH = navRef.current?.offsetHeight ?? 0;

    /* текущая активная секция по умолчанию — первая */
    let currentId = navItems[0].id;

    for (const { id } of navItems) {
      const el = document.getElementById(id);
      if (!el) continue;

      /* насколько верх секции выше фиксированного навбара */
      const offset = el.getBoundingClientRect().top - headH;

      if (offset <= 0) {
        /* секция пересекла линию навбара — кандидат в активные */
        currentId = id;
      } else {
        /* как только встретили секцию ниже линии — выходим из цикла,
           т.к. остальные будут ещё ниже */
        break;
      }
    }

    setActiveSection(currentId);
  }, []);

  /* «легковесно» вызываем calcActiveSection не чаще одного кадра */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calcActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    /* сразу вычисляем при монтировании */
    calcActiveSection();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', calcActiveSection);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', calcActiveSection);
    };
  }, [calcActiveSection]);

  /* ===================================================================== */
  /* 4. Вспомогательные функции                                            */
  /* ===================================================================== */
  /** Закрывает мобильное меню с анимацией */
  const closeMobileMenu = () => {
    if (isOpen) {
      setIsAnimatingOut(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimatingOut(false);
      }, 250);
    }
  };

  /** Плавный скролл к секции + моментальное обновление подсветки */
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headH = navRef.current?.offsetHeight ?? 0;
      const target = Math.min(
        el.getBoundingClientRect().top + window.pageYOffset - headH,
        document.body.scrollHeight - window.innerHeight,
      );

      window.scrollTo({ top: target, behavior: 'smooth' });
      setActiveSection(id); // подсвечиваем сразу
    }
    closeMobileMenu();
  };

  /** Открыть/закрыть бургер‑меню */
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

  /* ===================================================================== */
  /* 5. Разметка                                                           */
  /* ===================================================================== */
  return (
    <nav
      ref={navRef}
      className={`${styles.nav} ${
        isScrolled ? styles.scrolled : styles.notScrolled
      } transition-all duration-300`}
    >
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* ---------- Логотип ---------- */}
          <div className={styles.logoButton} onClick={() => scrollToSection('hero')}>
            <div className={styles.logoIconWrapper}>
              <Code className="h-5 w-5 text-blue-300" />
            </div>
            <span className={styles.logoText}>FusionCode</span>
          </div>

          {/* ---------- Десктоп‑меню ---------- */}
          <div className={styles.desktopNav}>
            {navItems.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`${styles.navButton} ${
                  activeSection === id ? styles.navButtonActive : styles.navButtonInactive
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* ---------- Кнопка бургер‑меню ---------- */}
          <div className={styles.menuToggleWrapper}>
            <button className={styles.menuToggle} onClick={toggleMenu}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ---------- Мобильное меню ---------- */}
        {(isOpen || isAnimatingOut) && (
          <div
            className={`${styles.mobileNav} ${
              isAnimatingOut ? styles.mobileNavLeave : styles.mobileNavEnter
            }`}
          >
            <div className={styles.mobileNavContent}>
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`${styles.mobileNavItem} ${
                    activeSection === id ? styles.navButtonActive : styles.navButtonInactive
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};