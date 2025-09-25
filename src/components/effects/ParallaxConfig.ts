// Parallax configuration types and presets for Vue 3

export interface ParallaxConfig {
  // Element configuration
  particleCount?: number
  particleSize?: number
  particleOpacity?: number
  
  // Large shapes configuration
  largeShapesOpacity?: number
  largeShapesSizes?: [number, number, number, number, number] // [first, second, third, fourth, fifth]
  
  // Movement sensitivity
  mouseIntensity?: number
  scrollIntensity?: number
  particleMouseSensitivity?: number
  particleScrollSpeed?: number
  
  // Background settings
  backgroundOpacity?: number
  gradientOverlayOpacity?: number
  gridOpacity?: number
  
  // Animation smoothness
  mouseLerpFactor?: number
  scrollLerpFactor?: number
  
  // Visual effects
  blurIntensity?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  gridSize?: number
}

// Predefined parallax configurations for different effects
export const parallaxPresets = {
  // Subtle and minimal effect
  minimal: {
    particleCount: 12,
    particleSize: 4,
    particleOpacity: 0.2,
    largeShapesOpacity: 0.1,
    largeShapesSizes: [300, 250, 200, 150, 100],
    mouseIntensity: 0.01,
    scrollIntensity: 0.15,
    particleMouseSensitivity: 0.015,
    particleScrollSpeed: 0.03,
    backgroundOpacity: 0.85,
    gradientOverlayOpacity: 0.1,
    gridOpacity: 0.02,
    mouseLerpFactor: 0.04,
    scrollLerpFactor: 0.06,
    blurIntensity: '2xl' as const,
    gridSize: 80,
  } satisfies ParallaxConfig,

  // Standard balanced effect
  standard: {
    particleCount: 20,
    particleSize: 6,
    particleOpacity: 0.3,
    largeShapesOpacity: 0.2,
    largeShapesSizes: [400, 320, 250, 180, 120],
    mouseIntensity: 0.02,
    scrollIntensity: 0.3,
    particleMouseSensitivity: 0.025,
    particleScrollSpeed: 0.05,
    backgroundOpacity: 0.9,
    gradientOverlayOpacity: 0.15,
    gridOpacity: 0.04,
    mouseLerpFactor: 0.06,
    scrollLerpFactor: 0.08,
    blurIntensity: '3xl' as const,
    gridSize: 60,
  } satisfies ParallaxConfig,

  // Dynamic and intense effect
  intense: {
    particleCount: 35,
    particleSize: 8,
    particleOpacity: 0.5,
    largeShapesOpacity: 0.35,
    largeShapesSizes: [700, 550, 400, 250, 150],
    mouseIntensity: 0.05,
    scrollIntensity: 0.6,
    particleMouseSensitivity: 0.06,
    particleScrollSpeed: 0.08,
    backgroundOpacity: 0.95,
    gradientOverlayOpacity: 0.3,
    gridOpacity: 0.08,
    mouseLerpFactor: 0.1,
    scrollLerpFactor: 0.12,
    blurIntensity: '3xl' as const,
    gridSize: 40,
  } satisfies ParallaxConfig,

  // Smooth and elegant effect
  elegant: {
    particleCount: 15,
    particleSize: 5,
    particleOpacity: 0.25,
    largeShapesOpacity: 0.15,
    largeShapesSizes: [450, 350, 280, 200, 120],
    mouseIntensity: 0.015,
    scrollIntensity: 0.25,
    particleMouseSensitivity: 0.02,
    particleScrollSpeed: 0.04,
    backgroundOpacity: 0.88,
    gradientOverlayOpacity: 0.12,
    gridOpacity: 0.03,
    mouseLerpFactor: 0.05,
    scrollLerpFactor: 0.07,
    blurIntensity: '3xl' as const,
    gridSize: 70,
  } satisfies ParallaxConfig,

  // Performance optimized (for mobile or low-end devices)
  performance: {
    particleCount: 8,
    particleSize: 3,
    particleOpacity: 0.15,
    largeShapesOpacity: 0.08,
    largeShapesSizes: [250, 200, 150, 100, 50],
    mouseIntensity: 0.008,
    scrollIntensity: 0.12,
    particleMouseSensitivity: 0.01,
    particleScrollSpeed: 0.02,
    backgroundOpacity: 0.8,
    gradientOverlayOpacity: 0.08,
    gridOpacity: 0.01,
    mouseLerpFactor: 0.03,
    scrollLerpFactor: 0.05,
    blurIntensity: 'xl' as const,
    gridSize: 100,
  } satisfies ParallaxConfig,
}

// Helper function to create custom config based on preset
export const createParallaxConfig = (
  preset: keyof typeof parallaxPresets,
  overrides?: Partial<ParallaxConfig>
): ParallaxConfig => {
  return { ...parallaxPresets[preset], ...overrides }
}

// Export individual presets for convenience
export const {
  minimal,
  standard,
  intense,
  elegant,
  performance,
} = parallaxPresets