import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface BackgroundMusicProps {
  musicUrl: string;
  accentColor?: string;
}

export default function BackgroundMusic({ musicUrl, accentColor = '#D4AF37' }: BackgroundMusicProps) {
  const { reduceMotion } = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleInteraction = () => setCanPlay(true);
    document.addEventListener('click', handleInteraction, { once: true });
    document.addEventListener('touchstart', handleInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current || !canPlay) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} loop preload="none" />
      <button
        onClick={toggle}
        title={isPlaying ? 'Pause music' : 'Play music'}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95"
        style={{
          background: `linear-gradient(135deg, ${accentColor}, ${accentColor}aa)`,
          border: `2px solid ${accentColor}`,
          color: '#1a0a00',
          animation: !reduceMotion && isPlaying ? 'pulse 2s infinite' : 'none',
        }}
      >
        {isPlaying ? <Pause size={18} /> : <Music size={18} />}
      </button>
      {!canPlay && (
        <div
          className="fixed bottom-20 right-6 z-50 text-xs px-3 py-1.5 rounded-full font-garamond opacity-80"
          style={{ background: accentColor + '33', color: accentColor, border: `1px solid ${accentColor}44` }}
        >
          Tap anywhere to enable music
        </div>
      )}
    </>
  );
}
