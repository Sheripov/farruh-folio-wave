import React from 'react';
import { Download, Mail, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useParallax } from '@/hooks/useParallax';

export const Hero = () => {
  const { getCombinedParallaxStyle } = useParallax();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    const scrollContainer = document.querySelector('.smooth-scroll') as HTMLElement;
    if (element && scrollContainer) {
      const targetPosition = element.offsetTop - 80; // Account for navigation height
      
      // Use custom smooth scroll animation
      const start = scrollContainer.scrollTop;
      const distance = targetPosition - start;
      const duration = 1000; // Duration in milliseconds
      let startTime: number;

      const animateScroll = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function for smooth animation (ease-in-out-cubic)
        const easeInOutCubic = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentPosition = start + distance * easeInOutCubic;
        scrollContainer.scrollTop = currentPosition;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    const scrollContainer = document.querySelector('.smooth-scroll') as HTMLElement;
    if (element && scrollContainer) {
      const targetPosition = element.offsetTop - 80;
      scrollContainer.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-slate-900 via-gray-900/50 to-slate-900">
      {/* Minimal background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>

      {/* Very subtle floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-20 left-10 w-20 h-20 bg-blue-400/5 rounded-full blur-xl"
          style={getCombinedParallaxStyle(0.03, 0.01)}
        />
        <div 
          className="absolute bottom-40 right-20 w-16 h-16 bg-purple-400/5 rounded-full blur-xl"
          style={getCombinedParallaxStyle(0.04, -0.01)}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          {/* Clean header */}
          <div className="mb-16">
            <div className="mb-6">
              <span className="text-sm font-medium text-blue-300 bg-blue-500/10 px-4 py-2 rounded-lg border border-white/10 hover:border-blue-500/20 transition-all duration-300">
                Senior Software Engineer
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
              Farruh Sheripov
            </h1>
            
            <h2 className="text-xl md:text-2xl text-gray-300 font-light mb-8">
              Python Backend Developer & Cloud Architect
            </h2>
          </div>

          {/* Simple description */}
          <div className="mb-16">
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
              Specialized in designing and implementing enterprise-grade backend systems using Django and Google Cloud Platform. 
              Proven track record of delivering scalable solutions that drive business growth.
            </p>
          </div>

          {/* Clear, readable buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50 focus-visible:ring-offset-0"
              onClick={() => window.open('/farruh-sheripov-cv.pdf', '_blank')}
            >
              <Download className="mr-3 h-5 w-5" />
              Download Resume
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50 focus-visible:ring-offset-0"
              onClick={scrollToContact}
            >
              <Mail className="mr-3 h-5 w-5" />
              Get In Touch
            </Button>
          </div>

          {/* Simple stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">6+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400 mb-2">50+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">10K+</div>
              <div className="text-sm text-gray-400">Users Served</div>
            </div>
          </div>

          {/* Simple scroll indicator */}
          <div className="flex flex-col items-center">
            <div className="text-gray-500 text-sm mb-4">
              Explore my work
            </div>
            <button
              onClick={scrollToAbout}
              className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-600 hover:border-gray-500 transition-all duration-300 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/50 focus-visible:ring-offset-0"
            >
              <ArrowDown className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
