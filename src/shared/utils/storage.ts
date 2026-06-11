import type { KeptItem, MockVideo } from '../types';

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
