import React from 'react';
import { ExternalLink, Github, Calendar, Users, Code, Zap, Star, Rocket } from 'lucide-react';
import { TiltCard } from '@/components/shared/TiltCard';

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
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "blue-500/20",
      hoverBorder: "blue-400/40",
      iconColor: "blue-300",
      shadow: "blue-500/20"
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
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "emerald-500/20",
      hoverBorder: "emerald-400/40",
      iconColor: "emerald-300",
      shadow: "emerald-500/20"
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
      color: "purple",
      gradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "purple-500/20",
      hoverBorder: "purple-400/40",
      iconColor: "purple-300",
      shadow: "purple-500/20"
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
      color: "orange",
      gradient: "from-orange-500/20 to-amber-500/20",
      borderColor: "orange-500/20",
      hoverBorder: "orange-400/40",
      iconColor: "orange-300",
      shadow: "orange-500/20"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-slate-900 via-gray-900/50 to-slate-900 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-emerald-500/3 via-purple-500/3 to-orange-500/3"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-orange-500/6 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work in backend development, cloud infrastructure, and full-stack applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <TiltCard
              key={index}
              className="project-card group relative bg-slate-800/80 rounded-2xl p-8 border border-white/10 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className={`text-2xl font-bold text-white group-hover:text-${project.iconColor} transition-colors duration-300`}>
                        {project.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold text-${project.iconColor} bg-gradient-to-r ${project.gradient} px-3 py-1 rounded-full border border-white/10 group-hover:border-${project.hoverBorder} transition-all duration-300`}>
                        {project.category}
                      </span>
                      <div className={`p-2 bg-gradient-to-br ${project.gradient} rounded-lg border border-white/10 group-hover:border-${project.borderColor} group-hover:scale-110 transition-all duration-300`}>
                        <Rocket className={`h-4 w-4 text-${project.iconColor}`} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{project.team}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className={`text-sm font-semibold text-${project.iconColor} mb-3 flex items-center gap-2`}>
                    <Code className="w-4 h-4" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.highlights.map((highlight, idx) => (
                      <div key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 bg-${project.iconColor} rounded-full`}></div>
                        {highlight}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-medium text-gray-300 bg-gradient-to-r from-white/5 to-white/10 px-3 py-1 rounded-full border border-white/10 hover:border-${project.iconColor}/30 transition-all duration-300 hover:shadow-sm hover:shadow-${project.shadow}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm text-${project.iconColor} hover:text-white transition-colors duration-300 group/link px-4 py-2 bg-gradient-to-r ${project.gradient} rounded-lg border border-white/10 hover:border-${project.hoverBorder} hover:shadow-lg hover:shadow-${project.shadow} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${project.iconColor}/50 focus-visible:ring-offset-0`}
                  >
                    <Github className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-sm text-${project.iconColor} hover:text-white transition-colors duration-300 group/link px-4 py-2 bg-gradient-to-r ${project.gradient} rounded-lg border border-white/10 hover:border-${project.hoverBorder} hover:shadow-lg hover:shadow-${project.shadow} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${project.iconColor}/50 focus-visible:ring-offset-0`}
                  >
                    <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform duration-200" />
                    Demo
                  </a>
                </div>
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-4 right-4 w-3 h-3 bg-${project.iconColor} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
              <div className={`absolute bottom-4 right-4 w-2 h-2 bg-${project.iconColor} rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
            </TiltCard>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <Star className="h-5 w-5 text-yellow-300" />
            <span className="text-gray-300 text-sm font-medium">More projects available on GitHub</span>
            <Star className="h-5 w-5 text-yellow-300" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-30 animate-float ${
                i % 4 === 0 ? 'bg-blue-300' :
                i % 4 === 1 ? 'bg-emerald-300' :
                i % 4 === 2 ? 'bg-purple-300' : 'bg-orange-300'
              }`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${25 + (i % 2) * 50}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
