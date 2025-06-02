
import React from 'react';
import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Abstract Wave SVG */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1440 320" className="w-full h-full">
          <path
            fill="url(#gradient)"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Farruh Sheripov
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
            Python Developer
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Crafting robust backend solutions with Django and Google Cloud Platform. 
            Passionate about building scalable applications that make a difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={() => window.open('/farruh-sheripov-cv.pdf', '_blank')}
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              onClick={scrollToContact}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
