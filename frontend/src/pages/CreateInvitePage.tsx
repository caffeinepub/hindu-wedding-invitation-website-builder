import { useState, useEffect } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import AppLayout from '../components/layout/AppLayout';
import StepTemplateSelector from '../components/creator/StepTemplateSelector';
import StepCoupleDetails from '../components/creator/StepCoupleDetails';
import StepPhotoUpload from '../components/creator/StepPhotoUpload';
import StepEvents from '../components/creator/StepEvents';
import StepGalleryMusic, { type GalleryItem } from '../components/creator/StepGalleryMusic';
import StepPublish from '../components/creator/StepPublish';
import { ChevronLeft, ChevronRight, Check, Lock, LogIn, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../lib/utils';
import { ExternalBlob } from '../backend';
import type { InvitePayload, ScheduleItem } from '../backend';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetInvite } from '../hooks/useQueries';

interface CoupleDetails {
  brideName: string;
  groomName: string;
  weddingDate: string;
  tagline: string;
}

interface FormState {
  templateId: string;
  themeVariant: 'light' | 'dark';
  couple: CoupleDetails;
  bridePhoto: ExternalBlob | null;
  groomPhoto: ExternalBlob | null;
  coverPhoto: ExternalBlob | null;
  events: ScheduleItem[];
  galleryItems: GalleryItem[];
  musicUrl: string;
}

const STEPS = [
  { label: 'Template', icon: '🎨' },
  { label: 'Details', icon: '💑' },
  { label: 'Photos', icon: '📸' },
  { label: 'Events', icon: '📅' },
  { label: 'Gallery', icon: '🖼️' },
  { label: 'Publish', icon: '🚀' },
];

// Empty blob used as a placeholder when no photo is selected
const EMPTY_BLOB = ExternalBlob.fromURL('');

