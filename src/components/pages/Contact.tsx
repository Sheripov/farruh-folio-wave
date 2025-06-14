import React, { useState, useEffect, CSSProperties } from 'react';
import {
  Mail,
  Phone,
  Send,
  MapPin,
  Heart,
  type LucideIcon,
} from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import styles from './Contact.module.css';

// ----------------------- Dynamic color palettes -----------------------
const colorPalettes = [
  { primary: '#a855f7', secondary: '#ec4899', text: '#d8b4fe' }, // violet-pink
  { primary: '#3b82f6', secondary: '#8b5cf6', text: '#93c5fd' }, // blue-violet
  { primary: '#ec4899', secondary: '#a855f7', text: '#f9a8d4' }, // pink-violet
];

// ----------------------- Icons map for JSON ---------------------------
const iconsMap: Record<string, LucideIcon> = {
  Mail,
  Phone,
  MapPin,
};

// ----------------------- Types ---------------------------------------
interface ContactMethodJson {
  icon: string;
  title: string;
  value: string;
  link?: string;
}

interface ContactJson {
  contactMethods: ContactMethodJson[];
}

interface ContactMethod {
  icon: LucideIcon;
  title: string;
  value: string;
  link?: string;
  colorPalette: {
    primary: string;
    secondary: string;
    text: string;
  };
}

// Extend CSS Properties to support CSS variables for inline style
interface CustomCSSProperties extends CSSProperties {
  '--card-gradient'?: string;
  '--text-color'?: string;
  '--border-hover'?: string;
  '--shadow-color'?: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [methods, setMethods] = useState<ContactMethod[]>([]);
  const { toast } = useToast();

  // Load contact methods from JSON
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch('/data/contact.json');
        if (!response.ok) throw new Error(`Failed to fetch contact: ${response.status}`);
        const data: ContactJson = await response.json();

        const mapped: ContactMethod[] = data.contactMethods.map((item, idx) => ({
          icon: iconsMap[item.icon] || Mail,
          title: item.title,
          value: item.value,
          link: item.link,
          colorPalette: colorPalettes[idx % colorPalettes.length],
        }));

        setMethods(mapped);
      } catch (e) {
        console.error('Error loading contact.json', e);
      }
    };

    fetchContact();
  }, []);

  const renderMethods = () =>
    methods.map((method, index) => {
      const { primary, secondary, text } = method.colorPalette;
      const style: CustomCSSProperties = {
        '--card-gradient': `linear-gradient(135deg, ${primary}33 0%, ${secondary}33 100%)`,
        '--text-color': text,
        '--border-hover': `${primary}66`,
        '--shadow-color': `${primary}33`,
        animationDelay: `${index * 0.05}s`,
      };

      return (
        <div key={index} className={styles.contactMethod} style={style}>
          <div className={styles.methodIcon}>
            <method.icon className={styles.methodSvg} />
          </div>
          <div className={styles.methodDetails}>
            <h4>{method.title}</h4>
            {method.link ? (
              <a href={method.link} className={styles.methodLink} target={method.link.startsWith('http') ? '_blank' : undefined} rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {method.value}
              </a>
            ) : (
              <span className={styles.methodLink}>{method.value}</span>
            )}
          </div>
        </div>
      );
    });

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
              
              <div className={styles.contactMethods}>{renderMethods()}</div>
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
