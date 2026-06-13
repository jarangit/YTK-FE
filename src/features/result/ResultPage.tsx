import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLibraryQuery } from '../library/hooks/useLibraryQuery';
import ResultContent from './ResultContent';
import { useVideoAnalysisQuery } from './hooks/useVideoAnalysisQuery';

export default function ResultPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') ?? '';
  const { data: video, isLoading } = useVideoAnalysisQuery(url);
  const { add, remove, check } = useLibraryQuery();

  if (isLoading) {
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