export default function CreateInvitePage() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  // Read optional editId from URL search params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const search = useSearch({ from: '/create' }) as any;
  const editId: string | undefined = search?.editId;

  const [step, setStep] = useState(0);
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const [form, setForm] = useState<FormState>({
    templateId: 'royal-rajasthani',
    themeVariant: 'light',
    couple: { brideName: '', groomName: '', weddingDate: '', tagline: '' },
    bridePhoto: null,
    groomPhoto: null,
    coverPhoto: null,
    events: [],
    galleryItems: [],
    musicUrl: '',
  });

  // Fetch existing invite when editing
  const { data: existingInvite, isLoading: isLoadingInvite } = useGetInvite(editId ?? '');

  // Pre-populate form state from fetched invite data
  useEffect(() => {
    if (!editId) return;
    if (dataLoaded) return;
    if (isLoadingInvite) return;
    if (!existingInvite) return;

    // Parse couple names — stored as "Bride & Groom"
    const parts = existingInvite.coupleNames.split(' & ');
    const brideName = parts[0]?.trim() ?? '';
    const groomName = parts[1]?.trim() ?? '';

    // Extract tagline from customTextFields
    const customFields: Record<string, string> = Object.fromEntries(existingInvite.customTextFields);
    const tagline = customFields['tagline'] ?? '';

    // Gallery items — wrap existing ExternalBlobs into GalleryItem shape
    const loadedGallery: GalleryItem[] = existingInvite.galleryImages.map((blob) => ({
      blob,
      previewUrl: blob.getDirectURL(),
      uploading: false,
      progress: 100,
    }));

    setForm({
      templateId: existingInvite.templateId,
      themeVariant: (existingInvite.themeVariant as 'light' | 'dark') || 'light',
      couple: {
        brideName,
        groomName,
        weddingDate: existingInvite.weddingDate,
        tagline,
      },
      bridePhoto: existingInvite.bridePhoto,
      groomPhoto: existingInvite.groomPhoto,
      coverPhoto: existingInvite.coverPhoto,
      events: existingInvite.events,
      galleryItems: loadedGallery,
      musicUrl: existingInvite.backgroundMusic ?? '',
    });

    setDataLoaded(true);
  }, [editId, existingInvite, isLoadingInvite, dataLoaded]);

  // ─── AUTH GUARD ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gold/50" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-gold mb-3 tracking-wide">
              Sign In Required
            </h2>
            <p className="font-raleway text-foreground/60 text-sm leading-relaxed mb-8">
              Please sign in to create or edit wedding invitations. Your invitations will be saved to your account.
            </p>
            <button
              onClick={() => login()}
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-semibold hover:opacity-90 transition-all font-raleway text-sm tracking-wide shadow-lg disabled:opacity-60 mx-auto"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? 'Signing in...' : 'Sign In to Continue'}
            </button>
            <button
              onClick={() => navigate({ to: '/' })}
              className="mt-4 font-raleway text-sm text-foreground/40 hover:text-foreground/60 transition-colors block mx-auto"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // ─── LOADING EXISTING INVITE ─────────────────────────────────────────────
  if (editId && isLoadingInvite && !dataLoaded) {
    return (
      <AppLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center">
            <Loader2 className="w-10 h-10 text-gold animate-spin mx-auto mb-4" />
            <p className="font-raleway text-foreground/60 text-sm">Loading your invitation...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.couple.brideName.trim()) errs.brideName = "Bride's name is required";
      if (!form.couple.groomName.trim()) errs.groomName = "Groom's name is required";
      if (!form.couple.weddingDate) errs.weddingDate = 'Wedding date is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const buildPayload = (): InvitePayload => {
    const readyGalleryBlobs = form.galleryItems
      .filter((item) => !item.uploading)
      .map((item) => item.blob);

    return {
      templateId: form.templateId,
      coupleNames: `${form.couple.brideName} & ${form.couple.groomName}`,
      weddingDate: form.couple.weddingDate,
      coverPhoto: form.coverPhoto ?? EMPTY_BLOB,
      bridePhoto: form.bridePhoto ?? EMPTY_BLOB,
      groomPhoto: form.groomPhoto ?? EMPTY_BLOB,
      galleryImages: readyGalleryBlobs,
      backgroundMusic: form.musicUrl,
      events: form.events,
      customTextFields: form.couple.tagline ? [['tagline', form.couple.tagline]] : [],
      sectionsConfig: [],
      themeVariant: form.themeVariant,
    };
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-deepMaroon">
        {/* Progress bar */}
        <div className="sticky top-16 z-30 bg-deepMaroon/95 backdrop-blur-md border-b border-gold/10">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-1">
              {STEPS.map((s, i) => (
                <div key={i} className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => i < step && setStep(i)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-garamond transition-all',
                      i === step
                        ? 'bg-gold text-deepMaroon font-semibold'
                        : i < step
                        ? 'bg-gold/20 text-gold cursor-pointer hover:bg-gold/30'
                        : 'bg-white/5 text-ivory/30 cursor-default'
                    )}
                  >
                    {i < step ? <Check size={10} /> : <span>{s.icon}</span>}
                    <span className="hidden sm:inline">{s.label}</span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <div className={cn('w-4 h-px', i < step ? 'bg-gold/40' : 'bg-white/10')} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step content */}
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white/3 border border-white/8 rounded-3xl p-6 md:p-10 min-h-[500px]">
            {step === 0 && (
              <StepTemplateSelector
                selectedId={form.templateId}
                selectedVariant={form.themeVariant}
                onSelect={(id) => setForm((f) => ({ ...f, templateId: id }))}
                onVariantChange={(v) => setForm((f) => ({ ...f, themeVariant: v }))}
              />
            )}
            {step === 1 && (
              <StepCoupleDetails
                data={form.couple}
                onChange={(couple) => setForm((f) => ({ ...f, couple }))}
                errors={errors}
              />
            )}
            {step === 2 && (
              <StepPhotoUpload
                bridePhoto={form.bridePhoto}
                groomPhoto={form.groomPhoto}
                coverPhoto={form.coverPhoto}
                onBrideUpload={(blob) => setForm((f) => ({ ...f, bridePhoto: blob }))}
                onGroomUpload={(blob) => setForm((f) => ({ ...f, groomPhoto: blob }))}
                onCoverUpload={(blob) => setForm((f) => ({ ...f, coverPhoto: blob }))}
              />
            )}
            {step === 3 && (
              <StepEvents
                events={form.events}
                onChange={(events) => setForm((f) => ({ ...f, events }))}
              />
            )}
            {step === 4 && (
              <StepGalleryMusic
                galleryItems={form.galleryItems}
                musicUrl={form.musicUrl}
                onGalleryChange={(items) => setForm((f) => ({ ...f, galleryItems: items }))}
                onMusicChange={(url) => setForm((f) => ({ ...f, musicUrl: url }))}
              />
            )}
            {step === 5 && (
              <StepPublish
                payload={buildPayload()}
                onPublished={(id) => setPublishedId(id)}
              />
            )}
          </div>

          {/* Navigation */}
          {step < 5 && (
            <div className="flex items-center justify-between mt-6">
              <Button
                variant="ghost"
                onClick={step === 0 ? () => navigate({ to: '/' }) : back}
                className="text-ivory/60 hover:text-ivory font-garamond"
              >
                <ChevronLeft size={16} className="mr-1" />
                {step === 0 ? 'Back to Home' : 'Back'}
              </Button>
              <Button
                onClick={next}
                className="px-8 py-2.5 font-cormorant font-semibold text-deepMaroon rounded-xl transition-all hover:opacity-90 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)', border: 'none' }}
              >
                {step === 4 ? 'Review & Publish' : 'Continue'}
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          )}

          {publishedId && step === 5 && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => navigate({ to: '/' })}
                variant="ghost"
                className="text-gold/60 hover:text-gold font-garamond"
              >
                ← Back to My Invitations
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
