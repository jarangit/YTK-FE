import type { KeptItem } from '../types';
import type { VideoAnalysis } from '../../analysis/types';

const STORAGE_KEY = 'youtive_kept';

function getStorageKey(userId?: string) {
  return userId ? `${STORAGE_KEY}_${userId}` : STORAGE_KEY;
}

export function getKeptItems(userId?: string): KeptItem[] {
  try {
    const raw = localStorage.getItem(getStorageKey(userId));
    if (!raw) return [];
    return JSON.parse(raw) as KeptItem[];
  } catch {
    return [];
  }
}

export function saveKeptItem(video: VideoAnalysis, userId?: string): void {
  const items = getKeptItems(userId);
  const exists = items.some((item) => item.video.id === video.id);
  if (!exists) {
    items.unshift({ video, keptAt: new Date().toISOString() });
    localStorage.setItem(getStorageKey(userId), JSON.stringify(items));
  }
}

export function removeKeptItem(videoId: string, userId?: string): void {
  const items = getKeptItems(userId).filter((item) => item.video.id !== videoId);
  localStorage.setItem(getStorageKey(userId), JSON.stringify(items));
}

export function isKept(videoId: string, userId?: string): boolean {
  return getKeptItems(userId).some((item) => item.video.id === videoId);
}
