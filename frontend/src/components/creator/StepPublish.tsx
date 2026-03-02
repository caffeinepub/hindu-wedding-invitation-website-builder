import { useState } from 'react';
import { useCreateInvite } from '../../hooks/useQueries';
import ShareSection from '../invitation/ShareSection';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { generateId } from '../../lib/utils';
import type { InvitePayload, ExternalBlob } from '../../backend';

interface StepPublishProps {
  payload: InvitePayload;
  onPublished: (id: string) => void;
}

interface UploadStep {
  label: string;
  status: 'pending' | 'uploading' | 'done' | 'skipped';
  progress: number;
}

function getInitialSteps(payload: InvitePayload): UploadStep[] {
  const steps: UploadStep[] = [];

  const hasBride = isRealBlob(payload.bridePhoto);
  const hasGroom = isRealBlob(payload.groomPhoto);
  const hasCover = isRealBlob(payload.coverPhoto);
  const galleryCount = payload.galleryImages.filter(isRealBlob).length;

  steps.push({ label: "Bride's photo", status: hasBride ? 'pending' : 'skipped', progress: 0 });
  steps.push({ label: "Groom's photo", status: hasGroom ? 'pending' : 'skipped', progress: 0 });
  if (hasCover) steps.push({ label: 'Cover image', status: 'pending', progress: 0 });
  if (galleryCount > 0) steps.push({ label: `Gallery (${galleryCount} photos)`, status: 'pending', progress: 0 });
  steps.push({ label: 'Saving invitation', status: 'pending', progress: 0 });

  return steps;
}

function isRealBlob(blob: ExternalBlob | null | undefined): boolean {
  if (!blob) return false;
  try {
    const url = blob.getDirectURL();
    return !!url && url.length > 0;
  } catch {
    return false;
  }
}

