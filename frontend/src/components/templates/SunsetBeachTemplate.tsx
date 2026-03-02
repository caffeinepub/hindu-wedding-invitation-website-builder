import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function SunsetBeachTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const coral = isDark ? '#FFBE0B' : '#FF6B35';
  const amber = '#FFBE0B';
  const teal = isDark ? '#1a4a4a' : '#2a8a8a';

  const heroStyle: React.CSSProperties = isDark
    ? { background: 'linear-gradient(160deg, #1a0a00 0%, #3d1500 50%, #1a0a00 100%)' }
    : { background: 'linear-gradient(160deg, #FF6B35 0%, #F7C59F 40%, #FFBE0B 70%, #FF6B35 100%)' };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: '#0d0500', color: '#FAF3E0' }
    : { background: '#FFF9F5', color: '#2a0a00' };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={coral}
      secondaryColor="#F7C59F"
      petalColors={['#FF6B35', amber, '#F7C59F', '#FF9F1C']}
      sectionBg={isDark ? '#0d0500' : '#FFF9F5'}
      textColor={isDark ? 'text-amber-50' : 'text-[#2a0a00]'}
      rsvpBackground={isDark ? 'rgba(120, 50, 20, 0.92)' : 'rgba(120, 50, 20, 0.88)'}
    >
      {/* ── Sunset Beach unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Warm sunset depth glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 60%, rgba(255,190,11,0.12) 0%, rgba(255,107,53,0.18) 50%, rgba(0,0,0,0.40) 100%)',
        }} />

        {/* Sun-burst halo — center */}
        <svg viewBox="0 0 400 400" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-12" aria-hidden="true">
          <g transform="translate(200,200)">
            {Array.from({ length: 18 }, (_, i) => {
              const angle = (i * 20 * Math.PI) / 180;
              return (
                <line key={i}
                  x1={Math.cos(angle) * 60} y1={Math.sin(angle) * 60}
                  x2={Math.cos(angle) * 160} y2={Math.sin(angle) * 160}
                  stroke={amber} strokeWidth={i % 3 === 0 ? 2 : 1}
                  opacity={i % 3 === 0 ? 0.7 : 0.4} />
              );
            })}
            {[160, 130, 100, 70, 45].map((r, i) => (
              <circle key={i} cx="0" cy="0" r={r} fill="none"
                stroke={i % 2 === 0 ? amber : coral}
                strokeWidth={i === 0 ? 1.5 : 0.8}
                opacity={0.5 - i * 0.07} />
            ))}
            <circle cx="0" cy="0" r="40" fill={amber} opacity="0.08" />
          </g>
        </svg>

        {/* Wave-crest border — top */}
        <svg viewBox="0 0 800 50" className="absolute top-0 left-0 w-full opacity-40" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="sb-wave" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={coral} stopOpacity="0" />
              <stop offset="20%" stopColor={amber} />
              <stop offset="50%" stopColor={coral} />
              <stop offset="80%" stopColor={amber} />
              <stop offset="100%" stopColor={coral} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,25 Q40,5 80,25 Q120,45 160,25 Q200,5 240,25 Q280,45 320,25 Q360,5 400,25 Q440,45 480,25 Q520,5 560,25 Q600,45 640,25 Q680,5 720,25 Q760,45 800,25"
            fill="none" stroke="url(#sb-wave)" strokeWidth="2.5" />
          <path d="M0,35 Q40,15 80,35 Q120,50 160,35 Q200,15 240,35 Q280,50 320,35 Q360,15 400,35 Q440,50 480,35 Q520,15 560,35 Q600,50 640,35 Q680,15 720,35 Q760,50 800,35"
            fill="none" stroke="url(#sb-wave)" strokeWidth="1.2" opacity="0.5" />
          <rect x="0" y="0" width="800" height="2" fill="url(#sb-wave)" />
        </svg>

        {/* Wave-crest border — bottom */}
        <svg viewBox="0 0 800 50" className="absolute bottom-0 left-0 w-full opacity-40" preserveAspectRatio="none" style={{ transform: 'scaleY(-1)' }} aria-hidden="true">
          <path d="M0,25 Q40,5 80,25 Q120,45 160,25 Q200,5 240,25 Q280,45 320,25 Q360,5 400,25 Q440,45 480,25 Q520,5 560,25 Q600,45 640,25 Q680,5 720,25 Q760,45 800,25"
            fill="none" stroke="url(#sb-wave)" strokeWidth="2.5" />
          <rect x="0" y="0" width="800" height="2" fill="url(#sb-wave)" />
        </svg>

        {/* Tropical foliage — left edge */}
        <svg viewBox="0 0 100 400" className="absolute top-0 left-0 h-full w-20 opacity-20" preserveAspectRatio="none" aria-hidden="true">
          {/* Palm fronds */}
          <path d="M10,400 Q20,300 5,200 Q-5,150 15,80" fill="none" stroke={teal} strokeWidth="2" />
          <path d="M15,80 Q40,40 80,20" fill="none" stroke={teal} strokeWidth="1.5" />
          <path d="M15,80 Q-10,50 5,10" fill="none" stroke={teal} strokeWidth="1.5" />
          <path d="M15,80 Q50,70 90,90" fill="none" stroke={teal} strokeWidth="1.2" />
          <path d="M5,200 Q30,180 60,190" fill="none" stroke={teal} strokeWidth="1.2" />
          <path d="M5,200 Q-15,220 10,250" fill="none" stroke={teal} strokeWidth="1" />
          {/* Beach grass */}
          {[280, 320, 360, 400].map((y, i) => (
            <path key={i} d={`M${10 + i * 3},${y} Q${20 + i * 2},${y - 30} ${15 + i * 4},${y - 60}`}
              fill="none" stroke={teal} strokeWidth="1" opacity="0.7" />
          ))}
        </svg>

        {/* Tropical foliage — right edge */}
        <svg viewBox="0 0 100 400" className="absolute top-0 right-0 h-full w-20 opacity-20" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }} aria-hidden="true">
          <path d="M10,400 Q20,300 5,200 Q-5,150 15,80" fill="none" stroke={teal} strokeWidth="2" />
          <path d="M15,80 Q40,40 80,20" fill="none" stroke={teal} strokeWidth="1.5" />
          <path d="M15,80 Q-10,50 5,10" fill="none" stroke={teal} strokeWidth="1.5" />
          <path d="M15,80 Q50,70 90,90" fill="none" stroke={teal} strokeWidth="1.2" />
          <path d="M5,200 Q30,180 60,190" fill="none" stroke={teal} strokeWidth="1.2" />
          {[280, 320, 360, 400].map((y, i) => (
            <path key={i} d={`M${10 + i * 3},${y} Q${20 + i * 2},${y - 30} ${15 + i * 4},${y - 60}`}
              fill="none" stroke={teal} strokeWidth="1" opacity="0.7" />
          ))}
        </svg>
      </div>
    </BaseTemplate>
  );
}
