import type { VideoAnalysis } from '../../analysis/types';
import type { KeptItem } from '../types';

function getStorageKey(userId?: string) {
  const normalizedUserId = userId?.trim() ?? '';
  if (!normalizedUserId) return null;
  return `youtive_kept_${normalizedUserId}`;
}

export function getKeptItems(userId?: string): KeptItem[] {
  const key = getStorageKey(userId);
  if (!key) return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed as KeptItem[] : [];
  } catch {
    return [];
  }
}

export function saveKeptItem(video: VideoAnalysis, userId?: string): void {
  const key = getStorageKey(userId);
  if (!key) return;

  try {
    const items = getKeptItems(userId);
    const exists = items.some((item) => item.analysisId === video.analysisId);
    if (exists) return;

    const nextItem: KeptItem = {
      id: `kept-${video.analysisId}-${Date.now()}`,
      analysisId: video.analysisId,
      createdAt: new Date().toISOString(),
      language: video.language,
      video,
    };

    localStorage.setItem(key, JSON.stringify([nextItem, ...items]));
  } catch {
    // Ignore storage write failures and keep UI functional.
  }
}

export function removeKeptItem(libraryItemId: string, userId?: string): void {
  const key = getStorageKey(userId);
  if (!key) return;

  try {
    const items = getKeptItems(userId);
    const filtered = items.filter((item) => item.id !== libraryItemId);
    localStorage.setItem(key, JSON.stringify(filtered));
  } catch {
    // Ignore storage write failures and keep UI functional.
  }
}

export function isKept(analysisId: string, userId?: string): boolean {
  return getKeptItems(userId).some((item) => item.analysisId === analysisId || item.id === analysisId);
}
