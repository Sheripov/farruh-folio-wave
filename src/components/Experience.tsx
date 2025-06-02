
import React from 'react';

export const Experience = () => {
  const experiences = [
    {
      company: "FusionCode Technologies",
      title: "Senior Python Developer",
      dates: "2021 - Present",
      achievements: [
        "Led development of multiple enterprise-level Django applications serving 10K+ users",
        "Architected microservices on Google Cloud Platform reducing infrastructure costs by 40%",
        "Mentored junior developers and established coding standards that improved team productivity by 30%"
      ]
    },
    {
      company: "TechFlow Solutions",
      title: "Python Developer",
      dates: "2019 - 2021",
      achievements: [
        "Built and maintained REST APIs using Django REST Framework for mobile and web applications",
        "Implemented CI/CD pipelines reducing deployment time from hours to minutes",
        "Optimized database queries resulting in 60% performance improvement in critical endpoints"
      ]
    },
    {
      company: "Digital Innovations Ltd",
      title: "Junior Python Developer",
      dates: "2017 - 2019",
      achievements: [
        "Developed web applications using Django framework following agile methodologies",
        "Collaborated with cross-functional teams to deliver features on time and within budget",
        "Contributed to open-source projects and gained experience with modern development practices"
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Experience
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-purple-200 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 md:ml-16">
                {/* Timeline dot */}
                <div className="absolute -left-20 top-6 w-4 h-4 bg-purple-600 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                
                <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-purple-600 mb-2">
                        {exp.company}
                      </h4>
                    </div>
                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {exp.dates}
                    </span>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
