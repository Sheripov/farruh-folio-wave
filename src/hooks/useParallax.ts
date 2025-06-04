import { useEffect, useState, useCallback, useRef } from 'react';

// Advanced throttle with requestAnimationFrame
const rafThrottle = (func: Function) => {
  let rafId: number | null = null;
  return function(this: any, ...args: any[]) {
    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    }
  };
};

// Smooth interpolation for values
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [smoothMousePosition, setSmoothMousePosition] = useState({ x: 50, y: 50 });
  
  const targetScrollY = useRef(0);
  const targetMousePosition = useRef({ x: 50, y: 50 });
  const animationFrameId = useRef<number>();

  // Smooth animation loop
  const smoothUpdate = useCallback(() => {
    setSmoothScrollY(prev => lerp(prev, targetScrollY.current, 0.1));
    setSmoothMousePosition(prev => ({
      x: lerp(prev.x, targetMousePosition.current.x, 0.08),
      y: lerp(prev.y, targetMousePosition.current.y, 0.08),
    }));
    
    animationFrameId.current = requestAnimationFrame(smoothUpdate);
  }, []);

  const handleScroll = useCallback(
    rafThrottle(() => {
      const newScrollY = window.scrollY;
      setScrollY(newScrollY);
      targetScrollY.current = newScrollY;
    }),
    []
  );

  const handleMouseMove = useCallback(
    rafThrottle((e: MouseEvent) => {
      const newPosition = {
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      };
      setMousePosition(newPosition);
      targetMousePosition.current = newPosition;
    }),
    []
  );

  useEffect(() => {
    // Start smooth animation loop
    animationFrameId.current = requestAnimationFrame(smoothUpdate);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleScroll, handleMouseMove, smoothUpdate]);

  const getParallaxStyle = (speed: number = 0.5, useSmooth: boolean = true) => ({
    transform: `translate3d(0, ${(useSmooth ? smoothScrollY : scrollY) * speed}px, 0)`,
    willChange: 'transform',
  });

  const getMouseParallaxStyle = (intensity: number = 0.02, useSmooth: boolean = true) => {
    const pos = useSmooth ? smoothMousePosition : mousePosition;
    return {
      transform: `translate3d(${(pos.x - 50) * intensity}px, ${(pos.y - 50) * intensity}px, 0)`,
      willChange: 'transform',
    };
  };

  const getCombinedParallaxStyle = (scrollSpeed: number = 0.5, mouseIntensity: number = 0.02, useSmooth: boolean = true) => {
    const pos = useSmooth ? smoothMousePosition : mousePosition;
    const scroll = useSmooth ? smoothScrollY : scrollY;
    return {
      transform: `translate3d(${(pos.x - 50) * mouseIntensity}px, ${(pos.y - 50) * mouseIntensity + scroll * scrollSpeed}px, 0)`,
      willChange: 'transform',
    };
  };

  return {
    scrollY: smoothScrollY,
    mousePosition: smoothMousePosition,
    rawScrollY: scrollY,
    rawMousePosition: mousePosition,
    getParallaxStyle,
    getMouseParallaxStyle,
    getCombinedParallaxStyle,
  };
}; 