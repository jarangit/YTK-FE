import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  listLibraryItems,
  keepVideo,
  unkeepVideo,
  checkKeptVideo
} from '../libraryApi';
import {
  getKeptItems,
  saveKeptItem,
  removeKeptItem,
  isKept
} from '../storage/libraryStorage';

// Mock the dependencies
vi.mock('../../../shared/api/config', () => ({
  mockDelay: vi.fn(() => Promise.resolve()),
  USE_MOCK_API: true
}));

vi.mock('../../../shared/api/httpClient', () => ({
  apiRequest: vi.fn()
}));

vi.mock('../storage/libraryStorage', () => ({
  getKeptItems: vi.fn(),
  saveKeptItem: vi.fn(),
  removeKeptItem: vi.fn(),
  isKept: vi.fn()
}));

describe('libraryApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockVideo = {
    videoId: 'test-video-id',
    title: 'Test Video',
    thumbnailUrl: 'https://example.com/thumb.jpg',
    channelName: 'Test Channel',
    description: 'Test description',
    duration: 120,
    summary: {
      oneLineSummary: 'Test summary',
      summary: 'Detailed summary',
      points: ['Point 1', 'Point 2']
    },
    outcomes: ['Outcome 1', 'Outcome 2'],
    language: 'en',
    analysisId: 'analysis-1'
  };

  const mockRawLibraryItem = {
    id: 'library-item-1',
    analysisId: 'analysis-1',
    createdAt: '2024-01-01T00:00:00.000Z',
    analysis: { id: 'analysis-1', language: 'en' },
    video: mockVideo
  };

  describe('listLibraryItems', () => {
    it('should return mock items when USE_MOCK_API is true', async () => {
      const mockItems = [{
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(getKeptItems).mockReturnValue(mockItems);

      const result = await listLibraryItems('user-1');

      expect(result).toEqual(mockItems);
      expect(getKeptItems).toHaveBeenCalledWith('user-1');
    });

    it('should return empty array for invalid response', async () => {
      vi.mocked(getKeptItems).mockReturnValue([]);

      const result = await listLibraryItems('user-1');

      expect(result).toEqual([]);
    });

    it('should parse API response correctly', async () => {
      vi.mocked(apiRequest).mockResolvedValue([mockRawLibraryItem]);

      const result = await listLibraryItems('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('library-item-1');
      expect(result[0].video.videoId).toBe('test-video-id');
      expect(result[0].video.analysisId).toBe('analysis-1');
    });

    it('should handle envelope response format', async () => {
      vi.mocked(apiRequest).mockResolvedValue({
        data: [mockRawLibraryItem]
      });

      const result = await listLibraryItems('user-1');

      expect(result).toHaveLength(1);
    });

    it('should handle empty response array', async () => {
      vi.mocked(apiRequest).mockResolvedValue([]);

      const result = await listLibraryItems('user-1');

      expect(result).toEqual([]);
    });

    it('should handle JSON parse errors', async () => {
      vi.mocked(apiRequest).mockRejectedValue(new Error('Parse error'));

      await expect(listLibraryItems('user-1')).resolves.toEqual([]);
    });
  });

  describe('keepVideo', () => {
    it('should save video to mock storage and return items', async () => {
      vi.mocked(getKeptItems).mockReturnValue([mockRawLibraryItem]);
      vi.mocked(saveKeptItem).mockReturnValue(undefined);

      const result = await keepVideo('user-1', mockVideo);

      expect(result).toHaveLength(1);
      expect(saveKeptItem).toHaveBeenCalledWith(mockVideo, 'user-1');
      expect(getKeptItems).toHaveBeenCalledWith('user-1');
    });

    it('should parse API response correctly', async () => {
      vi.mocked(apiRequest).mockResolvedValue(mockRawLibraryItem);

      const result = await keepVideo('user-1', mockVideo);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('library-item-1');
    });

    it('should handle envelope response in keep API', async () => {
      vi.mocked(apiRequest).mockResolvedValue({
        data: mockRawLibraryItem
      });

      const result = await keepVideo('user-1', mockVideo);

      expect(result).toHaveLength(1);
    });

    it('should filter duplicates when saving via API', async () => {
      const existingItems = [{
        id: 'library-item-1',
        analysisId: 'different-analysis',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(apiRequest).mockResolvedValue({
        data: mockRawLibraryItem
      });
      vi.mocked(listLibraryItems).mockResolvedValue([...existingItems, mockRawLibraryItem]);

      const result = await keepVideo('user-1', mockVideo);

      expect(result).toHaveLength(1);
    });

    it('should return cached items when API fails and USE_MOCK_API is true', async () => {
      const cachedItems = [{
        id: 'cached-item-1',
        analysisId: 'cached-analysis',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(getKeptItems).mockReturnValue(cachedItems);

      const result = await keepVideo('user-1', mockVideo);

      expect(result).toEqual(cachedItems);
    });

    it('should handle API error gracefully', async () => {
      vi.mocked(apiRequest).mockRejectedValue(new Error('API error'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await keepVideo('user-1', mockVideo);

      expect(result).toEqual([]);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to keep video:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('unkeepVideo', () => {
    it('should remove item from mock storage and return items', async () => {
      vi.mocked(getKeptItems).mockReturnValue([mockRawLibraryItem]);
      vi.mocked(removeKeptItem).mockReturnValue(undefined);

      const result = await unkeepVideo('user-1', 'library-item-1');

      expect(result).toHaveLength(1);
      expect(removeKeptItem).toHaveBeenCalledWith('library-item-1', 'user-1');
    });

    it('should remove item via API', async () => {
      vi.mocked(apiRequest).mockResolvedValue(undefined);
      vi.mocked(listLibraryItems).mockResolvedValue([mockRawLibraryItem]);

      const result = await unkeepVideo('user-1', 'library-item-1');

      expect(result).toHaveLength(1);
      expect(apiRequest).toHaveBeenCalledWith(
        '/library/library-item-1',
        {
          method: 'DELETE',
          query: { userId: 'user-1' }
        }
      );
    });

    it('should handle API error and throw', async () => {
      vi.mocked(apiRequest).mockRejectedValue(new Error('API error'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(unkeepVideo('user-1', 'library-item-1')).rejects.toThrow('API error');

      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to unkeep video:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('checkKeptVideo', () => {
    it('should check mock storage', async () => {
      vi.mocked(isKept).mockReturnValue(true);

      const result = await checkKeptVideo('user-1', 'analysis-1');

      expect(result).toBe(true);
      expect(isKept).toHaveBeenCalledWith('analysis-1', 'user-1');
    });

    it('should return false when not kept', async () => {
      vi.mocked(isKept).mockReturnValue(false);

      const result = await checkKeptVideo('user-1', 'analysis-1');

      expect(result).toBe(false);
    });

    it('should check via API when USE_MOCK_API is false', async () => {
      vi.mocked(require('../../../shared/api/config').USE_MOCK_API).false;
      vi.mocked(apiRequest).mockResolvedValue([mockRawLibraryItem]);
      vi.mocked(listLibraryItems).mockResolvedValue([mockRawLibraryItem]);

      const result = await checkKeptVideo('user-1', 'analysis-1');

      expect(result).toBe(true);
      expect(listLibraryItems).toHaveBeenCalledWith('user-1');
    });

    it('should handle API errors gracefully', async () => {
      vi.mocked(apiRequest).mockRejectedValue(new Error('API error'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const result = await checkKeptVideo('user-1', 'analysis-1');

      expect(result).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to check kept video:', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Edge cases and error handling', () => {
    it('should handle empty userId in mock mode', async () => {
      const mockItems = [{
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(getKeptItems).mockReturnValue(mockItems);

      const result = await listLibraryItems('');

      expect(result).toEqual(mockItems);
      expect(getKeptItems).toHaveBeenCalledWith('');
    });

    it('should handle network timeout', async () => {
      vi.mocked(apiRequest).mockRejectedValue(new Error('Network timeout'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(listLibraryItems('user-1')).resolves.toEqual([]);

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should handle malformed API response', async () => {
      vi.mocked(apiRequest).mockRejectedValue(new Error('Malformed response'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(listLibraryItems('user-1')).resolves.toEqual([]);

      expect(consoleErrorSpy).toHaveBeenCalledWith('API request failed:', expect.any(Number));

      consoleErrorSpy.mockRestore();
    });
  });
});