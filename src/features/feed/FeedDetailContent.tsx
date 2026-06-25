import { AlertCircle, Bookmark, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { FeedItem } from './types';
import { useVideoAnalysisQuery } from '../result/hooks/useVideoAnalysisQuery';
import ResultContentSkeleton from '../result/ResultContentSkeleton';
import AnalysisDetailBody from '../result/AnalysisDetailBody';
import TranscriptSection from '../result/TranscriptSection';
import Card from '../../shared/components/atoms/Card';
import { Button } from '../../shared/components/atoms/Button';

interface FeedDetailContentProps {
  item: FeedItem;
  onSaveFeedItem: () => void;
  saving?: boolean;
}

function FeedSaveAction({
  onSaveFeedItem,
  saving,
}: {
  onSaveFeedItem: () => void;
  saving: boolean;
}) {
  const { t } = useTranslation();

  return (
    <Button
      type="button"
      iconLeft={Bookmark}
      loading={saving}
      onClick={onSaveFeedItem}
    >
      {t('keep.button')}
    </Button>
  );
}

export default function FeedDetailContent({
  item,
  onSaveFeedItem,
  saving = false,
}: FeedDetailContentProps) {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useVideoAnalysisQuery(item.analysis.id);
  const video = data?.video ?? null;
  const status = data?.status;
  const transcript = data?.transcript ?? [];
  const failureMessage = data?.failureMessage;
  const youtubeUrl = data?.youtubeUrl ?? item.video.youtubeUrl;
  const isWaiting = isLoading || status === 'PENDING' || status === 'PROCESSING';
  const isFailed = status === 'FAILED';

  return (
    <div className="p-inset-md sm:p-inset-lg">
      <div className="flex items-center justify-between mb-stack-sm">
        <span className="font-display font-semibold text-sm text-[var(--color-text-tertiary)] tracking-[0.06em] uppercase">
          Video Analysis
        </span>
        <a
          href={`/result?analysisId=${encodeURIComponent(item.analysis.id)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          title="Open in full page"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {isWaiting && <ResultContentSkeleton />}

      {!isWaiting && video && (
        <AnalysisDetailBody
          video={video}
          hideEmptySections
          action={(
            <FeedSaveAction
              onSaveFeedItem={onSaveFeedItem}
              saving={saving}
            />
          )}
        />
      )}

      {!isWaiting && isFailed && (
        <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
          <Card padded as="section" className="bg-[var(--color-bg-card)]">
            <div className="flex items-start gap-inline-sm">
              <div className="mt-1 rounded-full bg-danger-soft p-2 text-danger">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-lg font-semibold text-ink">
                  {t('result.failed')}
                </h1>
                <p className="mt-stack-xs text-sm text-ink-muted">
                  {failureMessage || t('result.failedDescription')}
                </p>

                {youtubeUrl && (
                  <div className="mt-stack-md">
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
                    >
                      {t('result.openOnYoutube')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {transcript.length > 0 && (
            <TranscriptSection transcript={transcript} />
          )}
        </div>
      )}

      {!isWaiting && !isFailed && (isError || !video) && (
        <Card padded as="section" className="mx-auto max-w-read bg-[var(--color-bg-card)]">
          <h1 className="font-display text-lg font-semibold text-ink">
            {t('feed.notFoundTitle')}
          </h1>
          <p className="mt-stack-xs text-sm text-ink-muted">
            {t('feed.notFoundSubtitle')}
          </p>
        </Card>
      )}
    </div>
  );
}
