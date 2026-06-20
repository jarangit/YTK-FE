import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const links = [
  { key: 'about', path: '/about' },
  { key: 'help', path: '/help' },
  { key: 'contact', path: '/contact' },
  { key: 'privacy', path: '/privacy' },
  { key: 'terms', path: '/terms' },
] as const;

export default function AppFooter() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border/60 bg-[var(--color-bg-card)] px-inset-lg py-stack-lg sm:px-8">
      <nav className="mx-auto flex max-w-[var(--app-header-max-width)] flex-wrap items-center gap-inline-lg">
        <span className="text-[length:var(--text-caption-size)] font-semibold text-ink">
          {t('app.name')}
        </span>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-[length:var(--text-caption-size)] font-medium text-ink-muted no-underline transition-colors hover:text-ink"
          >
            {t(`footer.${link.key}`)}
          </Link>
        ))}
      </nav>
    </footer>
  );
}
