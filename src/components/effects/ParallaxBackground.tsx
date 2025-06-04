import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styles from './ParallaxBackground.module.css';

interface ParallaxConfig {
  // Element configuration
  particleCount?: number;
  particleSize?: number;
  particleOpacity?: number;
  
  // Large shapes configuration
  largeShapesOpacity?: number;
  largeShapesSizes?: [number, number, number, number, number]; // [first, second, third, fourth, fifth]
  
  // Movement sensitivity
  mouseIntensity?: number;
  scrollIntensity?: number;
  particleMouseSensitivity?: number;
  particleScrollSpeed?: number;
  
  // Background settings
  backgroundOpacity?: number;
  gradientOverlayOpacity?: number;
  gridOpacity?: number;
  
  // Animation smoothness
  mouseLerpFactor?: number;
  scrollLerpFactor?: number;
  
  // Visual effects
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  gridSize?: number;
}

interface ParallaxBackgroundProps {
  children: React.ReactNode;
  config?: ParallaxConfig;
  adjustedParticleCount?: number;
}

// Default configuration
const defaultConfig: Required<ParallaxConfig> = {
  // Element configuration
  particleCount: 20,
  particleSize: 4, // in pixels
  particleOpacity: 0.3,
  
  // Large shapes configuration
  largeShapesOpacity: 0.2,
  largeShapesSizes: [500, 400, 300, 200, 100], // [first, second, third, fourth, fifth]
  
  // Movement sensitivity
  mouseIntensity: 0.12,
  scrollIntensity: 0.3,
  particleMouseSensitivity: 0.03,
  particleScrollSpeed: 0.05,
  
  // Background settings
  backgroundOpacity: 0.95,
  gradientOverlayOpacity: 0.2,
  gridOpacity: 0.15,
  
  // Animation smoothness
  mouseLerpFactor: 0.06,
  scrollLerpFactor: 0.08,
  
  // Visual effects
  blurIntensity: '3xl',
  gridSize: 40,
};

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

// Smooth interpolation
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

