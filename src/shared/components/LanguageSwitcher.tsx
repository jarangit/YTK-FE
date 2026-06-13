import { useTranslation } from 'react-i18next';
import { setLanguage } from '../i18n';
import clsx from 'clsx';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const current = i18n.language as 'en' | 'th';

  return (
    <div className="inline-flex items-center rounded-full bg-surface p-1">
      {(['en', 'th'] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={clsx(
            'rounded-full px-3 py-1.5 text-[11px] font-[600] uppercase tracking-[0.06em] transition-all',
            current === lang
              ? 'bg-white text-ink shadow-[0_1px_2px_rgba(15,23,42,0.06)]'
              : 'text-ink-faint hover:text-ink-muted',
          )}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}
