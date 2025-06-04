import React, { useEffect, useRef, useState } from 'react';
import styles from './FloatingWords.module.css';

interface FloatingWordsProps {
  count?: number; // number of words to display (default: 15)
  speed?: number; // movement speed in vw/vh per second (default: 5)
  rotationSpeed?: number; // rotation speed in degrees per second (default: 30)
  opacity?: number; // opacity of words (default: 0.6)
  fontSize?: string; // font size (default: '0.875rem')
  sideOnlyPercentage?: number; // percentage of words placed on sides (default: 0.8)
  centerAreaStart?: number; // start of center area percentage (default: 30)
  centerAreaEnd?: number; // end of center area percentage (default: 70)
  leftSideEnd?: number; // end of left side area percentage (default: 25)
  rightSideStart?: number; // start of right side area percentage (default: 75)
  enableRotation?: boolean; // enable/disable rotation (default: true)
  enableBounce?: boolean; // enable/disable bouncing off edges (default: true)
}

interface FloatingWord {
  id: number;
  text: string;
  left: number; // initial x (percentage)
  top: number;  // initial y (percentage)
  gradient: string;
}

interface WordPosition {
  x: number; // current x in percentage of viewport width
  y: number; // current y in percentage of viewport height
  vx: number; // velocity in percentage per second
  vy: number; // velocity in percentage per second
  angle: number; // current rotation in degrees
  vr: number;    // rotation velocity (degrees per second)
}

export const FloatingWords: React.FC<FloatingWordsProps> = ({ 
  count = 15,
  speed = 5,
  rotationSpeed = 30,
  opacity = 0.6,
  fontSize = '0.875rem',
  sideOnlyPercentage = 0.8,
  centerAreaStart = 30,
  centerAreaEnd = 70,
  leftSideEnd = 25,
  rightSideStart = 75,
  enableRotation = true,
  enableBounce = true
}) => {
  const [words, setWords] = useState<FloatingWord[]>([]);

  // Refs to DOM elements
  const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
  const positionsRef = useRef<WordPosition[]>([]);

  const techWords = [
    'Python', 'Django', 'FastAPI', 'React', 'TypeScript', 'JavaScript',
    'PostgreSQL', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'GCP',
    'MongoDB', 'GraphQL', 'REST API', 'Microservices', 'DevOps',
    'CI/CD', 'Git', 'Linux', 'Node.js', 'Vue.js', 'Angular',
    'Machine Learning', 'AI', 'Data Science', 'Cloud', 'Serverless',
    'Blockchain', 'Web3', 'Mobile', 'Frontend', 'Backend', 'Fullstack'
  ];

  const gradients = ['gradient1', 'gradient2', 'gradient3', 'gradient4', 'gradient5', 'gradient6'];

  // Generate initial words once
  useEffect(() => {
    const newWords: FloatingWord[] = [];
    const newPositions: WordPosition[] = [];

    for (let i = 0; i < count; i++) {
      const randomWord = techWords[Math.floor(Math.random() * techWords.length)];

      // Configurable word placement
      const randomLeft = Math.random() < sideOnlyPercentage
        ? (Math.random() < 0.5 ? Math.random() * leftSideEnd : rightSideStart + Math.random() * (100 - rightSideStart))
        : centerAreaStart + Math.random() * (centerAreaEnd - centerAreaStart);

      // Random vertical position (0-100% vh)
      const randomTop = Math.random() * 100;

      const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

      // Random direction vector with configurable speed
      const dirAngle = Math.random() * Math.PI * 2;
      const vx = Math.cos(dirAngle) * speed;
      const vy = Math.sin(dirAngle) * speed;

      // Configurable rotation parameters
      const startAngle = Math.random() * 360;
      const vr = enableRotation ? (Math.random() < 0.5 ? -1 : 1) * rotationSpeed : 0;

      newWords.push({
        id: i,
        text: randomWord,
        left: randomLeft,
        top: randomTop,
        gradient: randomGradient
      });

      newPositions.push({ x: randomLeft, y: randomTop, vx, vy, angle: startAngle, vr });
    }

    setWords(newWords);
    positionsRef.current = newPositions;
  }, [count, speed, rotationSpeed, sideOnlyPercentage, centerAreaStart, centerAreaEnd, leftSideEnd, rightSideStart, enableRotation]);

  // Animation loop (bounce within 0-100 vw/vh)
  useEffect(() => {
    if (words.length === 0) return;

    let last = performance.now();
    let frameId: number;

    const update = () => {
      const now = performance.now();
      const dt = (now - last) / 1000; // seconds since last frame
      last = now;

      positionsRef.current.forEach((pos, idx) => {
        // Update position & rotation with constant velocity
        pos.x += pos.vx * dt;
        pos.y += pos.vy * dt;
        if (enableRotation) {
          pos.angle = (pos.angle + pos.vr * dt) % 360;
        }

        if (enableBounce) {
          // Bounce horizontally
          if (pos.x < 0) {
            pos.x = 0;
            pos.vx = Math.abs(pos.vx);
          } else if (pos.x > 100) {
            pos.x = 100;
            pos.vx = -Math.abs(pos.vx);
          }

          // Bounce vertically
          if (pos.y < 0) {
            pos.y = 0;
            pos.vy = Math.abs(pos.vy);
          } else if (pos.y > 100) {
            pos.y = 100;
            pos.vy = -Math.abs(pos.vy);
          }
        } else {
          // Wrap around edges instead of bouncing
          if (pos.x < -10) pos.x = 110;
          if (pos.x > 110) pos.x = -10;
          if (pos.y < -10) pos.y = 110;
          if (pos.y > 110) pos.y = -10;
        }

        // Apply to DOM element
        const el = wordRefs.current[idx];
        if (el) {
          const rotation = enableRotation ? `rotate(${pos.angle}deg)` : '';
          el.style.transform = `translate3d(${pos.x}vw, ${pos.y}vh, 0) ${rotation}`;
          el.style.opacity = opacity.toString();
          el.style.fontSize = fontSize;
        }
      });

      frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [words]);

  return (
    <div className={styles.floatingWords}>
      {words.map((word, idx) => (
        <div
          key={word.id}
          ref={(el) => (wordRefs.current[idx] = el)}
          className={`${styles.floatingWord} ${styles[word.gradient]}`}
          style={{
            left: 0,
            top: 0,
            transform: `translate3d(${word.left}vw, ${word.top}vh, 0) ${enableRotation ? 'rotate(0deg)' : ''}`,
            animation: 'none',
            opacity: opacity,
            fontSize: fontSize
          } as React.CSSProperties}
        >
          {word.text}
        </div>
      ))}
    </div>
  );
}; 