import React, { useEffect, useState } from 'react';
import { Clock, Zap, Target, Lightbulb, Users, Star, type LucideIcon } from 'lucide-react';
import styles from './Strengths.module.css';

// Icon map to resolve from JSON strings
const iconsMap: Record<string, LucideIcon> = {
  Clock,
  Zap,
  Target,
  Lightbulb,
  Users,
  Star,
};

// JSON data type
interface StrengthJson {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface StrengthItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

export const Strengths = () => {
  const [strengths, setStrengths] = useState<StrengthItem[]>([]);

  useEffect(() => {
    const fetchStrengths = async () => {
      try {
        const res = await fetch('/data/strengths.json');
        if (!res.ok) throw new Error(`Failed to fetch strengths.json: ${res.status}`);
        const data: StrengthJson[] = await res.json();
        const mapped: StrengthItem[] = data.map((s) => ({
          icon: iconsMap[s.icon] || Clock,
          title: s.title,
          description: s.description,
          color: s.color,
        }));
        setStrengths(mapped);
      } catch (e) {
        console.error('Error loading strengths.json', e);
      }
    };

    fetchStrengths();
  }, []);

  if (!strengths.length) return null;

  const getColorClasses = (color: string) => {
    const colorMap = {
      emerald: {
        gradient: styles.emeraldGradient,
        iconWrapper: styles.emeraldIconWrapper,
        icon: styles.emeraldIcon,
        title: styles.emeraldTitle,
        dot: styles.emeraldDot
      },
      amber: {
        gradient: styles.amberGradient,
        iconWrapper: styles.amberIconWrapper,
        icon: styles.amberIcon,
        title: styles.amberTitle,
        dot: styles.amberDot
      },
      rose: {
        gradient: styles.roseGradient,
        iconWrapper: styles.roseIconWrapper,
        icon: styles.roseIcon,
        title: styles.roseTitle,
        dot: styles.roseDot
      },
      violet: {
        gradient: styles.violetGradient,
        iconWrapper: styles.violetIconWrapper,
        icon: styles.violetIcon,
        title: styles.violetTitle,
        dot: styles.violetDot
      },
      blue: {
        gradient: styles.blueGradient,
        iconWrapper: styles.blueIconWrapper,
        icon: styles.blueIcon,
        title: styles.blueTitle,
        dot: styles.blueDot
      },
      purple: {
        gradient: styles.purpleGradient,
        iconWrapper: styles.purpleIconWrapper,
        icon: styles.purpleIcon,
        title: styles.purpleTitle,
        dot: styles.purpleDot
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.emerald;
  };

  return (
    <section id="strengths" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Core Strengths
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.description}>
            Key personal and professional qualities that drive success in every project and collaboration.
          </p>
        </div>

        <div className={styles.grid}>
          {strengths.map((strength, index) => {
            const colorClasses = getColorClasses(strength.color);
            return (
              <div 
                key={index}
                className={styles.card}
              >
                {/* Background gradient overlay */}
                <div className={`${styles.cardBackgroundOverlay} ${colorClasses.gradient}`}></div>
                
                {/* Icon container */}
                <div className={styles.iconContainer}>
                  <div className={`${styles.iconWrapper} ${colorClasses.iconWrapper}`}>
                    <strength.icon className={`${styles.icon} ${colorClasses.icon}`} />
                  </div>
                </div>
                
                {/* Content */}
                <div className={styles.content}>
                  <h3 className={`${styles.cardTitle} ${colorClasses.title}`}>
                    {strength.title}
                  </h3>
                  
                  <p className={styles.cardDescription}>
                    {strength.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className={`${styles.decorativeElement1} ${colorClasses.dot}`}></div>
                <div className={`${styles.decorativeElement2} ${colorClasses.dot}`}></div>
                
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
