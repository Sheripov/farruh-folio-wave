import React, { useRef, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cards = container.querySelectorAll('.project-card');
      
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const rect = cardElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        // Calculate distance from center
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 300; // Maximum distance for effect
        
        if (distance < maxDistance) {
          // Calculate rotation and translation based on cursor position
          const rotateX = (deltaY / maxDistance) * 10;
          const rotateY = (deltaX / maxDistance) * -10;
          const translateX = (deltaX / maxDistance) * 8;
          const translateY = (deltaY / maxDistance) * 8;
          
          cardElement.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateX(${translateX}px) 
            translateY(${translateY}px)
            translateZ(0)
          `;
        } else {
          // Reset transform when cursor is far away
          cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0)';
        }
      });
    };

    const handleMouseLeave = () => {
      const cards = container.querySelectorAll('.project-card');
      cards.forEach((card) => {
        const cardElement = card as HTMLElement;
        cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) translateZ(0)';
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const projects = [
    {
      name: "DevFlow",
      link: "#",
      description: "Integrated with Jira, Tempo & GitLab to give managers real-time KPIs, budget burn-down and predictive analytics. Built from greenfield to production launch as the sole backend developer.",
      role: "Sole Back-end Developer",
      tech: ["Django REST Framework", "Google App Engine", "Pub/Sub", "Firebase", "CI/CD"]
    },
    {
      name: "Calanda",
      link: "#",
      description: "Comprehensive scheduling platform for offline meetings featuring invitation management, RSVP tracking, and agenda coordination. Refactored legacy system and implemented new microservices architecture.",
      role: "Full-stack Developer",
      tech: ["Django REST Framework", "Google Cloud Run", "MS Graph API", "Social Auth", "CI/CD"]
    },
    {
      name: "My Clienia",
      link: "#",
      description: "Digital companion application for psychiatric clinics providing patient scheduling, mood diary tracking, and cognitive behavioral therapy modules. Designed and built the entire backend infrastructure.",
      role: "Sole Back-end Developer", 
      tech: ["Django REST Framework", "Google Cloud Run", "Firebase", "CI/CD"]
    },
    {
      name: "SHUBiDU",
      link: "#",
      description: "Family calendar application enabling seamless event sharing across households and groups. Optimized legacy backend performance and integrated Twilio Verify with Celery job processing.",
      role: "Backend Developer",
      tech: ["Django REST Framework", "GKE", "Celery", "Twilio Verify", "Firebase", "CI/CD"]
    },
    {
      name: "The RollingStocks",
      link: "#",
      description: "Community-driven portal documenting RhB rolling stock history with crowd-sourced media uploads and technical drawings. Built scalable backend to handle large media collections.",
      role: "Sole Back-end Developer",
      tech: ["Django REST Framework", "Materialised Views", "Google Cloud Run", "PostgreSQL", "CI/CD"]
    },
    {
      name: "django-materialised-view",
      link: "https://github.com/farruh-sheripov/django-materialised-view",
      description: "Open-source library enabling developers to declare, refresh and automate PostgreSQL materialised views within Django projects. Simplifies complex query optimization workflows.",
      role: "Creator & Maintainer",
      tech: ["Django", "PostgreSQL", "Python Packaging"]
    },
    {
      name: "django-google-structured-logger", 
      link: "https://github.com/farruh-sheripov/django-google-structured-logger",
      description: "Django middleware that automatically masks personally identifiable information and pushes structured request/response logs to Google Cloud Logging for enhanced monitoring.",
      role: "Author & Maintainer",
      tech: ["Django", "Google Cloud Logging", "Middleware"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full animate-scale-in"></div>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card group relative bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-2xl animate-fade-in overflow-hidden cursor-pointer"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both',
                transformStyle: 'preserve-3d',
                willChange: 'transform'
              }}
            >
              {/* Animated background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              
              {/* Subtle border glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-all duration-300 group-hover:scale-105">
                    {project.name}
                  </h3>
                  {project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-purple-600 transition-all duration-300 hover:scale-110 hover:rotate-12"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>

                <p className="text-gray-600 mb-4 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {project.description}
                </p>

                <div className="mb-4">
                  <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full group-hover:bg-purple-100 group-hover:scale-105 transition-all duration-300 inline-block">
                    {project.role}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-all duration-300 hover:scale-105 group-hover:bg-white group-hover:shadow-sm"
                      style={{
                        animationDelay: `${(index * 150) + (techIndex * 50)}ms`
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
              </div>

              {/* Animated border on hover */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              <div className="absolute inset-[2px] rounded-[10px] bg-white -z-10"></div>
            </div>
          ))}
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-purple-300 rounded-full opacity-30 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${4 + i}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
