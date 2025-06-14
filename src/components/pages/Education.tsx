import React, { useEffect, useState, CSSProperties } from 'react';
import {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
  type LucideIcon,
} from 'lucide-react';
import styles from './Education.module.css';

// ------------------ Color palettes --------------------
const colorPalettes = [
  { primary: '#60a5fa', secondary: '#818cf8', text: '#93c5fd' }, // blue-indigo
  { primary: '#8b5cf6', secondary: '#6366f1', text: '#c4b5fd' }, // violet-indigo
  { primary: '#2563eb', secondary: '#4f46e5', text: '#bfdbfe' }, // blue-indigo alt
];

// ------------------ Icon map --------------------------
const iconsMap: Record<string, LucideIcon> = {
  GraduationCap,
  Calendar,
  Award,
  BookOpen,
};

// ------------------ JSON Types ------------------------
interface EducationJson {
  icon: string;
  degree: string;
  university: string;
  universityIcon?: string;
  years: string;
  duration: string;
  description: string;
  subjects: string[];
}

interface EducationCard {
  icon: LucideIcon;
  degree: string;
  university: string;
  universityIcon?: LucideIcon;
  years: string;
  duration: string;
  description: string;
  subjects: string[];
  colorPalette: {
    primary: string;
    secondary: string;
    text: string;
  };
}

// Extend CSS Properties for variables
interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string;
  '--text-color'?: string;
  '--border-hover'?: string;
  '--shadow-color'?: string;
}

export const Education = () => {
  const [education, setEducation] = useState<EducationCard[]>([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch('/data/education.json');
        if (!response.ok) throw new Error(`Failed to fetch education: ${response.status}`);
        const data: EducationJson[] = await response.json();

        const mapped: EducationCard[] = data.map((item, idx) => ({
          icon: iconsMap[item.icon] || GraduationCap,
          degree: item.degree,
          university: item.university,
          universityIcon: item.universityIcon ? iconsMap[item.universityIcon] || BookOpen : BookOpen,
          years: item.years,
          duration: item.duration,
          description: item.description,
          subjects: item.subjects,
          colorPalette: colorPalettes[idx % colorPalettes.length],
        }));

        setEducation(mapped);
      } catch (e) {
        console.error('Error loading education.json', e);
      }
    };

    fetchEducation();
  }, []);

  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Education</h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Building a strong foundation in computer science and software development principles.
          </p>
        </div>

        <div className={styles.contentWrapper}>
          {education.map((edu, index) => {
            const { primary, secondary, text } = edu.colorPalette;
            const cardStyle: CustomCSSProperties = {
              '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
              '--text-color': text,
              '--border-hover': `${primary}66`,
              '--shadow-color': `${primary}33`,
            };

            return (
              <div key={index} className={styles.card} style={cardStyle}>
                <div className={styles.cardContent}>
                  {/* Icon Section */}
                  <div className={styles.iconWrapper}>
                    <div className={styles.iconContainer}>
                      <edu.icon className={styles.icon} />
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className={styles.contentSection}>
                    {/* Main Info */}
                    <div>
                      <h3 className={styles.mainTitle}>{edu.degree}</h3>
                      <h4 className={styles.university}>
                        <edu.universityIcon className={styles.universityIcon} />
                        {edu.university}
                      </h4>
                    </div>

                    {/* Date and Duration */}
                    <div className={styles.badges}>
                      <div className={styles.badge}>
                        <Calendar className={styles.badgeIcon} />
                        <span className={styles.badgeText}>{edu.years}</span>
                      </div>
                      <div className={styles.badge}>
                        <Award className={styles.badgeIcon} />
                        <span className={styles.badgeText}>{edu.duration}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <div className={styles.descriptionBox}>
                      <p className={styles.descriptionText}>{edu.description}</p>
                    </div>

                    {/* Key Subjects */}
                    {edu.subjects.length > 0 && (
                      <div>
                        <h5 className={styles.subjectsTitle}>
                          <BookOpen className={styles.subjectsTitleIcon} />
                          Key Subjects
                        </h5>
                        <div className={styles.subjectsGrid}>
                          {edu.subjects.map((subject, idx) => (
                            <div key={idx} className={styles.subjectItem}>
                              <div className={styles.subjectDot}></div>
                              <span className={styles.subjectText}>{subject}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={styles.decorativeTopRight}></div>
                <div className={styles.decorativeBottomLeft}></div>
              </div>
            );
          })}
        </div>

        {/* Additional decorative floating elements */}
        <div className={styles.floatingElements}>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={styles.floatingDot}
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${4 + i}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
