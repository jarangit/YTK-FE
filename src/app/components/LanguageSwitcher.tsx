import { useTranslation } from 'react-i18next';
import { setLanguage } from '../../shared/i18n';
import clsx from 'clsx';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language as 'en' | 'th';

  return (
    <div className="inline-flex items-center rounded-full bg-surface p-[var(--language-switcher-padding)]">
      {(['en', 'th'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={clsx(
            'rounded-full px-[var(--language-switcher-button-padding-x)] py-[var(--language-switcher-button-padding-y)] text-[length:var(--language-switcher-font-size)] font-[600] uppercase tracking-[var(--language-switcher-letter-spacing)] transition-all',
            current === lang
              ? 'bg-white text-ink shadow-[var(--language-switcher-active-shadow)]'
              : 'text-ink-faint hover:text-ink-muted',
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
