import React from 'react';
import { Code, Database, Cloud, Wrench, Zap, Star } from 'lucide-react';

export const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "blue-500/20",
      hoverBorder: "blue-400/40",
      iconColor: "blue-300",
      shadow: "blue-500/20",
      skills: ["Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      icon: Wrench,
      title: "Frameworks & Libraries",
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "emerald-500/20",
      hoverBorder: "emerald-400/40",
      iconColor: "emerald-300",
      shadow: "emerald-500/20",
      skills: ["Django", "Django REST Framework", "Flask", "React"]
    },
    {
      icon: Database,
      title: "Databases & Storage",
      color: "purple",
      gradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "purple-500/20",
      hoverBorder: "purple-400/40",
      iconColor: "purple-300",
      shadow: "purple-500/20",
      skills: ["PostgreSQL", "Redis", "Cloud SQL", "Database Optimization"]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "orange",
      gradient: "from-orange-500/20 to-amber-500/20",
      borderColor: "orange-500/20",
      hoverBorder: "orange-400/40",
      iconColor: "orange-300",
      shadow: "orange-500/20",
      skills: ["Google Cloud Platform", "Docker", "Terraform", "CI/CD"]
    },
    {
      icon: Zap,
      title: "Tools & Technologies",
      color: "rose",
      gradient: "from-rose-500/20 to-pink-500/20",
      borderColor: "rose-500/20",
      hoverBorder: "rose-400/40",
      iconColor: "rose-300",
      shadow: "rose-500/20",
      skills: ["Celery", "Pub/Sub", "Git", "API Design"]
    },
    {
      icon: Star,
      title: "Specializations",
      color: "indigo",
      gradient: "from-indigo-500/20 to-blue-500/20",
      borderColor: "indigo-500/20",
      hoverBorder: "indigo-400/40",
      iconColor: "indigo-300",
      shadow: "indigo-500/20",
      skills: ["Microservices", "Data Analysis", "Testing", "Performance Optimization"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800/50 to-slate-900 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/3 via-emerald-500/3 via-purple-500/3 via-orange-500/3 via-rose-500/3 to-indigo-500/3"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-emerald-500/6 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-orange-500/6 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 via-emerald-200 via-purple-200 via-orange-200 via-rose-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Technical Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 via-purple-400 via-orange-400 via-rose-400 to-indigo-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A comprehensive toolkit of modern technologies and frameworks for building scalable, efficient solutions.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div 
              key={categoryIndex}
              className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              style={{
                animationDelay: `${categoryIndex * 0.1}s`
              }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Header */}
              <div className="relative z-10 flex items-center gap-4 mb-6">
                <div className={`p-3 bg-gradient-to-br ${category.gradient} rounded-xl border border-white/10 group-hover:border-${category.hoverBorder} group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-${category.shadow}`}>
                  <category.icon className={`h-6 w-6 text-${category.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
                <h3 className={`text-lg font-bold text-white group-hover:text-${category.iconColor} transition-colors duration-300`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="relative z-10 grid grid-cols-1 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skillIndex}
                    className={`flex items-center gap-3 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-${category.iconColor}/30 transition-all duration-300 hover:shadow-sm hover:shadow-${category.shadow} group/skill`}
                  >
                    <div className={`w-2 h-2 bg-${category.iconColor} rounded-full group-hover/skill:scale-125 transition-transform duration-300`}></div>
                    <span className="text-gray-300 text-sm font-medium group-hover/skill:text-gray-200 transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-4 right-4 w-3 h-3 bg-${category.iconColor} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Bottom section with additional info */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-gray-300 text-sm font-medium">Continuously learning and adapting to new technologies</span>
              <Star className="h-5 w-5 text-yellow-300" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["Always Learning", "Best Practices", "Clean Code", "Performance Focus"].map((tag, index) => (
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
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-30 animate-float ${
                i % 6 === 0 ? 'bg-blue-300' :
                i % 6 === 1 ? 'bg-emerald-300' :
                i % 6 === 2 ? 'bg-purple-300' :
                i % 6 === 3 ? 'bg-orange-300' :
                i % 6 === 4 ? 'bg-rose-300' : 'bg-indigo-300'
              }`}
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.3}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
