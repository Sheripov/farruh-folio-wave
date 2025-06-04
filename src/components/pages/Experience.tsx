import React from 'react';
import { Briefcase, Calendar, TrendingUp, Users, Award, Star } from 'lucide-react';

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
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "blue-500/20",
      hoverBorder: "blue-400/40",
      iconColor: "blue-300",
      shadow: "blue-500/20",
      bgGradient: "from-blue-500/8 to-cyan-500/8"
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
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "emerald-500/20",
      hoverBorder: "emerald-400/40",
      iconColor: "emerald-300",
      shadow: "emerald-500/20",
      bgGradient: "from-emerald-500/8 to-teal-500/8"
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
      color: "purple",
      gradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "purple-500/20",
      hoverBorder: "purple-400/40",
      iconColor: "purple-300",
      shadow: "purple-500/20",
      bgGradient: "from-purple-500/8 to-violet-500/8"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-slate-900 via-gray-900/50 to-slate-900 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-emerald-500/3 to-purple-500/3"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-purple-500/6 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 via-emerald-200 to-purple-200 bg-clip-text text-transparent mb-4">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A journey of growth, innovation, and technical excellence in Python development and cloud architecture.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Enhanced Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-emerald-400 to-purple-400 rounded-full hidden md:block opacity-60"></div>
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400/20 via-emerald-400/20 to-purple-400/20 rounded-full hidden md:block blur-sm"></div>

            {experiences.map((exp, index) => (
              <div 
                key={index} 
                className="relative mb-16 md:ml-20 group"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                {/* Enhanced Timeline dot */}
                <div className={`absolute -left-24 top-8 w-6 h-6 bg-gradient-to-br ${exp.gradient} rounded-full border-4 border-slate-900 shadow-lg hidden md:flex items-center justify-center group-hover:scale-125 transition-transform duration-300`}>
                  <div className={`w-2 h-2 bg-${exp.iconColor} rounded-full`}></div>
                </div>
                
                {/* Experience Card */}
                <div className={`bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:-translate-y-1`}>
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`p-2 bg-gradient-to-br ${exp.gradient} rounded-lg border border-white/10 group-hover:border-${exp.borderColor} group-hover:scale-110 transition-all duration-300`}>
                            <Briefcase className={`h-5 w-5 text-${exp.iconColor}`} />
                          </div>
                          <h3 className={`text-2xl font-bold text-white group-hover:text-${exp.iconColor} transition-colors duration-300`}>
                            {exp.title}
                          </h3>
                        </div>
                        <h4 className={`text-xl font-semibold text-${exp.iconColor} mb-4 group-hover:text-white transition-colors duration-300`}>
                          {exp.company}
                        </h4>
                      </div>
                      
                      {/* Date and info badges */}
                      <div className="flex flex-col gap-2 lg:items-end">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm font-medium text-${exp.iconColor} bg-gradient-to-r ${exp.gradient} px-3 py-1 rounded-full border border-white/10 group-hover:border-${exp.hoverBorder} transition-all duration-300`}>
                            {exp.dates}
                          </span>
                        </div>
                        <div className="flex gap-2 text-xs">
                          <span className="text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                            {exp.duration}
                          </span>
                          <span className="text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                            {exp.type}
                          </span>
                          <span className="text-gray-400 bg-white/5 px-2 py-1 rounded-full border border-white/10">
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div className="mb-6">
                      <h5 className={`text-sm font-semibold text-${exp.iconColor} mb-4 flex items-center gap-2`}>
                        <TrendingUp className="w-4 h-4" />
                        Key Achievements
                      </h5>
                      <div className="grid gap-3">
                        {exp.achievements.map((achievement, achievementIndex) => (
                          <div key={achievementIndex} className="flex items-start gap-3 group/achievement">
                            <div className={`w-2 h-2 bg-${exp.iconColor} rounded-full mt-2 flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-300`}></div>
                            <span className="text-gray-300 leading-relaxed group-hover/achievement:text-gray-200 transition-colors duration-300">
                              {achievement}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-4">
                      <h5 className={`text-sm font-semibold text-${exp.iconColor} mb-3 flex items-center gap-2`}>
                        <Award className="w-4 h-4" />
                        Technologies Used
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`text-xs font-medium text-gray-300 bg-gradient-to-r from-white/5 to-white/10 px-3 py-1 rounded-full border border-white/10 hover:border-${exp.iconColor}/30 transition-all duration-300 hover:shadow-sm hover:shadow-${exp.shadow}`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={`absolute top-4 right-4 w-3 h-3 bg-${exp.iconColor} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                  <div className={`absolute bottom-4 right-4 w-2 h-2 bg-${exp.iconColor} rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-gray-300 text-sm font-medium">Continuously growing and taking on new challenges</span>
              <Star className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["Leadership", "Mentoring", "Innovation", "Problem Solving"].map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gradient-to-r from-white/10 to-white/20 rounded-full text-xs text-gray-300 border border-white/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-30 animate-float ${
                i % 3 === 0 ? 'bg-blue-300' :
                i % 3 === 1 ? 'bg-emerald-300' : 'bg-purple-300'
              }`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${3.5 + i * 0.4}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
