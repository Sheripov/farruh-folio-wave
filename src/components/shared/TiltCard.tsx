import React, { useRef, useEffect, useCallback, ReactNode, CSSProperties } from 'react';

export interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  glareEffect?: boolean;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

const tiltCardStyles: Record<string, CSSProperties> = {
  card: {
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    transformStyle: 'preserve-3d' as const,
    WebkitTransformStyle: 'preserve-3d' as const,
    WebkitBackfaceVisibility: 'hidden' as const,
    backfaceVisibility: 'hidden' as const,
    perspective: '1000px',
    WebkitPerspective: '1000px',
    willChange: 'transform',
    isolation: 'isolate' as const,
    contain: 'layout style paint' as const,
    transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), z-index 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  },
  glare: {
    transform: 'translateZ(0)',
    WebkitTransform: 'translateZ(0)',
    WebkitBackfaceVisibility: 'hidden' as const,
    backfaceVisibility: 'hidden' as const,
    willChange: 'opacity, background',
    transition: 'opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    isolation: 'isolate' as const,
    contain: 'style paint' as const
  }
};

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  style = {},
  intensity = 1.0,
  glareEffect = true,
  maxTilt = 10,
  scale = 0.05,
  perspective = 1000
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRectsCache = useRef<Map<HTMLElement, DOMRect>>(new Map());
  const rafId = useRef<number | null>(null);

  // Universal tilt handler for both mouse and touch events
  const handleTiltMove = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    // Cancel previous RAF to throttle updates
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      const cardElement = container as HTMLElement;
      
      // Get cached rect or calculate new one
      let rect = cardRectsCache.current.get(cardElement);
      if (!rect) {
        rect = cardElement.getBoundingClientRect();
        cardRectsCache.current.set(cardElement, rect);
      }
      
      // Check if pointer is within card bounds
      const isWithinCard = clientX >= rect.left && 
                         clientX <= rect.right && 
                         clientY >= rect.top && 
                         clientY <= rect.bottom;
      
      if (isWithinCard) {
        // Calculate relative position within the card (0 to 1)
        const relativeX = (clientX - rect.left) / rect.width;
        const relativeY = (clientY - rect.top) / rect.height;
        
        // Convert to centered coordinates (-0.5 to 0.5)
        const centerX = relativeX - 0.5;
        const centerY = relativeY - 0.5;
        
        // Calculate tilt angles with different intensities for mobile/desktop
        const isMobile = 'ontouchstart' in window;
        const currentIntensity = isMobile ? intensity * 0.8 : intensity;
        
        const tiltX = centerY * -maxTilt * currentIntensity;
        const tiltY = centerX * maxTilt * currentIntensity;
        
        // Subtle translation effect - increased for more noticeable movement
        const translateX = centerX * 60 * currentIntensity;
        const translateY = centerY * 60 * currentIntensity;
        
        // Scale effect
        const scaleValue = 1 + (scale * currentIntensity);
        
        // Apply transform with proper formatting for cross-browser compatibility
        const transform = `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateX(${translateX.toFixed(2)}px) translateY(${translateY.toFixed(2)}px) scale(${scaleValue.toFixed(3)}) translateZ(0)`;
        
        cardElement.style.transform = transform;
        cardElement.style.willChange = 'transform';
        cardElement.style.transformStyle = 'preserve-3d';
        cardElement.style.backfaceVisibility = 'hidden';
        
        // Dynamic z-index based on tilt - tilted cards should be on top
        const tiltMagnitude = Math.sqrt(tiltX * tiltX + tiltY * tiltY);
        const zIndex = Math.floor(tiltMagnitude * 10) + 10; // Base z-index 10, increases with tilt
        cardElement.style.zIndex = zIndex.toString();
        
        // Dynamic shadow based on tilt direction and intensity
        const shadowOffsetX = tiltY * 2; // Opposite to tilt direction
        const shadowOffsetY = Math.abs(tiltX) * 1.5 + 10; // More shadow when tilted
        const shadowBlur = 20 + (tiltMagnitude * 3);
        const shadowSpread = -5 + (tiltMagnitude * 0.5);
        const shadowOpacity = 0.3 + (tiltMagnitude * 0.02);
        
        cardElement.style.boxShadow = `
          ${shadowOffsetX.toFixed(1)}px ${shadowOffsetY.toFixed(1)}px ${shadowBlur.toFixed(1)}px ${shadowSpread.toFixed(1)}px rgba(0, 0, 0, ${shadowOpacity.toFixed(2)}),
          0 ${(shadowOffsetY * 0.7).toFixed(1)}px ${(shadowBlur * 0.8).toFixed(1)}px ${(shadowSpread * 0.8).toFixed(1)}px rgba(0, 0, 0, ${(shadowOpacity * 0.6).toFixed(2)})
        `.replace(/\s+/g, ' ').trim();

        // Glare effect with better performance
        if (glareEffect) {
          const glareElement = cardElement.querySelector('.glare-effect') as HTMLElement;
          if (glareElement) {
            const glareX = relativeX * 100;
            const glareY = relativeY * 100;
            
            // Calculate distance from center for intensity - enhanced glare effect
            const distance = Math.sqrt(centerX * centerX + centerY * centerY);
            const glareIntensity = Math.max(0, 1 - distance * 1.5) * 0.6;
            
            glareElement.style.background = `radial-gradient(ellipse 140% 100% at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, ${(0.12 * glareIntensity).toFixed(3)}) 0%, rgba(255, 255, 255, ${(0.06 * glareIntensity).toFixed(3)}) 25%, transparent 50%)`;
            glareElement.style.opacity = '1';
            glareElement.style.willChange = 'opacity, background';
          }
        }
      }
    });
  }, [intensity, maxTilt, scale, perspective, glareEffect]);

  // Reset card function with smooth transitions
  const resetCard = useCallback((instant: boolean = false) => {
    const cardElement = containerRef.current;
    if (!cardElement) return;

    // Always use smooth transitions for better UX
    // Reset transform with smooth transition
    cardElement.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale(1) translateZ(0)';
    cardElement.style.willChange = 'auto';
    
    // Reset z-index to default when not tilted
    cardElement.style.zIndex = '1';
    
    // Reset box-shadow to default
    cardElement.style.boxShadow = '';
    
    if (glareEffect) {
      const glareElement = cardElement.querySelector('.glare-effect') as HTMLElement;
      if (glareElement) {
        glareElement.style.opacity = '0';
        glareElement.style.willChange = 'auto';
      }
    }

    // Clear cache
    cardRectsCache.current.clear();
  }, [glareEffect]);

  // Mouse event handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleTiltMove(e.clientX, e.clientY);
  }, [handleTiltMove]);

  const handleMouseLeave = useCallback(() => {
    resetCard();
  }, [resetCard]);

  // Touch event handlers for mobile support
  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault(); // Prevent scrolling while tilting
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      handleTiltMove(touch.clientX, touch.clientY);
    }
  }, [handleTiltMove]);

  const handleTouchEnd = useCallback(() => {
    resetCard(false); // Use smooth transition for touch end
  }, [resetCard]);

  const handleTouchCancel = useCallback(() => {
    resetCard(false); // Use smooth transition for touch cancel
  }, [resetCard]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear cache on mount
    cardRectsCache.current.clear();

    // Detect device capabilities
    const hasTouch = 'ontouchstart' in window;
    const isMobile = hasTouch && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Add event listeners based on device capabilities
    if (hasTouch) {
      container.addEventListener('touchstart', () => {
        cardRectsCache.current.clear();
      }, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
      container.addEventListener('touchcancel', handleTouchCancel, { passive: true });
    }
    
    // Mouse events for desktop
    if (!isMobile) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
      container.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    }

    // Resize handler to clear cache
    const handleResize = () => {
      cardRectsCache.current.clear();
      resetCard();
    };
    
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup function
    return () => {
      // Cancel any pending RAF
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      // Reset card before cleanup
      resetCard();

      // Remove container event listeners
      if (hasTouch) {
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
        container.removeEventListener('touchcancel', handleTouchCancel);
      }
      
      if (!isMobile) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      // Remove resize listener
      window.removeEventListener('resize', handleResize);
      
      // Clear cache
      cardRectsCache.current.clear();
    };
  }, [handleMouseMove, handleMouseLeave, handleTouchMove, handleTouchEnd, handleTouchCancel, resetCard]);

  return (
    <div
      ref={containerRef}
      className={`tilt-card ${className}`}
      style={{
        ...tiltCardStyles.card,
        ...style,
        transform: 'none',
        willChange: 'auto',
        backfaceVisibility: 'visible' as const,
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1 // Default z-index
      }}
    >
      {glareEffect && (
        <div 
          className="glare-effect absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none"
          style={{
            ...tiltCardStyles.glare,
            borderRadius: 'inherit'
          }}
        />
      )}
      {children}
    </div>
  );
}; 