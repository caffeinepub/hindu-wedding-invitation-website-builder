import BaseTemplate, { type TemplateProps } from './BaseTemplate';

export default function VedicFireTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const accentColor = isDark ? '#ffd700' : '#cc6600';
  const fireRed = isDark ? '#ff4500' : '#cc2200';
  const fireAmber = isDark ? '#ff6600' : '#ff8800';

  const heroStyle: React.CSSProperties = isDark
    ? { background: 'linear-gradient(160deg, #1a0500 0%, #3d0f00 50%, #1a0500 100%)' }
    : { background: 'linear-gradient(160deg, #7a2000 0%, #cc4400 50%, #7a2000 100%)' };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0300', color: '#f5e6c8' }
    : { background: '#fff8f0', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={accentColor}
      secondaryColor={fireRed}
      petalColors={[accentColor, '#ff4500', '#cc2200', '#ff6600']}
      sectionBg={isDark ? '#0d0300' : '#fff8f0'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
      rsvpBackground={isDark ? 'rgba(100, 20, 5, 0.93)' : 'rgba(100, 20, 5, 0.90)'}
    >
      {/* ── Vedic Fire unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Ember glow radial overlay */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(255,69,0,0.18) 0%, rgba(204,34,0,0.22) 45%, rgba(0,0,0,0.55) 100%)',
        }} />

        {/* Agni flame tongues — bottom */}
        <svg viewBox="0 0 800 160" className="absolute bottom-0 left-0 w-full opacity-40" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="vf-flame2" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={fireRed} />
              <stop offset="35%" stopColor={fireAmber} />
              <stop offset="70%" stopColor={accentColor} />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Large flames */}
          {[60, 160, 260, 360, 460, 560, 660, 760].map((x, i) => (
            <path key={`lg-${i}`}
              d={`M${x},160 C${x - 20},120 ${x - 30},80 ${x},${30 + (i % 3) * 20} C${x + 30},80 ${x + 20},120 ${x + 25},160`}
              fill="url(#vf-flame2)" opacity={0.7 + (i % 2) * 0.15} />
          ))}
          {/* Small flames between */}
          {[110, 210, 310, 410, 510, 610, 710].map((x, i) => (
            <path key={`sm-${i}`}
              d={`M${x},160 C${x - 12},130 ${x - 15},100 ${x},${60 + (i % 2) * 25} C${x + 15},100 ${x + 12},130 ${x + 15},160`}
              fill="url(#vf-flame2)" opacity={0.5 + (i % 3) * 0.1} />
          ))}
        </svg>

        {/* Sri Yantra geometry — center background */}
        <svg viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-15" aria-hidden="true">
          <g transform="translate(200,200)">
            {/* Outer circle */}
            <circle cx="0" cy="0" r="185" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.6" />
            <circle cx="0" cy="0" r="178" fill="none" stroke={accentColor} strokeWidth="0.6" opacity="0.3" />
            {/* Lotus petals outer ring */}
            {Array.from({ length: 16 }, (_, i) => (
              <ellipse key={i} cx="0" cy="-165" rx="10" ry="22"
                fill="none" stroke={accentColor} strokeWidth="0.8"
                transform={`rotate(${i * 22.5})`} opacity="0.5" />
            ))}
            {/* Upward triangles */}
            {[150, 120, 90, 60].map((r, i) => (
              <polygon key={`up-${i}`}
                points={`0,${-r} ${r * 0.866},${r * 0.5} ${-r * 0.866},${r * 0.5}`}
                fill="none" stroke={accentColor} strokeWidth="1.2"
                opacity={0.8 - i * 0.12} />
            ))}
            {/* Downward triangles */}
            {[140, 110, 80, 50].map((r, i) => (
              <polygon key={`dn-${i}`}
                points={`0,${r} ${r * 0.866},${-r * 0.5} ${-r * 0.866},${-r * 0.5}`}
                fill="none" stroke={fireRed} strokeWidth="1.2"
                opacity={0.8 - i * 0.12} />
            ))}
            {/* Inner bindu */}
            <circle cx="0" cy="0" r="20" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
            <circle cx="0" cy="0" r="8" fill={accentColor} opacity="0.5" />
          </g>
        </svg>

        {/* Circular yantra ring frame — around couple names */}
        <svg viewBox="0 0 300 300" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 opacity-18" aria-hidden="true">
          <g transform="translate(150,150)">
            <circle cx="0" cy="0" r="140" fill="none" stroke={accentColor} strokeWidth="2" opacity="0.5" strokeDasharray="8 4" />
            <circle cx="0" cy="0" r="130" fill="none" stroke={fireRed} strokeWidth="1" opacity="0.3" />
            {Array.from({ length: 12 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 30})`}>
                <circle cx="0" cy="-140" r="4" fill={accentColor} opacity="0.6" />
                <line x1="0" y1="-125" x2="0" y2="-110" stroke={accentColor} strokeWidth="1" opacity="0.4" />
              </g>
            ))}
          </g>
        </svg>

        {/* Top geometric border */}
        <svg viewBox="0 0 800 32" className="absolute top-0 left-0 w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="vf-border2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={fireRed} stopOpacity="0" />
              <stop offset="20%" stopColor={accentColor} />
              <stop offset="50%" stopColor={fireAmber} />
              <stop offset="80%" stopColor={accentColor} />
              <stop offset="100%" stopColor={fireRed} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="3" fill="url(#vf-border2)" />
          <rect x="0" y="9" width="800" height="1" fill="url(#vf-border2)" opacity="0.4" />
          {Array.from({ length: 20 }, (_, i) => (
            <g key={i} transform={`translate(${i * 40 + 20}, 20)`}>
              <polygon points="0,-6 6,0 0,6 -6,0" fill="none" stroke={accentColor} strokeWidth="0.8" opacity="0.7" />
              <circle cx="0" cy="0" r="1.5" fill={fireRed} opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Corner fire swirls */}
        <svg viewBox="0 0 80 80" className="absolute top-0 left-0 w-20 h-20 opacity-30" aria-hidden="true">
          <path d="M0,80 Q20,40 40,20 Q50,10 60,0" stroke={fireRed} strokeWidth="2.5" fill="none" />
          <path d="M0,80 Q30,50 50,30 Q60,20 70,0" stroke={accentColor} strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M0,80 Q10,60 20,40 Q30,25 40,0" stroke={fireAmber} strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
        <svg viewBox="0 0 80 80" className="absolute top-0 right-0 w-20 h-20 opacity-30" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">
          <path d="M0,80 Q20,40 40,20 Q50,10 60,0" stroke={fireRed} strokeWidth="2.5" fill="none" />
          <path d="M0,80 Q30,50 50,30 Q60,20 70,0" stroke={accentColor} strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M0,80 Q10,60 20,40 Q30,25 40,0" stroke={fireAmber} strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
      </div>
    </BaseTemplate>
  );
}
