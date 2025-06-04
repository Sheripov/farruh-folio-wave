import React from 'react';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent mb-4">
            Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Building a strong foundation in computer science and software development principles.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group">
            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Icon Section */}
              <div className="flex-shrink-0">
                <div className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl group-hover:scale-105 transition-all duration-300 border border-white/10 group-hover:border-blue-500/20">
                  <GraduationCap className="h-12 w-12 text-blue-300" />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="flex-1 space-y-6">
                {/* Main Info */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300">
                    Bachelor of Science in IT Software Development
                  </h3>
                  <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Belarusian National Technical University
                  </h4>
                </div>

                {/* Date and Duration */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-full border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                    <Calendar className="h-4 w-4 text-blue-300" />
                    <span className="text-blue-200 text-sm font-medium">2012 - 2015</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full border border-white/10 hover:border-indigo-500/20 transition-all duration-300">
                    <Award className="h-4 w-4 text-indigo-300" />
                    <span className="text-indigo-200 text-sm font-medium">3 Years</span>
                  </div>
                </div>

                {/* Description */}
                <div className="bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/10 transition-all duration-300">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Comprehensive computer science education covering software engineering principles, 
                    algorithms, data structures, and modern programming practices. Graduated with strong 
                    foundation in software development methodologies and system design.
                  </p>
                </div>

                {/* Key Subjects */}
                <div>
                  <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-300" />
                    Key Subjects
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                      'Software Engineering',
                      'Data Structures',
                      'Algorithms',
                      'Database Systems',
                      'System Design',
                      'Programming Languages'
                    ].map((subject, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-sm hover:shadow-blue-500/20"
                      >
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-gray-300 text-sm">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-indigo-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-500"></div>
          </div>
        </div>

        {/* Additional decorative floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-float"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${4 + i}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
