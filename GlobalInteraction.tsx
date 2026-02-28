
import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const GlobalInteraction: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 40, stiffness: 150 });
  const ringY = useSpring(cursorY, { damping: 40, stiffness: 150 });
  const [isClickable, setIsClickable] = useState(false);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;
    let mouseX = -100;
    let mouseY = -100;
    let targetElement: HTMLElement | null = null;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Capture event.target synchronously to avoid layout thrashing
      // caused by document.elementFromPoint in the animation frame
      targetElement = e.target as HTMLElement;

      // Throttle using requestAnimationFrame
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          cursorX.set(mouseX);
          cursorY.set(mouseY);

          // Apply CSS variables to a specific ref instead of document.documentElement
          // to prevent widespread style recalculations
          if (glowRef.current) {
            glowRef.current.style.setProperty('--x', `${mouseX}px`);
            glowRef.current.style.setProperty('--y', `${mouseY}px`);
          }

          setIsClickable(!!targetElement?.closest('button, a, .interactive, input, .sm-toggle, .sm-resize-handle, .sm-logo'));
          rafId = 0;
        });
      }
    };

    window.addEventListener('mousemove', move, { passive: true });
    return () => {
      window.removeEventListener('mousemove', move);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <div className="noise-overlay" />
      <div ref={glowRef} className="global-glow" />
      <motion.div className="custom-cursor" style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }} />
      <motion.div
        className="cursor-ring"
        style={{
          x: ringX, y: ringY, translateX: '-50%', translateY: '-50%',
          scale: isClickable ? 1.5 : 1,
          borderColor: 'transparent',
          backgroundColor: isClickable ? '#5227FF' : 'rgba(82, 39, 255, 0.8)',
          boxShadow: '0 0 20px rgba(82, 39, 255, 0.4)'
        }}
      />
    </>
  );
};
