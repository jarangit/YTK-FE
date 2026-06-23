import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { normalizeLegacySummary, type VideoAnalysis } from '../analysis/types';
import type { FeedItem } from './types';
import KeepAction from '../analysis/KeepAction';
import OutcomeCard from '../analysis/OutcomeCard';
import SummaryAccordion from '../analysis/SummaryAccordion';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import Card from '../../shared/components/atoms/Card';

interface FeedDetailContentProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (analysisId: string) => void;
  initiallyKept: boolean;
}

export function toVideoAnalysis(item: FeedItem): VideoAnalysis {
  return {
    id: item.id,
    analysisId: item.id,
    language: 'en',
    videoId: item.id,
    title: item.title,
    channelName: item.channelName,
    channelUrl: item.channelUrl,
    duration: item.duration,
    thumbnailUrl: item.thumbnailUrl,
    videoUrl: item.videoUrl,
    keywords: item.tags,
    outcomes: item.outcomes,
    summary: normalizeLegacySummary(item.summary),
    transcript: [],
  };
}

export default function FeedDetailContent({
  video,
  onKeep,
  onRemove,
  initiallyKept,
}: FeedDetailContentProps) {
  const { t } = useTranslation();

  return (
    <div className="p-inset-md sm:p-inset-lg">
      <div className="flex items-center justify-between mb-stack-sm">
        <span className="font-display font-semibold text-sm text-[var(--color-text-tertiary)] tracking-[0.06em] uppercase">
          Video Analysis
        </span>
        <a
          href={`/result?analysisId=${encodeURIComponent(video.analysisId)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          title="Open in full page"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <div className="space-y-stack-md sm:space-y-stack-lg">
        <VideoPreviewCard video={video} />
        <OutcomeCard outcomes={video.outcomes} />
        <SummaryAccordion summary={video.summary} />
        <Card padded as="section" className="bg-[var(--color-bg-card)]">
          <h2 className="font-display text-lg font-semibold text-ink">{t('keep.title')}</h2>
          <p className="mb-stack-md mt-stack-xs text-sm text-ink-muted">
            {t('keep.desc')}
          </p>
          <KeepAction
            video={video}
            onKeep={onKeep}
            onRemove={onRemove}
            initiallyKept={initiallyKept}
          />
        </Card>
      </div>
    </div>
  );
}