export default function StepPublish({ payload, onPublished }: StepPublishProps) {
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [steps, setSteps] = useState<UploadStep[]>([]);
  const { mutate: createInvite, isPending } = useCreateInvite();

  const updateStep = (label: string, patch: Partial<UploadStep>, currentSteps: UploadStep[]): UploadStep[] => {
    return currentSteps.map((s) => s.label === label ? { ...s, ...patch } : s);
  };

  const publish = async () => {
    const id = generateId();
    setError('');

    const initialSteps = getInitialSteps(payload);
    setSteps(initialSteps);

    // Wire up upload progress for bride and groom photos in parallel
    let updatedSteps = [...initialSteps];

    const brideHasPhoto = isRealBlob(payload.bridePhoto);
    const groomHasPhoto = isRealBlob(payload.groomPhoto);

    // Attach progress callbacks to blobs
    const enrichedPayload = { ...payload };

    if (brideHasPhoto && payload.bridePhoto) {
      updatedSteps = updateStep("Bride's photo", { status: 'uploading' }, updatedSteps);
      enrichedPayload.bridePhoto = payload.bridePhoto.withUploadProgress((pct) => {
        setSteps((prev) => updateStep("Bride's photo", { progress: pct, status: pct >= 100 ? 'done' : 'uploading' }, prev));
      });
    }

    if (groomHasPhoto && payload.groomPhoto) {
      updatedSteps = updateStep("Groom's photo", { status: 'uploading' }, updatedSteps);
      enrichedPayload.groomPhoto = payload.groomPhoto.withUploadProgress((pct) => {
        setSteps((prev) => updateStep("Groom's photo", { progress: pct, status: pct >= 100 ? 'done' : 'uploading' }, prev));
      });
    }

    if (isRealBlob(payload.coverPhoto) && payload.coverPhoto) {
      updatedSteps = updateStep('Cover image', { status: 'uploading' }, updatedSteps);
      enrichedPayload.coverPhoto = payload.coverPhoto.withUploadProgress((pct) => {
        setSteps((prev) => updateStep('Cover image', { progress: pct, status: pct >= 100 ? 'done' : 'uploading' }, prev));
      });
    }

    // Gallery progress
    const galleryCount = payload.galleryImages.filter(isRealBlob).length;
    if (galleryCount > 0) {
      updatedSteps = updateStep(`Gallery (${galleryCount} photos)`, { status: 'uploading' }, updatedSteps);
      let completedGallery = 0;
      enrichedPayload.galleryImages = payload.galleryImages.map((blob) => {
        if (!isRealBlob(blob)) return blob;
        return blob.withUploadProgress((pct) => {
          if (pct >= 100) completedGallery++;
          const overallPct = Math.round(((completedGallery + pct / 100) / galleryCount) * 100);
          setSteps((prev) => updateStep(`Gallery (${galleryCount} photos)`, {
            progress: Math.min(overallPct, 100),
            status: completedGallery >= galleryCount ? 'done' : 'uploading',
          }, prev));
        });
      });
    }

    setSteps(updatedSteps);

    // Mark "Saving invitation" as uploading when we call createInvite
    setSteps((prev) => updateStep('Saving invitation', { status: 'uploading' }, prev));

    createInvite(
      { id, payload: enrichedPayload },
      {
        onSuccess: (returnedId) => {
          setSteps((prev) => updateStep('Saving invitation', { status: 'done', progress: 100 }, prev));
          setInviteId(returnedId);
          onPublished(returnedId);
        },
        onError: (err) => {
          setSteps((prev) => updateStep('Saving invitation', { status: 'pending', progress: 0 }, prev));
          setError(err instanceof Error ? err.message : 'Failed to publish. Please try again.');
        },
      }
    );
  };

  const shareUrl = inviteId ? `${window.location.origin}/invite/${inviteId}` : '';

  if (inviteId) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-cormorant font-bold text-gold mb-2">Your Invitation is Live!</h2>
        <p className="text-ivory/60 font-garamond mb-8">Share this link with your guests</p>

        <ShareSection url={shareUrl} accentColor="#D4AF37" />

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-cormorant font-semibold text-deepMaroon transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)' }}
          >
            <ExternalLink size={16} /> Preview Invitation
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <Sparkles size={48} className="text-gold mx-auto mb-4" />
      <h2 className="text-3xl font-cormorant font-bold text-gold mb-3">Ready to Publish?</h2>
      <p className="text-ivory/60 font-garamond mb-8 max-w-md mx-auto">
        Your invitation will be published with a unique shareable URL and QR code. No account needed.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
        <p className="text-ivory/50 font-garamond text-sm mb-2">Summary</p>
        <p className="text-ivory font-cormorant font-bold text-lg">{payload.coupleNames || 'Couple Names'}</p>
        <p className="text-ivory/60 font-garamond text-sm">{payload.weddingDate || 'Wedding Date'}</p>
        <p className="text-gold/70 font-garamond text-sm mt-1">Template: {payload.templateId}</p>
      </div>

      {/* Upload progress steps */}
      {isPending && steps.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 max-w-sm mx-auto text-left space-y-3">
          <p className="text-ivory/50 font-garamond text-xs uppercase tracking-widest mb-3">Publishing progress</p>
          {steps.map((step) => (
            <div key={step.label} className="flex items-center gap-3">
              <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                {step.status === 'done' || step.status === 'skipped' ? (
                  <CheckCircle2 size={16} className={step.status === 'done' ? 'text-gold' : 'text-ivory/20'} />
                ) : step.status === 'uploading' ? (
                  <Loader2 size={14} className="text-gold animate-spin" />
                ) : (
                  <div className="w-3 h-3 rounded-full border border-ivory/20" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-xs font-garamond ${step.status === 'skipped' ? 'text-ivory/20' : 'text-ivory/70'}`}>
                    {step.label}
                  </span>
                  {step.status === 'uploading' && (
                    <span className="text-xs text-gold/70 font-garamond">{step.progress}%</span>
                  )}
                </div>
                {step.status === 'uploading' && (
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold rounded-full transition-all duration-300"
                      style={{ width: `${step.progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <p className="text-red-400 font-garamond text-sm mb-4">{error}</p>}

      <Button
        onClick={publish}
        disabled={isPending}
        className="px-10 py-4 text-lg font-cormorant font-bold rounded-xl text-deepMaroon transition-all hover:opacity-90 hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)', border: 'none' }}
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" /> Publishing...
          </>
        ) : (
          '✨ Publish Invitation'
        )}
      </Button>
    </div>
  );
}
