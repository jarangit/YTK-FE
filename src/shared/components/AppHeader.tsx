import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Library, ArrowLeft, Newspaper } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';

export default function AppHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isFeed = location.pathname === '/feed';
  const isLibrary = location.pathname === '/library';

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-lg border-b border-border/50">
      <div className="mx-auto max-w-[1120px] px-inline-lg h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-inline-sm text-ink no-underline">
          <Bookmark className="w-5 h-5 text-accent" />
          <span className="font-display font-semibold text-lg tracking-tight">
            {t('app.name')}
          </span>
        </Link>

        <nav className="flex items-center gap-inline-xs">
          {!isHome && (
            <Link
              to="/"
              className={clsx(
                'flex items-center gap-inline-sm px-inline-md py-stack-xs rounded-btn text-sm font-medium transition-colors no-underline',
                'text-ink-muted hover:text-ink hover:bg-black/5',
              )}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('nav.home')}
            </Link>
          )}
          <Link
            to="/feed"
            className={clsx(
              'flex items-center gap-inline-sm px-inline-md py-stack-xs rounded-btn text-sm font-medium transition-colors no-underline',
              isFeed
                ? 'text-accent bg-accent-light'
                : 'text-ink-muted hover:text-ink hover:bg-black/5',
            )}
          >
            <Newspaper className="w-4 h-4" />
            {t('nav.feed')}
          </Link>
          <Link
            to="/library"
            className={clsx(
              'flex items-center gap-inline-sm px-inline-md py-stack-xs rounded-btn text-sm font-medium transition-colors no-underline',
              isLibrary
                ? 'text-accent bg-accent-light'
                : 'text-ink-muted hover:text-ink hover:bg-black/5',
            )}
          >
            <Library className="w-4 h-4" />
            {t('nav.library')}
          </Link>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
