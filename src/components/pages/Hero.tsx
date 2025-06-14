import React, { useEffect, useState, CSSProperties } from 'react';
import { Download, Mail, ArrowDown, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParallax } from '@/hooks/useParallax';
import styles from './Hero.module.css';

// ---------------- Color palettes ----------------
const colorPalettes = [
  { primary: '#60a5fa', text: '#60a5fa' }, // blue
  { primary: '#34d399', text: '#34d399' }, // emerald
  { primary: '#c084fc', text: '#c084fc' }, // purple
  { primary: '#f59e0b', text: '#f59e0b' }, // amber
];

// ---------------- JSON Types -------------------
interface StatJson {
  number: string;
  label: string;
}

interface HeroJson {
  badge: string;
  name: string;
  subtitle: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  stats: StatJson[];
}

interface StatItem extends StatJson {
  colorPalette: {
    primary: string;
    text: string;
  };
}

interface CustomCSSProperties extends CSSProperties {
  '--text-color'?: string;
}

export const Hero = () => {
  const { getCombinedParallaxStyle } = useParallax();

  const [heroData, setHeroData] = useState<HeroJson | null>(null);
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch('/data/hero.json');
        if (!res.ok) throw new Error(`Failed to fetch hero.json: ${res.status}`);
        const data: HeroJson = await res.json();

        const mappedStats: StatItem[] = data.stats.map((s, idx) => ({
          ...s,
          colorPalette: colorPalettes[idx % colorPalettes.length],
        }));

        setHeroData(data);
        setStats(mappedStats);
      } catch (e) {
        console.error('Error loading hero.json', e);
      }
    };

    fetchHero();
  }, []);

  if (!heroData) return null;

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
              <span className={styles.badgeSpan}>{heroData.badge}</span>
            </div>
            
            <h1 className={styles.mainTitle}>{heroData.name}</h1>
            
            <h2 className={styles.subtitle}>{heroData.subtitle}</h2>
          </div>

          {/* Simple description */}
          <div className={styles.description}>
            <p className={styles.descriptionText}>{heroData.description}</p>
          </div>

          {/* Clear, readable buttons */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.primaryButton}
              onClick={() => window.open(heroData.primaryButtonLink, '_blank')}
            >
              <Download className={styles.buttonIcon} />
              {heroData.primaryButtonText}
            </button>
            <button
              className={styles.secondaryButton}
              onClick={scrollToContact}
            >
              <Mail className={styles.buttonIcon} />
              {heroData.secondaryButtonText}
            </button>
          </div>

          {/* Simple stats */}
          <div className={styles.stats}>
            {stats.map((s, idx) => {
              const style: CustomCSSProperties = {
                '--text-color': s.colorPalette.text,
              };
              return (
                <div key={idx} className={styles.statItem}>
                  <div className={styles.statNumber} style={style}>{s.number}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              );
            })}
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
