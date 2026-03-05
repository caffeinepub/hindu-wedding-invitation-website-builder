import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { cn } from "../../lib/utils";

interface CountdownTimerProps {
  weddingDate: string;
  accentColor?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: Date): TimeLeft | null {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipUnit({
  value,
  label,
  accentColor,
}: { value: number; label: string; accentColor: string }) {
  const { reduceMotion } = useReducedMotion();
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "relative w-16 h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center text-3xl md:text-4xl font-bold font-cormorant",
          !reduceMotion && "transition-all duration-300",
        )}
        style={{
          background: `linear-gradient(135deg, ${accentColor}33, ${accentColor}11)`,
          border: `2px solid ${accentColor}66`,
          color: accentColor,
          textShadow: `0 0 20px ${accentColor}88`,
          boxShadow: `0 0 20px ${accentColor}22, inset 0 1px 0 ${accentColor}44`,
        }}
      >
        {display}
      </div>
      <span className="text-xs uppercase tracking-widest opacity-70 font-garamond">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({
  weddingDate,
  accentColor = "#D4AF37",
}: CountdownTimerProps) {
  const target = new Date(weddingDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calcTimeLeft(target),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(new Date(weddingDate)));
    }, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  if (!timeLeft) {
    return (
      <div
        className="text-center py-6 px-8 rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}11)`,
          border: `2px solid ${accentColor}66`,
        }}
      >
        <p
          className="text-2xl md:text-3xl font-cormorant font-bold tracking-wide"
          style={{ color: accentColor, textShadow: `0 0 30px ${accentColor}` }}
        >
          ✨ The celebration begins! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      <FlipUnit value={timeLeft.days} label="Days" accentColor={accentColor} />
      <span
        className="text-3xl font-bold opacity-50 mb-4"
        style={{ color: accentColor }}
      >
        :
      </span>
      <FlipUnit
        value={timeLeft.hours}
        label="Hours"
        accentColor={accentColor}
      />
      <span
        className="text-3xl font-bold opacity-50 mb-4"
        style={{ color: accentColor }}
      >
        :
      </span>
      <FlipUnit
        value={timeLeft.minutes}
        label="Minutes"
        accentColor={accentColor}
      />
      <span
        className="text-3xl font-bold opacity-50 mb-4"
        style={{ color: accentColor }}
      >
        :
      </span>
      <FlipUnit
        value={timeLeft.seconds}
        label="Seconds"
        accentColor={accentColor}
      />
    </div>
  );
}
