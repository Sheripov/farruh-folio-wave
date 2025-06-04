import React from 'react';
import { Clock, Zap, Target, Lightbulb, Star } from 'lucide-react';

export const Strengths = () => {
  const strengths = [
    {
      icon: Clock,
      title: "Time Management",
      description: "Efficient project planning and deadline adherence with proven track record of on-time deliveries.",
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "emerald-500/20",
      hoverBorder: "emerald-400/40",
      iconColor: "emerald-300",
      titleHover: "emerald-200",
      shadow: "emerald-500/20"
    },
    {
      icon: Zap,
      title: "Adaptability",
      description: "Quick learner who thrives in dynamic environments and readily adopts new technologies and methodologies.",
      color: "amber",
      gradient: "from-amber-500/20 to-orange-500/20",
      borderColor: "amber-500/20",
      hoverBorder: "amber-400/40",
      iconColor: "amber-300",
      titleHover: "amber-200",
      shadow: "amber-500/20"
    },
    {
      icon: Target,
      title: "Accountability", 
      description: "Takes ownership of projects from conception to deployment, ensuring quality and reliability.",
      color: "rose",
      gradient: "from-rose-500/20 to-pink-500/20",
      borderColor: "rose-500/20",
      hoverBorder: "rose-400/40",
      iconColor: "rose-300",
      titleHover: "rose-200",
      shadow: "rose-500/20"
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Analytical approach to complex challenges with creative solutions that drive business value.",
      color: "violet",
      gradient: "from-violet-500/20 to-purple-500/20",
      borderColor: "violet-500/20",
      hoverBorder: "violet-400/40",
      iconColor: "violet-300",
      titleHover: "violet-200",
      shadow: "violet-500/20"
    }
  ];

  return (
    <section id="strengths" className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/3 via-amber-500/3 via-rose-500/3 to-violet-500/3"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-violet-500/8 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-emerald-200 via-amber-200 via-rose-200 to-violet-200 bg-clip-text text-transparent mb-4">
            Core Strengths
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-amber-400 via-rose-400 to-violet-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Key personal and professional qualities that drive success in every project and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((strength, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center overflow-hidden"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Background gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${strength.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
              
              {/* Icon container */}
              <div className="relative z-10 flex justify-center mb-6">
                <div className={`p-6 bg-gradient-to-br ${strength.gradient} rounded-2xl border border-white/10 group-hover:border-${strength.hoverBorder} group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-${strength.shadow}`}>
                  <strength.icon className={`h-8 w-8 text-${strength.iconColor} group-hover:scale-110 transition-transform duration-300`} />
                </div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <h3 className={`text-xl font-bold text-white mb-4 group-hover:text-${strength.titleHover} transition-colors duration-300`}>
                  {strength.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
                  {strength.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className={`absolute top-4 right-4 w-3 h-3 bg-${strength.iconColor} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
              <div className={`absolute bottom-4 left-4 w-2 h-2 bg-${strength.iconColor} rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
            </div>
          ))}
        </div>

        {/* Bottom decorative section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-full border border-white/10">
            <Star className="h-5 w-5 text-yellow-300" />
            <span className="text-gray-300 text-sm font-medium">Driven by excellence and continuous improvement</span>
            <Star className="h-5 w-5 text-yellow-300" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full opacity-30 animate-float ${
                i % 4 === 0 ? 'bg-emerald-300' :
                i % 4 === 1 ? 'bg-amber-300' :
                i % 4 === 2 ? 'bg-rose-300' : 'bg-violet-300'
              }`}
              style={{
                left: `${15 + i * 15}%`,
                top: `${25 + (i % 2) * 50}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};
