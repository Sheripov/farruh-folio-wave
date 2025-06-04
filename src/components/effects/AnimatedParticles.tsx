import styles from './AnimatedParticles.module.css';
import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

/**
 * Configuration for animated particles.
 *
 * - particleCount: Number of individual particles rendered on the canvas. Affects visual density and performance.
 * - colors: Array of particle colors in rgba format. Allows for soft blending with background or theme.
 * - maxConnectionDistance: Maximum distance (in pixels) between particles for a line to appear between them.
 * - speedRange: Range of horizontal and vertical speeds (min, max) applied randomly to each particle.
 * - sizeRange: Radius size range (min, max) of each particle in pixels.
 * - opacityRange: Opacity range (min, max) for each particle; higher values result in brighter visuals.
 * - fps: Frames per second for animation; lower values reduce GPU load but may affect smoothness.
 */
interface ParticlesConfig {
  particleCount?: number;
  colors?: string[];
  maxConnectionDistance?: number;
  speedRange?: [number, number];
  sizeRange?: [number, number];
  opacityRange?: [number, number];
  fps?: number;
}

export const AnimatedParticles: React.FC<{ config?: ParticlesConfig }> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  const {
    particleCount = 1000,
    colors = [
      'rgba(139, 92, 246, 0.3)', // Purple
      'rgba(59, 130, 246, 0.3)',  // Blue
      'rgba(236, 72, 153, 0.3)',  // Pink
      'rgba(34, 197, 94, 0.3)',   // Green
    ],
    maxConnectionDistance = 60,
    speedRange = [-0.1, 0.1],
    sizeRange = [0.5, 2],
    opacityRange = [0.1, 0.3],
    fps = 24,
  } = config || {};

  const createParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particles: Particle[] = [];
    const particleCountFinal = particleCount;
    
    for (let i = 0; i < particleCountFinal; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
        vy: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
        size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
        opacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    
    particlesRef.current = particles;
  }, [particleCount, colors, speedRange, sizeRange, opacityRange]);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameInterval = 1000 / fps;
    if (currentTime - lastTimeRef.current < frameInterval) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    lastTimeRef.current = currentTime;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particlesRef.current.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x <= 0 || particle.x >= canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y <= 0 || particle.y >= canvas.height) {
        particle.vy *= -1;
      }
      
      // Keep particles within bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Draw connections to nearby particles (further optimized)
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const otherParticle = particlesRef.current[i];
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < maxConnectionDistance) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - distance / maxConnectionDistance)})`;
          ctx.lineWidth = 0.3;
          ctx.stroke();
        }
      }
    });
    
    animationRef.current = requestAnimationFrame(animate);
  }, [fps, maxConnectionDistance]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Enable hardware acceleration for canvas
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      createParticles(canvas);
    };

    resizeCanvas();
    animationRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [createParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  );
};