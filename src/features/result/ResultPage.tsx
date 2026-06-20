import { useSearchParams, Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLibraryQuery } from '../library/hooks/useLibraryQuery';
import ResultContent from './ResultContent';
import { useVideoAnalysisQuery } from './hooks/useVideoAnalysisQuery';
import ContentTransition from '../../shared/components/atoms/ContentTransition';
import Card from '../../shared/components/atoms/Card';
import TranscriptSection from './TranscriptSection';

export default function ResultPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('videoId') ?? searchParams.get('analysisId') ?? '';
  const { data, isLoading, isError } = useVideoAnalysisQuery(videoId);
  const { add, remove, check } = useLibraryQuery();
  const video = data?.video ?? null;
  const status = data?.status;
  const transcript = data?.transcript ?? [];
  const failureMessage = data?.failureMessage;
  const youtubeUrl = data?.youtubeUrl;

  const isWaiting = isLoading || status === 'PENDING' || status === 'PROCESSING';
  const isFailed = status === 'FAILED';
  const isMissingVideoId = videoId.trim().length === 0;
  const resultState = isWaiting ? 'loading' : video ? 'success' : 'error';

  let content: React.ReactNode;

  if (isMissingVideoId) {
    content = (
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-inset-lg">
        <div className="text-center">
          <p className="text-sm text-ink-muted mb-stack-md">{t('result.missing')}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> {t('result.retry')}
          </Link>
        </div>
      </main>
    );
  } else if (isWaiting) {
    content = (
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-inset-lg">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-stack-md" />
          <p className="text-sm text-ink-muted">{t('result.loading')}</p>
        </div>
      </main>
    );
  } else if (isFailed) {
    content = (
      <main className="min-h-[calc(100vh-64px)] px-inset-lg py-stack-md sm:py-10">
        <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
          <Card padded as="section" className="bg-white">
            <div className="flex items-start gap-inline-sm">
              <div className="mt-1 rounded-full bg-red-50 p-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-lg font-semibold text-ink">
                  {t('result.failed')}
                </h1>
                <p className="mt-stack-xs text-sm text-ink-muted">
                  {failureMessage || t('result.failedDescription')}
                </p>

                <div className="mt-stack-md flex flex-wrap items-center gap-inline-md">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t('result.retry')}
                  </Link>
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
                    >
                      {t('result.openOnYoutube')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {transcript.length > 0 && (
            <TranscriptSection transcript={transcript} />
          )}
        </div>
      </main>
    );
  } else if (isError || !video) {
    content = (
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
  } else {
    content = (
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

  return (
    <ContentTransition transitionKey={resultState}>
      {content}
    </ContentTransition>
  );
}
