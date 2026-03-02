import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareSectionProps {
  url: string;
  accentColor?: string;
}

// Minimal QR code generator using canvas — no external library needed
function generateQRDataURL(text: string, size: number): string {
  // We use a simple approach: encode the URL as a QR via a data URI approach
  // Since we can't use qrcode.react, we'll render a placeholder QR-like grid
  // and use the URL encoded in a visual pattern. For a real QR, we use the
  // Google Charts API as a fallback (no API key needed, free endpoint).
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(text)}&bgcolor=ffffff&color=1a0a00&margin=10`;
}

export default function ShareSection({ url, accentColor = '#D4AF37' }: ShareSectionProps) {
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

  return (
    <div className="flex flex-col items-center gap-6">
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
    </div>
  );
}
