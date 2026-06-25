import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { getKeptItems, saveKeptItem, removeKeptItem, isKept } from '../libraryStorage';

describe('libraryStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('getKeptItems', () => {
    it('should return empty array when localStorage is empty', () => {
      const result = getKeptItems('user-1');
      expect(result).toEqual([]);
    });

    it('should return empty array when key does not exist', () => {
      const result = getKeptItems('non-existent-user');
      expect(result).toEqual([]);
    });

    it('should parse and return stored items for valid key', () => {
      const testItem = {
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: {
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
          language: 'en'
        }
      };

      localStorage.setItem('youtive_kept_user-1', JSON.stringify([testItem]));

      const result = getKeptItems('user-1');
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('item-1');
      expect(result[0].analysisId).toBe('analysis-1');
    });

    it('should handle invalid JSON gracefully', () => {
      localStorage.setItem('youtive_kept_user-1', 'invalid-json');
      const result = getKeptItems('user-1');
      expect(result).toEqual([]);
    });

    it('should handle localStorage quota exceeded error', () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: () => '[]',
          setItem: () => {
            throw new Error('QuotaExceededError');
          },
          removeItem: () => {},
          clear: () => {}
        },
        writable: true
      });

      const result = getKeptItems('user-1');
      expect(result).toEqual([]);
    });
  });

  describe('saveKeptItem', () => {
    it('should save new video item without duplicate', () => {
      const testVideo = {
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

      saveKeptItem(testVideo, 'user-1');

      const result = getKeptItems('user-1');
      expect(result).toHaveLength(1);
      expect(result[0].video.videoId).toBe('test-video-id');
      expect(result[0].video.analysisId).toBe('analysis-1');
    });

    it('should not save duplicate video based on analysisId', () => {
      const testVideo = {
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

      saveKeptItem(testVideo, 'user-1');
      saveKeptItem(testVideo, 'user-1');

      const result = getKeptItems('user-1');
      expect(result).toHaveLength(1);
    });

    it('should generate local id for saved item', () => {
      const testVideo = {
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

      saveKeptItem(testVideo, 'user-1');

      const result = getKeptItems('user-1');
      expect(result[0].id).toMatch(/^local-/);
    });

    it('should use current timestamp for createdAt', () => {
      const testVideo = {
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

      const beforeSave = Date.now();
      saveKeptItem(testVideo, 'user-1');
      const afterSave = Date.now();

      const result = getKeptItems('user-1');
      const timestamp = new Date(result[0].createdAt).getTime();
      expect(timestamp).toBeGreaterThanOrEqual(beforeSave);
      expect(timestamp).toBeLessThanOrEqual(afterSave);
    });

    it('should not save video without userId', () => {
      const testVideo = {
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

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      saveKeptItem(testVideo, '');

      expect(consoleWarnSpy).toHaveBeenCalledWith('Cannot save video without valid userId');
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);

      const result = getKeptItems('');
      expect(result).toEqual([]);

      consoleWarnSpy.mockRestore();
    });

    it('should not save video with invalid userId (only whitespace)', () => {
      const testVideo = {
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

      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      saveKeptItem(testVideo, '   ');

      expect(consoleWarnSpy).toHaveBeenCalledWith('Cannot save video without valid userId');

      const result = getKeptItems('   ');
      expect(result).toEqual([]);

      consoleWarnSpy.mockRestore();
    });
  });

  describe('removeKeptItem', () => {
    it('should remove item by libraryItemId', () => {
      const testItem = {
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: {
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
          language: 'en'
        }
      };

      localStorage.setItem('youtive_kept_user-1', JSON.stringify([testItem]));
      expect(getKeptItems('user-1')).toHaveLength(1);

      removeKeptItem('item-1', 'user-1');
      expect(getKeptItems('user-1')).toHaveLength(0);
    });

    it('should not remove item that does not exist', () => {
      const testItem = {
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: {
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
          language: 'en'
        }
      };

      localStorage.setItem('youtive_kept_user-1', JSON.stringify([testItem]));
      expect(getKeptItems('user-1')).toHaveLength(1);

      removeKeptItem('non-existent-item', 'user-1');
      expect(getKeptItems('user-1')).toHaveLength(1);
    });

    it('should handle missing localStorage item gracefully', () => {
      const result = removeKeptItem('item-1', 'user-1');
      expect(result).toBeUndefined();
    });

    it('should not remove item without userId', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      removeKeptItem('item-1', '');

      expect(consoleWarnSpy).toHaveBeenCalledWith('Cannot remove video without valid userId');

      consoleWarnSpy.mockRestore();
    });
  });

  describe('isKept', () => {
    it('should return false when no items are saved', () => {
      const result = isKept('analysis-1', 'user-1');
      expect(result).toBe(false);
    });

    it('should return false when analysisId is not in stored items', () => {
      const testItem = {
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: {
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
          language: 'en'
        }
      };

      localStorage.setItem('youtive_kept_user-1', JSON.stringify([testItem]));

      const result = isKept('different-analysis-id', 'user-1');
      expect(result).toBe(false);
    });

    it('should return true when analysisId matches', () => {
      const testItem = {
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: {
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
          language: 'en'
        }
      };

      localStorage.setItem('youtive_kept_user-1', JSON.stringify([testItem]));

      const result = isKept('analysis-1', 'user-1');
      expect(result).toBe(true);
    });

    it('should find item by both id and analysisId', () => {
      const testItem = {
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: {
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
          language: 'en'
        }
      };

      localStorage.setItem('youtive_kept_user-1', JSON.stringify([testItem]));

      const resultById = isKept('item-1', 'user-1');
      const resultByAnalysisId = isKept('analysis-1', 'user-1');

      expect(resultById).toBe(true);
      expect(resultByAnalysisId).toBe(true);
    });
  });
});