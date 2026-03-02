import { useRef, useCallback, ReactNode, CSSProperties } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MouseTiltHeroProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  intensity?: number;
}

export default function MouseTiltHero({ children, className, style, intensity = 8 }: MouseTiltHeroProps) {
  const { reduceMotion } = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      ref.current.style.transform = `perspective(1200px) rotateY(${dx * intensity}deg) rotateX(${-dy * intensity * 0.5}deg)`;
    },
    [reduceMotion, intensity]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    ref.current.style.transition = 'transform 0.6s ease';
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.1s ease';
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
}
