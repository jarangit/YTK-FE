import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from '../../shared/components/atoms/Button';
import Input from '../../shared/components/atoms/Input';
import FormField from '../../shared/components/molecules/FormField';
import i18n from '../../shared/i18n';
import { ApiRequestError } from '../../shared/api/httpClient';
import { analyzeVideo } from '../result/api/videoAnalysisApi';

interface Props {
  onAnalyze?: (url: string) => void | Promise<void>;
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = url.trim();
    if (!trimmed) return;

    if (!YT_REGEX.test(trimmed)) {
      setError(t('home.invalidUrl'));
      return;
    }

    try {
      setIsLoading(true);

      if (onAnalyze) {
        await onAnalyze(trimmed);
      }

      const response = await analyzeVideo({
        youtubeUrl: trimmed,
        language: i18n.language === 'th' ? 'th' : 'en',
      });

      navigate(`/result?videoId=${encodeURIComponent(response.analysisId)}`);
    } catch (error) {
      if (error instanceof ApiRequestError) {
        const code = (error.data as { data?: { code?: string } } | undefined)?.data?.code;

        if (code === 'INVALID_YOUTUBE_URL') {
          setError(t('home.invalidUrl'));
          return;
        }
      }

      setError(t('result.error'));
    } finally {
      setIsLoading(false);
    }
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
      <div className="rounded-[var(--url-input-shell-radius)] border border-border/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.98))] p-[var(--url-input-shell-padding)] shadow-[var(--url-input-shell-shadow)]">
        <div className={clsx('flex gap-3', compact ? 'flex-col' : 'flex-col sm:flex-row sm:items-stretch')}>
          <FormField id="youtube-url" error={error} className="flex-1">
            <Input
              id="youtube-url"
              name="youtube-url"
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              placeholder={t('home.inputPlaceholder')}
              icon={Link2}
              invalid={!!error}
              autoFocus={!compact}
              required
              disabled={isLoading}
              className="text-[16px] sm:text-[17px]"
              action={!isLoading && (
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handlePaste}
                  disabled={isPasting}
                  loading={isPasting}
                  title={t('home.pasteUrl')}
                  aria-label={t('home.pasteUrl')}
                  className="absolute right-[var(--input-action-right)] top-1/2 min-w-[var(--input-action-min-width)] -translate-y-1/2"
                >
                  {t('home.paste')}
                </Button>
              )}
            />
          </FormField>
          <Button
            type="submit"
            size="lg"
            variant="primary"
            disabled={isLoading}
            loading={isLoading}
            className="px-7 shadow-[var(--url-input-submit-shadow)] sm:min-w-[var(--url-input-submit-min-width)]"
          >
            {isLoading ? <span className="hidden sm:inline">{t('home.analyzing')}</span> : t('home.submit')}
          </Button>
        </div>
      </div>
    </form>
  );
}
