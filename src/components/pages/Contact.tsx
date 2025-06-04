import React, { useState } from 'react';
import { Mail, Phone, Send, MapPin, Heart } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      // Create mailto link with form data
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      const mailtoLink = `mailto:farruh.sheripov@fusioncode.org?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink);
      
      toast({
        title: "Opening email client...",
        description: "Your default email client will open with the message pre-filled.",
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast({
        title: "Unable to open email client",
        description: "Please contact me directly at farruh.sheripov@fusioncode.org",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
      {/* Soft background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Let's create something amazing together. I'm always excited to discuss new projects and opportunities.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Heart className="h-6 w-6 text-pink-400" />
                Let's Work Together
              </h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm passionate about creating innovative solutions and building meaningful connections. 
                Whether you have a project in mind or just want to say hello, I'd love to hear from you.
              </p>
              
              <div className="space-y-6">
                <div className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Email</h4>
                    <a 
                      href="mailto:farruh.sheripov@fusioncode.org"
                      className="text-purple-300 hover:text-purple-200 transition-colors duration-300 text-sm"
                    >
                      farruh.sheripov@fusioncode.org
                    </a>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/10 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
                  <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-5 w-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Phone</h4>
                    <a 
                      href="tel:+48123456789"
                      className="text-blue-300 hover:text-blue-200 transition-colors duration-300 text-sm"
                    >
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                <div className="group flex items-center space-x-4 p-4 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl border border-white/10 hover:border-pink-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                  <div className="p-3 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-5 w-5 text-pink-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Location</h4>
                    <span className="text-pink-300 text-sm">Cracow, Poland</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-600 focus:border-purple-400/60 focus:ring-purple-400/20 focus:ring-offset-0 rounded-xl transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/30"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-600 focus:border-purple-400/60 focus:ring-purple-400/20 focus:ring-offset-0 rounded-xl transition-all duration-300 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/30"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border-white/20 text-white placeholder-gray-600 focus:border-purple-400/60 focus:ring-purple-400/20 focus:ring-offset-0 rounded-xl transition-all duration-300 hover:bg-white/10 resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/30"
                  placeholder="Tell me about your project or how I can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-0 overflow-hidden relative"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-white/10 text-center relative z-10">
        <p className="text-gray-400 text-sm">
          © 2024 Farruh Sheripov. Built with React and Tailwind CSS.
        </p>
      </div>
    </section>
  );
};
