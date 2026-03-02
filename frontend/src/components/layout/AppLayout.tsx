import { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, User, Loader2 } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const { login, clear, loginStatus, identity, isInitializing } = useInternetIdentity();
  const queryClient = useQueryClient();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: unknown) {
      const err = error as Error;
      if (err?.message === 'User is already authenticated') {
        await clear();
        queryClient.clear();
        setTimeout(() => login(), 300);
      }
    }
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const abbreviatePrincipal = (principal: string) => {
    if (principal.length <= 12) return principal;
    return `${principal.slice(0, 5)}...${principal.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 border-b border-gold/20 bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">🪷</span>
            <span className="font-cinzel text-lg font-bold text-gold tracking-widest group-hover:text-saffron transition-colors">
              Vivah
            </span>
          </button>

          {/* Auth Controls */}
          <div className="flex items-center gap-3">
            {isInitializing ? (
              <div className="flex items-center gap-2 text-gold/60 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline font-raleway">Loading...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20">
                  <User className="w-3.5 h-3.5 text-gold" />
                  <span className="font-raleway text-xs text-gold/80 tracking-wide">
                    {abbreviatePrincipal(identity.getPrincipal().toString())}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 text-gold/80 hover:bg-gold/10 hover:text-gold hover:border-gold/50 transition-all font-raleway text-sm tracking-wide"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-gold to-saffron text-deepMaroon font-semibold hover:opacity-90 transition-all font-raleway text-sm tracking-wide disabled:opacity-60 shadow-md hover:shadow-gold/30"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                <span>{isLoggingIn ? 'Signing in...' : 'Login'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-gold/10 bg-deepMaroon/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-raleway text-sm text-foreground/40 tracking-wide">
            © {new Date().getFullYear()} Vivah — Sacred Wedding Invitations
          </p>
          <p className="font-raleway text-xs text-foreground/30 mt-1">
            Built with{' '}
            <span className="text-crimson">♥</span>{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname || 'vivah-wedding-invitations')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
