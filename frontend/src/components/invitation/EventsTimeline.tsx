import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Calendar, ExternalLink } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import GlassmorphismCard from '../effects/GlassmorphismCard';
import { formatDateTime } from '../../lib/utils';
import type { ScheduleItem } from '../../backend';

interface EventsTimelineProps {
  events: ScheduleItem[];
  accentColor?: string;
  dark?: boolean;
}

function EventCard({
  event,
  index,
  accentColor,
  dark,
}: {
  event: ScheduleItem;
  index: number;
  accentColor: string;
  dark: boolean;
}) {
  const { reduceMotion } = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion) { setVisible(true); return; }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-12 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: reduceMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
        transitionDelay: reduceMotion ? '0ms' : `${index * 100}ms`,
      }}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full z-10 hidden md:block"
        style={{ background: accentColor, boxShadow: `0 0 12px ${accentColor}` }}
      />

      <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}>
        <GlassmorphismCard dark={dark} className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full" style={{ background: accentColor }} />
            <h3 className="text-xl font-cormorant font-bold" style={{ color: accentColor }}>
              {event.name}
            </h3>
          </div>

          {event.time && (
            <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
              <Clock size={14} />
              <span className="font-garamond">{event.time}</span>
            </div>
          )}

          {event.venue && (
            <div className="flex items-center gap-2 text-sm opacity-80 mb-1">
              <MapPin size={14} />
              <span className="font-garamond font-semibold">{event.venue}</span>
            </div>
          )}

          {event.details && (
            <p className="text-sm opacity-70 font-garamond mt-2">{event.details}</p>
          )}

          {event.details && event.details.startsWith('http') && (
            <a
              href={event.details}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-xs px-3 py-1.5 rounded-full font-medium transition-opacity hover:opacity-80"
              style={{ background: accentColor + '33', color: accentColor, border: `1px solid ${accentColor}66` }}
            >
              <ExternalLink size={12} />
              Open in Maps
            </a>
          )}
        </GlassmorphismCard>
      </div>
    </div>
  );
}

export default function EventsTimeline({ events, accentColor = '#D4AF37', dark = false }: EventsTimelineProps) {
  if (!events || events.length === 0) return null;

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block"
        style={{ background: `linear-gradient(to bottom, transparent, ${accentColor}66, transparent)` }}
      />
      {events.map((event, i) => (
        <EventCard key={i} event={event} index={i} accentColor={accentColor} dark={dark} />
      ))}
    </div>
  );
}
