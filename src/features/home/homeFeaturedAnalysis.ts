import type { AnalyticsItem, HomeFeaturedAnalysis } from './types';

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

export function toHomeFeaturedAnalysis(item: AnalyticsItem): HomeFeaturedAnalysis | null {
  if (!item.video || !item.analysis) {
    return null;
  }

  return {
    analysisId: item.analysis.id,
    rank: item.rank,
    viewCount: item.viewCount,
    title: item.video.title?.trim() || 'Untitled analysis',
    channelName: item.video.channelName?.trim() || 'Unknown channel',
    duration: formatDuration(item.video.duration),
    thumbnailUrl: item.video.thumbnail?.trim() || `https://i.ytimg.com/vi/${item.video.youtubeVideoId}/hqdefault.jpg`,
    summary: item.analysis.summary?.trim() || 'Open the full analysis to read the summary.',
  };
}
