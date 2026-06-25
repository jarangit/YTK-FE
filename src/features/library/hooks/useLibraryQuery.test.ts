import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useLibraryQuery } from './useLibraryQuery';
import { useAuth } from '../../../shared/auth/AuthContext';
import {
  listLibraryItems,
  keepVideo,
  unkeepVideo,
  checkKeptVideo
} from '../libraryApi';

// Mock the dependencies
vi.mock('../../../shared/auth/AuthContext', () => ({
  useAuth: vi.fn()
}));

vi.mock('../libraryApi', () => ({
  listLibraryItems: vi.fn(),
  keepVideo: vi.fn(),
  unkeepVideo: vi.fn(),
  checkKeptVideo: vi.fn()
}));

describe('useLibraryQuery', () => {
  let queryClient: QueryClient;

  const mockUser = {
    id: 'test-user-id',
    name: 'Test User',
    email: 'test@example.com'
  };

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

  const createWrapper = () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false
        }
      }
    });

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Basic state management', () => {
    it('should return empty array when not authenticated', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        isAuthenticated: false,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      vi.mocked(listLibraryItems).mockResolvedValue([]);

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      expect(result.current.items).toEqual([]);
      expect(result.current.hydrated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('should return empty array when user exists but query hasn't fetched', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      const mockItems = [{
        id: 'item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(listLibraryItems).mockResolvedValue(mockItems);

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      expect(result.current.items).toEqual(mockItems);
      expect(result.current.hydrated).toBe(true);
    });

    it('should track loading state', async () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      vi.mocked(listLibraryItems).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve([]), 100))
      );

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      expect(result.current.isLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe('Cache operations', () => {
    it('should add video to library via keep mutation', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      const mockAddedItem = [{
        id: 'added-item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(keepVideo).mockResolvedValue(mockAddedItem);

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      result.current.add(mockVideo);

      expect(keepVideo).toHaveBeenCalledWith('test-user-id', mockVideo);
    });

    it('should remove video from library via remove mutation', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      const mockRemovedItem = [{
        id: 'removed-item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(unkeepVideo).mockResolvedValue(mockRemovedItem);

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      result.current.remove('item-1');

      expect(unkeepVideo).toHaveBeenCalledWith('test-user-id', 'item-1');
    });

    it('should check if video is kept', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      vi.mocked(checkKeptVideo).mockResolvedValue(true);

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      const resultChecked = result.current.check('analysis-1');

      expect(resultChecked).toBe(true);
      expect(checkKeptVideo).toHaveBeenCalledWith('test-user-id', 'analysis-1');
    });

    it('should check cached items first before API call', async () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      const cachedItems = [{
        id: 'cached-item-1',
        analysisId: 'analysis-1',
        createdAt: '2024-01-01T00:00:00.000Z',
        language: 'en',
        video: mockVideo
      }];

      vi.mocked(listLibraryItems).mockResolvedValue(cachedItems);

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      const checked = result.current.check('analysis-1');

      expect(checked).toBe(true);
    });
  });

  describe('Error handling', () => {
    it('should handle error during keep operation', async () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      vi.mocked(keepVideo).mockRejectedValue(new Error('Keep operation failed'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      await expect(result.current.add(mockVideo)).rejects.toThrow('Keep operation failed');

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });

    it('should handle error during remove operation', async () => {
      vi.mocked(useAuth).mockReturnValue({
        user: mockUser,
        isAuthenticated: true,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      vi.mocked(unkeepVideo).mockRejectedValue(new Error('Remove operation failed'));

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      await expect(result.current.remove('item-1')).rejects.toThrow('Remove operation failed');

      expect(consoleErrorSpy).toHaveBeenCalled();

      consoleErrorSpy.mockRestore();
    });
  });

  describe('User ID edge cases', () => {
    it('should handle empty user ID', () => {
      vi.mocked(useAuth).mockReturnValue({
        user: null,
        isAuthenticated: false,
        isReady: true,
        isSigningIn: false,
        authError: '',
        isSignInModalOpen: false
      });

      const { result } = renderHook(() => useLibraryQuery(), {
        wrapper: createWrapper()
      });

      expect(result.current.items).toEqual([]);
      expect(result.current.hydrated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });
});