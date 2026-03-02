import { useNavigate } from '@tanstack/react-router';
import { useListSampleInvites } from '../hooks/useQueries';
import AppLayout from '../components/layout/AppLayout';
import SampleInviteCard from '../components/landing/SampleInviteCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Palette, Share2, ArrowRight, Star } from 'lucide-react';
import DriftingPetals from '../components/effects/DriftingPetals';

export default function LandingPage() {
  const navigate = useNavigate();
  const { data: samples, isLoading } = useListSampleInvites();

  return (
    <AppLayout>
      <div className="relative overflow-hidden">
        <DriftingPetals count={12} colors={['#D4AF37', '#E8731A', '#C0392B', '#F4A832']} />

        {/* Hero */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 40%, #5d1f2744 0%, transparent 70%), linear-gradient(160deg, #1a0005 0%, #3d0010 50%, #1a0005 100%)',
            }}
          />
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              backgroundImage: 'url(/assets/generated/mandala-divider.dim_1200x120.png)',
              backgroundSize: '100% auto',
              backgroundPosition: 'center 30%',
              backgroundRepeat: 'no-repeat',
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 text-gold text-sm font-garamond mb-6">
              <Star size={12} fill="currentColor" /> 8 Cinematic Templates · Free Forever
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cormorant font-bold text-gold leading-tight mb-6">
              Your Wedding,
              <br />
              <span className="text-ivory">Beautifully Told</span>
            </h1>

            <p className="text-lg md:text-xl font-garamond text-ivory/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              Create stunning, cinematic Hindu wedding invitation websites in minutes.
              Full-bleed designs, live countdowns, RSVP forms, and shareable URLs — all free, no login required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate({ to: '/create' })}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-cormorant font-bold text-lg text-deepMaroon transition-all hover:opacity-90 hover:scale-105 shadow-xl shadow-gold/20"
                style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)' }}
              >
                <Sparkles size={18} /> Create Your Invitation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Bottom mandala */}
          <div
            className="absolute bottom-0 left-0 right-0 h-20 z-0 opacity-30"
            style={{
              backgroundImage: 'url(/assets/generated/mandala-divider.dim_1200x120.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transform: 'scaleY(-1)',
            }}
          />
        </section>

        {/* How it works */}
        <section className="py-20 px-6 bg-deepMaroon/50 border-y border-gold/10">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-gold mb-3">How It Works</h2>
              <p className="font-garamond text-ivory/60">Three simple steps to your dream invitation</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Palette size={32} />, step: '01', title: 'Choose Template', desc: 'Pick from 8 richly styled Hindu wedding templates with light & dark variants.' },
                { icon: <Sparkles size={32} />, step: '02', title: 'Customize', desc: 'Add couple photos, events, gallery, music, and personalize every detail.' },
                { icon: <Share2 size={32} />, step: '03', title: 'Share', desc: 'Get a unique URL and QR code. Share with guests instantly — no login needed.' },
              ].map((item) => (
                <div key={item.step} className="text-center group">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-deepMaroon transition-transform group-hover:scale-110"
                    style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)' }}
                  >
                    {item.icon}
                  </div>
                  <div className="text-gold/30 font-cormorant text-5xl font-bold mb-2">{item.step}</div>
                  <h3 className="font-cormorant font-bold text-gold text-xl mb-2">{item.title}</h3>
                  <p className="font-garamond text-ivory/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Invites */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-gold mb-3">Template Gallery</h2>
              <p className="font-garamond text-ivory/60">Click any template to preview a sample invitation</p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="aspect-[3/2] rounded-2xl bg-white/5" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(samples || []).map((invite) => (
                  <SampleInviteCard key={invite.id} invite={invite} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center border-t border-gold/10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cormorant font-bold text-gold mb-4">
              Ready to Create Your Invitation?
            </h2>
            <p className="font-garamond text-ivory/60 mb-8">
              Free forever. No watermarks. No login. Just beautiful invitations.
            </p>
            <button
              onClick={() => navigate({ to: '/create' })}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-cormorant font-bold text-xl text-deepMaroon transition-all hover:opacity-90 hover:scale-105 shadow-xl shadow-gold/20"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)' }}
            >
              <Sparkles size={20} /> Start Creating Now
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
