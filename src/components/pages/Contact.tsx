import React, { useState } from 'react';
import { Mail, Phone, Send, MapPin, Heart } from 'lucide-react';


import { useToast } from '@/hooks/use-toast';
import styles from './Contact.module.css';

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
    <section id="contact" className={styles.contact}>      
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Get In Touch
          </h2>
          <div className={styles.titleUnderline}></div>
          <p className={styles.subtitle}>
            Let's create something amazing together. I'm always excited to discuss new projects and opportunities.
          </p>
        </div>

        <div className={styles.contentGrid}>
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoCardTitle}>
                <Heart className={styles.heartIcon} />
                Let's Work Together
              </h3>
              <p className={styles.infoCardDescription}>
                I'm passionate about creating innovative solutions and building meaningful connections. 
                Whether you have a project in mind or just want to say hello, I'd love to hear from you.
              </p>
              
              <div className={styles.contactMethods}>
                <div className={`${styles.contactMethod} ${styles.emailMethod}`}>
                  <div className={`${styles.methodIcon} ${styles.emailIcon}`}>
                    <Mail className={styles.mailIcon} />
                  </div>
                  <div className={styles.methodDetails}>
                    <h4>Email</h4>
                    <a 
                      href="mailto:farruh.sheripov@fusioncode.org"
                      className={styles.emailLink}
                    >
                      farruh.sheripov@fusioncode.org
                    </a>
                  </div>
                </div>

                <div className={`${styles.contactMethod} ${styles.phoneMethod}`}>
                  <div className={`${styles.methodIcon} ${styles.phoneIcon}`}>
                    <Phone className={styles.phoneIconSvg} />
                  </div>
                  <div className={styles.methodDetails}>
                    <h4>Phone</h4>
                    <a 
                      href="tel:+48123456789"
                      className={styles.phoneLink}
                    >
                      +48 123 456 789
                    </a>
                  </div>
                </div>

                <div className={`${styles.contactMethod} ${styles.locationMethod}`}>
                  <div className={`${styles.methodIcon} ${styles.locationIcon}`}>
                    <MapPin className={styles.mapIcon} />
                  </div>
                  <div className={styles.methodDetails}>
                    <h4>Location</h4>
                    <span className={styles.locationText}>Cracow, Poland</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formCard}>
            <h3 className={styles.formTitle}>Send me a message</h3>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className={styles.input}
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className={styles.input}
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={styles.textarea}
                  placeholder="Tell me about your project or how I can help you..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? (
                  <div className={styles.buttonContent}>
                    <div className={styles.spinner}></div>
                    Sending...
                  </div>
                ) : (
                  <div className={styles.buttonContent}>
                    <Send className={styles.sendIcon} />
                    Send Message
                  </div>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
