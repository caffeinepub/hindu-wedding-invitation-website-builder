import { ReactNode, useState, useEffect, useRef } from 'react';
import CountdownTimer from '../invitation/CountdownTimer';
import EventsTimeline from '../invitation/EventsTimeline';
import RSVPForm from '../invitation/RSVPForm';
import BackgroundMusic from '../invitation/BackgroundMusic';
import FloatingPhotoFrame from '../effects/FloatingPhotoFrame';
import DriftingPetals from '../effects/DriftingPetals';
import MouseTiltHero from '../effects/MouseTiltHero';
import ShareSection from '../invitation/ShareSection';
import type { InviteRecord, ExternalBlob } from '../../backend';

export interface TemplateProps {
  invite: InviteRecord;
  variant?: 'light' | 'dark';
}

interface BaseTemplateProps extends TemplateProps {
  heroStyle: React.CSSProperties;
  bodyStyle: React.CSSProperties;
  accentColor: string;
  secondaryColor: string;
  petalColors?: string[];
  children?: ReactNode;
  sectionBg?: string;
  textColor?: string;
}

function getBlobUrl(blob: ExternalBlob | string | null | undefined, fallback: string): string {
  if (!blob) return fallback;
  if (typeof blob === 'string') {
    return blob || fallback;
  }
  try {
    const url = blob.getDirectURL();
    return url || fallback;
  } catch {
    return fallback;
  }
}

function isValidGalleryBlob(blob: ExternalBlob | string | null | undefined): boolean {
  if (!blob) return false;
  if (typeof blob === 'string') {
    return !!blob && !blob.includes('gallery');
  }
  try {
    const url = blob.getDirectURL();
    return !!url && !url.includes('gallery');
  } catch {
    return false;
  }
}

// Deferred section: only renders when near the viewport
function DeferredSection({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? children : <div style={{ minHeight: '200px' }} />}
    </div>
  );
}

