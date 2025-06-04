import React from 'react';
import { MapPin, Mail, ExternalLink, Code, Heart, Coffee, Zap, Star, User, Globe, Calendar } from 'lucide-react';

export const About = () => {
  const personalInfo = [
    {
      icon: MapPin,
      title: "Location",
      value: "Cracow, Poland",
      description: "Based in beautiful Cracow",
      color: "blue",
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "blue-500/20",
      hoverBorder: "blue-400/40",
      iconColor: "blue-300",
      shadow: "blue-500/20"
    },
    {
      icon: Mail,
      title: "Email",
      value: "farruh.sheripov@fusioncode.org",
      description: "Let's connect and collaborate",
      link: "mailto:farruh.sheripov@fusioncode.org",
      color: "emerald",
      gradient: "from-emerald-500/20 to-teal-500/20",
      borderColor: "emerald-500/20",
      hoverBorder: "emerald-400/40",
      iconColor: "emerald-300",
      shadow: "emerald-500/20"
    },
    {
      icon: ExternalLink,
      title: "LinkedIn",
      value: "linkedin.com/in/farruh-sheripov",
      description: "Professional networking",
      link: "https://linkedin.com/in/farruh-sheripov",
      color: "purple",
      gradient: "from-purple-500/20 to-violet-500/20",
      borderColor: "purple-500/20",
      hoverBorder: "purple-400/40",
      iconColor: "purple-300",
      shadow: "purple-500/20"
    },
    {
      icon: Globe,
      title: "Languages",
      value: "English, Russian, Uzbek",
      description: "Multilingual communication",
      color: "orange",
      gradient: "from-orange-500/20 to-amber-500/20",
      borderColor: "orange-500/20",
      hoverBorder: "orange-400/40",
      iconColor: "orange-300",
      shadow: "orange-500/20"
    }
  ];

  const interests = [
    { icon: Code, text: "Clean Code", color: "blue-300" },
    { icon: Zap, text: "Performance", color: "emerald-300" },
    { icon: Heart, text: "Open Source", color: "purple-300" },
    { icon: Coffee, text: "Problem Solving", color: "orange-300" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-900 via-gray-900/50 to-slate-900 relative overflow-hidden">      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 via-emerald-200 via-purple-200 to-orange-200 bg-clip-text text-transparent mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 via-purple-400 to-orange-400 mx-auto rounded-full mb-6"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Introduction */}
            <div className="space-y-8">
              {/* Profile Card */}
              <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
                {/* Background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-emerald-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 group-hover:border-blue-500/20 group-hover:scale-110 transition-all duration-300">
                      <User className="h-6 w-6 text-blue-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      Farruh Sheripov
                    </h3>
                  </div>
                  
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p className="group-hover:text-gray-200 transition-colors duration-300">
                      I'm a passionate <span className="text-blue-300 font-semibold">Python developer</span> with extensive experience in building scalable backend systems using Django and Google Cloud Platform.
                    </p>
                    <p className="group-hover:text-gray-200 transition-colors duration-300">
                      I specialize in creating <span className="text-emerald-300 font-semibold">robust APIs</span>, implementing <span className="text-purple-300 font-semibold">microservices architectures</span>, and optimizing application performance for real-world business needs.
                    </p>
                    <p className="group-hover:text-gray-200 transition-colors duration-300">
                      With a strong focus on <span className="text-orange-300 font-semibold">clean code</span> and best practices, I enjoy solving complex problems and mentoring fellow developers.
                    </p>
                  </div>

                  {/* Interests */}
                  <div className="mt-6">
                    <h4 className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      What I Love
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest, index) => (
                        <div 
                          key={index}
                          className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-white/5 to-white/10 rounded-full border border-white/10 hover:border-white/20 transition-all duration-300 group/interest"
                        >
                          <interest.icon className={`w-4 h-4 text-${interest.color} group-hover/interest:scale-110 transition-transform duration-300`} />
                          <span className="text-xs text-gray-300 group-hover/interest:text-gray-200 transition-colors duration-300">
                            {interest.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-300 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300 group text-center">
                  <div className="text-2xl font-bold text-emerald-300 mb-1 group-hover:scale-110 transition-transform duration-300">6+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
                <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:shadow-lg transition-all duration-300 group text-center">
                  <div className="text-2xl font-bold text-purple-300 mb-1 group-hover:scale-110 transition-transform duration-300">50+</div>
                  <div className="text-sm text-gray-400">Projects Completed</div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Info */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-300" />
                Get In Touch
              </h3>
              
              {personalInfo.map((info, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer"
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-1000"></div>

                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`p-3 bg-gradient-to-br ${info.gradient} rounded-lg border border-white/10 group-hover:border-${info.borderColor} group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-${info.shadow}`}>
                      <info.icon className={`h-5 w-5 text-${info.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold text-white group-hover:text-${info.iconColor} transition-colors duration-300 mb-1`}>
                        {info.title}
                      </h4>
                      <div className="text-sm text-gray-400 mb-1">{info.description}</div>
                      {info.link ? (
                        <a 
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : undefined}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`text-${info.iconColor} hover:text-white transition-colors duration-300 text-sm font-medium group-hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-${info.iconColor}/50 focus-visible:ring-offset-0 rounded`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className={`text-${info.iconColor} text-sm font-medium`}>
                          {info.value}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className={`absolute top-3 right-3 w-2 h-2 bg-${info.iconColor} rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
