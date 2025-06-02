
import React from 'react';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Strengths } from '@/components/Strengths';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Strengths />
      <Education />
      <Contact />
    </div>
  );
};

export default Index;