export const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  config = {},
  adjustedParticleCount,
}) => {
  // Merge user config with defaults and validate values
  const finalConfig = useMemo(() => {
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Validate and clamp values
    return {
      ...mergedConfig,
      particleCount: Math.max(1, Math.min(100, mergedConfig.particleCount)),
      particleSize: Math.max(1, Math.min(20, mergedConfig.particleSize)),
      particleOpacity: Math.max(0, Math.min(1, mergedConfig.particleOpacity)),
      largeShapesOpacity: Math.max(0, Math.min(1, mergedConfig.largeShapesOpacity)),
      mouseIntensity: Math.max(0, Math.min(1, mergedConfig.mouseIntensity)),
      scrollIntensity: Math.max(0, Math.min(1, mergedConfig.scrollIntensity)),
      particleMouseSensitivity: Math.max(0, Math.min(1, mergedConfig.particleMouseSensitivity)),
      particleScrollSpeed: Math.max(0, Math.min(1, mergedConfig.particleScrollSpeed)),
      backgroundOpacity: Math.max(0, Math.min(1, mergedConfig.backgroundOpacity)),
      gradientOverlayOpacity: Math.max(0, Math.min(1, mergedConfig.gradientOverlayOpacity)),
      gridOpacity: Math.max(0, Math.min(1, mergedConfig.gridOpacity)),
      mouseLerpFactor: Math.max(0, Math.min(1, mergedConfig.mouseLerpFactor)),
      scrollLerpFactor: Math.max(0, Math.min(1, mergedConfig.scrollLerpFactor)),
      gridSize: Math.max(10, Math.min(200, mergedConfig.gridSize)),
    };
  }, [config]);
  
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [smoothScrollY, setSmoothScrollY] = useState(0);
  const [smoothMousePosition, setSmoothMousePosition] = useState({ x: 50, y: 50 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Calculate grid cells
  const gridCells = useMemo(() => {
    if (windowSize.width === 0 || windowSize.height === 0) return 0;
    return Math.ceil(windowSize.width / finalConfig.gridSize) * Math.ceil(windowSize.height / finalConfig.gridSize);
  }, [windowSize, finalConfig.gridSize]);

  // Handle window resize
  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Initial size
    updateWindowSize();

    // Add resize listener
    window.addEventListener('resize', updateWindowSize);

    return () => {
      window.removeEventListener('resize', updateWindowSize);
    };
  }, []);

  const handleScroll = useCallback(
    rafThrottle(() => {
      setScrollY(window.scrollY);
    }),
    []
  );

  const handleMouseMove = useCallback(
    rafThrottle((e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    }),
    []
  );

  // Smooth animation loop
  useEffect(() => {
    let animationId: number;
    
    const animate = () => {
      setSmoothScrollY(prev => lerp(prev, scrollY, finalConfig.scrollLerpFactor));
      setSmoothMousePosition(prev => ({
        x: lerp(prev.x, mousePosition.x, finalConfig.mouseLerpFactor),
        y: lerp(prev.y, mousePosition.y, finalConfig.mouseLerpFactor),
      }));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [scrollY, mousePosition, finalConfig.scrollLerpFactor, finalConfig.mouseLerpFactor]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleScroll, handleMouseMove]);


  // Memoize floating elements to prevent re-renders
  const floatingElements = useMemo(
    () =>
      Array.from({
        length: adjustedParticleCount ?? finalConfig.particleCount,
      }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        speed: finalConfig.particleScrollSpeed * (0.5 + Math.random()),
        mouseSpeed: finalConfig.particleMouseSensitivity * (0.5 + Math.random()),
      })),
    [adjustedParticleCount, finalConfig.particleCount, finalConfig.particleScrollSpeed, finalConfig.particleMouseSensitivity]
  );

  return (
    <div className={styles.container}>
      {/* Static gradient background - FIXED NO SCROLL TRANSFORM */}
      <div 
        className={styles.gradientBackground}
        style={{
          opacity: finalConfig.backgroundOpacity,
        }}
      />
      
      {/* Floating geometric shapes */}
      <div className={styles.floatingLayer}>
        {/* Large floating circles */}
        <div 
          className={styles.floatingShape}
          style={{
            width: `${finalConfig.largeShapesSizes[0]}px`,
            height: `${finalConfig.largeShapesSizes[0]}px`,
            top: '10%',
            left: '10%',
            opacity: finalConfig.largeShapesOpacity,
            background: `linear-gradient(to right, rgba(96, 165, 250, ${finalConfig.largeShapesOpacity}), rgba(139, 92, 246, ${finalConfig.largeShapesOpacity}))`,
            filter: `blur(${finalConfig.blurIntensity === 'sm' ? '4px' :
                       finalConfig.blurIntensity === 'md' ? '6px' :
                       finalConfig.blurIntensity === 'lg' ? '8px' :
                       finalConfig.blurIntensity === 'xl' ? '12px' :
                       finalConfig.blurIntensity === '2xl' ? '16px' :
                       '24px'})`,
            transform: `translate3d(${(smoothMousePosition.x - 50) * finalConfig.mouseIntensity}px, ${(smoothMousePosition.y - 50) * finalConfig.mouseIntensity + smoothScrollY * 0.05}px, 0)`,
          }}
        />
        <div 
          className={styles.floatingShape}
          style={{
            width: `${finalConfig.largeShapesSizes[1]}px`,
            height: `${finalConfig.largeShapesSizes[1]}px`,
            top: '60%',
            right: '10%',
            opacity: finalConfig.largeShapesOpacity,
            background: `linear-gradient(to right, rgba(251, 191, 36, ${finalConfig.largeShapesOpacity}), rgba(220, 38, 38, ${finalConfig.largeShapesOpacity}))`,
            filter: `blur(${finalConfig.blurIntensity === 'sm' ? '4px' :
                       finalConfig.blurIntensity === 'md' ? '6px' :
                       finalConfig.blurIntensity === 'lg' ? '8px' :
                       finalConfig.blurIntensity === 'xl' ? '12px' :
                       finalConfig.blurIntensity === '2xl' ? '16px' :
                       '24px'})`,
            transform: `translate3d(${(smoothMousePosition.x - 50) * -finalConfig.mouseIntensity * 1.5}px, ${(smoothMousePosition.y - 50) * -finalConfig.mouseIntensity * 1.5 + smoothScrollY * 0.08}px, 0)`,
          }}
        />
        <div 
          className={styles.floatingShape}
          style={{
            width: `${finalConfig.largeShapesSizes[2]}px`,
            height: `${finalConfig.largeShapesSizes[2]}px`,
            bottom: '20%',
            left: '20%',
            opacity: finalConfig.largeShapesOpacity,
            background: `linear-gradient(to right, rgba(34, 197, 94, ${finalConfig.largeShapesOpacity}), rgba(59, 130, 246, ${finalConfig.largeShapesOpacity}))`,
            filter: `blur(${finalConfig.blurIntensity === 'sm' ? '4px' :
                       finalConfig.blurIntensity === 'md' ? '6px' :
                       finalConfig.blurIntensity === 'lg' ? '8px' :
                       finalConfig.blurIntensity === 'xl' ? '12px' :
                       finalConfig.blurIntensity === '2xl' ? '16px' :
                       '24px'})`,
            transform: `translate3d(${(smoothMousePosition.x - 50) * finalConfig.mouseIntensity * 0.75}px, ${(smoothMousePosition.y - 50) * finalConfig.mouseIntensity * 0.75 + smoothScrollY * 0.04}px, 0)`,
          }}
        />

        {/* Smaller floating elements */}
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className={styles.particle}
            style={{
              width: `${finalConfig.particleSize}px`,
              height: `${finalConfig.particleSize}px`,
              backgroundColor: `rgba(255, 255, 255, ${finalConfig.particleOpacity})`,
              top: `${element.top}%`,
              left: `${element.left}%`,
              transform: `translate3d(${(smoothMousePosition.x - 50) * element.mouseSpeed}px, ${(smoothMousePosition.y - 50) * element.mouseSpeed + smoothScrollY * element.speed}px, 0)`,
              animationDelay: `${element.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Static mesh gradient overlay - FIXED NO SCROLL TRANSFORM */}
      <div 
        className={styles.gradientOverlay}
        style={{
          opacity: finalConfig.gradientOverlayOpacity,
          background: `radial-gradient(circle at ${smoothMousePosition.x}% ${smoothMousePosition.y}%, rgba(139, 92, 246, 0.25) 0%, transparent 70%)`,
        }}
      />

      {/* Static grid pattern overlay - FIXED NO SCROLL TRANSFORM */}
      <div 
        className={styles.gridOverlay}
        style={{
          opacity: finalConfig.gridOpacity,
          gridTemplateColumns: `repeat(auto-fill, ${finalConfig.gridSize}px)`,
          gridTemplateRows: `repeat(auto-fill, ${finalConfig.gridSize}px)`,
        }}
      >
        {Array.from({ length: gridCells }).map((_, i) => (
          <div
            key={i}
            className={styles.gridCell}
          />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

// Export configuration type for use in other components
export type { ParallaxConfig };