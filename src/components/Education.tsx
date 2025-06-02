
import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Education = () => {
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Education
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <div className="p-4 bg-purple-100 rounded-full">
                  <GraduationCap className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Bachelor of Science in IT Software Development
                </h3>
                <h4 className="text-lg font-semibold text-purple-600 mb-3">
                  Belarusian National Technical University
                </h4>
                <p className="text-gray-600 mb-4">
                  2012 - 2015
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Comprehensive computer science education covering software engineering principles, 
                  algorithms, data structures, and modern programming practices. Graduated with strong 
                  foundation in software development methodologies and system design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
