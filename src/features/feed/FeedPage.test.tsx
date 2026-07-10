import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../../shared/i18n';
import FeedPage from './FeedPage';
import { store } from '../../shared/store/store';
import type { FeedItem } from './types';

const useFeedQueryMock = vi.fn();
const useSaveFeedItemMutationMock = vi.fn();

vi.mock('./hooks/useFeedQuery', () => ({
  useFeedQuery: (...args: unknown[]) => useFeedQueryMock(...args),
}));

vi.mock('./hooks/useSaveFeedItemMutation', () => ({
  useSaveFeedItemMutation: () => useSaveFeedItemMutationMock(),
}));

vi.mock('./FeedCard', () => ({
  default: ({ item }: { item: FeedItem }) => <div>{item.id}</div>,
}));

vi.mock('./FeedDetailContent', () => ({
  default: () => <div>Detail</div>,
}));

vi.mock('../../shared/components/organisms/Drawer', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../../shared/components/atoms/ContentTransition', () => ({
  default: ({ transitionKey, children }: { transitionKey: React.Key; children: React.ReactNode }) => (
    <div data-testid="content-transition" data-transition-key={String(transitionKey)}>
      {children}
    </div>
  ),
}));

function createFeedItem(id: string): FeedItem {
  return {
    id,
    type: 'INSIGHT',
    title: `Title ${id}`,
    body: `Body ${id}`,
    metadata: null,
    keywords: ['keyword'],
    score: 10,
    createdAt: '2026-06-25T14:39:07.059Z',
    analysis: {
      id: `analysis-${id}`,
      language: 'en',
      status: 'COMPLETED',
      summary: `Summary ${id}`,
      createdAt: '2026-06-25T14:38:57.198Z',
    },
    video: {
      id: `video-${id}`,
      youtubeVideoId: `youtube-${id}`,
      youtubeUrl: `https://www.youtube.com/watch?v=youtube-${id}`,
      title: `Video ${id}`,
      thumbnail: null,
      channelName: 'Channel',
      duration: 300,
      publishedAt: null,
    },
  };
}

describe('FeedPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    useSaveFeedItemMutationMock.mockReturnValue({
      save: vi.fn(),
      isPending: false,
      variables: undefined,
    });
  });

  it('keeps the content transition key stable when content stays in the same state', () => {
    useFeedQueryMock
      .mockReturnValueOnce({
        data: { pages: [{ items: [createFeedItem('feed-1')], nextCursor: null, hasMore: false }] },
        isLoading: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        refetch: vi.fn(),
      })
      .mockReturnValueOnce({
        data: { pages: [{ items: [createFeedItem('feed-1'), createFeedItem('feed-2')], nextCursor: null, hasMore: false }] },
        isLoading: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
        hasNextPage: false,
        refetch: vi.fn(),
      });

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <FeedPage />
        </MemoryRouter>
      </Provider>,
    );

    const firstKey = screen.getByTestId('content-transition').getAttribute('data-transition-key');

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <FeedPage />
        </MemoryRouter>
      </Provider>,
    );

    const secondKey = screen.getByTestId('content-transition').getAttribute('data-transition-key');

    expect(firstKey).toBe(':content');
    expect(secondKey).toBe(':content');
  });
});
