import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface Props {
  onAnalyze?: (url: string) => void;
  compact?: boolean;
}

const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/i;

export default function UrlInputForm({ onAnalyze, compact }: Props) {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasting, setIsPasting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = url.trim();
    if (!trimmed) return;

    if (!YT_REGEX.test(trimmed)) {
      setError(t('home.invalidUrl'));
      return;
    }

    setIsLoading(true);
    if (onAnalyze) onAnalyze(trimmed);

    setTimeout(() => {
      navigate(`/result?url=${encodeURIComponent(trimmed)}`);
    }, 300);
  };

  const handlePaste = async () => {
    try {
      setIsPasting(true);
      const text = await navigator.clipboard.readText();
      setUrl(text);
      if (error) setError('');
    } catch {
      setError(t('home.pasteError'));
    } finally {
      setIsPasting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="rounded-[30px] border border-border/70 bg-white p-2 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
        <div className={clsx('flex gap-2', compact ? 'flex-col' : 'flex-col sm:flex-row')}>
          <div className="relative flex-1 rounded-[24px] bg-surface">
            <Link2 className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <input
              id="youtube-url"
              name="youtube-url"
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              placeholder={t('home.inputPlaceholder')}
              className={clsx(
                'h-16 w-full rounded-[24px] border bg-surface pl-12 pr-28 text-[16px] text-ink outline-none transition-shadow placeholder:text-ink-faint sm:pr-32',
                error
                  ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                  : 'border-transparent focus:border-accent focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,113,227,0.12)]',
              )}
              autoFocus={!compact}
              required
              disabled={isLoading}
            />
            {!isLoading && (
              <button
                type="button"
                onClick={handlePaste}
                disabled={isPasting}
                title={t('home.pasteUrl')}
                aria-label={t('home.pasteUrl')}
                className={clsx(
                  'absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 min-w-[76px] items-center justify-center rounded-full px-3 text-[13px] font-semibold tracking-[0.01em] transition-all',
                  isPasting
                    ? 'cursor-not-allowed border border-border/40 bg-white text-ink-faint'
                    : 'border border-border bg-white text-ink-muted hover:border-ink-faint hover:text-ink active:scale-[0.98]',
                )}
              >
                {isPasting ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  t('home.paste')
                )}
              </button>
            )}
            {error && (
              <p className="pl-1 pt-2 text-left text-[12px] text-red-500">
                {error}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={clsx(
              'inline-flex h-16 items-center justify-center gap-2 rounded-[24px] px-8 text-[16px] font-semibold text-white transition-all sm:min-w-[170px]',
              compact ? 'bg-[#333336]' : 'bg-accent',
              isLoading
                ? 'opacity-60 cursor-not-allowed'
                : compact
                  ? 'active:scale-[0.98] hover:bg-black'
                  : 'active:scale-[0.98] hover:bg-accent-hover',
            )}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">{t('home.analyzing')}</span>
              </>
            ) : (
              t('home.submit')
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
