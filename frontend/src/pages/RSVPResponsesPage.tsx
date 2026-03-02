import { useParams, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useRSVPResponses, useGetInvite, useInviteCreator } from '../hooks/useQueries';
import AppLayout from '../components/layout/AppLayout';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Users,
  CheckCircle,
  XCircle,
  UserCheck,
  ArrowLeft,
  Lock,
  LogIn,
  Loader2,
  AlertTriangle,
} from 'lucide-react';

export default function RSVPResponsesPage() {
  const { id } = useParams({ from: '/invite/$id/responses' });
  const navigate = useNavigate();
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const { data: invite, isLoading: inviteLoading } = useGetInvite(id);
  const { data: creatorPrincipal, isLoading: creatorLoading } = useInviteCreator(id);

  const currentPrincipal = identity?.getPrincipal().toString();
  const isCreator = isAuthenticated && creatorPrincipal !== null && creatorPrincipal === currentPrincipal;

  const {
    data: responses,
    isLoading: responsesLoading,
    error: responsesError,
  } = useRSVPResponses(isCreator ? id : '');

  const isLoading = inviteLoading || creatorLoading;

  // ─── NOT AUTHENTICATED ───────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <AppLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-gold/50" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-gold mb-3 tracking-wide">
              Sign In Required
            </h2>
            <p className="font-raleway text-foreground/60 text-sm leading-relaxed mb-8">
              Only the invitation creator can view RSVP responses. Please sign in to continue.
            </p>
            <button
              onClick={() => login()}
              disabled={isLoggingIn}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-semibold hover:opacity-90 transition-all font-raleway text-sm tracking-wide shadow-lg disabled:opacity-60 mx-auto"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isLoggingIn ? 'Signing in...' : 'Sign In'}
            </button>
            <button
              onClick={() => navigate({ to: `/invite/${id}` })}
              className="mt-4 font-raleway text-sm text-foreground/40 hover:text-foreground/60 transition-colors block mx-auto"
            >
              ← Back to Invitation
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // ─── LOADING ─────────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-48 mb-10" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-24 rounded-xl" />)}
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </AppLayout>
    );
  }

  // ─── ACCESS DENIED (authenticated but not creator) ───────────────────────
  if (!isCreator && !creatorLoading) {
    return (
      <AppLayout>
        <div className="min-h-[80vh] flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-crimson/10 border border-crimson/20 flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-crimson/60" />
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-foreground/70 mb-3 tracking-wide">
              Access Denied
            </h2>
            <p className="font-raleway text-foreground/50 text-sm leading-relaxed mb-8">
              You are not the creator of this invitation. Only the creator can view RSVP responses.
            </p>
            <button
              onClick={() => navigate({ to: `/invite/${id}` })}
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition-all font-raleway text-sm tracking-wide mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Invitation
            </button>
          </div>
        </div>
      </AppLayout>
    );
  }

  // ─── RESPONSES VIEW ──────────────────────────────────────────────────────
  const totalResponses = responses?.length ?? 0;
  const attending = responses?.filter((r) => r.attendance).length ?? 0;
  const notAttending = totalResponses - attending;
  const totalGuests = responses?.reduce((sum, r) => sum + Number(r.guests), 0) ?? 0;

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 text-foreground/40 hover:text-gold transition-colors font-raleway text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            My Invitations
          </button>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold tracking-wide mb-1">
            RSVP Responses
          </h1>
          {invite && (
            <p className="font-cormorant text-lg text-foreground/60 italic">
              {invite.coupleNames} · {invite.weddingDate}
            </p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Total RSVPs', value: totalResponses, color: 'text-gold' },
            { icon: CheckCircle, label: 'Attending', value: attending, color: 'text-green-500' },
            { icon: XCircle, label: 'Not Attending', value: notAttending, color: 'text-crimson' },
            { icon: UserCheck, label: 'Total Guests', value: totalGuests, color: 'text-saffron' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-gold/10 bg-card p-4 text-center"
            >
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <div className={`font-cinzel text-2xl font-bold ${color} mb-1`}>{value}</div>
              <div className="font-raleway text-xs text-foreground/40 tracking-wide">{label}</div>
            </div>
          ))}
        </div>

        {/* Responses */}
        {responsesLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <Skeleton key={i} className="h-20 rounded-xl" />)}
          </div>
        ) : responsesError ? (
          <div className="text-center py-12">
            <p className="font-raleway text-crimson/70 text-sm">
              Error loading responses. Please try again.
            </p>
          </div>
        ) : !responses || responses.length === 0 ? (
          <div className="text-center py-16 rounded-xl border border-gold/10 bg-card">
            <Users className="w-12 h-12 text-gold/20 mx-auto mb-4" />
            <h3 className="font-cinzel text-lg font-semibold text-foreground/50 mb-2">
              No Responses Yet
            </h3>
            <p className="font-raleway text-sm text-foreground/40">
              Share your invitation link to start receiving RSVPs.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block rounded-xl border border-gold/10 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-deepMaroon/10 border-b border-gold/10">
                    <th className="text-left px-5 py-3 font-cinzel text-xs text-gold/60 tracking-widest uppercase">Name</th>
                    <th className="text-left px-5 py-3 font-cinzel text-xs text-gold/60 tracking-widest uppercase">Status</th>
                    <th className="text-left px-5 py-3 font-cinzel text-xs text-gold/60 tracking-widest uppercase">Guests</th>
                    <th className="text-left px-5 py-3 font-cinzel text-xs text-gold/60 tracking-widest uppercase">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((r, i) => (
                    <tr
                      key={i}
                      className="border-b border-gold/5 hover:bg-gold/3 transition-colors"
                    >
                      <td className="px-5 py-4 font-raleway text-sm text-foreground/80">{r.name}</td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-raleway font-medium ${
                            r.attendance
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-crimson/10 text-crimson'
                          }`}
                        >
                          {r.attendance ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {r.attendance ? 'Attending' : 'Not Attending'}
                        </span>
                      </td>
                      <td className="px-5 py-4 font-raleway text-sm text-foreground/60">
                        {Number(r.guests)}
                      </td>
                      <td className="px-5 py-4 font-raleway text-sm text-foreground/50 max-w-xs truncate">
                        {r.message || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {responses.map((r, i) => (
                <div key={i} className="rounded-xl border border-gold/10 bg-card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-raleway font-medium text-foreground/80">{r.name}</span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-raleway ${
                        r.attendance
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-crimson/10 text-crimson'
                      }`}
                    >
                      {r.attendance ? 'Attending' : 'Not Attending'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-foreground/40 font-raleway">
                    <span>{Number(r.guests)} guest{Number(r.guests) !== 1 ? 's' : ''}</span>
                    {r.message && <span className="truncate">{r.message}</span>}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
