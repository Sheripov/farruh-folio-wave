import React from 'react';
import { Code, Database, Cloud, Wrench, Zap, Star } from 'lucide-react';
import styles from './Skills.module.css';

export const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      color: "blue",
      skills: ["Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      icon: Wrench,
      title: "Frameworks & Libraries",
      color: "emerald",
      skills: ["Django", "Django REST Framework", "Flask", "React"]
    },
    {
      icon: Database,
      title: "Databases & Storage",
      color: "purple",
      skills: ["PostgreSQL", "Redis", "Cloud SQL", "Database Optimization"]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "orange",
      skills: ["Google Cloud Platform", "Docker", "Terraform", "CI/CD"]
    },
    {
      icon: Zap,
      title: "Tools & Technologies",
      color: "rose",
      skills: ["Celery", "Pub/Sub", "Git", "API Design"]
    },
    {
      icon: Star,
      title: "Specializations",
      color: "indigo",
      skills: ["Microservices", "Data Analysis", "Testing", "Performance Optimization"]
    }
  ];

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
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className={`${styles.categoryCard} ${styles[category.color]}`}
            >
              {/* Background gradient overlay */}
              <div className={styles.gradientOverlay}></div>
              
              {/* Header */}
              <div className={styles.categoryHeader}>
                <div className={styles.iconContainer}>
                  <category.icon className={styles.categoryIcon} />
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
          ))}
        </div>
      </div>
    </section>
  );
};
