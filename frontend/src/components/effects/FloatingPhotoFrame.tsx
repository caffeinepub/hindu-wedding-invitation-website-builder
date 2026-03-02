import { useReducedMotion } from '../../hooks/useReducedMotion';
import { cn } from '../../lib/utils';

interface FloatingPhotoFrameProps {
  src: string;
  alt: string;
  className?: string;
  frameColor?: string;
}

export default function FloatingPhotoFrame({ src, alt, className, frameColor = 'gold' }: FloatingPhotoFrameProps) {
  const { reduceMotion } = useReducedMotion();

  return (
    <div
      className={cn(
        'relative inline-block',
        !reduceMotion && 'animate-float',
        className
      )}
    >
      {/* Filigree frame overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage: `url(/assets/generated/filigree-frame.dim_600x800.png)`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          opacity: frameColor === 'gold' ? 0.85 : 0.6,
        }}
      />
      <img
        src={src}
        alt={alt}
        className="block w-full h-full object-cover"
        style={{ borderRadius: '4px' }}
      />
    </div>
  );
}
