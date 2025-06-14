import React, { useEffect, useState, CSSProperties } from 'react';
import {
  Code,
  Database,
  Cloud,
  Wrench,
  Zap,
  Star,
  type LucideIcon,
} from 'lucide-react';
import styles from './Skills.module.css';

// Color palettes
const colorPalettes = [
  { primary: '#3b82f6', secondary: '#06b6d4', text: '#93c5fd' }, // blue
  { primary: '#10b981', secondary: '#14b8a6', text: '#6ee7b7' }, // emerald
  { primary: '#8b5cf6', secondary: '#7c3aed', text: '#c4b5fd' }, // purple
  { primary: '#f97316', secondary: '#f59e0b', text: '#fdba74' }, // orange
  { primary: '#ec4899', secondary: '#db2777', text: '#f9a8d4' }, // rose
  { primary: '#6366f1', secondary: '#4f46e5', text: '#a5b4fc' }, // indigo
];

// Icon map
const iconsMap: Record<string, LucideIcon> = {
  Code,
  Database,
  Cloud,
  Wrench,
  Zap,
  Star,
};

// JSON types
interface CategoryJson {
  icon: string;
  title: string;
  skills: string[];
}

interface CategoryItem extends CategoryJson {
  colorPalette: {
    primary: string;
    secondary: string;
    text: string;
  };
  IconComponent: LucideIcon;
}

interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string;
  '--text-color'?: string;
  '--border-hover'?: string;
  '--shadow-color'?: string;
}

export const Skills = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('/data/skills.json');
        if (!res.ok) throw new Error(`Failed to fetch skills.json: ${res.status}`);
        const data: CategoryJson[] = await res.json();

        const mapped: CategoryItem[] = data.map((cat, idx) => ({
          ...cat,
          IconComponent: iconsMap[cat.icon] || Code,
          colorPalette: colorPalettes[idx % colorPalettes.length],
        }));

        setCategories(mapped);
      } catch (e) {
        console.error('Error loading skills.json', e);
      }
    };

    fetchSkills();
  }, []);

  if (!categories.length) return null;

  return (
    <section id="skills" className={styles.skillsSection}>      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Technical Skills
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.description}>
            A comprehensive toolkit of modern technologies and frameworks for building scalable, efficient solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {categories.map((category, categoryIndex) => {
            const { primary, secondary, text } = category.colorPalette;
            const style: CustomCSSProperties = {
              '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
              '--text-color': text,
              '--border-hover': `${primary}66`,
              '--shadow-color': `${primary}33`,
              animationDelay: `${categoryIndex * 0.1}s`,
            };

            return (
              <div key={categoryIndex} className={styles.categoryCard} style={style}>
                {/* Background gradient overlay */}
                <div className={styles.gradientOverlay}></div>
                
                {/* Header */}
                <div className={styles.categoryHeader}>
                  <div className={styles.iconContainer}>
                    <category.IconComponent className={styles.categoryIcon} />
                  </div>
                  <h3 className={styles.categoryTitle}>
                    {category.title}
                  </h3>
                </div>

                {/* Skills */}
                <div className={styles.skillsList}>
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex}
                      className={styles.skillItem}
                    >
                      <div className={styles.skillDot}></div>
                      <span className={styles.skillText}>
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Decorative elements */}
                <div className={styles.decorativeDot}></div>
                
                {/* Shimmer effect */}
                <div className={styles.shimmerEffect}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
