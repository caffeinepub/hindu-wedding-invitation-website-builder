import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function ThreeDFloatingDivineTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const gold = '#D4AF37';
  const violet = '#7B68EE';
  const purple = '#9370DB';

  const heroStyle: React.CSSProperties = isDark
    ? {
        background: 'radial-gradient(ellipse at center, #1a0a3e 0%, #0d0020 100%)',
        backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(123,104,238,0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(212,175,55,0.12) 0%, transparent 50%)`,
      }
    : {
        background: 'radial-gradient(ellipse at center, #3B1F6E 0%, #1a0a3e 100%)',
        backgroundImage: `radial-gradient(ellipse at 30% 40%, rgba(212,175,55,0.18) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(123,104,238,0.18) 0%, transparent 50%)`,
      };

  const bodyStyle: React.CSSProperties = {
    background: '#0d0020',
    color: '#e8e0ff',
  };

  return (
    <BaseTemplate
      invite={invite}
      variant="dark"
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={gold}
      secondaryColor={violet}
      petalColors={[gold, violet, purple, '#E8731A']}
      sectionBg="#0d0020"
      textColor="text-purple-50"
      rsvpBackground={isDark ? 'rgba(30, 5, 60, 0.95)' : 'rgba(30, 5, 60, 0.92)'}
    >
      {/* ── 3D Floating Divine unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Purple-to-gold radial glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(123,104,238,0.15) 0%, rgba(212,175,55,0.08) 45%, rgba(0,0,0,0.60) 100%)',
        }} />

        {/* Large radiant lotus — center background */}
        <svg viewBox="0 0 500 500" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] opacity-15" aria-hidden="true">
          <g transform="translate(250,250)">
            {/* Gold halo ring */}
            <circle cx="0" cy="0" r="220" fill="none" stroke={gold} strokeWidth="2" opacity="0.4" />
            <circle cx="0" cy="0" r="210" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.25" />
            {/* Outer petal ring — 16 petals */}
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse key={`op-${i}`} cx="0" cy="-160" rx="18" ry="55"
                fill={i % 2 === 0 ? violet : purple}
                transform={`rotate(${i * 22.5})`} opacity="0.35" />
            ))}
            {/* Mid petal ring — 12 petals */}
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={`mp-${i}`} cx="0" cy="-110" rx="14" ry="40"
                fill={i % 2 === 0 ? gold : violet}
                transform={`rotate(${i * 30 + 15})`} opacity="0.45" />
            ))}
            {/* Inner petal ring — 8 petals */}
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={`ip-${i}`} cx="0" cy="-65" rx="10" ry="28"
                fill={i % 2 === 0 ? '#fffacd' : gold}
                transform={`rotate(${i * 45})`} opacity="0.55" />
            ))}
            {/* Center glow */}
            <circle cx="0" cy="0" r="30" fill={gold} opacity="0.15" />
            <circle cx="0" cy="0" r="18" fill={gold} opacity="0.25" />
            <circle cx="0" cy="0" r="8" fill="#fffacd" opacity="0.6" />
            {/* Spoke lines */}
            {Array.from({ length: 16 }, (_, i) => (
              <line key={i} x1="0" y1="0"
                x2={Math.cos((i * 22.5 * Math.PI) / 180) * 220}
                y2={Math.sin((i * 22.5 * Math.PI) / 180) * 220}
                stroke={gold} strokeWidth="0.5" opacity="0.2" />
            ))}
          </g>
        </svg>

        {/* Floating depth layer 2 — slightly smaller, offset */}
        <svg viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10" style={{ transform: 'translate(-50%, -50%) scale(0.75) translateY(-20px)' }} aria-hidden="true">
          <g transform="translate(200,200)">
            {Array.from({ length: 12 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-90" rx="12" ry="35"
                fill={i % 2 === 0 ? gold : violet}
                transform={`rotate(${i * 30})`} opacity="0.5" />
            ))}
            <circle cx="0" cy="0" r="160" fill="none" stroke={gold} strokeWidth="1" opacity="0.3" />
          </g>
        </svg>

        {/* Floating depth layer 3 — smallest, highest */}
        <svg viewBox="0 0 300 300" className="absolute top-1/2 left-1/2 w-48 h-48 opacity-8" style={{ transform: 'translate(-50%, -50%) scale(0.5) translateY(-50px)' }} aria-hidden="true">
          <g transform="translate(150,150)">
            {Array.from({ length: 8 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-60" rx="8" ry="22"
                fill={gold} transform={`rotate(${i * 45})`} opacity="0.6" />
            ))}
            <circle cx="0" cy="0" r="100" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.4" />
          </g>
        </svg>

        {/* Top border — divine arc */}
        <svg viewBox="0 0 800 30" className="absolute top-0 left-0 w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="fd-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={violet} stopOpacity="0" />
              <stop offset="25%" stopColor={gold} />
              <stop offset="50%" stopColor={violet} />
              <stop offset="75%" stopColor={gold} />
              <stop offset="100%" stopColor={violet} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="2" fill="url(#fd-border)" />
          <rect x="0" y="6" width="800" height="1" fill="url(#fd-border)" opacity="0.4" />
          {Array.from({ length: 25 }, (_, i) => (
            <g key={i} transform={`translate(${i * 32 + 16}, 18)`}>
              <path d="M0,-6 L6,0 L0,6 L-6,0 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="0" r="1.5" fill={violet} opacity="0.7" />
            </g>
          ))}
        </svg>

        {/* Bottom border */}
        <svg viewBox="0 0 800 30" className="absolute bottom-0 left-0 w-full opacity-35" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }} aria-hidden="true">
          <rect x="0" y="0" width="800" height="2" fill="url(#fd-border)" />
          <rect x="0" y="6" width="800" height="1" fill="url(#fd-border)" opacity="0.4" />
        </svg>
      </div>
    </BaseTemplate>
  );
}
