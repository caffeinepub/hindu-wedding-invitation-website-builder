import { useNavigate } from '@tanstack/react-router';
import { TEMPLATES } from '../../lib/templateRegistry';
import { Eye } from 'lucide-react';
import type { InviteRecord } from '../../backend';

interface SampleInviteCardProps {
  invite: InviteRecord;
}

export default function SampleInviteCard({ invite }: SampleInviteCardProps) {
  const navigate = useNavigate();
  const template = TEMPLATES.find((t) => t.id === invite.templateId);

  return (
    <button
      onClick={() => navigate({ to: '/invite/$id', params: { id: invite.id } })}
      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-gold/10 text-left w-full"
    >
      <div className="aspect-[3/2] overflow-hidden bg-deepMaroon/50">
        <img
          src={template?.thumb || '/assets/generated/og-fallback.dim_1200x630.png'}
          alt={template?.name || invite.templateId}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 bg-gradient-to-b from-deepMaroon/80 to-deepMaroon">
        <p className="font-cormorant font-bold text-gold text-base">{template?.name || invite.templateId}</p>
        <p className="font-garamond text-ivory/70 text-sm mt-0.5">{invite.coupleNames}</p>
        <p className="font-garamond text-ivory/40 text-xs mt-0.5">{invite.weddingDate}</p>
      </div>
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
        <div className="bg-gold/90 text-deepMaroon px-4 py-2 rounded-full font-cormorant font-bold flex items-center gap-2">
          <Eye size={16} /> Preview
        </div>
      </div>
    </button>
  );
}
