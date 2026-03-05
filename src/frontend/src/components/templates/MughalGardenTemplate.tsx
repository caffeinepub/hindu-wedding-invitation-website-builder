import BaseTemplate, { type TemplateProps } from "./BaseTemplate";

export default function MughalGardenTemplate({
  invite,
  variant = "light",
}: TemplateProps) {
  const isDark = variant === "dark";
  const goldColor = isDark ? "#ffd700" : "#b8860b";
  const emerald = isDark ? "#228b22" : "#2d6a2d";

  const heroStyle: React.CSSProperties = isDark
    ? {
        background:
          "linear-gradient(160deg, #0a1a0a 0%, #1a3a1a 50%, #0a1a0a 100%)",
      }
    : {
        background:
          "linear-gradient(160deg, #1a3a1a 0%, #2d6a2d 50%, #1a3a1a 100%)",
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: "#060f06", color: "#f5e6c8" }
    : { background: "#f0f7f0", color: "#1a2a1a" };

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={goldColor}
      secondaryColor={emerald}
      petalColors={[goldColor, emerald, "#90ee90", "#ffd700"]}
      sectionBg={isDark ? "#060f06" : "#f0f7f0"}
      textColor={isDark ? "text-amber-50" : "text-[#1a2a1a]"}
      rsvpBackground={
        isDark ? "rgba(5, 50, 30, 0.93)" : "rgba(5, 50, 30, 0.90)"
      }
    >
      {/* ── Mughal Garden unique SVG motifs ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
      >
        {/* Deep-shadow inner-frame vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Floral jali lattice — full background tile */}
        <svg
          viewBox="0 0 400 400"
          className="absolute top-0 left-0 w-full h-full opacity-8"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="mg-jali"
              x="0"
              y="0"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              {/* Interlocking floral jali cell */}
              <circle
                cx="25"
                cy="25"
                r="18"
                fill="none"
                stroke={goldColor}
                strokeWidth="0.7"
              />
              <circle
                cx="25"
                cy="25"
                r="10"
                fill="none"
                stroke={emerald}
                strokeWidth="0.5"
              />
              <circle cx="25" cy="25" r="4" fill={goldColor} opacity="0.4" />
              {/* 4-petal flower */}
              {[0, 90, 180, 270].map((a) => (
                <ellipse
                  key={`jali-petal-${a}`}
                  cx="25"
                  cy="25"
                  rx="4"
                  ry="10"
                  fill="none"
                  stroke={goldColor}
                  strokeWidth="0.6"
                  transform={`rotate(${a}, 25, 25)`}
                  opacity="0.7"
                />
              ))}
              {/* Corner connectors */}
              <line
                x1="0"
                y1="0"
                x2="7"
                y2="7"
                stroke={goldColor}
                strokeWidth="0.4"
                opacity="0.5"
              />
              <line
                x1="50"
                y1="0"
                x2="43"
                y2="7"
                stroke={goldColor}
                strokeWidth="0.4"
                opacity="0.5"
              />
              <line
                x1="0"
                y1="50"
                x2="7"
                y2="43"
                stroke={goldColor}
                strokeWidth="0.4"
                opacity="0.5"
              />
              <line
                x1="50"
                y1="50"
                x2="43"
                y2="43"
                stroke={goldColor}
                strokeWidth="0.4"
                opacity="0.5"
              />
            </pattern>
          </defs>
          <rect width="400" height="400" fill="url(#mg-jali)" />
        </svg>

        {/* Mughal pointed arch frame — center */}
        <svg
          viewBox="0 0 500 600"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-[480px] opacity-20"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mg-arch-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={goldColor} stopOpacity="0.3" />
              <stop offset="50%" stopColor={goldColor} />
              <stop offset="100%" stopColor={goldColor} stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Main pointed horseshoe arch */}
          <path
            d="M80,560 L80,260 Q80,60 250,40 Q420,60 420,260 L420,560"
            fill="none"
            stroke="url(#mg-arch-grad)"
            strokeWidth="2.5"
          />
          {/* Inner arch */}
          <path
            d="M110,560 L110,270 Q110,90 250,75 Q390,90 390,270 L390,560"
            fill="none"
            stroke={goldColor}
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Arch keystone */}
          <path
            d="M220,42 Q250,20 280,42 L275,70 Q250,55 225,70 Z"
            fill={goldColor}
            opacity="0.5"
          />
          {/* Arch spandrel rosettes */}
          {[
            { cx: 80, cy: 200 },
            { cx: 420, cy: 200 },
            { cx: 80, cy: 350 },
            { cx: 420, cy: 350 },
          ].map((pos) => (
            <g
              key={`rosette-${pos.cx}-${pos.cy}`}
              transform={`translate(${pos.cx}, ${pos.cy})`}
            >
              {[0, 60, 120, 180, 240, 300].map((deg, pi) => (
                <ellipse
                  key={`rosette-petal-${pos.cx}-${deg}`}
                  cx="0"
                  cy="-14"
                  rx="4"
                  ry="9"
                  fill={pi % 2 === 0 ? goldColor : emerald}
                  transform={`rotate(${deg})`}
                  opacity="0.6"
                />
              ))}
              <circle cx="0" cy="0" r="5" fill={goldColor} opacity="0.7" />
            </g>
          ))}
          {/* Base columns */}
          <rect
            x="70"
            y="540"
            width="20"
            height="30"
            fill={goldColor}
            opacity="0.3"
          />
          <rect
            x="410"
            y="540"
            width="20"
            height="30"
            fill={goldColor}
            opacity="0.3"
          />
        </svg>

        {/* Corner rosette — top-left */}
        <svg
          viewBox="0 0 100 100"
          className="absolute top-4 left-4 w-24 h-24 opacity-25"
          aria-hidden="true"
        >
          <g transform="translate(50,50)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <ellipse
                key={`tl-rose-${deg}`}
                cx="0"
                cy="-28"
                rx="6"
                ry="14"
                fill={i % 2 === 0 ? goldColor : emerald}
                transform={`rotate(${deg})`}
                opacity="0.8"
              />
            ))}
            <circle cx="0" cy="0" r="10" fill={goldColor} opacity="0.7" />
            <circle cx="0" cy="0" r="5" fill="#fffacd" opacity="0.8" />
          </g>
        </svg>

        {/* Corner rosette — top-right */}
        <svg
          viewBox="0 0 100 100"
          className="absolute top-4 right-4 w-24 h-24 opacity-25"
          aria-hidden="true"
        >
          <g transform="translate(50,50)">
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
              <ellipse
                key={`tr-rose-${deg}`}
                cx="0"
                cy="-28"
                rx="6"
                ry="14"
                fill={i % 2 === 0 ? emerald : goldColor}
                transform={`rotate(${deg})`}
                opacity="0.8"
              />
            ))}
            <circle cx="0" cy="0" r="10" fill={goldColor} opacity="0.7" />
          </g>
        </svg>

        {/* Corner rosette — bottom-left */}
        <svg
          viewBox="0 0 100 100"
          className="absolute bottom-4 left-4 w-24 h-24 opacity-25"
          aria-hidden="true"
        >
          <g transform="translate(50,50)">
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
              (deg, i) => (
                <ellipse
                  key={`bl-rose-${deg}`}
                  cx="0"
                  cy="-28"
                  rx="6"
                  ry="14"
                  fill={i % 2 === 0 ? goldColor : emerald}
                  transform={`rotate(${deg})`}
                  opacity="0.8"
                />
              ),
            )}
            <circle cx="0" cy="0" r="10" fill={goldColor} opacity="0.7" />
          </g>
        </svg>

        {/* Corner rosette — bottom-right */}
        <svg
          viewBox="0 0 100 100"
          className="absolute bottom-4 right-4 w-24 h-24 opacity-25"
          aria-hidden="true"
        >
          <g transform="translate(50,50)">
            {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(
              (deg, i) => (
                <ellipse
                  key={`br-rose-${deg}`}
                  cx="0"
                  cy="-28"
                  rx="6"
                  ry="14"
                  fill={i % 2 === 0 ? emerald : goldColor}
                  transform={`rotate(${deg})`}
                  opacity="0.8"
                />
              ),
            )}
            <circle cx="0" cy="0" r="10" fill={goldColor} opacity="0.7" />
          </g>
        </svg>

        {/* Top scalloped border */}
        <svg
          viewBox="0 0 800 40"
          className="absolute top-0 left-0 w-full opacity-35"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mg-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={goldColor} stopOpacity="0" />
              <stop offset="20%" stopColor={goldColor} />
              <stop offset="50%" stopColor={emerald} />
              <stop offset="80%" stopColor={goldColor} />
              <stop offset="100%" stopColor={goldColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="2.5" fill="url(#mg-border)" />
          <path
            d="M0,15 Q20,5 40,15 Q60,25 80,15 Q100,5 120,15 Q140,25 160,15 Q180,5 200,15 Q220,25 240,15 Q260,5 280,15 Q300,25 320,15 Q340,5 360,15 Q380,25 400,15 Q420,5 440,15 Q460,25 480,15 Q500,5 520,15 Q540,25 560,15 Q580,5 600,15 Q620,25 640,15 Q660,5 680,15 Q700,25 720,15 Q740,5 760,15 Q780,25 800,15"
            fill="none"
            stroke="url(#mg-border)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Bottom scalloped border */}
        <svg
          viewBox="0 0 800 40"
          className="absolute bottom-0 left-0 w-full opacity-35"
          preserveAspectRatio="none"
          style={{ transform: "scaleY(-1)" }}
          aria-hidden="true"
        >
          <rect x="0" y="0" width="800" height="2.5" fill="url(#mg-border)" />
          <path
            d="M0,15 Q20,5 40,15 Q60,25 80,15 Q100,5 120,15 Q140,25 160,15 Q180,5 200,15 Q220,25 240,15 Q260,5 280,15 Q300,25 320,15 Q340,5 360,15 Q380,25 400,15 Q420,5 440,15 Q460,25 480,15 Q500,5 520,15 Q540,25 560,15 Q580,5 600,15 Q620,25 640,15 Q660,5 680,15 Q700,25 720,15 Q740,5 760,15 Q780,25 800,15"
            fill="none"
            stroke="url(#mg-border)"
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </BaseTemplate>
  );
}
