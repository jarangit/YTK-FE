import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Loader2 } from 'lucide-react';
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

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-inline-sm sm:gap-inline-md">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError('');
            }}
            placeholder={t('home.inputPlaceholder')}
            className={clsx(
              'w-full h-12 pl-inline-xl pr-inset-md bg-white border rounded-btn text-sm text-ink placeholder:text-ink-faint outline-none transition-shadow',
              error
                ? 'border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                : 'border-border focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,113,227,0.15)]',
            )}
            autoFocus={!compact}
            required
            disabled={isLoading}
          />
          {error && (
            <p className="text-[11px] text-red-500 text-left mt-stack-xs pl-inline-xs">
              {error}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={clsx(
            'h-12 px-inset-md sm:px-inset-lg bg-accent text-white rounded-btn text-sm font-semibold transition-all flex items-center gap-2',
            isLoading
              ? 'opacity-60 cursor-not-allowed'
              : 'hover:bg-accent-hover active:scale-[0.98]',
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
    </form>
  );
}
