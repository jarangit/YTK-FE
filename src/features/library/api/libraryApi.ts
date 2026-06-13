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

export async function listLibraryItems(userId: string): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return getKeptItems(userId);
  }

  return apiRequest<KeptItem[]>('/library', { query: { userId } });
}

export async function keepVideo(userId: string, video: VideoAnalysis): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    saveKeptItem(video, userId);
    return getKeptItems(userId);
  }

  return apiRequest<KeptItem[]>('/library', {
    method: 'POST',
    body: JSON.stringify({ userId, video }),
  });
}

export async function unkeepVideo(userId: string, videoId: string): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    removeKeptItem(videoId, userId);
    return getKeptItems(userId);
  }

  return apiRequest<KeptItem[]>(`/library/${videoId}`, {
    method: 'DELETE',
    query: { userId },
  });
}

export async function checkKeptVideo(userId: string, videoId: string): Promise<boolean> {
  if (USE_MOCK_API) {
    return isKept(videoId, userId);
  }

  return apiRequest<{ kept: boolean }>(`/library/${videoId}/kept`, {
    query: { userId },
  }).then((response) => response.kept);
}
