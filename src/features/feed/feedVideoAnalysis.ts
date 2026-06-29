import type { AnalysisSummary, VideoAnalysis } from '../analysis/types';
import type { FeedItem } from './types';

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
    publishedAt: item.video.publishedAt ?? undefined,
    keywords: item.keywords,
    outcomes: [item.body, howToApply, whyImportant].filter(Boolean),
    summary,
    transcript: [],
  };
}
