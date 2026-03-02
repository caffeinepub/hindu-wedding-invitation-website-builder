import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface FloatingPhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
  frameColor?: string;
  accentColor?: string;
}

export default function FloatingPhotoFrame({
  src,
  alt,
  className,
  frameColor = 'gold',
  accentColor,
}: FloatingPhotoFrameProps) {
  const { reduceMotion } = useReducedMotion();

  // Premium gold border color — use accentColor if provided, else default gold
  const borderColor = accentColor || '#D4AF37';
  const glowColor = accentColor || '#D4AF37';

  return (
    <div
      className={cn(
        'relative inline-block',
        !reduceMotion && 'animate-float',
        className
      )}
      style={{
        // Multi-layered premium border effect
        borderRadius: '12px',
        border: `3px solid ${borderColor}`,
        outline: `1px solid ${borderColor}55`,
        outlineOffset: '4px',
        boxShadow: [
          `0 0 0 1px ${borderColor}33`,
          `0 0 12px 2px ${glowColor}44`,
          `0 8px 32px 0 ${glowColor}33`,
          `inset 0 0 0 1px ${borderColor}22`,
        ].join(', '),
        padding: '4px',
        background: `linear-gradient(135deg, ${borderColor}22 0%, ${borderColor}08 50%, ${borderColor}22 100%)`,
      }}
    >
      {/* Inner decorative border ring */}
      <div
        style={{
          borderRadius: '8px',
          border: `1px solid ${borderColor}66`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={src}
          alt={alt}
          className="block w-full h-full object-cover"
          style={{
            borderRadius: '7px',
            display: 'block',
          }}
        />
        {/* Subtle corner accents — purely CSS, no overlay on photo */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: '7px',
            background: `linear-gradient(135deg, ${borderColor}18 0%, transparent 40%, transparent 60%, ${borderColor}18 100%)`,
          }}
        />
      </div>
    </div>
  );
}
