
import React from 'react';

export const Skills = () => {
  const skills = [
    "Python", "Django", "Django REST Framework", "Flask", "Docker", 
    "PostgreSQL", "Redis", "Celery", "Google Cloud Platform", "Cloud Run",
    "Pub/Sub", "App Engine", "Cloud Tasks", "Cloud SQL", "Terraform",
    "Data Analysis", "CI/CD", "JavaScript", "TypeScript", "Git",
    "Microservices", "API Design", "Database Optimization", "Testing"
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Technical Skills
        </h2>

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-white text-gray-800 px-6 py-3 rounded-full border border-gray-200 font-medium hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md cursor-default"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
