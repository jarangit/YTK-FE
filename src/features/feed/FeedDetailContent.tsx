import { Bookmark, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AnalysisSummary, VideoAnalysis } from '../analysis/types';
import type { FeedItem } from './types';
import OutcomeCard from '../analysis/OutcomeCard';
import SummaryAccordion from '../analysis/SummaryAccordion';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import Card from '../../shared/components/atoms/Card';
import { Button } from '../../shared/components/atoms/Button';

interface FeedDetailContentProps {
  video: VideoAnalysis;
  onSaveFeedItem: () => void;
  saving?: boolean;
}

function metadataString(item: FeedItem, key: string) {
  const value = item.metadata?.[key];
  return typeof value === 'string' ? value : '';
}

function formatDuration(totalSeconds: number | null) {
  if (totalSeconds === null) return '';

  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

export function toVideoAnalysis(item: FeedItem): VideoAnalysis {
  const insight = metadataString(item, 'insight') || item.body;
  const howToApply = metadataString(item, 'howToApply');
  const whyImportant = metadataString(item, 'whyImportant');
  const summary: AnalysisSummary = {
    summary: item.analysis.summary ?? item.body,
    oneLineSummary: item.body,
    detailedExplanation: [],
    importantDetails: whyImportant ? [whyImportant] : [],
    examples: [],
    keyInsights: [
      {
        insight,
        whyImportant,
        mindsetChange: '',
      },
    ],
    mentalModel: null,
    practicalTakeaways: howToApply ? [howToApply] : [],
    researchRoadmap: {
      tools: [],
      trends: [],
      concepts: item.keywords,
      deepQuestions: [],
    },
    limitations: [],
    worthIt: null,
  };

  return {
    id: item.video.id,
    analysisId: item.analysis.id,
    language: item.analysis.language === 'th' ? 'th' : 'en',
    videoId: item.video.youtubeVideoId,
    title: item.video.title ?? item.title,
    channelName: item.video.channelName ?? '',
    channelUrl: '',
    duration: formatDuration(item.video.duration),
    thumbnailUrl: item.video.thumbnail ?? '',
    videoUrl: item.video.youtubeUrl,
    keywords: item.keywords,
    outcomes: [item.body, howToApply, whyImportant].filter(Boolean),
    summary,
    transcript: [],
  };
}

export default function FeedDetailContent({
  video,
  onSaveFeedItem,
  saving = false,
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
          <Button
            type="button"
            iconLeft={Bookmark}
            loading={saving}
            onClick={onSaveFeedItem}
          >
            {t('keep.button')}
          </Button>
        </Card>
      </div>
    </div>
  );
}
