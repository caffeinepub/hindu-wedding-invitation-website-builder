import { useState, useEffect } from 'react';
import { useCreateInvite } from '../../hooks/useQueries';
import ShareSection from '../invitation/ShareSection';
import { Button } from '@/components/ui/button';
import { Loader2, ExternalLink, Sparkles } from 'lucide-react';
import { generateId } from '../../lib/utils';
import type { InvitePayload } from '../../backend';

interface StepPublishProps {
  payload: InvitePayload;
  onPublished: (id: string) => void;
}

export default function StepPublish({ payload, onPublished }: StepPublishProps) {
  const [inviteId, setInviteId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const { mutate: createInvite, isPending } = useCreateInvite();

  const publish = () => {
    const id = generateId();
    setError('');
    createInvite(
      { id, payload },
      {
        onSuccess: (returnedId) => {
          setInviteId(returnedId);
          onPublished(returnedId);
        },
        onError: (err) => {
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
