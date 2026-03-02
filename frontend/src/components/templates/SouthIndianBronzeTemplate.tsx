import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function SouthIndianBronzeTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const bronze = '#CD853F';
  const gold = '#D4AF37';
  const copper = '#8B5E3C';

  const heroStyle: React.CSSProperties = isDark
    ? { background: 'linear-gradient(160deg, #1a0e00 0%, #3d2200 50%, #1a0e00 100%)' }
    : { background: 'linear-gradient(160deg, #8B5E3C 0%, #CD853F 50%, #8B5E3C 100%)' };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0700', color: '#FAF3E0' }
    : { background: '#FFF8F0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={bronze}
      secondaryColor={copper}
      petalColors={[bronze, gold, copper, '#F4A832']}
      sectionBg={isDark ? '#0d0700' : '#FFF8F0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
      rsvpBackground={isDark ? 'rgba(60, 30, 10, 0.93)' : 'rgba(60, 30, 10, 0.90)'}
    >
      {/* ── South Indian Bronze / Kolam unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Bronze metallic radial sheen overlay */}
        <div className="absolute inset-0" style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(205,133,63,0.15) 0%, rgba(139,94,60,0.25) 55%, rgba(0,0,0,0.50) 100%)`,
        }} />

        {/* Kolam dot-grid background pattern */}
        <svg viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="sib-kolam" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              {/* Dot */}
              <circle cx="20" cy="20" r="2" fill={gold} opacity="0.8" />
              {/* Curves connecting dots */}
              <path d="M20,20 Q30,10 40,20" fill="none" stroke={bronze} strokeWidth="0.8" opacity="0.6" />
              <path d="M20,20 Q10,30 20,40" fill="none" stroke={bronze} strokeWidth="0.8" opacity="0.6" />
              <path d="M20,20 Q30,30 40,20" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.5" />
              <path d="M20,20 Q10,10 20,0" fill="none" stroke={gold} strokeWidth="0.6" opacity="0.5" />
              {/* Corner dots */}
              <circle cx="0" cy="0" r="1.5" fill={bronze} opacity="0.6" />
              <circle cx="40" cy="0" r="1.5" fill={bronze} opacity="0.6" />
              <circle cx="0" cy="40" r="1.5" fill={bronze} opacity="0.6" />
              <circle cx="40" cy="40" r="1.5" fill={bronze} opacity="0.6" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#sib-kolam)" />
        </svg>

        {/* Kolam corner-knot — top-left */}
        <svg viewBox="0 0 120 120" className="absolute top-0 left-0 w-28 h-28 opacity-25" aria-hidden="true">
          <g transform="translate(10,10)">
            {/* Dot grid 3x3 */}
            {[0, 1, 2].map(row => [0, 1, 2].map(col => (
              <circle key={`${row}-${col}`} cx={col * 40 + 10} cy={row * 40 + 10} r="3" fill={gold} opacity="0.8" />
            )))}
            {/* Kolam curves */}
            <path d="M10,10 Q50,-10 90,10 Q110,50 90,90 Q50,110 10,90 Q-10,50 10,10 Z"
              fill="none" stroke={bronze} strokeWidth="1.2" opacity="0.7" />
            <path d="M10,50 Q30,20 50,10 Q70,20 90,50 Q70,80 50,90 Q30,80 10,50 Z"
              fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
          </g>
        </svg>

        {/* Kolam corner-knot — top-right */}
        <svg viewBox="0 0 120 120" className="absolute top-0 right-0 w-28 h-28 opacity-25" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">
          <g transform="translate(10,10)">
            {[0, 1, 2].map(row => [0, 1, 2].map(col => (
              <circle key={`${row}-${col}`} cx={col * 40 + 10} cy={row * 40 + 10} r="3" fill={gold} opacity="0.8" />
            )))}
            <path d="M10,10 Q50,-10 90,10 Q110,50 90,90 Q50,110 10,90 Q-10,50 10,10 Z"
              fill="none" stroke={bronze} strokeWidth="1.2" opacity="0.7" />
            <path d="M10,50 Q30,20 50,10 Q70,20 90,50 Q70,80 50,90 Q30,80 10,50 Z"
              fill="none" stroke={gold} strokeWidth="0.8" opacity="0.6" />
          </g>
        </svg>

        {/* Kolam border strip — top */}
        <svg viewBox="0 0 800 30" className="absolute top-0 left-0 w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sib-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={bronze} stopOpacity="0" />
              <stop offset="20%" stopColor={gold} />
              <stop offset="50%" stopColor={bronze} />
              <stop offset="80%" stopColor={gold} />
              <stop offset="100%" stopColor={bronze} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="2.5" fill="url(#sib-border)" />
          <rect x="0" y="8" width="800" height="1" fill="url(#sib-border)" opacity="0.5" />
          {Array.from({ length: 40 }, (_, i) => (
            <g key={i} transform={`translate(${i * 20 + 10}, 18)`}>
              <path d="M0,-5 Q5,0 0,5 Q-5,0 0,-5 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.7" />
              <circle cx="0" cy="0" r="1.5" fill={bronze} opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Kolam border strip — bottom */}
        <svg viewBox="0 0 800 30" className="absolute bottom-0 left-0 w-full opacity-35" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }} aria-hidden="true">
          <rect x="0" y="0" width="800" height="2.5" fill="url(#sib-border)" />
          <rect x="0" y="8" width="800" height="1" fill="url(#sib-border)" opacity="0.5" />
          {Array.from({ length: 40 }, (_, i) => (
            <g key={i} transform={`translate(${i * 20 + 10}, 18)`}>
              <path d="M0,-5 Q5,0 0,5 Q-5,0 0,-5 Z" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.7" />
            </g>
          ))}
        </svg>
      </div>
    </BaseTemplate>
  );
}
