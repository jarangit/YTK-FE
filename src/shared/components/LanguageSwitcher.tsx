import { useTranslation } from 'react-i18next';
import { setLanguage } from '../i18n';
import clsx from 'clsx';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language as 'en' | 'th';

  return (
    <div className="flex items-center gap-0.5">
      {(['en', 'th'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={clsx(
            'px-2 py-0.5 rounded text-[11px] font-[600] uppercase tracking-[0.04em] transition-colors',
            current === lang
              ? 'bg-[var(--color-accent)] text-white'
              : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]',
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
