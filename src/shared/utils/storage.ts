import type { KeptItem, MockVideo, FeedItem } from '../types';

const STORAGE_KEY = 'youtive_kept';

export function getKeptItems(): KeptItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as KeptItem[];
  } catch {
    return [];
  }
}

export function saveKeptItem(video: MockVideo): void {
  const items = getKeptItems();
  const exists = items.some((item) => item.video.id === video.id);
  if (!exists) {
    items.unshift({ video, keptAt: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

export function removeKeptItem(videoId: string): void {
  const items = getKeptItems().filter((item) => item.video.id !== videoId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function isKept(videoId: string): boolean {
  return getKeptItems().some((item) => item.video.id === videoId);
}

export function keptItemToFeedItem(kept: KeptItem): FeedItem {
  return {
    id: kept.video.id,
    title: kept.video.title,
    channelName: kept.video.channelName,
    channelUrl: kept.video.channelUrl,
    thumbnailUrl: kept.video.thumbnailUrl,
    videoUrl: kept.video.videoUrl,
    duration: kept.video.duration,
    topic: 'Saved',
    summaryCount: 0,
    likes: 0,
    savedCount: 0,
    publishedAt: new Date(kept.keptAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    excerpt: kept.video.outcomes[0] ?? '',
    tags: [],
    outcomes: kept.video.outcomes,
    summary: kept.video.summary,
  };
}
