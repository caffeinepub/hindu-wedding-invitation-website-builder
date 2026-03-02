import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';
import { Button } from '@/components/ui/button';

interface ShareSectionProps {
  url: string;
  accentColor?: string;
  coupleNames?: string;
  weddingDate?: string;
}

function generateQRDataURL(text: string, size: number): string {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=1a0a00&margin=10`;
}

function formatWeddingDate(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function ShareSection({
  url,
  accentColor = '#D4AF37',
  coupleNames,
  weddingDate,
}: ShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const qrUrl = generateQRDataURL(url, 180);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {}
    }
  };

  const handleWhatsAppShare = () => {
    const formattedDate = formatWeddingDate(weddingDate);
    const names = coupleNames || 'The Couple';
    let message = `🌸 You're invited to the wedding of *${names}*!`;
    if (formattedDate) {
      message += `\n📅 ${formattedDate}`;
    }
    message += `\n\n✨ View the invitation:\n${url}`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* QR Code */}
      <div
        className="p-4 rounded-2xl"
        style={{ background: '#fff', border: `3px solid ${accentColor}` }}
      >
        <img
          src={qrUrl}
          alt="QR Code"
          width={180}
          height={180}
          className="block"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* URL Copy Row */}
      <div className="w-full max-w-md">
        <div
          className="flex items-center gap-2 rounded-xl p-3"
          style={{ background: accentColor + '11', border: `1px solid ${accentColor}44` }}
        >
          <Share2 size={16} style={{ color: accentColor, flexShrink: 0 }} />
          <span className="flex-1 text-sm font-garamond truncate opacity-80">{url}</span>
          <Button
            size="sm"
            onClick={handleCopy}
            className="shrink-0 rounded-lg font-garamond"
            style={{
              background: copied ? '#22c55e' : accentColor,
              color: '#1a0a00',
              border: 'none',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="ml-1">{copied ? 'Copied!' : 'Copy'}</span>
          </Button>
        </div>
      </div>

      {/* WhatsApp Share Button */}
      <div className="w-full max-w-md">
        <button
          onClick={handleWhatsAppShare}
          className="w-full flex items-center justify-center gap-3 rounded-xl py-3 px-5 font-cormorant font-semibold text-base transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            color: '#ffffff',
            boxShadow: '0 4px 16px 0 #25D36644',
            border: '1px solid #25D36688',
            letterSpacing: '0.04em',
          }}
        >
          <SiWhatsapp size={20} />
          <span>Share on WhatsApp</span>
        </button>
      </div>
    </div>
  );
}
