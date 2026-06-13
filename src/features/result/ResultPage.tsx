import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import type { MockVideo } from '../../shared/types';
import { findMockVideo } from './data/mockVideos';
import { useLibrary } from '../../shared/hooks/useLibrary';
import ResultContent from './ResultContent';

export default function ResultPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') ?? '';
  const [video, setVideo] = useState<MockVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const { add, remove, check } = useLibrary();

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = findMockVideo(url);
      setVideo(found ?? null);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [url]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-inset-lg">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-stack-md" />
          <p className="text-sm text-ink-muted">{t('result.loading')}</p>
        </div>
      </main>
    );
  }

  if (!video) {
    return (
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-inset-lg">
        <div className="text-center">
          <p className="text-sm text-ink-muted mb-stack-md">{t('result.error')}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> {t('result.retry')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-64px)] px-inset-lg py-stack-md sm:py-10">
      <ResultContent
        video={video}
        onKeep={add}
        onRemove={remove}
        initiallyKept={check(video.id)}
      />
    </main>
  );
}
