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

function unwrapLibraryItems(response: KeptItem[] | ApiEnvelope<KeptItem[]>): KeptItem[] {
  const items = Array.isArray(response) ? response : response.data;
  return Array.isArray(items) ? items : [];
}

export async function listLibraryItems(userId: string): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    return getKeptItems(userId);
  }

  const response = await apiRequest<KeptItem[] | ApiEnvelope<KeptItem[]>>('/library', {
    query: { userId },
  });
  return unwrapLibraryItems(response);
}

export async function keepVideo(userId: string, video: VideoAnalysis): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    saveKeptItem(video, userId);
    return getKeptItems(userId);
  }

  const response = await apiRequest<KeptItem[] | ApiEnvelope<KeptItem[]>>('/library', {
    method: 'POST',
    body: JSON.stringify({ userId, video }),
  });
  return unwrapLibraryItems(response);
}

export async function unkeepVideo(userId: string, videoId: string): Promise<KeptItem[]> {
  if (USE_MOCK_API) {
    await mockDelay();
    removeKeptItem(videoId, userId);
    return getKeptItems(userId);
  }

  const response = await apiRequest<KeptItem[] | ApiEnvelope<KeptItem[]>>(`/library/${videoId}`, {
    method: 'DELETE',
    query: { userId },
  });
  return unwrapLibraryItems(response);
}

export async function checkKeptVideo(userId: string, videoId: string): Promise<boolean> {
  if (USE_MOCK_API) {
    return isKept(videoId, userId);
  }

  return apiRequest<{ kept: boolean } | ApiEnvelope<{ kept: boolean }>>(`/library/${videoId}/kept`, {
    query: { userId },
  }).then((response) => ('data' in response ? response.data.kept : response.kept));
}
