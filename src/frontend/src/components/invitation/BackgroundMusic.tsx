import { Music, Pause, Play } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface BackgroundMusicProps {
  musicUrl: string;
  accentColor?: string;
}

export default function BackgroundMusic({
  musicUrl,
  accentColor = "#D4AF37",
}: BackgroundMusicProps) {
  const { reduceMotion } = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const interactionListenerAdded = useRef(false);

  // Attempt to play audio; returns true if successful
  const tryPlay = useCallback(async (): Promise<boolean> => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  // On mount: attempt autoplay immediately
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;

    // Small delay to let the audio element load
    const timer = setTimeout(async () => {
      const success = await tryPlay();
      if (!success) {
        // Autoplay was blocked — set up a one-time interaction listener
        setAutoplayBlocked(true);
        if (!interactionListenerAdded.current) {
          interactionListenerAdded.current = true;
          const handleFirstInteraction = async () => {
            const played = await tryPlay();
            if (played) {
              document.removeEventListener("click", handleFirstInteraction);
              document.removeEventListener(
                "touchstart",
                handleFirstInteraction,
              );
              interactionListenerAdded.current = false;
            }
          };
          document.addEventListener("click", handleFirstInteraction, {
            passive: true,
          });
          document.addEventListener("touchstart", handleFirstInteraction, {
            passive: true,
          });
        }
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [musicUrl, tryPlay]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      tryPlay();
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="auto">
        <track kind="captions" />
      </audio>
      <button
        type="button"
        onClick={toggle}
        title={isPlaying ? "Pause music" : "Play music"}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
          border: `2px solid ${accentColor}`,
          color: "#1a0a00",
          animation: !reduceMotion && isPlaying ? "pulse 2s infinite" : "none",
        }}
      >
        {isPlaying ? <Pause size={18} /> : <Music size={18} />}
      </button>
      {autoplayBlocked && !isPlaying && (
        <div
          className="fixed bottom-20 right-6 z-50 text-xs px-3 py-1.5 rounded-full font-garamond opacity-80"
          style={{
            background: `${accentColor}33`,
            color: accentColor,
            border: `1px solid ${accentColor}44`,
          }}
        >
          Tap anywhere to play music
        </div>
      )}
    </>
  );
}
