import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useInviteCreator } from '../../hooks/useQueries';
import { Share2, Copy, Check, MessageCircle, QrCode, Users } from 'lucide-react';

interface ShareSectionProps {
  inviteId?: string;
  coupleNames?: string;
  weddingDate?: string;
}

export default function ShareSection({ inviteId, coupleNames, weddingDate }: ShareSectionProps) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const currentPrincipal = identity?.getPrincipal().toString();

  const { data: creatorPrincipal } = useInviteCreator(inviteId ?? '');
  const isCreator = isAuthenticated && creatorPrincipal !== null && creatorPrincipal === currentPrincipal;

  const inviteUrl = inviteId
    ? `${window.location.origin}/invite/${inviteId}`
    : window.location.href;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = coupleNames && weddingDate
      ? `You're invited to the wedding of ${coupleNames} on ${weddingDate}! 🌸\n${inviteUrl}`
      : `You're invited! 🌸\n${inviteUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inviteUrl)}`;

  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="flex items-center gap-2 text-gold/70 mb-2">
        <Share2 className="w-4 h-4" />
        <span className="font-raleway text-sm tracking-widest uppercase">Share Invitation</span>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 text-gold/80 hover:bg-gold/10 hover:border-gold/50 hover:text-gold transition-all font-raleway text-sm tracking-wide"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>

        {/* WhatsApp */}
        <button
          onClick={handleWhatsApp}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-green-500/30 text-green-400/80 hover:bg-green-500/10 hover:border-green-500/50 hover:text-green-400 transition-all font-raleway text-sm tracking-wide"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </button>

        {/* QR Code */}
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-gold/30 text-gold/80 hover:bg-gold/10 hover:border-gold/50 hover:text-gold transition-all font-raleway text-sm tracking-wide"
        >
          <QrCode className="w-4 h-4" />
          QR Code
        </button>

        {/* View RSVP Responses — only for authenticated creator */}
        {isCreator && inviteId && (
          <button
            onClick={() => navigate({ to: `/invite/${inviteId}/responses` })}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold/20 to-saffron/20 border border-gold/40 text-gold hover:from-gold/30 hover:to-saffron/30 hover:border-gold/60 transition-all font-raleway text-sm tracking-wide font-medium"
          >
            <Users className="w-4 h-4" />
            View RSVP Responses
          </button>
        )}
      </div>

      {/* QR Code Display */}
      {showQR && (
        <div className="mt-2 p-4 rounded-xl border border-gold/20 bg-white/5 backdrop-blur-sm">
          <img
            src={qrUrl}
            alt="QR Code"
            className="w-40 h-40 rounded-lg"
          />
          <p className="font-raleway text-xs text-foreground/40 text-center mt-2 tracking-wide">
            Scan to open invitation
          </p>
        </div>
      )}
    </div>
  );
}
