import React from 'react';
import { MapPin, Mail, ExternalLink, Code, Heart, Coffee, Zap, Star, User, Globe, Calendar } from 'lucide-react';
import styles from './About.module.css';

export const About = () => {
  const personalInfo = [
    {
      icon: MapPin,
      title: "Location",
      value: "Cracow, Poland",
      description: "Based in beautiful Cracow",
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "blue-500/20",
      hoverBorder: "blue-400/40",
      iconColor: "blue-300",
      shadow: "blue-500/20"
    },
    {
      icon: Mail,
      title: "Email",
      value: "farruh.sheripov@fusioncode.org",
      description: "Let's connect and collaborate",
      link: "mailto:farruh.sheripov@fusioncode.org",
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "emerald-500/20",
      hoverBorder: "emerald-400/40",
      iconColor: "emerald-300",
      shadow: "emerald-500/20"
    },
    {
      icon: ExternalLink,
      title: "LinkedIn",
      value: "linkedin.com/in/farruh-sheripov",
      description: "Professional networking",
      link: "https://linkedin.com/in/farruh-sheripov",
      color: "purple",
      gradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "purple-500/20",
      hoverBorder: "purple-400/40",
      iconColor: "purple-300",
      shadow: "purple-500/20"
    },
    {
      icon: Globe,
      title: "Languages",
      value: "English, Russian, Uzbek",
      description: "Multilingual communication",
      color: "orange",
      gradient: "from-orange-500/20 to-amber-500/20",
      borderColor: "orange-500/20",
      hoverBorder: "orange-400/40",
      iconColor: "orange-300",
      shadow: "orange-500/20"
    }
  ];

  const interests = [
    { icon: Code, text: "Clean Code", color: "blue" },
    { icon: Zap, text: "Performance", color: "emerald" },
    { icon: Heart, text: "Open Source", color: "purple" },
    { icon: Coffee, text: "Problem Solving", color: "orange" }
  ];

  return (
    <section id="about" className={styles.aboutSection}>      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            About Me
          </h2>
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
                        <div 
                          key={index}
                          className={styles.interestItem}
                        >
                          <interest.icon className={`${styles.interestIcon} ${styles[`interestIcon${interest.color.charAt(0).toUpperCase() + interest.color.slice(1)}`]}`} />
                          <span className={styles.interestText}>
                            {interest.text}
                          </span>
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
              {personalInfo.map((info, index) => (
                <div 
                  key={index}
                  className={styles.contactCard}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Background gradient overlay */}
                  <div className={`${styles.contactCardBgOverlay} ${styles[`contactCardBg${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`}></div>
                  
                  {/* Shimmer effect */}
                  <div className={styles.contactCardShimmer}></div>

                  <div className={styles.contactCardContent}>
                    <div className={`${styles.contactIcon} ${styles[`contactIcon${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`}>
                      <info.icon className={`${styles.contactIconSvg} ${styles[`contactIconSvg${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`} />
                    </div>
                    <div className={styles.contactInfo}>
                      <h4 className={`${styles.contactInfoTitle} ${styles[`contactInfoTitle${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`}>
                        {info.title}
                      </h4>
                      <div className={styles.contactInfoDescription}>{info.description}</div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`${styles.contactLink} ${styles.contactInfoValue} ${styles[`contactInfoValue${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className={`${styles.contactInfoValue} ${styles[`contactInfoValue${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`}>
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={`${styles.contactCardDecorative} ${styles[`contactCardDecorative${info.color.charAt(0).toUpperCase() + info.color.slice(1)}`]}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
