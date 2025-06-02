
import React from 'react';
import { MapPin, Mail, ExternalLink } from 'lucide-react';

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            About Me
          </h2>
          
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a passionate Python developer with extensive experience in building scalable backend systems using Django and Google Cloud Platform. 
              I specialize in creating robust APIs, implementing microservices architectures, and optimizing application performance for real-world business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <MapPin className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Cracow, Poland</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <Mail className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <a 
                    href="mailto:farruh.sheripov@fusioncode.org"
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    farruh.sheripov@fusioncode.org
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <ExternalLink className="h-6 w-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">LinkedIn</h3>
                  <a 
                    href="https://linkedin.com/in/farruh-sheripov"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    linkedin.com/in/farruh-sheripov
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
