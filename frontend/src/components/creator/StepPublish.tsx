import { useState, useEffect } from 'react';
import { useCreateInvite } from '../../hooks/useQueries';
import { useActor } from '../../hooks/useActor';
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
  const { actor, isFetching: isActorFetching } = useActor();

  // Track whether we've given the actor enough time to initialize.
  // We only show "unavailable" after the actor query has settled (not fetching)
  // AND the actor is still null. We use a small settled flag to avoid the
  // initial-render flash where isFetching hasn't started yet.
  const [actorSettled, setActorSettled] = useState(false);

  useEffect(() => {
    if (actor) {
      // Actor is ready — mark settled immediately
      setActorSettled(true);
      return;
    }
    if (isActorFetching) {
      // Currently fetching — not settled yet
      setActorSettled(false);
      return;
    }
    // Not fetching and no actor yet — wait a short grace period before
    // declaring it settled (handles the brief pre-fetch window on mount)
    const timer = setTimeout(() => {
      setActorSettled(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, [actor, isActorFetching]);

  // Actor is ready when it's non-null
  const isActorReady = !!actor;
  // Show connecting spinner when: fetching OR (not yet settled and no actor)
  const isConnecting = isActorFetching || (!actorSettled && !actor);
  // Show unavailable only after we've settled and still have no actor
  const isUnavailable = actorSettled && !actor && !isActorFetching;

  const isPublishDisabled = isPending || !isActorReady || isConnecting;

  const updateStep = (label: string, patch: Partial<UploadStep>, currentSteps: UploadStep[]): UploadStep[] => {
    return currentSteps.map((s) => s.label === label ? { ...s, ...patch } : s);
  };

  const publish = async () => {
    if (!actor) {
      setError('Backend not ready — please wait a moment and try again.');
      return;
    }

    const id = generateId();
    setError('');

    const initialSteps = getInitialSteps(payload);
    setSteps(initialSteps);

    let updatedSteps = [...initialSteps];

    const brideHasPhoto = isRealBlob(payload.bridePhoto);
    const groomHasPhoto = isRealBlob(payload.groomPhoto);

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
    setSteps((prev) => updateStep('Saving invitation', { status: 'uploading' }, prev));

    createInvite(
      { id, payload: enrichedPayload },
      {
        onSuccess: (returnedId: string) => {
          setSteps((prev) => updateStep('Saving invitation', { status: 'done', progress: 100 }, prev));
          setInviteId(returnedId);
          onPublished(returnedId);
        },
        onError: (err: Error) => {
          setSteps((prev) => updateStep('Saving invitation', { status: 'pending', progress: 0 }, prev));
          setError(err.message || 'Failed to publish. Please try again.');
        },
      }
    );
  };

  if (inviteId) {
    return (
      <div className="text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-3xl font-cormorant font-bold text-gold mb-2">Your Invitation is Live!</h2>
        <p className="text-ivory/60 font-garamond mb-8">Share this link with your guests</p>

        <ShareSection
          inviteId={inviteId}
          coupleNames={payload.coupleNames}
          weddingDate={payload.weddingDate}
        />

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`${window.location.origin}/invite/${inviteId}`}
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
        Your invitation will be published with a unique shareable URL and QR code.
      </p>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left max-w-sm mx-auto">
        <p className="text-ivory/50 font-garamond text-sm mb-2">Summary</p>
        <p className="text-ivory font-cormorant font-bold text-lg">{payload.coupleNames || 'Couple Names'}</p>
        <p className="text-ivory/60 font-garamond text-sm">{payload.weddingDate || 'Wedding Date'}</p>
        <p className="text-gold/70 font-garamond text-sm mt-1">Template: {payload.templateId}</p>
      </div>

      {/* Connecting notice — shown while actor is initializing */}
      {isConnecting && !isPending && (
        <div className="bg-gold/10 border border-gold/20 rounded-xl p-4 mb-6 max-w-sm mx-auto flex items-center gap-3">
          <Loader2 size={16} className="text-gold animate-spin flex-shrink-0" />
          <p className="text-ivory/70 font-garamond text-sm text-left">
            Connecting to backend… please wait.
          </p>
        </div>
      )}

      {/* Unavailable notice — only shown after actor has definitively failed to initialize */}
      {isUnavailable && !isPending && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6 max-w-sm mx-auto flex items-center gap-3">
          <Loader2 size={16} className="text-amber-400 animate-spin flex-shrink-0" />
          <p className="text-amber-400 font-garamond text-sm text-left">
            Still connecting to backend… you can try publishing now or wait a moment.
          </p>
        </div>
      )}

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

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 max-w-sm mx-auto">
          <p className="text-red-400 font-garamond text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={publish}
        disabled={isPublishDisabled}
        className="px-10 py-4 text-lg font-cormorant font-bold rounded-xl text-deepMaroon transition-all hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)', border: 'none' }}
      >
        {isPending ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" /> Publishing...
          </>
        ) : isConnecting ? (
          <>
            <Loader2 size={18} className="mr-2 animate-spin" /> Connecting…
          </>
        ) : (
          '✨ Publish Invitation'
        )}
      </Button>
    </div>
  );
}
