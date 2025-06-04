import React from 'react';
import { Clock, Zap, Target, Lightbulb } from 'lucide-react';
import styles from './Strengths.module.css';

export const Strengths = () => {
  const strengths = [
    {
      icon: Clock,
      title: "Time Management",
      description: "Efficient project planning and deadline adherence with proven track record of on-time deliveries.",
      color: "emerald"
    },
    {
      icon: Zap,
      title: "Adaptability",
      description: "Quick learner who thrives in dynamic environments and readily adopts new technologies and methodologies.",
      color: "amber"
    },
    {
      icon: Target,
      title: "Accountability", 
      description: "Takes ownership of projects from conception to deployment, ensuring quality and reliability.",
      color: "rose"
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Analytical approach to complex challenges with creative solutions that drive business value.",
      color: "violet"
    }
  ];

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
      }
    };
    return colorMap[color as keyof typeof colorMap];
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
