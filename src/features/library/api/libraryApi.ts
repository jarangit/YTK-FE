import type { VideoAnalysis } from '../../analysis/types';
import type { KeptItem } from '../types';
import { mockDelay, USE_MOCK_API } from '../../../shared/api/config';
import { apiRequest } from '../../../shared/api/httpClient';
import {
  getKeptItems,
  isKept,
  removeKeptItem,
  saveKeptItem,
} from '../storage/libraryStorage';

interface ApiEnvelope<T> {
  data: T;
  timestamp?: string;
}

interface RawLibraryItem {
  id: string;
  analysisId: string;
  createdAt: string;
  analysis?: {
    id: string;
    language?: 'en' | 'th';
  } | null;
  video: VideoAnalysis;
}

function normalizeLibraryItem(item: RawLibraryItem): KeptItem {
  return {
    id: item.id,
    analysisId: item.analysisId,
    createdAt: item.createdAt,
    language: item.analysis?.language ?? item.video.language,
    video: {
      ...item.video,
      analysisId: item.analysisId,
      language: item.analysis?.language ?? item.video.language,
    },
  };
}

export async function listLibraryItems(userId: string): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return getKeptItems(userId);
  }

  const response = await apiRequest<RawLibraryItem[] | ApiEnvelope<RawLibraryItem[]>>('/library', {
    query: { userId },
  });
  const items = Array.isArray(response) ? response : response.data;
  return Array.isArray(items) ? items.map(normalizeLibraryItem) : [];
}

export async function keepVideo(userId: string, video: VideoAnalysis): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    saveKeptItem(video, userId);
    return getKeptItems(userId);
  }

  const response = await apiRequest<RawLibraryItem | ApiEnvelope<RawLibraryItem>>('/library/keep', {
    method: 'POST',
    body: JSON.stringify({ analysisId: video.analysisId }),
  });
  const keptItem = normalizeLibraryItem('data' in response ? response.data : response);
  return [keptItem, ...await listLibraryItems(userId).then((items) => items.filter((item) => item.id !== keptItem.id))];
}

export async function unkeepVideo(userId: string, libraryItemId: string): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    removeKeptItem(libraryItemId, userId);
    return getKeptItems(userId);
  }

  await apiRequest(`/library/${libraryItemId}`, {
    method: 'DELETE',
    query: { userId },
  });
  return listLibraryItems(userId);
}

export async function checkKeptVideo(userId: string, analysisId: string): Promise<boolean> {
  if (USE_MOCK_API) {
    return isKept(analysisId, userId);
  }

  return listLibraryItems(userId).then((items) => items.some((item) => item.analysisId === analysisId));
}
