import BaseTemplate, { type TemplateProps } from "./BaseTemplate";

export default function RoyalNavyZariTemplate({
  invite,
  variant = "light",
}: TemplateProps) {
  const isDark = variant === "dark";

  const heroStyle: React.CSSProperties = isDark
    ? {
        background:
          "linear-gradient(160deg, #050d1a 0%, #0d2149 50%, #050d1a 100%)",
      }
    : {
        background:
          "linear-gradient(160deg, #0d2149 0%, #1a3a7a 50%, #0d2149 100%)",
      };

  const bodyStyle: React.CSSProperties = isDark
    ? { background: "#030810", color: "#f5e6c8" }
    : { background: "#f0f4ff", color: "#0d1a3a" };

  const goldColor = isDark ? "#ffd700" : "#c9a84c";
  const navyColor = isDark ? "#0a1628" : "#0d2149";

  return (
    <BaseTemplate
      invite={invite}
      variant={variant}
      heroStyle={heroStyle}
      bodyStyle={bodyStyle}
      accentColor={goldColor}
      secondaryColor={isDark ? "#c0c0c0" : "#a0a0c0"}
      petalColors={[goldColor, "#c0c0c0", "#fffacd", "#b8860b"]}
      sectionBg={isDark ? "#030810" : "#f0f4ff"}
      textColor={isDark ? "text-amber-50" : "text-[#0d1a3a]"}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Zari border - top */}
        <svg
          viewBox="0 0 800 80"
          className="absolute top-0 left-0 w-full opacity-40"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rnz-gold" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={goldColor} stopOpacity="0" />
              <stop offset="15%" stopColor={goldColor} />
              <stop offset="50%" stopColor="#fffacd" />
              <stop offset="85%" stopColor={goldColor} />
              <stop offset="100%" stopColor={goldColor} stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="0" y="2" width="800" height="2.5" fill="url(#rnz-gold)" />
          <rect
            x="0"
            y="10"
            width="800"
            height="1"
            fill="url(#rnz-gold)"
            opacity="0.6"
          />
          <rect
            x="0"
            y="18"
            width="800"
            height="1.5"
            fill="url(#rnz-gold)"
            opacity="0.4"
          />
          {[
            0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
            300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540,
            560, 580, 600, 620, 640, 660, 680, 700, 720, 740, 760, 780,
          ].map((cx) => (
            <g key={`top-zari-${cx}`} transform={`translate(${cx}, 5)`}>
              <circle
                cx="10"
                cy="6"
                r="3"
                stroke={goldColor}
                strokeWidth="1"
                fill="none"
                opacity="0.8"
              />
              <line
                x1="0"
                y1="6"
                x2="7"
                y2="6"
                stroke={goldColor}
                strokeWidth="0.8"
                opacity="0.6"
              />
              <line
                x1="13"
                y1="6"
                x2="20"
                y2="6"
                stroke={goldColor}
                strokeWidth="0.8"
                opacity="0.6"
              />
            </g>
          ))}
          {[100, 300, 500, 700].map((x) => (
            <g key={`top-motif-${x}`} transform={`translate(${x}, 30)`}>
              <path
                d="M0,0 Q10,-20 20,-10 Q25,0 15,10 Q5,15 0,0 Z"
                stroke={goldColor}
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />
              <circle cx="10" cy="-5" r="2" fill={goldColor} opacity="0.6" />
            </g>
          ))}
        </svg>

        {/* Zari border - bottom */}
        <svg
          viewBox="0 0 800 80"
          className="absolute bottom-0 left-0 w-full opacity-40"
          preserveAspectRatio="none"
          style={{ transform: "scaleY(-1)" }}
          aria-hidden="true"
        >
          <rect x="0" y="2" width="800" height="2.5" fill="url(#rnz-gold)" />
          <rect
            x="0"
            y="10"
            width="800"
            height="1"
            fill="url(#rnz-gold)"
            opacity="0.6"
          />
          {[
            0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280,
            300, 320, 340, 360, 380, 400, 420, 440, 460, 480, 500, 520, 540,
            560, 580, 600, 620, 640, 660, 680, 700, 720, 740, 760, 780,
          ].map((cx) => (
            <g key={`bot-zari-${cx}`} transform={`translate(${cx}, 5)`}>
              <circle
                cx="10"
                cy="6"
                r="3"
                stroke={goldColor}
                strokeWidth="1"
                fill="none"
                opacity="0.8"
              />
              <line
                x1="0"
                y1="6"
                x2="7"
                y2="6"
                stroke={goldColor}
                strokeWidth="0.8"
                opacity="0.6"
              />
              <line
                x1="13"
                y1="6"
                x2="20"
                y2="6"
                stroke={goldColor}
                strokeWidth="0.8"
                opacity="0.6"
              />
            </g>
          ))}
        </svg>

        {/* Regal Crest - center top */}
        <svg
          viewBox="0 0 160 120"
          className="absolute top-6 left-1/2 -translate-x-1/2 w-40 opacity-25"
          aria-hidden="true"
        >
          <g transform="translate(80,60)">
            <path
              d="M-40,20 L-40,-10 L-25,-30 L0,-15 L25,-30 L40,-10 L40,20 Z"
              stroke={goldColor}
              strokeWidth="1.5"
              fill={navyColor}
              opacity="0.8"
            />
            <circle cx="-25" cy="-32" r="4" fill={goldColor} opacity="0.9" />
            <circle cx="0" cy="-17" r="4" fill={goldColor} opacity="0.9" />
            <circle cx="25" cy="-32" r="4" fill={goldColor} opacity="0.9" />
            <path
              d="M-25,20 L-25,45 Q0,60 25,45 L25,20 Z"
              stroke={goldColor}
              strokeWidth="1.2"
              fill="none"
              opacity="0.7"
            />
            <line
              x1="-20"
              y1="30"
              x2="20"
              y2="50"
              stroke={goldColor}
              strokeWidth="1"
              opacity="0.6"
            />
            <line
              x1="20"
              y1="30"
              x2="-20"
              y2="50"
              stroke={goldColor}
              strokeWidth="1"
              opacity="0.6"
            />
            {([-1, 1] as const).map((side) =>
              [0, 1, 2, 3, 4].map((i) => (
                <ellipse
                  key={`feather-${side}-${i}`}
                  cx={side * (35 + i * 5)}
                  cy={10 - i * 8}
                  rx="5"
                  ry="3"
                  fill={goldColor}
                  transform={`rotate(${side * (20 + i * 15)}, ${side * (35 + i * 5)}, ${10 - i * 8})`}
                  opacity="0.6"
                />
              )),
            )}
          </g>
        </svg>

        {/* Side zari columns */}
        <svg
          viewBox="0 0 30 400"
          className="absolute top-0 left-0 h-full w-8 opacity-30"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect
            x="2"
            y="0"
            width="2"
            height="400"
            fill={goldColor}
            opacity="0.8"
          />
          <rect
            x="8"
            y="0"
            width="1"
            height="400"
            fill={goldColor}
            opacity="0.4"
          />
          {[
            10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270,
            290, 310, 330, 350, 370, 390,
          ].map((cy) => (
            <circle
              key={`left-col-${cy}`}
              cx="3"
              cy={cy}
              r="3"
              stroke={goldColor}
              strokeWidth="0.8"
              fill="none"
              opacity="0.7"
            />
          ))}
        </svg>
        <svg
          viewBox="0 0 30 400"
          className="absolute top-0 right-0 h-full w-8 opacity-30"
          preserveAspectRatio="none"
          style={{ transform: "scaleX(-1)" }}
          aria-hidden="true"
        >
          <rect
            x="2"
            y="0"
            width="2"
            height="400"
            fill={goldColor}
            opacity="0.8"
          />
          <rect
            x="8"
            y="0"
            width="1"
            height="400"
            fill={goldColor}
            opacity="0.4"
          />
          {[
            10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270,
            290, 310, 330, 350, 370, 390,
          ].map((cy) => (
            <circle
              key={`right-col-${cy}`}
              cx="3"
              cy={cy}
              r="3"
              stroke={goldColor}
              strokeWidth="0.8"
              fill="none"
              opacity="0.7"
            />
          ))}
        </svg>
      </div>
    </BaseTemplate>
  );
}
