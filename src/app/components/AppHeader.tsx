import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bookmark, Library, Rss } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../../shared/auth/AuthContext';

export default function AppHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isFeed = location.pathname.startsWith('/feed');
  const isLibrary = location.pathname === '/library';
  const { isAuthenticated, openSignInModal, user } = useAuth();

  const authLabel = isAuthenticated ? user?.name.split(' ')[0] : t('auth.signIn');

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--app-header-height)] max-w-[var(--app-header-max-width)] items-center justify-between px-inset-lg sm:px-8">
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
              'inline-flex h-[var(--app-header-control-height)] items-center gap-[var(--app-header-control-gap)] rounded-full px-[var(--app-header-control-padding-x)] text-[length:var(--app-header-control-font-size)] font-medium no-underline transition-colors',
              isFeed
                ? 'bg-surface text-ink'
                : 'text-ink-muted hover:bg-surface hover:text-ink',
            )}
          >
            <Rss size="var(--app-header-control-icon-size)" />
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
              'inline-flex h-[var(--app-header-control-height)] items-center gap-[var(--app-header-control-gap)] rounded-full px-[var(--app-header-control-padding-x)] text-[length:var(--app-header-control-font-size)] font-medium no-underline transition-colors',
              isLibrary
                ? 'bg-surface text-ink'
                : 'text-ink-muted hover:bg-surface hover:text-ink',
            )}
          >
            <Library size="var(--app-header-control-icon-size)" />
            <span className="hidden sm:inline">{t('nav.library')}</span>
          </Link>
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => {
              if (isAuthenticated) {
                navigate('/account');
                return;
              }

              openSignInModal();
            }}
            className="inline-flex h-[var(--app-header-control-height)] items-center rounded-full border border-border bg-white px-[var(--app-header-control-padding-x)] text-[length:var(--app-header-control-font-size)] font-semibold text-ink shadow-[var(--app-header-auth-shadow)] transition-colors hover:border-ink-faint hover:bg-surface"
          >
            {authLabel}
          </button>
        </nav>
      </div>
    </header>
  );
}
