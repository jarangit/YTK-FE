import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Library, Rss } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../auth/AuthContext';

export default function AppHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const isFeed = location.pathname.startsWith('/feed');
  const isLibrary = location.pathname === '/library';
  const { isAuthenticated, openSignInModal, user } = useAuth();

  const authLabel = isAuthenticated ? user?.name.split(' ')[0] : t('auth.signIn');

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-inset-lg sm:px-8">
        <Link to="/" className="flex items-center gap-inline-sm text-ink no-underline">
          <Bookmark className="h-5 w-5 text-accent" />
          <span className="font-display font-semibold text-lg tracking-tight">
            {t('app.name')}
          </span>
        </Link>

        <nav className="flex items-center gap-inline-sm sm:gap-inline-md">
          <Link
            to="/feed"
            className={clsx(
              'inline-flex items-center gap-inline-xs rounded-full px-4 py-2 text-sm font-medium no-underline transition-colors',
              isFeed
                ? 'bg-surface text-ink'
                : 'text-ink-muted hover:bg-surface hover:text-ink',
            )}
          >
            <Rss className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.feed')}</span>
          </Link>
          <Link
            to={isAuthenticated ? '/library' : '/'}
            onClick={(event) => {
              if (!isAuthenticated) {
                event.preventDefault();
                openSignInModal();
              }
            }}
            className={clsx(
              'inline-flex items-center gap-inline-xs rounded-full px-4 py-2 text-sm font-medium no-underline transition-colors',
              isLibrary
                ? 'bg-surface text-ink'
                : 'text-ink-muted hover:bg-surface hover:text-ink',
            )}
          >
            <Library className="h-4 w-4" />
            <span className="hidden sm:inline">{t('nav.library')}</span>
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={openSignInModal}
            className="inline-flex items-center rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-ink shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-ink-faint hover:bg-surface"
          >
            {authLabel}
          </button>
        </nav>
      </div>
    </header>
  );
}
