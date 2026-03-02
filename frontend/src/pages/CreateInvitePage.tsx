import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import AppLayout from '../components/layout/AppLayout';
import StepTemplateSelector from '../components/creator/StepTemplateSelector';
import StepCoupleDetails from '../components/creator/StepCoupleDetails';
import StepPhotoUpload from '../components/creator/StepPhotoUpload';
import StepEvents from '../components/creator/StepEvents';
import StepGalleryMusic, { type GalleryItem } from '../components/creator/StepGalleryMusic';
import StepPublish from '../components/creator/StepPublish';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '../lib/utils';
import { ExternalBlob } from '../backend';
import type { InvitePayload, ScheduleItem } from '../backend';

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
  const [step, setStep] = useState(0);
  const [publishedId, setPublishedId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    // Only include gallery items that have finished uploading
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
        </div>
      </div>
    </AppLayout>
  );
}
