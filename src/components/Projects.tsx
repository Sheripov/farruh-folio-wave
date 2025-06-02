
import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Projects = () => {
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
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                  {project.name}
                </h3>
                {project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-purple-600 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>

              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>

              <div className="mb-4">
                <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-1 rounded">
                  {project.role}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
