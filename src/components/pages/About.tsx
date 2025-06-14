import React, { CSSProperties, useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  ExternalLink,
  Code,
  Heart,
  Coffee,
  Zap,
  Star,
  User,
  Globe,
  Calendar,
  type LucideIcon,
} from 'lucide-react';
import styles from './About.module.css';

// Color palette for dynamic color generation
const colorPalettes = [
  { primary: '#3b82f6', secondary: '#06b6d4', text: '#93c5fd' }, // blue
  { primary: '#10b981', secondary: '#14b8a6', text: '#6ee7b7' }, // emerald
  { primary: '#8b5cf6', secondary: '#7c3aed', text: '#c4b5fd' }, // purple
  { primary: '#f97316', secondary: '#f59e0b', text: '#fdba74' }, // orange
  { primary: '#ec4899', secondary: '#db2777', text: '#f9a8d4' }, // pink
  { primary: '#ef4444', secondary: '#dc2626', text: '#fca5a5' }, // red
  { primary: '#f59e0b', secondary: '#d97706', text: '#fcd34d' }, // amber
  { primary: '#84cc16', secondary: '#65a30d', text: '#bef264' }, // lime
  { primary: '#14b8a6', secondary: '#0d9488', text: '#5eead4' }, // teal
  { primary: '#6366f1', secondary: '#4f46e5', text: '#a5b4fc' }  // indigo
];

// Map of icon names (strings coming from JSON) to Lucide icon components
const iconsMap: Record<string, LucideIcon> = {
  MapPin,
  Mail,
  ExternalLink,
  Code,
  Heart,
  Coffee,
  Zap,
  Star,
  User,
  Globe,
  Calendar,
};

// ------------ Types for JSON -----------
interface PersonalInfoJson {
  icon: string;
  title: string;
  value: string;
  description: string;
  link?: string;
}

interface InterestJson {
  icon: string;
  text: string;
  color: string;
}

interface AboutJson {
  personalInfo: PersonalInfoJson[];
  interests: InterestJson[];
}

// ------------ Component state interfaces (with resolved icons) -----------
interface PersonalInfo {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  link?: string;
  colorPalette?: {
    primary: string;
    secondary: string;
    text: string;
  };
}

interface InterestItem {
  icon: LucideIcon;
  text: string;
  color: string;
}

// Extend CSS Properties to support CSS variables
interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string;
  '--text-color'?: string;
  '--border-hover'?: string;
  '--shadow-color'?: string;
  '--title-hover-color'?: string;
}

export const About = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo[]>([]);
  const [interests, setInterests] = useState<InterestItem[]>([]);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/data/about.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch about data: ${response.status}`);
        }
        const data: AboutJson = await response.json();

        // Map personal info
        const mappedPersonalInfo: PersonalInfo[] = data.personalInfo.map((item, idx) => ({
          icon: iconsMap[item.icon] || User,
          title: item.title,
          value: item.value,
          description: item.description,
          link: item.link,
          colorPalette: colorPalettes[idx % colorPalettes.length],
        }));

        // Map interests
        const mappedInterests: InterestItem[] = data.interests.map((item) => ({
          icon: iconsMap[item.icon] || Star,
          text: item.text,
          color: item.color,
        }));

        setPersonalInfo(mappedPersonalInfo);
        setInterests(mappedInterests);
      } catch (err) {
        console.error('Error loading about data:', err);
      }
    };

    fetchAboutData();
  }, []);

  // If data hasn't loaded yet, render nothing (or a placeholder if desired)
  if (!personalInfo.length) {
    return null;
  }

  // Attach color palettes dynamically (they are already attached in mapping)
  const infoWithColors = personalInfo;

  return (
    <section id="about" className={styles.aboutSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>About Me</h2>
          <div className={styles.titleUnderline}></div>
        </div>

        <div className={styles.mainContent}>
          {/* Main Content */}
          <div className={styles.contentGrid}>
            {/* Left Column - Introduction */}
            <div className={styles.leftColumn}>
              {/* Profile Card */}
              <div className={styles.profileCard}>
                {/* Background gradient overlay */}
                <div className={styles.profileCardBgOverlay}></div>
                
                {/* Shimmer effect */}
                <div className={styles.profileCardShimmer}></div>

                <div className={styles.profileCardContent}>
                  <div className={styles.profileHeader}>
                    <div className={styles.profileIcon}>
                      <User className={styles.profileIconSvg} />
                    </div>
                    <h3 className={styles.profileName}>
                      Farruh Sheripov
                    </h3>
                  </div>
                  
                  <div className={styles.profileDescription}>
                    <p>
                      I'm a passionate <span className={styles.highlightBlue}>Python developer</span> with extensive experience in building scalable backend systems using Django and Google Cloud Platform.
                    </p>
                    <p>
                      I specialize in creating <span className={styles.highlightEmerald}>robust APIs</span>, implementing <span className={styles.highlightPurple}>microservices architectures</span>, and optimizing application performance for real-world business needs.
                    </p>
                    <p>
                      With a strong focus on <span className={styles.highlightOrange}>clean code</span> and best practices, I enjoy solving complex problems and mentoring fellow developers.
                    </p>
                  </div>

                  {/* Interests */}
                  <div className={styles.interestsSection}>
                    <h4 className={styles.interestsTitle}>
                      <Heart className={styles.interestsTitleIcon} />
                      What I Love
                    </h4>
                    <div className={styles.interestsList}>
                      {interests.map((interest, index) => (
                        <div key={index} className={styles.interestItem}>
                          <interest.icon
                            className={`${styles.interestIcon} ${styles[`interestIcon${interest.color.charAt(0).toUpperCase() + interest.color.slice(1)}`]}`}
                          />
                          <span className={styles.interestText}>{interest.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={styles.profileCardDecorative}></div>
              </div>

              {/* Quick Stats */}
              <div className={styles.quickStats}>
                <div className={styles.statCard}>
                  <div className={`${styles.statNumber} ${styles.statNumberEmerald}`}>6+</div>
                  <div className={styles.statLabel}>Years Experience</div>
                </div>
                <div className={styles.statCard}>
                  <div className={`${styles.statNumber} ${styles.statNumberPurple}`}>50+</div>
                  <div className={styles.statLabel}>Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className={styles.rightColumn}>
              {infoWithColors.map((info, index) => {
                const { primary, secondary, text } = info.colorPalette || colorPalettes[0];
                const cardStyle: CustomCSSProperties = {
                  '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
                  '--text-color': text,
                  '--border-hover': `${primary}66`,
                  '--shadow-color': `${primary}33`,
                  '--title-hover-color': text,
                  animationDelay: `${index * 0.1}s`,
                };

                return (
                  <div key={index} className={styles.contactCard} style={cardStyle}>
                    {/* Background gradient overlay */}
                    <div className={styles.contactCardBgOverlay}></div>

                    {/* Shimmer effect */}
                    <div className={styles.contactCardShimmer}></div>

                    <div className={styles.contactCardContent}>
                      <div className={styles.contactIcon}>
                        <info.icon className={styles.contactIconSvg} />
                      </div>
                      <div className={styles.contactInfo}>
                        <h4 className={styles.contactInfoTitle}>{info.title}</h4>
                        <div className={styles.contactInfoDescription}>{info.description}</div>
                        {info.link ? (
                          <a
                            href={info.link}
                            target={info.link.startsWith('http') ? '_blank' : undefined}
                            rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={`${styles.contactLink} ${styles.contactInfoValue}`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className={styles.contactInfoValue}>{info.value}</div>
                        )}
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className={styles.contactCardDecorative}></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
