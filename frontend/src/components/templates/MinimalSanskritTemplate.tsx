import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function MinimalSanskritTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const gold = '#D4AF37';
  const ink = isDark ? '#FAF3E0' : '#2a0a00';

  const heroStyle: React.CSSProperties = isDark
    ? { background: '#1a1510', backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)` }
    : { background: '#FAF3E0', backgroundImage: `radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 70%)` };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#1a1510', color: '#FAF3E0' }
    : { background: '#FAF3E0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={gold}
      secondaryColor="#8B7355"
      petalColors={[gold, '#C8B89A', '#8B7355']}
      sectionBg={isDark ? '#1a1510' : '#FAF3E0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
      rsvpBackground={isDark ? 'rgba(26, 21, 16, 0.95)' : 'rgba(245, 238, 220, 0.97)'}
    >
      {/* ── Minimal Sanskrit unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Soft vignette for depth */}
        <div className="absolute inset-0" style={{
          background: isDark
            ? 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)'
            : 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(42,10,0,0.12) 100%)',
        }} />

        {/* Large Om watermark — center */}
        <svg viewBox="0 0 300 300" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-8" aria-hidden="true">
          <text
            x="150" y="220"
            textAnchor="middle"
            fontSize="220"
            fontFamily="serif"
            fill={gold}
            opacity="0.12"
          >ॐ</text>
        </svg>

        {/* Devanagari floral border — top */}
        <svg viewBox="0 0 800 36" className="absolute top-0 left-0 w-full opacity-30" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="ms-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gold} stopOpacity="0" />
              <stop offset="20%" stopColor={gold} />
              <stop offset="50%" stopColor={ink} />
              <stop offset="80%" stopColor={gold} />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="2" fill="url(#ms-border)" />
          <rect x="0" y="6" width="800" height="1" fill="url(#ms-border)" opacity="0.4" />
          {/* Lotus bud repeating motif */}
          {Array.from({ length: 20 }, (_, i) => (
            <g key={i} transform={`translate(${i * 40 + 20}, 20)`}>
              <ellipse cx="0" cy="-6" rx="4" ry="8" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.7" />
              <ellipse cx="-6" cy="-3" rx="3" ry="6" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.5" transform="rotate(-20)" />
              <ellipse cx="6" cy="-3" rx="3" ry="6" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.5" transform="rotate(20)" />
              <line x1="0" y1="2" x2="0" y2="8" stroke={gold} strokeWidth="0.8" opacity="0.5" />
            </g>
          ))}
        </svg>

        {/* Devanagari floral border — bottom */}
        <svg viewBox="0 0 800 36" className="absolute bottom-0 left-0 w-full opacity-30" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }} aria-hidden="true">
          <rect x="0" y="0" width="800" height="2" fill="url(#ms-border)" />
          <rect x="0" y="6" width="800" height="1" fill="url(#ms-border)" opacity="0.4" />
          {Array.from({ length: 20 }, (_, i) => (
            <g key={i} transform={`translate(${i * 40 + 20}, 20)`}>
              <ellipse cx="0" cy="-6" rx="4" ry="8" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.7" />
              <line x1="0" y1="2" x2="0" y2="8" stroke={gold} strokeWidth="0.8" opacity="0.5" />
            </g>
          ))}
        </svg>

        {/* Lotus line-art divider — left side */}
        <svg viewBox="0 0 40 300" className="absolute top-1/2 left-4 -translate-y-1/2 w-8 h-64 opacity-20" aria-hidden="true">
          <line x1="20" y1="0" x2="20" y2="300" stroke={gold} strokeWidth="0.8" />
          {[50, 100, 150, 200, 250].map((y, i) => (
            <g key={i} transform={`translate(20, ${y})`}>
              <ellipse cx="0" cy="-8" rx="5" ry="10" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.8" />
              <ellipse cx="-7" cy="-4" rx="4" ry="7" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.6" transform="rotate(-25)" />
              <ellipse cx="7" cy="-4" rx="4" ry="7" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.6" transform="rotate(25)" />
              <circle cx="0" cy="0" r="2" fill={gold} opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Lotus line-art divider — right side */}
        <svg viewBox="0 0 40 300" className="absolute top-1/2 right-4 -translate-y-1/2 w-8 h-64 opacity-20" style={{ transform: 'translateY(-50%) scaleX(-1)' }} aria-hidden="true">
          <line x1="20" y1="0" x2="20" y2="300" stroke={gold} strokeWidth="0.8" />
          {[50, 100, 150, 200, 250].map((y, i) => (
            <g key={i} transform={`translate(20, ${y})`}>
              <ellipse cx="0" cy="-8" rx="5" ry="10" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.8" />
              <ellipse cx="-7" cy="-4" rx="4" ry="7" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.6" transform="rotate(-25)" />
              <ellipse cx="7" cy="-4" rx="4" ry="7" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.6" transform="rotate(25)" />
              <circle cx="0" cy="0" r="2" fill={gold} opacity="0.6" />
            </g>
          ))}
        </svg>
      </div>
    </BaseTemplate>
  );
}
