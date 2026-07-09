import { useCallback, useEffect, useRef, useState } from 'react';
import { Bookmark, Library, Menu, Rss, X } from 'lucide-react';
import { HiHome } from 'react-icons/hi2';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const authLabel = isAuthenticated
    ? user?.name?.split(' ')[0] || user?.email || t('account.title')
    : t('auth.signIn');

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isMenuOpen, closeMenu]);

  const handleAuthClick = () => {
    closeMenu();
    if (isAuthenticated) {
      navigate('/account');
    } else {
      openSignInModal();
    }
  };

  const handleLibraryClick = (event: React.MouseEvent) => {
    closeMenu();
    if (!isAuthenticated) {
      event.preventDefault();
      openSignInModal();
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-[color-mix(in_srgb,var(--color-bg-app)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--app-header-height)] max-w-[var(--app-header-max-width)] items-center justify-between px-inset-lg sm:px-8">
        <Link to="/" className="flex items-center gap-inline-sm text-ink no-underline">
          <Bookmark className="h-5 w-5 text-accent" />
          <span className="font-display font-semibold text-lg tracking-tight">
            {t('app.name')}
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-inline-sm sm:gap-inline-md">
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
            className="inline-flex h-[var(--app-header-control-height)] items-center rounded-full border border-border bg-[var(--color-bg-card)] px-[var(--app-header-control-padding-x)] text-[length:var(--app-header-control-font-size)] font-semibold text-ink shadow-[var(--app-header-auth-shadow)] transition-colors hover:border-ink-faint hover:bg-surface"
          >
            {authLabel}
          </button>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={isMenuOpen ? t('nav.close') : t('nav.menu')}
          className="flex sm:hidden items-center justify-center h-9 w-9 rounded-full text-ink-muted hover:bg-surface hover:text-ink transition-colors"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        ref={menuRef}
        className={clsx(
          'sm:hidden overflow-hidden transition-all duration-200 ease-in-out',
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="border-t border-border/60 bg-[color-mix(in_srgb,var(--color-bg-card)_96%,transparent)] backdrop-blur-xl px-inset-lg pb-stack-md pt-stack-sm space-y-stack-xs">
          {isFeed && (
            <Link
              to="/"
              onClick={closeMenu}
              className="flex items-center gap-inline-md rounded-[var(--radius-md)] px-inset-md py-stack-sm text-[14px] font-medium no-underline transition-all active:scale-[0.98] cursor-pointer text-ink-muted border-l-2 border-transparent hover:bg-[var(--color-bg-hover)] hover:text-ink"
            >
              <HiHome className="h-5 w-5 shrink-0" />
              {t('nav.home')}
            </Link>
          )}
          <Link
            to="/feed"
            onClick={closeMenu}
            className={clsx(
              'flex items-center gap-inline-md rounded-[var(--radius-md)] px-inset-md py-stack-sm text-[14px] font-medium no-underline transition-all active:scale-[0.98] cursor-pointer',
              isFeed
                ? 'bg-accent-light text-accent border-l-2 border-accent'
                : 'text-ink-muted border-l-2 border-transparent hover:bg-[var(--color-bg-hover)] hover:text-ink',
            )}
          >
            <Rss className="h-5 w-5 shrink-0" />
            {t('nav.feed')}
          </Link>
          <Link
            to={isAuthenticated ? '/library' : '/'}
            onClick={handleLibraryClick}
            className={clsx(
              'flex items-center gap-inline-md rounded-[var(--radius-md)] px-inset-md py-stack-sm text-[14px] font-medium no-underline transition-all active:scale-[0.98] cursor-pointer',
              isLibrary
                ? 'bg-accent-light text-accent border-l-2 border-accent'
                : 'text-ink-muted border-l-2 border-transparent hover:bg-[var(--color-bg-hover)] hover:text-ink',
            )}
          >
            <Library className="h-5 w-5 shrink-0" />
            {t('nav.library')}
          </Link>

          <div className="flex items-center justify-between rounded-[var(--radius-md)] px-inset-md py-stack-sm transition-all hover:bg-[var(--color-bg-hover)] cursor-default">
            <span className="text-[14px] font-medium text-ink-muted">{t('language.label')}</span>
            <LanguageSwitcher />
          </div>

          <button
            type="button"
            onClick={handleAuthClick}
            className="flex w-full items-center gap-inline-md rounded-[var(--radius-md)] px-inset-md py-stack-sm text-[14px] font-medium transition-all active:scale-[0.98] cursor-pointer text-ink-muted hover:bg-[var(--color-bg-hover)] hover:text-ink"
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent text-[10px] font-bold">
              {isAuthenticated ? user?.name?.charAt(0)?.toUpperCase() : '?'}
            </div>
            {authLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
