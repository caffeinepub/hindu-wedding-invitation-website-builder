import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function RoyalRajasthaniTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const gold = '#D4AF37';
  const crimson = isDark ? '#c0392b' : '#8B0000';

  const heroStyle: React.CSSProperties = isDark
    ? { background: 'linear-gradient(160deg, #1a0005 0%, #3d0010 40%, #1a0005 100%)' }
    : { background: 'linear-gradient(160deg, #7a0020 0%, #c0392b 40%, #8b0000 100%)' };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0005', color: '#FAF3E0' }
    : { background: '#FAF3E0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={gold}
      secondaryColor={crimson}
      petalColors={[gold, '#C0392B', '#F4A832', '#8B0000']}
      sectionBg={isDark ? '#0d0005' : '#FAF3E0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
      rsvpBackground={isDark ? 'rgba(80, 10, 20, 0.92)' : 'rgba(80, 10, 20, 0.88)'}
    >
      {/* ── Royal Rajasthani unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Radial depth glow overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.08) 0%, rgba(139,0,0,0.25) 60%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* Jali lattice — top-left corner */}
        <svg viewBox="0 0 240 240" className="absolute top-0 left-0 w-56 h-56 opacity-20" aria-hidden="true">
          <defs>
            <pattern id="rr-jali" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="30" height="30" fill="none" stroke={gold} strokeWidth="0.6" />
              <circle cx="15" cy="15" r="8" fill="none" stroke={gold} strokeWidth="0.8" />
              <circle cx="15" cy="15" r="4" fill="none" stroke={gold} strokeWidth="0.5" />
              <line x1="0" y1="15" x2="7" y2="15" stroke={gold} strokeWidth="0.5" />
              <line x1="23" y1="15" x2="30" y2="15" stroke={gold} strokeWidth="0.5" />
              <line x1="15" y1="0" x2="15" y2="7" stroke={gold} strokeWidth="0.5" />
              <line x1="15" y1="23" x2="15" y2="30" stroke={gold} strokeWidth="0.5" />
              <line x1="4" y1="4" x2="9" y2="9" stroke={gold} strokeWidth="0.4" />
              <line x1="21" y1="4" x2="26" y2="9" stroke={gold} strokeWidth="0.4" />
              <line x1="4" y1="26" x2="9" y2="21" stroke={gold} strokeWidth="0.4" />
              <line x1="21" y1="26" x2="26" y2="21" stroke={gold} strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="240" height="240" fill="url(#rr-jali)" />
        </svg>

        {/* Jali lattice — bottom-right corner */}
        <svg viewBox="0 0 240 240" className="absolute bottom-0 right-0 w-56 h-56 opacity-20" aria-hidden="true">
          <rect width="240" height="240" fill="url(#rr-jali)" />
        </svg>

        {/* Paisley cluster — top-right */}
        <svg viewBox="0 0 160 200" className="absolute top-4 right-4 w-36 h-44 opacity-25" aria-hidden="true">
          <g transform="translate(80,100)">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <path d="M0,-60 C20,-55 30,-35 20,-15 C10,5 -10,10 -15,0 C-20,-10 -10,-25 0,-60 Z"
                  fill="none" stroke={gold} strokeWidth="1.2" opacity="0.8" />
                <path d="M0,-60 C15,-50 22,-32 14,-14 C8,0 -6,6 -10,0"
                  fill="none" stroke={gold} strokeWidth="0.6" opacity="0.5" />
                <circle cx="0" cy="-60" r="2.5" fill={gold} opacity="0.7" />
              </g>
            ))}
            <circle cx="0" cy="0" r="8" fill="none" stroke={gold} strokeWidth="1" opacity="0.6" />
            <circle cx="0" cy="0" r="3" fill={gold} opacity="0.7" />
          </g>
        </svg>

        {/* Paisley cluster — bottom-left */}
        <svg viewBox="0 0 160 200" className="absolute bottom-4 left-4 w-36 h-44 opacity-25" aria-hidden="true">
          <g transform="translate(80,100) rotate(180)">
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                <path d="M0,-60 C20,-55 30,-35 20,-15 C10,5 -10,10 -15,0 C-20,-10 -10,-25 0,-60 Z"
                  fill="none" stroke={gold} strokeWidth="1.2" opacity="0.8" />
                <circle cx="0" cy="-60" r="2.5" fill={gold} opacity="0.7" />
              </g>
            ))}
            <circle cx="0" cy="0" r="8" fill="none" stroke={gold} strokeWidth="1" opacity="0.6" />
          </g>
        </svg>

        {/* Top border strip — chevron jali */}
        <svg viewBox="0 0 800 28" className="absolute top-0 left-0 w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="rr-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gold} stopOpacity="0" />
              <stop offset="20%" stopColor={gold} />
              <stop offset="50%" stopColor="#fffacd" />
              <stop offset="80%" stopColor={gold} />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="2.5" fill="url(#rr-border-grad)" />
          <rect x="0" y="8" width="800" height="1" fill="url(#rr-border-grad)" opacity="0.5" />
          {Array.from({ length: 40 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 20}, 12)`}>
              <polygon points="10,0 20,8 10,16 0,8" fill="none" stroke={gold} strokeWidth="0.7" opacity="0.7" />
              <circle cx="10" cy="8" r="1.5" fill={gold} opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Bottom border strip */}
        <svg viewBox="0 0 800 28" className="absolute bottom-0 left-0 w-full opacity-35" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }} aria-hidden="true">
          <rect x="0" y="0" width="800" height="2.5" fill="url(#rr-border-grad)" />
          <rect x="0" y="8" width="800" height="1" fill="url(#rr-border-grad)" opacity="0.5" />
          {Array.from({ length: 40 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 20}, 12)`}>
              <polygon points="10,0 20,8 10,16 0,8" fill="none" stroke={gold} strokeWidth="0.7" opacity="0.7" />
            </g>
          ))}
        </svg>

        {/* Central arch frame */}
        <svg viewBox="0 0 400 500" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 opacity-10" aria-hidden="true">
          <path d="M60,480 L60,200 Q60,40 200,40 Q340,40 340,200 L340,480"
            fill="none" stroke={gold} strokeWidth="2" />
          <path d="M80,480 L80,210 Q80,70 200,70 Q320,70 320,210 L320,480"
            fill="none" stroke={gold} strokeWidth="1" opacity="0.5" />
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <circle key={i}
              cx={200 + Math.cos((angle * Math.PI) / 180) * 160}
              cy={200 + Math.sin((angle * Math.PI) / 180) * 160}
              r="3" fill={gold} opacity="0.6" />
          ))}
        </svg>
      </div>
    </BaseTemplate>
  );
}
