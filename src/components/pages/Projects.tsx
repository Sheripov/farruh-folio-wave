import React, { useState, useEffect, CSSProperties } from 'react';
import { ExternalLink, Github, Calendar, Users, Code, Zap, Star, Rocket } from 'lucide-react';
import { TiltCard, TiltCardProps } from '@/components/shared/TiltCard';
import styles from './Project.module.css';

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

interface ProjectData {
  title: string;
  description: string;
  technologies: string[];
  category: string;
  year: string;
  team: string;
  duration: string;
  highlights: string[];
  github: string;
  demo: string;
  colorPalette?: {
    primary: string;
    secondary: string;
    text: string;
  };
}

// Extend CSS Properties to support CSS variables
interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string;
  '--text-color'?: string;
  '--border-hover'?: string;
  '--shadow-color'?: string;
}

export const Projects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }
        const data = await response.json();
        // Assign colors dynamically based on index
        const projectsWithColors = data.map((project: ProjectData, idx: number) => ({
          ...project,
          colorPalette: colorPalettes[idx % colorPalettes.length]
        }));
        setProjects(projectsWithColors);
      } catch (err) {
        console.error('Error loading projects:', err);
      }
    };

    fetchProjects();
  }, []);

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
          {projects.map((project, index) => {
            const { primary, secondary, text } = project.colorPalette || colorPalettes[0];
            
            // Generate dynamic styles with proper typing
            const cardStyle: CustomCSSProperties = {
              '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
              '--text-color': text,
              '--border-hover': `${primary}66`,
              '--shadow-color': `${primary}33`,
            };

            return (
              <TiltCard
                key={index}
                className={styles.projectCard}
                style={cardStyle}
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
                        <span className={styles.categoryBadge}>
                          {project.category}
                        </span>
                        <div className={styles.iconContainer}>
                          <Rocket className={styles.icon} />
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
                    <h4 className={styles.highlightsTitle}>
                      <Code className={styles.infoIcon} />
                      Key Features
                    </h4>
                    <div className={styles.highlightsGrid}>
                      {project.highlights.map((highlight, idx) => (
                        <div key={idx} className={styles.highlightItem}>
                          <div className={styles.highlightDot}></div>
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
                        className={styles.techTag}
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
                      className={styles.link}
                    >
                      <Github className={styles.linkIcon} />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      <ExternalLink className={styles.linkIcon} />
                      Demo
                    </a>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className={styles.decorativeElement1}></div>
                <div className={styles.decorativeElement2}></div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
