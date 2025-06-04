import React from 'react';
import { Hero } from '@/components/pages/Hero';
import { About } from '@/components/pages/About';
import { Experience } from '@/components/pages/Experience';
import { Projects } from '@/components/pages/Projects';
import { Skills } from '@/components/pages/Skills';
import { Strengths } from '@/components/pages/Strengths';
import { Education } from '@/components/pages/Education';
import { Contact } from '@/components/pages/Contact';
import { Navigation } from '@/components/layout/Navigation';
import { ParallaxBackground, ParallaxConfig } from '@/components/effects/ParallaxBackground';
import { createParallaxConfig, intense } from '@/components/effects/ParallaxConfig';
import { AnimatedParticles } from '@/components/effects/AnimatedParticles';
import { FloatingWords } from '@/components/effects/FloatingWords';

const Index = () => {
  const parallaxConfig = createParallaxConfig('intense', {
    // Override specific properties while keeping the preset base
    particleCount: 10,
    mouseIntensity: 1.0,
    backgroundOpacity: 0.8,
  });


  return (
    <div>
      {/* Navigation outside of scroll wrapper to be truly fixed */}
      <Navigation />

      {/* Animated floating words */}
      <FloatingWords 
        count={20}
        speed={3}
        rotationSpeed={20}
        opacity={0.2}
        fontSize="0.8rem"
        sideOnlyPercentage={0.85}
        centerAreaStart={25}
        centerAreaEnd={75}
        leftSideEnd={20}
        rightSideStart={80}
        enableRotation={true}
        enableBounce={true}
      />
      
      <ParallaxBackground config={parallaxConfig} adjustedParticleCount={typeof window !== 'undefined' && window.innerWidth < 768
    ? Math.floor(parallaxConfig.particleCount / 2)
    : parallaxConfig.particleCount}>
        <AnimatedParticles
          config={{
            particleCount: 120,
            colors: [
              'rgba(139, 92, 246, 0.3)', // Purple
              'rgba(59, 130, 246, 0.3)', // Blue
              'rgba(236, 72, 153, 0.3)', // Pink
              'rgba(34, 197, 94, 0.3)',  // Green
            ],
            maxConnectionDistance: 60,
            speedRange: [-0.1, 0.1],
            sizeRange: [0.5, 2],
            opacityRange: [0.1, 0.3],
            fps: 24,
          }}
        />
        <div className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Strengths />
          <Education />
          <Contact />
        </div>
      </ParallaxBackground>
      
      {/* Footer */}
      <footer className="footer">
        <div className="container mx-auto px-4">
          <p className="footerText">
            © 2025 FusionCode. Built with React and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
