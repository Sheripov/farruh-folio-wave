import React from 'react';
import { ExternalLink, Github, Calendar, Users, Code, Zap, Star, Rocket } from 'lucide-react';
import { TiltCard } from '@/components/shared/TiltCard';
import styles from './Project.module.css';

export const Projects = () => {

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with Django REST Framework and React. Features include user authentication, payment processing, inventory management, and real-time notifications.",
      technologies: ["Django", "PostgreSQL", "Redis", "Celery", "React", "Docker"],
      category: "Full Stack",
      year: "2024",
      team: "4 developers",
      duration: "6 months",
      highlights: [
        "Microservices architecture",
        "Real-time inventory tracking",
        "Payment gateway integration",
        "Admin dashboard"
      ],
      github: "https://github.com/farruh-sheripov/ecommerce-platform",
      demo: "https://ecommerce-demo.fusioncode.org",
      color: "blue"
    },
    {
      title: "Task Management API",
      description: "RESTful API for project management with advanced features like task dependencies, time tracking, team collaboration, and automated reporting.",
      technologies: ["Django", "DRF", "PostgreSQL", "JWT", "Swagger", "Docker"],
      category: "Backend",
      year: "2023",
      team: "2 developers",
      duration: "4 months",
      highlights: [
        "JWT authentication",
        "Role-based permissions",
        "API documentation",
        "Performance optimization"
      ],
      github: "https://github.com/farruh-sheripov/task-api",
      demo: "https://task-api.fusioncode.org/docs",
      color: "emerald"
    },
    {
      title: "Cloud Infrastructure Automation",
      description: "Infrastructure as Code solution using Terraform and Google Cloud Platform. Automated deployment pipelines with monitoring and scaling capabilities.",
      technologies: ["GCP", "Terraform", "Docker", "Kubernetes", "CI/CD", "Monitoring"],
      category: "DevOps",
      year: "2023",
      team: "3 developers",
      duration: "3 months",
      highlights: [
        "Auto-scaling infrastructure",
        "CI/CD pipelines",
        "Monitoring & alerting",
        "Cost optimization"
      ],
      github: "https://github.com/farruh-sheripov/gcp-terraform",
      demo: "https://monitoring.fusioncode.org",
      color: "purple"
    },
    {
      title: "Real-time Analytics Dashboard",
      description: "Interactive dashboard for real-time data visualization with WebSocket connections, custom charts, and automated report generation.",
      technologies: ["Django", "WebSockets", "Chart.js", "PostgreSQL", "Redis", "Celery"],
      category: "Full Stack",
      year: "2024",
      team: "5 developers",
      duration: "5 months",
      highlights: [
        "Real-time data streaming",
        "Interactive visualizations",
        "Custom report builder",
        "Export functionality"
      ],
      github: "https://github.com/farruh-sheripov/analytics-dashboard",
      demo: "https://analytics.fusioncode.org",
      color: "orange"
    }
  ];

  return (
    <section id="projects" className={styles.projectsSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Featured Projects
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            A showcase of my recent work in backend development, cloud infrastructure, and full-stack applications.
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <TiltCard
              key={index}
              className={`${styles.projectCard} ${styles[project.color]}`}
            >
              {/* Background gradient overlay */}
              <div className={styles.gradientOverlay}></div>
              
              {/* Shimmer effect */}
              <div className={styles.shimmerEffect}></div>

              <div className={styles.cardContent}>
                {/* Header */}
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderContent}>
                    <div className={styles.cardTitleContainer}>
                      <h3 className={styles.cardTitle}>
                        {project.title}
                      </h3>
                    </div>
                    <div className={styles.cardMeta}>
                      <span className={`${styles.categoryBadge} ${styles[project.color]}`}>
                        {project.category}
                      </span>
                      <div className={`${styles.iconContainer} ${styles[project.color]}`}>
                        <Rocket className={`${styles.icon} ${styles[project.color]}`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className={styles.projectInfo}>
                  <div className={styles.infoItem}>
                    <Calendar className={styles.infoIcon} />
                    <span>{project.year}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Users className={styles.infoIcon} />
                    <span>{project.team}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Zap className={styles.infoIcon} />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className={styles.description}>
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className={styles.highlightsSection}>
                  <h4 className={`${styles.highlightsTitle} ${styles[project.color]}`}>
                    <Code className={styles.infoIcon} />
                    Key Features
                  </h4>
                  <div className={styles.highlightsGrid}>
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className={styles.highlightItem}>
                        <div className={`${styles.highlightDot} ${styles[project.color]}`}></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className={styles.technologies}>
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`${styles.techTag} ${styles[project.color]}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className={styles.links}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} ${styles[project.color]}`}
                  >
                    <Github className={styles.linkIcon} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.link} ${styles[project.color]}`}
                  >
                    <ExternalLink className={styles.linkIcon} />
                    Demo
                  </a>
                </div>
              </div>

              {/* Decorative elements */}
              <div className={`${styles.decorativeElement1} ${styles[project.color]}`}></div>
              <div className={`${styles.decorativeElement2} ${styles[project.color]}`}></div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
