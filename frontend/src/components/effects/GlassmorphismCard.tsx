import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassmorphismCardProps {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

export default function GlassmorphismCard({ children, className, dark = false }: GlassmorphismCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border backdrop-blur-md',
        dark
          ? 'bg-black/30 border-white/10 text-white'
          : 'bg-white/15 border-white/30 text-inherit',
        'shadow-xl',
        className
      )}
    >
      {children}
    </div>
  );
}
