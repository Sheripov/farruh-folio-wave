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
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
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
  intensity = 0.8,
  glareEffect = true,
  maxTilt = 10,
  scale = 0.00,
  perspective = 10000
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
        
        // Subtle translation effect
        const translateX = centerX * 6 * currentIntensity;
        const translateY = centerY * 6 * currentIntensity;
        
        // Scale effect
        const scaleValue = 1 + (scale * currentIntensity);
        
        // Apply transform with proper formatting for cross-browser compatibility
        const transform = `perspective(${perspective}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateX(${translateX.toFixed(2)}px) translateY(${translateY.toFixed(2)}px) scale(${scaleValue.toFixed(3)}) translateZ(0)`;
        
        cardElement.style.transform = transform;
        cardElement.style.willChange = 'transform';
        cardElement.style.transformStyle = 'preserve-3d';
        cardElement.style.backfaceVisibility = 'hidden';

        // Glare effect with better performance
        if (glareEffect) {
          const glareElement = cardElement.querySelector('.glare-effect') as HTMLElement;
          if (glareElement) {
            const glareX = relativeX * 100;
            const glareY = relativeY * 100;
            
            // Calculate distance from center for intensity
            const distance = Math.sqrt(centerX * centerX + centerY * centerY);
            const glareIntensity = Math.max(0, 1 - distance * 2) * 0.4;
            
            glareElement.style.background = `radial-gradient(ellipse 800px 400px at ${glareX.toFixed(1)}% ${glareY.toFixed(1)}%, rgba(255, 255, 255, ${(0.08 * glareIntensity).toFixed(3)}) 110%, rgba(255, 255, 255, ${(0.04 * glareIntensity).toFixed(3)}) 30%, transparent 70%)`;
            glareElement.style.opacity = '1';
            glareElement.style.willChange = 'opacity, background';
          }
        }
      }
    });
  }, [intensity, maxTilt, scale, perspective, glareEffect]);

  // Reset card function
  const resetCard = useCallback((instant: boolean = false) => {
    const cardElement = containerRef.current;
    if (!cardElement) return;

    // For instant reset (touch end), disable transitions temporarily
    if (instant) {
      cardElement.style.transition = 'none';
      // Force reflow to apply transition: none immediately
      cardElement.offsetHeight;
    }
    
    // Reset transform completely
    cardElement.style.transform = '';
    cardElement.style.willChange = 'auto';
    cardElement.style.transformStyle = '';
    cardElement.style.backfaceVisibility = '';
    
    if (glareEffect) {
      const glareElement = cardElement.querySelector('.glare-effect') as HTMLElement;
      if (glareElement) {
        if (instant) {
          glareElement.style.transition = 'none';
          // Force reflow
          glareElement.offsetHeight;
        }
        glareElement.style.opacity = '0';
        glareElement.style.willChange = 'auto';
      }
    }
    
    // Re-enable transitions after a short delay for instant reset
    if (instant) {
      setTimeout(() => {
        if (cardElement) {
          cardElement.style.transition = '';
          if (glareEffect) {
            const glareElement = cardElement.querySelector('.glare-effect') as HTMLElement;
            if (glareElement) {
              glareElement.style.transition = '';
            }
          }
        }
      }, 10);
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
    resetCard(true);
  }, [resetCard]);

  const handleTouchCancel = useCallback(() => {
    resetCard(true);
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
        backfaceVisibility: 'visible' as const
      }}
    >
      {glareEffect && (
        <div 
          className="glare-effect absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none overflow-hidden rounded-inherit"
          style={tiltCardStyles.glare}
        />
      )}
      {children}
    </div>
  );
}; 