export default function BaseTemplate({
  invite,
  variant = 'light',
  heroStyle,
  bodyStyle,
  accentColor,
  secondaryColor,
  petalColors,
  children,
  sectionBg,
  textColor,
}: BaseTemplateProps) {
  const isDark = variant === 'dark';
  const textClass = textColor || (isDark ? 'text-white' : 'text-[#2a0a00]');
  const sectionStyle: React.CSSProperties = sectionBg ? { background: sectionBg } : {};

  const getCustomText = (key: string, fallback: string) => {
    const entry = invite.customTextFields?.find(([k]) => k === key);
    return entry ? entry[1] : fallback;
  };

  const thankYouText = getCustomText('thankYouText', 'Your RSVP has been received. We look forward to celebrating with you!');

  const bridePhotoUrl = getBlobUrl(
    invite.bridePhoto,
    '/assets/generated/placeholder-bride.dim_600x800.png'
  );
  const groomPhotoUrl = getBlobUrl(
    invite.groomPhoto,
    '/assets/generated/placeholder-groom.dim_600x800.png'
  );

  // Use placeholder if the URL is a sample placeholder
  const bridePhoto = bridePhotoUrl.includes('xoko') || !bridePhotoUrl
    ? '/assets/generated/placeholder-bride.dim_600x800.png'
    : bridePhotoUrl;

  const groomPhoto = groomPhotoUrl.includes('xoko') || !groomPhotoUrl
    ? '/assets/generated/placeholder-groom.dim_600x800.png'
    : groomPhotoUrl;

  // Show background music if it's a data URL (base64) or an http URL
  const musicSrc = invite.backgroundMusic && (
    invite.backgroundMusic.startsWith('data:') || invite.backgroundMusic.startsWith('http')
  ) ? invite.backgroundMusic : null;

  const galleryImages = (invite.galleryImages || []).filter(isValidGalleryBlob);

  // Build the invitation URL for sharing
  const inviteUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/invite/${invite.id}`
    : `/invite/${invite.id}`;

  return (
    <div className={`min-h-screen w-full ${textClass}`} style={bodyStyle}>
      {petalColors && <DriftingPetals colors={petalColors} />}
      {musicSrc && (
        <BackgroundMusic musicUrl={musicSrc} accentColor={accentColor} />
      )}

      {/* Hero — renders immediately, no deferral */}
      <MouseTiltHero className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={heroStyle}>
        {/* Mandala divider top */}
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{ backgroundImage: 'url(/assets/generated/mandala-divider.dim_1200x120.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4 }} />

        <div className="relative z-20 text-center px-6 py-20">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 font-garamond opacity-70" style={{ color: accentColor }}>
            ॐ शुभ विवाह ॐ
          </p>
          <h1 className="text-5xl md:text-7xl font-cormorant font-bold mb-4 leading-tight" style={{ color: accentColor, textShadow: `0 2px 30px ${accentColor}44` }}>
            {invite.coupleNames}
          </h1>
          <div className="w-32 h-px mx-auto mb-6" style={{ background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }} />
          <p className="text-lg md:text-xl font-garamond opacity-80 mb-8">
            {invite.weddingDate ? new Date(invite.weddingDate).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''}
          </p>

          {/* Countdown */}
          {invite.weddingDate && (
            <div className="mt-6">
              <CountdownTimer weddingDate={invite.weddingDate} accentColor={accentColor} />
            </div>
          )}
        </div>

        {/* Bottom mandala */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{ backgroundImage: 'url(/assets/generated/mandala-divider.dim_1200x120.png)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.4, transform: 'scaleY(-1)' }} />
      </MouseTiltHero>

      {/* Couple Photos — renders immediately as it's above the fold */}
      <section className="py-20 px-6" style={sectionStyle}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold" style={{ color: accentColor }}>The Couple</h2>
            <div className="w-24 h-px mx-auto mt-3" style={{ background: accentColor }} />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
            <div className="text-center">
              <FloatingPhotoFrame
                src={bridePhoto}
                alt="Bride"
                className="w-48 h-64 md:w-56 md:h-72 mx-auto mb-4"
                accentColor={accentColor}
              />
              <p className="text-xl font-cormorant font-semibold" style={{ color: accentColor }}>
                {invite.coupleNames?.split(' & ')[0] || 'Bride'}
              </p>
            </div>
            <div className="text-4xl font-cormorant" style={{ color: accentColor }}>❤</div>
            <div className="text-center">
              <FloatingPhotoFrame
                src={groomPhoto}
                alt="Groom"
                className="w-48 h-64 md:w-56 md:h-72 mx-auto mb-4"
                accentColor={accentColor}
              />
              <p className="text-xl font-cormorant font-semibold" style={{ color: accentColor }}>
                {invite.coupleNames?.split(' & ')[1] || 'Groom'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {children}

      {/* Events — deferred until near viewport */}
      {invite.events && invite.events.length > 0 && (
        <DeferredSection>
          <section className="py-20 px-6" style={sectionStyle}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-cormorant font-bold" style={{ color: accentColor }}>Wedding Events</h2>
                <div className="w-24 h-px mx-auto mt-3" style={{ background: accentColor }} />
              </div>
              <EventsTimeline events={invite.events} accentColor={accentColor} dark={isDark} />
            </div>
          </section>
        </DeferredSection>
      )}

      {/* Gallery — deferred until near viewport */}
      {galleryImages.length > 0 && (
        <DeferredSection>
          <section className="py-20 px-6" style={sectionStyle}>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-cormorant font-bold" style={{ color: accentColor }}>Gallery</h2>
                <div className="w-24 h-px mx-auto mt-3" style={{ background: accentColor }} />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.map((blobOrUrl, i) => {
                  const imgUrl = typeof blobOrUrl === 'string'
                    ? blobOrUrl
                    : blobOrUrl.getDirectURL();
                  return (
                    <div key={i} className="aspect-square overflow-hidden rounded-xl">
                      <img
                        src={imgUrl}
                        alt={`Gallery ${i + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </DeferredSection>
      )}

      {/* RSVP — deferred until near viewport */}
      <DeferredSection>
        <section className="py-20 px-6" style={sectionStyle}>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold" style={{ color: accentColor }}>RSVP</h2>
              <div className="w-24 h-px mx-auto mt-3" style={{ background: accentColor }} />
              <p className="mt-4 font-garamond opacity-70">Kindly respond by the wedding date</p>
            </div>
            <RSVPForm inviteId={invite.id} thankYouText={thankYouText} accentColor={accentColor} dark={isDark} />
          </div>
        </section>
      </DeferredSection>

      {/* Share Section — deferred until near viewport */}
      <DeferredSection>
        <section className="py-16 px-6" style={sectionStyle}>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold" style={{ color: accentColor }}>Share the Joy</h2>
              <div className="w-24 h-px mx-auto mt-3" style={{ background: accentColor }} />
              <p className="mt-4 font-garamond opacity-70 text-sm">Spread the love — share this invitation</p>
            </div>
            <ShareSection
              url={inviteUrl}
              accentColor={accentColor}
              coupleNames={invite.coupleNames}
              weddingDate={invite.weddingDate}
            />
          </div>
        </section>
      </DeferredSection>

      {/* Footer */}
      <footer className="py-8 text-center border-t" style={{ borderColor: accentColor + '33' }}>
        <p className="font-garamond opacity-50 text-sm">
          Built with ❤ using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
