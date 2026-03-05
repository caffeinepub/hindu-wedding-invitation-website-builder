import BaseTemplate, { type TemplateProps } from "./BaseTemplate";

export default function LotusBloomTemplate({
  invite,
  variant = "light",
}: TemplateProps) {
  const isDark = variant === "dark";

  const heroStyle: React.CSSProperties = isDark
    ? {
        background:
          "linear-gradient(160deg, #1a0a14 0%, #3a1a2a 50%, #1a0a14 100%)",
      }
    : {
        background:
          "linear-gradient(160deg, #f0c0d0 0%, #e8a0b8 50%, #f0c0d0 100%)",
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: "#0d0509", color: "#f5e6c8" }
    : { background: "#fff5f8", color: "#2a0a14" };

  const petalColor = isDark ? "#c06080" : "#e8a0b0";
  const petalDark = isDark ? "#8b3a52" : "#c06080";
  const centerColor = isDark ? "#ffd700" : "#f5c842";
  const waterColor = isDark ? "#1a3a4a" : "#b0d8e8";
  const accentColor = isDark ? "#e8a0b0" : "#c06080";

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={accentColor}
      secondaryColor={centerColor}
      petalColors={[petalColor, petalDark, centerColor, "#ffb6c1"]}
      sectionBg={isDark ? "#0d0509" : "#fff5f8"}
      textColor={isDark ? "text-pink-50" : "text-[#2a0a14]"}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Water ripple background - bottom */}
        <svg
          viewBox="0 0 800 200"
          className="absolute bottom-0 left-0 w-full opacity-20"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((i) => (
            <ellipse
              key={i}
              cx="400"
              cy={200 + i * 20}
              rx={300 + i * 80}
              ry={30 + i * 15}
              stroke={waterColor}
              strokeWidth="1.5"
              fill="none"
              opacity={0.8 - i * 0.15}
            />
          ))}
        </svg>

        {/* Large lotus - center top */}
        <svg
          viewBox="0 0 300 200"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-48 opacity-25"
          aria-hidden="true"
        >
          <g transform="translate(150,160)">
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse
                key={`outer-rot-${i * 45}`}
                cx="0"
                cy="-70"
                rx="18"
                ry="40"
                fill={petalColor}
                transform={`rotate(${i * 45})`}
                opacity="0.7"
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <ellipse
                key={`mid-rot-${i * 45}`}
                cx="0"
                cy="-50"
                rx="14"
                ry="30"
                fill={petalDark}
                transform={`rotate(${i * 45 + 22.5})`}
                opacity="0.8"
              />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <ellipse
                key={`inner-rot-${i * 60}`}
                cx="0"
                cy="-30"
                rx="10"
                ry="20"
                fill={petalColor}
                transform={`rotate(${i * 60})`}
                opacity="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="18" fill={centerColor} opacity="0.9" />
            <circle
              cx="0"
              cy="0"
              r="10"
              fill={isDark ? "#fff8dc" : "#fffacd"}
              opacity="0.8"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <line
                key={`stamen-${deg}`}
                x1="0"
                y1="0"
                x2={Math.cos((deg * Math.PI) / 180) * 14}
                y2={Math.sin((deg * Math.PI) / 180) * 14}
                stroke={centerColor}
                strokeWidth="1"
                opacity="0.7"
              />
            ))}
          </g>
        </svg>

        {/* Small lotus - bottom left */}
        <svg
          viewBox="0 0 150 120"
          className="absolute bottom-8 left-8 w-32 h-24 opacity-20"
          aria-hidden="true"
        >
          <g transform="translate(75,90)">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={`bl-petal-${deg}`}
                cx="0"
                cy="-35"
                rx="10"
                ry="22"
                fill={petalColor}
                transform={`rotate(${deg})`}
                opacity="0.8"
              />
            ))}
            <circle cx="0" cy="0" r="10" fill={centerColor} opacity="0.9" />
          </g>
        </svg>

        {/* Small lotus - bottom right */}
        <svg
          viewBox="0 0 150 120"
          className="absolute bottom-8 right-8 w-32 h-24 opacity-20"
          aria-hidden="true"
        >
          <g transform="translate(75,90)">
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <ellipse
                key={`br-petal-${deg}`}
                cx="0"
                cy="-35"
                rx="10"
                ry="22"
                fill={petalDark}
                transform={`rotate(${deg + 30})`}
                opacity="0.8"
              />
            ))}
            <circle cx="0" cy="0" r="10" fill={centerColor} opacity="0.9" />
          </g>
        </svg>

        {/* Decorative border - top */}
        <svg
          viewBox="0 0 800 20"
          className="absolute top-0 left-0 w-full opacity-30"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lb-border" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={petalColor} stopOpacity="0" />
              <stop offset="30%" stopColor={petalColor} />
              <stop offset="50%" stopColor={centerColor} />
              <stop offset="70%" stopColor={petalColor} />
              <stop offset="100%" stopColor={petalColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="800" height="3" fill="url(#lb-border)" />
          <rect
            x="0"
            y="7"
            width="800"
            height="1.5"
            fill="url(#lb-border)"
            opacity="0.5"
          />
        </svg>
        <svg
          viewBox="0 0 800 20"
          className="absolute bottom-0 left-0 w-full opacity-30"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="800" height="3" fill="url(#lb-border)" />
          <rect
            x="0"
            y="7"
            width="800"
            height="1.5"
            fill="url(#lb-border)"
            opacity="0.5"
          />
        </svg>
      </div>
    </BaseTemplate>
  );
}
