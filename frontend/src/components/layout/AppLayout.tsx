import { ReactNode } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Heart } from 'lucide-react';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-deepMaroon text-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-gold/10 bg-deepMaroon/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: '/' })}
            className="flex items-center gap-2 group"
          >
            <span className="text-2xl">🪷</span>
            <span className="font-cormorant font-bold text-gold text-xl tracking-wide group-hover:opacity-80 transition-opacity">
              Sacred Vows
            </span>
          </button>
          <nav className="flex items-center gap-4">
            <button
              onClick={() => navigate({ to: '/create' })}
              className="px-5 py-2 rounded-full font-cormorant font-semibold text-sm text-deepMaroon transition-all hover:opacity-90 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #D4AF37, #F4A832)' }}
            >
              Create Invitation
            </button>
          </nav>
        </div>
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-gold/10 py-10 px-6 bg-deepMaroon/80">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🪷</span>
            <span className="font-cormorant font-bold text-gold text-lg">Sacred Vows</span>
          </div>
          <p className="font-garamond text-ivory/40 text-sm text-center">
            © {new Date().getFullYear()} Sacred Vows · Built with{' '}
            <Heart size={12} className="inline text-crimson" fill="currentColor" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold/60 hover:text-gold underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
          <p className="font-garamond text-ivory/30 text-xs">
            All templates free · No watermarks · No login required
          </p>
        </div>
      </footer>
    </div>
  );
}
