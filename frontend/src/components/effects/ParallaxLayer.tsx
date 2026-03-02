import { useEffect, useRef, ReactNode } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxLayer({ children, speed = 0.3, className }: ParallaxLayerProps) {
  const { reduceMotion } = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const handleScroll = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY;
      ref.current.style.transform = `translateY(${scrollY * speed}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reduceMotion, speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: reduceMotion ? 'auto' : 'transform' }}>
      {children}
    </div>
  );
}
