import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';
import styles from './Education.module.css';

export const Education = () => {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Education
          </h2>
          <div className={styles.divider}></div>
          <p className={styles.description}>
            Building a strong foundation in computer science and software development principles.
          </p>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              {/* Icon Section */}
              <div className={styles.iconWrapper}>
                <div className={styles.iconContainer}>
                  <GraduationCap className={styles.icon} />
                </div>
              </div>
              
              {/* Content Section */}
              <div className={styles.contentSection}>
                {/* Main Info */}
                <div>
                  <h3 className={styles.mainTitle}>
                    Bachelor of Science in IT Software Development
                  </h3>
                  <h4 className={styles.university}>
                    <BookOpen className={styles.universityIcon} />
                    Belarusian National Technical University
                  </h4>
                </div>

                {/* Date and Duration */}
                <div className={styles.badges}>
                  <div className={`${styles.badge} ${styles.dateBadge}`}>
                    <Calendar className={`${styles.badgeIcon} ${styles.dateIcon}`} />
                    <span className={`${styles.badgeText} ${styles.dateText}`}>2012 - 2015</span>
                  </div>
                  <div className={`${styles.badge} ${styles.durationBadge}`}>
                    <Award className={`${styles.badgeIcon} ${styles.durationIcon}`} />
                    <span className={`${styles.badgeText} ${styles.durationText}`}>3 Years</span>
                  </div>
                </div>

                {/* Description */}
                <div className={styles.descriptionBox}>
                  <p className={styles.descriptionText}>
                    Comprehensive computer science education covering software engineering principles, 
                    algorithms, data structures, and modern programming practices. Graduated with strong 
                    foundation in software development methodologies and system design.
                  </p>
                </div>

                {/* Key Subjects */}
                <div>
                  <h5 className={styles.subjectsTitle}>
                    <BookOpen className={styles.subjectsTitleIcon} />
                    Key Subjects
                  </h5>
                  <div className={styles.subjectsGrid}>
                    {[
                      'Software Engineering',
                      'Data Structures',
                      'Algorithms',
                      'Database Systems',
                      'System Design',
                      'Programming Languages'
                    ].map((subject, index) => (
                      <div 
                        key={index}
                        className={styles.subjectItem}
                      >
                        <div className={styles.subjectDot}></div>
                        <span className={styles.subjectText}>{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className={styles.decorativeTopRight}></div>
            <div className={styles.decorativeBottomLeft}></div>
          </div>
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
                animationDuration: `${4 + i}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
