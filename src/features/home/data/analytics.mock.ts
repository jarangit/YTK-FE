import { mockVideos } from '../../result/data/mockVideos';
import type { AnalyticsItem } from '../types';

export const analyticsMock: AnalyticsItem[] = mockVideos.slice(0, 3).map((video, index) => ({
  videoId: video.id,
  viewCount: 120 - (index * 15),
  rank: index + 1,
  video: {
    id: video.id,
    youtubeVideoId: video.videoId,
    youtubeUrl: video.videoUrl,
    title: video.title,
    thumbnail: video.thumbnailUrl,
    channelName: video.channelName,
    duration: durationToSeconds(video.duration),
  },
  analysis: {
    id: video.analysisId,
    language: video.language ?? 'en',
    status: 'COMPLETED',
    summary: video.summary.oneLineSummary || video.summary.summary,
    createdAt: '2026-06-25T11:00:00.000Z',
  },
}));

function durationToSeconds(value: string) {
  const parts = value.split(':').map((part) => Number(part));

  if (parts.some((part) => Number.isNaN(part))) {
    return null;
  }

  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return (minutes * 60) + seconds;
  }

  return parts[0] ?? null;
}
