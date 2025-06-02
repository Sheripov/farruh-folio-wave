
import React from 'react';
import { Clock, Zap, Target, Lightbulb } from 'lucide-react';

export const Strengths = () => {
  const strengths = [
    {
      icon: Clock,
      title: "Time Management",
      description: "Efficient project planning and deadline adherence with proven track record of on-time deliveries."
    },
    {
      icon: Zap,
      title: "Adaptability",
      description: "Quick learner who thrives in dynamic environments and readily adopts new technologies and methodologies."
    },
    {
      icon: Target,
      title: "Accountability", 
      description: "Takes ownership of projects from conception to deployment, ensuring quality and reliability."
    },
    {
      icon: Lightbulb,
      title: "Problem Solving",
      description: "Analytical approach to complex challenges with creative solutions that drive business value."
    }
  ];

  return (
    <section id="strengths" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Core Strengths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strengths.map((strength, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                  <strength.icon className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                {strength.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
