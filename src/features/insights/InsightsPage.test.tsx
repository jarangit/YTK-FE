import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '../../shared/i18n';
import InsightsPage from './InsightsPage';
import type { EngagementQuestionItem } from './types';

const useEngagementQuestionsQueryMock = vi.fn();

vi.mock('./hooks/useEngagementQuestionsQuery', () => ({
  useEngagementQuestionsQuery: (...args: unknown[]) => useEngagementQuestionsQueryMock(...args),
}));

vi.mock('../../shared/components/atoms/ContentTransition', () => ({
  default: ({ transitionKey, children }: { transitionKey: React.Key; children: React.ReactNode }) => (
    <div data-testid="content-transition" data-transition-key={String(transitionKey)}>
      {children}
    </div>
  ),
}));

function createQuestion(id: string): EngagementQuestionItem {
  return {
    question: `Question ${id}`,
    answer: `Answer ${id}`,
    hook: `Hook ${id}`,
    whyInteresting: `Why ${id}`,
    analysisId: `analysis-${id}`,
    video: {
      id: `video-${id}`,
      youtubeVideoId: `youtube-${id}`,
      youtubeUrl: `https://www.youtube.com/watch?v=youtube-${id}`,
      title: `Video ${id}`,
      thumbnail: null,
      channelId: `channel-${id}`,
      channelLogo: null,
      channelName: `Channel ${id}`,
    },
  };
}

describe('InsightsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders engagement question cards from the query', () => {
    useEngagementQuestionsQueryMock.mockReturnValue({
      data: { pages: [{ items: [createQuestion('1')], nextCursor: null, hasMore: false }] },
      isLoading: false,
      isError: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter>
        <InsightsPage />
      </MemoryRouter>,
    );

    expect(useEngagementQuestionsQueryMock).toHaveBeenCalledWith('', 30, true);
    expect(screen.getByText('Question 1')).toBeInTheDocument();
    expect(screen.getByText('Answer 1')).toBeInTheDocument();
    expect(screen.getByText('Video 1')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open summary' })).toHaveAttribute('href', '/result?analysisId=analysis-1');
    expect(screen.getByRole('link', { name: 'Open video' })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=youtube-1');
    expect(screen.getByTestId('content-transition')).toHaveAttribute('data-transition-key', ':content');
  });

  it('renders the empty state when no questions match', () => {
    useEngagementQuestionsQueryMock.mockReturnValue({
      data: { pages: [{ items: [], nextCursor: null, hasMore: false }] },
      isLoading: false,
      isError: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
      hasNextPage: false,
      refetch: vi.fn(),
    });

    render(
      <MemoryRouter>
        <InsightsPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('No insight questions found')).toBeInTheDocument();
  });
});
