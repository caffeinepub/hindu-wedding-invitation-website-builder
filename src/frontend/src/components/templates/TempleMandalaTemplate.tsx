import BaseTemplate, { type TemplateProps } from "./BaseTemplate";

export default function TempleMandalaTemplate({
  invite,
  variant = "light",
}: TemplateProps) {
  const isDark = variant === "dark";
  const accent = "#E8731A";
  const gold = "#D4AF37";

  const heroStyle: React.CSSProperties = isDark
    ? {
        background:
          "linear-gradient(160deg, #1a0800 0%, #3d1500 50%, #1a0800 100%)",
      }
    : {
        background:
          "linear-gradient(160deg, #8B4500 0%, #C0602B 50%, #8B4500 100%)",
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: "#0d0500", color: "#FAF3E0" }
    : { background: "#FFF8F0", color: "#2a0a00" };

  // Build mandala spokes helper
  const spokeAngles = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
  const cornerRings = [60, 48, 36, 24];
  const cornerPetals = [0, 45, 90, 135, 180, 225, 270, 315];
  const innerPetals = [0, 45, 90, 135, 180, 225, 270, 315];
  const borderCx = [
    12, 37, 62, 87, 112, 137, 162, 187, 212, 237, 262, 287, 312, 337, 362, 387,
    412, 437, 462, 487, 512, 537, 562, 587, 612, 637, 662, 687, 712, 737, 762,
    787,
  ];

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={accent}
      secondaryColor="#8B4500"
      petalColors={[accent, "#F4A832", "#C0602B", gold]}
      sectionBg={isDark ? "#0d0500" : "#FFF8F0"}
      textColor={isDark ? "text-amber-50" : "text-[#2a0a00]"}
      rsvpBackground={
        isDark ? "rgba(90, 40, 10, 0.92)" : "rgba(90, 40, 10, 0.90)"
      }
    >
      {/* ── Temple Mandala unique SVG motifs ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 5 }}
      >
        {/* Vignette depth overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Large primary mandala — center background */}
        <svg
          viewBox="0 0 500 500"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] opacity-15"
          aria-hidden="true"
        >
          <g transform="translate(250,250)">
            {/* Outer ring */}
            {[120, 105, 90, 75, 60, 45, 30].map((r, ri) => (
              <circle
                key={`main-ring-${r}`}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={ri % 2 === 0 ? gold : accent}
                strokeWidth={ri === 0 ? 1.5 : 0.8}
                opacity={0.9 - ri * 0.08}
              />
            ))}
            {/* 12-fold petal spokes */}
            {spokeAngles.map((angle) => (
              <g key={`spoke-${angle}`} transform={`rotate(${angle})`}>
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="-120"
                  stroke={gold}
                  strokeWidth="0.6"
                  opacity="0.5"
                />
                <ellipse
                  cx="0"
                  cy="-75"
                  rx="6"
                  ry="18"
                  fill={accent}
                  opacity="0.4"
                />
                <ellipse
                  cx="0"
                  cy="-50"
                  rx="4"
                  ry="12"
                  fill={gold}
                  opacity="0.5"
                />
                <circle cx="0" cy="-120" r="3" fill={gold} opacity="0.7" />
              </g>
            ))}
            {/* Inner lotus petals */}
            {innerPetals.map((angle) => (
              <ellipse
                key={`inner-petal-${angle}`}
                cx="0"
                cy="-22"
                rx="5"
                ry="14"
                fill={accent}
                transform={`rotate(${angle})`}
                opacity="0.6"
              />
            ))}
            <circle cx="0" cy="0" r="10" fill={gold} opacity="0.7" />
            <circle cx="0" cy="0" r="5" fill="#fff8dc" opacity="0.8" />
          </g>
        </svg>

        {/* Corner mandala — top-left */}
        <svg
          viewBox="0 0 200 200"
          className="absolute top-0 left-0 w-40 h-40 opacity-20"
          aria-hidden="true"
        >
          <g transform="translate(0,0)">
            {cornerRings.map((r) => (
              <circle
                key={`tl-ring-${r}`}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={r % 24 === 0 ? gold : accent}
                strokeWidth="0.8"
                opacity={0.8 - cornerRings.indexOf(r) * 0.1}
              />
            ))}
            {cornerPetals.map((angle) => (
              <g key={`tl-petal-${angle}`} transform={`rotate(${angle})`}>
                <ellipse
                  cx="0"
                  cy="-42"
                  rx="4"
                  ry="12"
                  fill={accent}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* Corner mandala — top-right */}
        <svg
          viewBox="0 0 200 200"
          className="absolute top-0 right-0 w-40 h-40 opacity-20"
          aria-hidden="true"
        >
          <g transform="translate(200,0)">
            {cornerRings.map((r) => (
              <circle
                key={`tr-ring-${r}`}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={r % 24 === 0 ? gold : accent}
                strokeWidth="0.8"
                opacity={0.8 - cornerRings.indexOf(r) * 0.1}
              />
            ))}
            {cornerPetals.map((angle) => (
              <g key={`tr-petal-${angle}`} transform={`rotate(${angle})`}>
                <ellipse
                  cx="0"
                  cy="-42"
                  rx="4"
                  ry="12"
                  fill={gold}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* Corner mandala — bottom-left */}
        <svg
          viewBox="0 0 200 200"
          className="absolute bottom-0 left-0 w-40 h-40 opacity-20"
          aria-hidden="true"
        >
          <g transform="translate(0,200)">
            {cornerRings.map((r) => (
              <circle
                key={`bl-ring-${r}`}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={r % 24 === 0 ? accent : gold}
                strokeWidth="0.8"
                opacity={0.8 - cornerRings.indexOf(r) * 0.1}
              />
            ))}
            {cornerPetals.map((angle) => (
              <g key={`bl-petal-${angle}`} transform={`rotate(${angle})`}>
                <ellipse
                  cx="0"
                  cy="-42"
                  rx="4"
                  ry="12"
                  fill={accent}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* Corner mandala — bottom-right */}
        <svg
          viewBox="0 0 200 200"
          className="absolute bottom-0 right-0 w-40 h-40 opacity-20"
          aria-hidden="true"
        >
          <g transform="translate(200,200)">
            {cornerRings.map((r) => (
              <circle
                key={`br-ring-${r}`}
                cx="0"
                cy="0"
                r={r}
                fill="none"
                stroke={r % 24 === 0 ? gold : accent}
                strokeWidth="0.8"
                opacity={0.8 - cornerRings.indexOf(r) * 0.1}
              />
            ))}
            {cornerPetals.map((angle) => (
              <g key={`br-petal-${angle}`} transform={`rotate(${angle})`}>
                <ellipse
                  cx="0"
                  cy="-42"
                  rx="4"
                  ry="12"
                  fill={gold}
                  opacity="0.5"
                />
              </g>
            ))}
          </g>
        </svg>

        {/* Top decorative border */}
        <svg
          viewBox="0 0 800 24"
          className="absolute top-0 left-0 w-full opacity-40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="tm-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={accent} stopOpacity="0" />
              <stop offset="25%" stopColor={gold} />
              <stop offset="50%" stopColor={accent} />
              <stop offset="75%" stopColor={gold} />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="3" fill="url(#tm-border)" />
          <rect
            x="0"
            y="7"
            width="800"
            height="1"
            fill="url(#tm-border)"
            opacity="0.5"
          />
          {borderCx.map((cx) => (
            <g key={`border-diamond-${cx}`} transform={`translate(${cx}, 14)`}>
              <path
                d="M0,-5 L5,0 L0,5 L-5,0 Z"
                fill="none"
                stroke={gold}
                strokeWidth="0.8"
                opacity="0.7"
              />
            </g>
          ))}
        </svg>

        {/* Bottom decorative border */}
        <svg
          viewBox="0 0 800 24"
          className="absolute bottom-0 left-0 w-full opacity-40"
          preserveAspectRatio="none"
          style={{ transform: "scaleY(-1)" }}
          aria-hidden="true"
        >
          <rect x="0" y="0" width="800" height="3" fill="url(#tm-border)" />
          <rect
            x="0"
            y="7"
            width="800"
            height="1"
            fill="url(#tm-border)"
            opacity="0.5"
          />
        </svg>
      </div>
    </BaseTemplate>
  );
}
