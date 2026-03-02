import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useMyInvites } from '../hooks/useQueries';
import { TEMPLATES } from '../lib/templateRegistry';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Plus,
  Edit3,
  Users,
  Calendar,
  Sparkles,
  LogIn,
  Loader2,
  FileText,
  ChevronRight,
} from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: myInvites, isLoading: invitesLoading } = useMyInvites();

  const handleCreateNew = async () => {
    if (!isAuthenticated) {
      await login();
    } else {
      navigate({ to: '/create' });
    }
  };

  const getTemplateName = (templateId: string) => {
    const t = TEMPLATES.find((t) => t.id === templateId);
    return t?.name ?? templateId;
  };

  // ─── DASHBOARD (logged in) ───────────────────────────────────────────────
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        {/* Dashboard Hero */}
        <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-deepMaroon/5 via-background to-gold/5 pointer-events-none" />
          <div className="max-w-6xl mx-auto relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold tracking-wide mb-1">
                  My Invitations
                </h1>
                <p className="font-raleway text-foreground/60 text-sm tracking-wide">
                  Manage your sacred wedding invitations
                </p>
              </div>
              <button
                onClick={() => navigate({ to: '/create' })}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-semibold hover:opacity-90 transition-all font-raleway text-sm tracking-wide shadow-lg hover:shadow-gold/30 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                Create New Invitation
              </button>
            </div>

            {/* Invite Cards */}
            {invitesLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-gold/10 bg-card p-6 space-y-4">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-3 pt-2">
                      <Skeleton className="h-9 flex-1 rounded-full" />
                      <Skeleton className="h-9 flex-1 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : !myInvites || myInvites.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <FileText className="w-10 h-10 text-gold/40" />
                </div>
                <h2 className="font-cinzel text-xl font-semibold text-foreground/70 mb-2">
                  No Invitations Yet
                </h2>
                <p className="font-raleway text-foreground/50 text-sm max-w-sm mb-8">
                  Create your first beautiful wedding invitation and share it with your loved ones.
                </p>
                <button
                  onClick={() => navigate({ to: '/create' })}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-semibold hover:opacity-90 transition-all font-raleway text-sm tracking-wide shadow-lg"
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Invitation
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myInvites.map((invite) => (
                  <div
                    key={invite.id}
                    className="group rounded-2xl border border-gold/15 bg-card hover:border-gold/30 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-gold/10 hover:shadow-lg"
                  >
                    {/* Card Header */}
                    <div className="relative h-32 bg-gradient-to-br from-deepMaroon/20 via-crimson/10 to-gold/10 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-2 right-2 text-4xl opacity-30">🪷</div>
                        <div className="absolute bottom-2 left-2 text-3xl opacity-20">✨</div>
                      </div>
                      <div className="text-center relative z-10 px-4">
                        <p className="font-cinzel text-lg font-bold text-gold leading-tight line-clamp-2">
                          {invite.coupleNames}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-foreground/50 text-xs font-raleway mb-1">
                        <Calendar className="w-3.5 h-3.5 text-gold/50" />
                        <span>{invite.weddingDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground/40 text-xs font-raleway mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-gold/40" />
                        <span>{getTemplateName(invite.templateId)}</span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            navigate({ to: '/create', search: { editId: invite.id } })
                          }
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full border border-gold/25 text-gold/80 hover:bg-gold/10 hover:border-gold/40 hover:text-gold transition-all font-raleway text-xs tracking-wide"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            navigate({ to: `/invite/${invite.id}/responses` })
                          }
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-gold/10 border border-gold/25 text-gold hover:bg-gold/20 hover:border-gold/40 transition-all font-raleway text-xs tracking-wide"
                        >
                          <Users className="w-3.5 h-3.5" />
                          RSVPs
                        </button>
                      </div>

                      {/* View Invite Link */}
                      <button
                        onClick={() => navigate({ to: `/invite/${invite.id}` })}
                        className="mt-2 w-full flex items-center justify-center gap-1.5 px-3 py-2 rounded-full text-foreground/40 hover:text-gold/70 transition-all font-raleway text-xs tracking-wide"
                      >
                        View Invitation
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // ─── MARKETING LANDING PAGE (logged out) ────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-deepMaroon/10 via-background to-gold/5 pointer-events-none" />
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, oklch(0.75 0.15 60) 0%, transparent 50%), radial-gradient(circle at 80% 20%, oklch(0.65 0.18 30) 0%, transparent 50%)' }}
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="text-6xl sm:text-7xl animate-float">🪷</span>
          </div>
          <h1 className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-bold text-gold tracking-widest mb-4 leading-tight">
            Vivah
          </h1>
          <p className="font-cormorant text-xl sm:text-2xl text-foreground/70 italic mb-3 tracking-wide">
            Sacred Wedding Invitations
          </p>
          <p className="font-raleway text-base sm:text-lg text-foreground/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            Craft breathtaking digital wedding invitations inspired by India's rich cultural heritage.
            Share your love story with elegance and grace.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleCreateNew}
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-bold hover:opacity-90 transition-all font-raleway text-base tracking-wide shadow-xl hover:shadow-gold/40 disabled:opacity-60"
            >
              {isLoggingIn ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
              {isLoggingIn ? 'Signing in...' : 'Create Your Invitation'}
            </button>
            <button
              onClick={handleCreateNew}
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 transition-all font-raleway text-base tracking-wide"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-deepMaroon/3">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold text-center tracking-wide mb-3">
            How It Works
          </h2>
          <p className="font-raleway text-foreground/50 text-center mb-14 tracking-wide">
            Three simple steps to your perfect invitation
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: '✨',
                step: '01',
                title: 'Choose a Template',
                desc: 'Select from our curated collection of premium Indian wedding templates.',
              },
              {
                icon: '🖊️',
                step: '02',
                title: 'Personalize',
                desc: 'Add your couple photos, event details, and customize every element.',
              },
              {
                icon: '💌',
                step: '03',
                title: 'Share & Celebrate',
                desc: 'Share your invitation link with guests and track RSVPs in real time.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center group">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/15 transition-colors text-2xl">
                  {item.icon}
                </div>
                <div className="font-cinzel text-xs text-gold/40 tracking-widest mb-2">{item.step}</div>
                <h3 className="font-cinzel text-lg font-semibold text-foreground/80 mb-2">{item.title}</h3>
                <p className="font-raleway text-sm text-foreground/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Gallery */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold text-center tracking-wide mb-3">
            Premium Templates
          </h2>
          <p className="font-raleway text-foreground/50 text-center mb-14 tracking-wide">
            Inspired by India's timeless wedding traditions
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {TEMPLATES.map((template) => (
              <div
                key={template.id}
                onClick={handleCreateNew}
                className="group cursor-pointer rounded-xl overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold/10"
              >
                <div className="relative aspect-[4/3] bg-deepMaroon/10 overflow-hidden">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {(template as { premium?: boolean }).premium && (
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon text-xs font-bold font-raleway tracking-wide shadow-md">
                      Premium
                    </div>
                  )}
                </div>
                <div className="p-3 bg-card">
                  <p className="font-cinzel text-xs font-semibold text-foreground/70 tracking-wide truncate">
                    {template.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <button
              onClick={handleCreateNew}
              disabled={isLoggingIn}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-bold hover:opacity-90 transition-all font-raleway text-base tracking-wide shadow-xl hover:shadow-gold/40 disabled:opacity-60"
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              {isLoggingIn ? 'Signing in...' : 'Start Creating — It\'s Free'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
