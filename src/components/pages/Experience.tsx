import React from 'react';
import { Briefcase, Calendar, TrendingUp, Users, Award, Star } from 'lucide-react';
import styles from './Experience.module.css';

export const Experience = () => {
  const experiences = [
    {
      company: "FusionCode Technologies",
      title: "Senior Python Developer",
      dates: "2021 - Present",
      duration: "3+ years",
      type: "Full-time",
      location: "Remote",
      achievements: [
        "Led development of multiple enterprise-level Django applications serving 10K+ users",
        "Architected microservices on Google Cloud Platform reducing infrastructure costs by 40%",
        "Mentored junior developers and established coding standards that improved team productivity by 30%",
        "Implemented automated testing and CI/CD pipelines improving deployment reliability by 95%"
      ],
      technologies: ["Django", "GCP", "PostgreSQL", "Docker", "Kubernetes", "Terraform"],
      color: "blue"
    },
    {
      company: "TechFlow Solutions",
      title: "Python Developer",
      dates: "2019 - 2021",
      duration: "2 years",
      type: "Full-time",
      location: "Hybrid",
      achievements: [
        "Built and maintained REST APIs using Django REST Framework for mobile and web applications",
        "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
        "Optimized database queries resulting in 60% performance improvement in critical endpoints",
        "Collaborated with frontend teams to deliver seamless user experiences"
      ],
      technologies: ["Django REST", "PostgreSQL", "Redis", "Docker", "Jenkins", "AWS"],
      color: "emerald"
    },
    {
      company: "Digital Innovations Ltd",
      title: "Junior Python Developer",
      dates: "2017 - 2019",
      duration: "2 years",
      type: "Full-time",
      location: "On-site",
      achievements: [
        "Developed web applications using Django framework following agile methodologies",
        "Collaborated with cross-functional teams to deliver features on time and within budget",
        "Contributed to open-source projects and gained experience with modern development practices",
        "Participated in code reviews and learned best practices from senior developers"
      ],
      technologies: ["Django", "MySQL", "JavaScript", "Git", "Linux", "Agile"],
      color: "purple"
    }
  ];

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Professional Experience
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            A journey of growth, innovation, and technical excellence in Python development and cloud architecture.
          </p>
        </div>

        <div className={styles.experienceContainer}>
          <div className={styles.timelineWrapper}>
            {/* Enhanced Timeline line */}
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineLineBlur}></div>

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className={styles.experienceItem}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Enhanced Timeline dot */}
                <div className={`${styles.timelineDot} ${styles[`${exp.color}Dot`]}`}>
                  <div className={`${styles.timelineDotInner} ${styles[`${exp.color}DotInner`]}`}></div>
                </div>
                
                {/* Experience Card */}
                <div className={styles.experienceCard}>
                  {/* Background gradient overlay */}
                  <div className={`${styles.cardOverlay} ${styles[`${exp.color}Overlay`]}`}></div>
                  
                  {/* Shimmer effect */}
                  <div className={styles.shimmerEffect}></div>

                  <div className={styles.cardContent}>
                    {/* Header */}
                    <div className={styles.cardHeader}>
                      <div className={styles.headerLeft}>
                        <div className={styles.titleRow}>
                          <div className={`${styles.iconWrapper} ${styles[`${exp.color}Icon`]}`}>
                            <Briefcase className={`${styles.icon} ${styles[`${exp.color}IconColor`]}`} />
                          </div>
                          <h3 className={`${styles.jobTitle} ${styles[`${exp.color}Title`]}`}>
                            {exp.title}
                          </h3>
                        </div>
                        <h4 className={`${styles.companyName} ${styles[`${exp.color}Company`]}`}>
                          {exp.company}
                        </h4>
                      </div>
                      
                      {/* Date and info badges */}
                      <div className={styles.headerRight}>
                        <div className={styles.dateRow}>
                          <Calendar className={styles.calendarIcon} />
                          <span className={`${styles.dateBadge} ${styles[`${exp.color}Badge`]}`}>
                            {exp.dates}
                          </span>
                        </div>
                        <div className={styles.infoBadges}>
                          <span className={styles.infoBadge}>
                            {exp.duration}
                          </span>
                          <span className={styles.infoBadge}>
                            {exp.type}
                          </span>
                          <span className={styles.infoBadge}>
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className={styles.achievementsSection}>
                      <h5 className={`${styles.sectionTitle} ${styles[`${exp.color}SectionTitle`]}`}>
                        <TrendingUp className={styles.sectionIcon} />
                        Key Achievements
                      </h5>
                      <div className={styles.achievementsList}>
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className={styles.achievementItem}>
                            <div className={`${styles.achievementBullet} ${styles[`${exp.color}Bullet`]}`}></div>
                            <span className={styles.achievementText}>
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className={styles.technologiesSection}>
                      <h5 className={`${styles.sectionTitle} ${styles[`${exp.color}SectionTitle`]}`}>
                        <Award className={styles.sectionIcon} />
                        Technologies Used
                      </h5>
                      <div className={styles.techList}>
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`${styles.techBadge} ${styles[`${exp.color}Tech`]}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={styles.decorativeElements}>
                    <div className={`${styles.decorativeDot1} ${styles[`${exp.color}Decor`]}`}></div>
                    <div className={`${styles.decorativeDot2} ${styles[`${exp.color}Decor`]}`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
