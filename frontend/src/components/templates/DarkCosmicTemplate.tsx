import BaseTemplate, { TemplateProps } from './BaseTemplate';

export default function DarkCosmicTemplate({ invite, variant = 'light' }: TemplateProps) {
  const isDark = variant === 'dark';
  const gold = '#D4AF37';
  const starWhite = '#e8e0ff';

  const heroStyle: React.CSSProperties = {
    background: isDark
      ? 'radial-gradient(ellipse at center, #0d0d2b 0%, #000010 100%)'
      : 'radial-gradient(ellipse at center, #1a1a4e 0%, #0a0a20 100%)',
  };

  const bodyStyle: React.CSSProperties = {
    background: '#000010',
    color: '#e8e0ff',
  };

  // Constellation node positions
  const stars = [
    { x: 80, y: 60 }, { x: 160, y: 40 }, { x: 240, y: 90 }, { x: 320, y: 55 },
    { x: 400, y: 80 }, { x: 480, y: 45 }, { x: 560, y: 100 }, { x: 640, y: 60 },
    { x: 720, y: 75 }, { x: 120, y: 130 }, { x: 280, y: 150 }, { x: 440, y: 140 },
    { x: 600, y: 160 }, { x: 760, y: 120 }, { x: 50, y: 200 }, { x: 200, y: 220 },
    { x: 380, y: 210 }, { x: 520, y: 230 }, { x: 680, y: 200 },
  ];

  const constellationEdges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
    [0, 9], [2, 10], [4, 11], [6, 12], [8, 13], [9, 14], [10, 15],
    [11, 16], [12, 17], [13, 18],
  ];

  return (
    <BaseTemplate
      invite={invite}
      variant="dark"
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={gold}
      secondaryColor="#7B68EE"
      petalColors={[gold, '#7B68EE', '#9370DB', '#FFD700']}
      sectionBg="#000010"
      textColor="text-purple-50"
      rsvpBackground={isDark ? 'rgba(5, 5, 30, 0.95)' : 'rgba(5, 5, 30, 0.92)'}
    >
      {/* ── Dark Cosmic unique SVG motifs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>

        {/* Radial starfield glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,104,238,0.12) 0%, rgba(212,175,55,0.06) 40%, transparent 70%)',
        }} />

        {/* Constellation line-art overlay */}
        <svg viewBox="0 0 800 280" className="absolute top-0 left-0 w-full opacity-30" preserveAspectRatio="none" aria-hidden="true">
          {constellationEdges.map(([a, b], i) => (
            <line key={i}
              x1={stars[a].x} y1={stars[a].y}
              x2={stars[b].x} y2={stars[b].y}
              stroke={gold} strokeWidth="0.7" opacity="0.5" />
          ))}
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={i % 4 === 0 ? 2.5 : 1.5}
              fill={i % 3 === 0 ? gold : starWhite} opacity={0.6 + (i % 3) * 0.15} />
          ))}
        </svg>

        {/* Celestial arc rings — centered */}
        <svg viewBox="0 0 600 600" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-12" aria-hidden="true">
          <g transform="translate(300,300)">
            {[240, 200, 160, 120, 80].map((r, i) => (
              <ellipse key={i} cx="0" cy="0" rx={r} ry={r * 0.35}
                fill="none" stroke={i % 2 === 0 ? gold : '#7B68EE'}
                strokeWidth={i === 0 ? 1.5 : 0.8}
                strokeDasharray={i % 2 === 0 ? '8 4' : '4 8'}
                opacity={0.7 - i * 0.1} />
            ))}
            {/* Orbital dots */}
            {[240, 200, 160].map((r, ri) =>
              Array.from({ length: 6 }, (_, i) => (
                <circle key={`${ri}-${i}`}
                  cx={r * Math.cos((i * 60 * Math.PI) / 180)}
                  cy={r * 0.35 * Math.sin((i * 60 * Math.PI) / 180)}
                  r="2.5" fill={gold} opacity="0.5" />
              ))
            )}
            <circle cx="0" cy="0" r="12" fill="none" stroke={gold} strokeWidth="1.5" opacity="0.6" />
            <circle cx="0" cy="0" r="5" fill={gold} opacity="0.7" />
          </g>
        </svg>

        {/* Bottom constellation strip */}
        <svg viewBox="0 0 800 120" className="absolute bottom-0 left-0 w-full opacity-25" preserveAspectRatio="none" aria-hidden="true">
          {[
            { x: 50, y: 80 }, { x: 130, y: 50 }, { x: 220, y: 90 }, { x: 310, y: 40 },
            { x: 400, y: 70 }, { x: 490, y: 45 }, { x: 580, y: 85 }, { x: 670, y: 55 }, { x: 750, y: 80 },
          ].map((s, i, arr) => (
            <g key={i}>
              {i < arr.length - 1 && (
                <line x1={s.x} y1={s.y} x2={arr[i + 1].x} y2={arr[i + 1].y}
                  stroke={gold} strokeWidth="0.6" opacity="0.4" />
              )}
              <circle cx={s.x} cy={s.y} r="2" fill={gold} opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Top border — star-dot chain */}
        <svg viewBox="0 0 800 16" className="absolute top-0 left-0 w-full opacity-35" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="dc-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gold} stopOpacity="0" />
              <stop offset="20%" stopColor={gold} />
              <stop offset="50%" stopColor="#7B68EE" />
              <stop offset="80%" stopColor={gold} />
              <stop offset="100%" stopColor={gold} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="1.5" fill="url(#dc-border)" />
          {Array.from({ length: 50 }, (_, i) => (
            <circle key={i} cx={i * 16 + 8} cy="8" r={i % 5 === 0 ? 2.5 : 1.2}
              fill={i % 5 === 0 ? gold : '#7B68EE'} opacity="0.7" />
          ))}
        </svg>
      </div>
    </BaseTemplate>
  );
}
