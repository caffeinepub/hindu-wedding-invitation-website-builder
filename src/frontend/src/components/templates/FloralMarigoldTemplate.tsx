import BaseTemplate, { type TemplateProps } from "./BaseTemplate";

export default function FloralMarigoldTemplate({
  invite,
  variant = "light",
}: TemplateProps) {
  const isDark = variant === "dark";
  const amber = isDark ? "#F4A832" : "#C0392B";
  const orange = "#E8731A";
  const yellow = "#FFD700";

  const heroStyle: React.CSSProperties = isDark
    ? {
        background:
          "linear-gradient(160deg, #2a1000 0%, #4a2000 50%, #2a1000 100%)",
      }
    : {
        background:
          "linear-gradient(160deg, #E8731A 0%, #F4A832 50%, #E8731A 100%)",
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: "#1a0800", color: "#FAF3E0" }
    : { background: "#FFFBF0", color: "#2a0a00" };

  // Marigold bloom helper: petals around center
  const bloomPetals = Array.from({ length: 12 }, (_, i) => i * 30);

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={amber}
      secondaryColor={orange}
      petalColors={["#F4A832", orange, yellow, "#FF6B35"]}
      sectionBg={isDark ? "#1a0800" : "#FFFBF0"}
      textColor={isDark ? "text-amber-50" : "text-[#2a0a00]"}
      rsvpBackground={
        isDark ? "rgba(130, 50, 5, 0.92)" : "rgba(130, 50, 5, 0.88)"
      }
    >
      {/* ── Floral Marigold unique SVG motifs ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
      >
        {/* Warm bloom-glow depth overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(244,168,50,0.10) 0%, rgba(192,57,43,0.20) 55%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Marigold garland — top border */}
        <svg
          viewBox="0 0 800 80"
          className="absolute top-0 left-0 w-full opacity-40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="fm-garland" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={orange} stopOpacity="0" />
              <stop offset="15%" stopColor={yellow} />
              <stop offset="50%" stopColor={orange} />
              <stop offset="85%" stopColor={yellow} />
              <stop offset="100%" stopColor={orange} stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Garland string */}
          <path
            d="M0,20 Q50,5 100,20 Q150,35 200,20 Q250,5 300,20 Q350,35 400,20 Q450,5 500,20 Q550,35 600,20 Q650,5 700,20 Q750,35 800,20"
            fill="none"
            stroke={yellow}
            strokeWidth="1.5"
            opacity="0.6"
          />
          {/* Marigold blooms along garland */}
          {[50, 150, 250, 350, 450, 550, 650, 750].map((x, i) => (
            <g
              key={`top-bloom-${x}`}
              transform={`translate(${x}, ${i % 2 === 0 ? 18 : 28})`}
            >
              {bloomPetals.slice(0, 8).map((angle) => (
                <ellipse
                  key={`top-petal-${x}-${angle}`}
                  cx="0"
                  cy="-10"
                  rx="4"
                  ry="8"
                  fill={angle % 60 === 0 ? yellow : orange}
                  transform={`rotate(${angle})`}
                  opacity="0.85"
                />
              ))}
              <circle cx="0" cy="0" r="5" fill={amber} opacity="0.9" />
            </g>
          ))}
          <rect x="0" y="0" width="800" height="2" fill="url(#fm-garland)" />
        </svg>

        {/* Marigold garland — bottom border */}
        <svg
          viewBox="0 0 800 80"
          className="absolute bottom-0 left-0 w-full opacity-40"
          preserveAspectRatio="none"
          style={{ transform: "scaleY(-1)" }}
          aria-hidden="true"
        >
          <path
            d="M0,20 Q50,5 100,20 Q150,35 200,20 Q250,5 300,20 Q350,35 400,20 Q450,5 500,20 Q550,35 600,20 Q650,5 700,20 Q750,35 800,20"
            fill="none"
            stroke={yellow}
            strokeWidth="1.5"
            opacity="0.6"
          />
          {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
            <g
              key={`bot-bloom-${x}`}
              transform={`translate(${x}, ${i % 2 === 0 ? 18 : 28})`}
            >
              {bloomPetals.slice(0, 8).map((angle) => (
                <ellipse
                  key={`bot-petal-${x}-${angle}`}
                  cx="0"
                  cy="-10"
                  rx="4"
                  ry="8"
                  fill={angle % 60 === 0 ? orange : yellow}
                  transform={`rotate(${angle})`}
                  opacity="0.85"
                />
              ))}
              <circle cx="0" cy="0" r="5" fill={amber} opacity="0.9" />
            </g>
          ))}
          <rect x="0" y="0" width="800" height="2" fill="url(#fm-garland)" />
        </svg>

        {/* Petal crown — above couple names (center top) */}
        <svg
          viewBox="0 0 300 120"
          className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-24 opacity-30"
          aria-hidden="true"
        >
          <g transform="translate(150,100)">
            {[-170, -150, -130, -110, -90, -70, -50, -30, -10].map(
              (angle, i) => (
                <g key={`crown-${angle}`} transform={`rotate(${angle})`}>
                  <ellipse
                    cx="0"
                    cy="-55"
                    rx="10"
                    ry="28"
                    fill={i % 2 === 0 ? yellow : orange}
                    opacity={0.7 + (i === 4 ? 0.2 : 0)}
                  />
                  <circle cx="0" cy="-82" r="3" fill={amber} opacity="0.8" />
                </g>
              ),
            )}
            <circle cx="0" cy="0" r="12" fill={orange} opacity="0.7" />
            <circle cx="0" cy="0" r="6" fill={yellow} opacity="0.9" />
          </g>
        </svg>

        {/* Scattered bloom accents — sides */}
        {[
          { x: 30, y: 200, scale: 0.7 },
          { x: 770, y: 180, scale: 0.6 },
          { x: 20, y: 380, scale: 0.5 },
          { x: 780, y: 360, scale: 0.65 },
        ].map((pos) => (
          <svg
            key={`accent-${pos.x}-${pos.y}`}
            viewBox="0 0 60 60"
            className="absolute opacity-20"
            style={{
              left: pos.x - 15,
              top: pos.y - 15,
              width: 40 * pos.scale,
              height: 40 * pos.scale,
            }}
            aria-hidden="true"
          >
            <g transform="translate(30,30)">
              {bloomPetals.slice(0, 6).map((angle) => (
                <ellipse
                  key={`accent-petal-${pos.x}-${angle}`}
                  cx="0"
                  cy="-14"
                  rx="5"
                  ry="10"
                  fill={angle % 60 === 0 ? yellow : orange}
                  transform={`rotate(${angle})`}
                  opacity="0.9"
                />
              ))}
              <circle cx="0" cy="0" r="6" fill={amber} opacity="0.9" />
            </g>
          </svg>
        ))}
      </div>
    </BaseTemplate>
  );
}
