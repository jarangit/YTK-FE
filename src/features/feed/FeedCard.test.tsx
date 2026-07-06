import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import '../../shared/i18n';
import FeedCard from './FeedCard';
import type { FeedItem } from './types';

const item: FeedItem = {
  id: 'feed-1',
  type: 'INSIGHT',
  title: 'Feed title',
  body: 'Body fallback',
  metadata: {
    insight: 'Use customer language before choosing a solution.',
  },
  keywords: ['Research', 'Product', 'Discovery', 'Extra'],
  score: 42.5,
  createdAt: '2026-06-25T14:39:07.059Z',
  analysis: {
    id: 'analysis-1',
    language: 'en',
    status: 'COMPLETED',
    summary: 'A practical summary for product discovery.',
    createdAt: '2026-06-25T14:38:57.198Z',
  },
  video: {
    id: 'video-1',
    youtubeVideoId: 'abc123',
    youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
    title: 'Discovery interview patterns',
    thumbnail: 'https://img.youtube.com/vi/abc123/hqdefault.jpg',
    channelName: 'Product Wisdom',
    duration: 420,
    publishedAt: '2026-06-01T08:00:00.000Z',
  },
};

function renderCard(props: Partial<React.ComponentProps<typeof FeedCard>> = {}) {
  return render(
    <MemoryRouter>
      <FeedCard item={item} {...props} />
    </MemoryRouter>,
  );
}

describe('FeedCard', () => {
  it('renders the redesigned video-first card content', () => {
    renderCard();

    expect(screen.getByText('Product Wisdom')).toBeInTheDocument();
    expect(screen.getByText('Discovery interview patterns')).toBeInTheDocument();
    expect(screen.getByText('Use customer language before choosing a solution.')).toBeInTheDocument();
    expect(screen.getByText('A practical summary for product discovery.')).toBeInTheDocument();
    expect(screen.getByText('42.5')).toBeInTheDocument();
    expect(screen.getByText('7 min read')).toBeInTheDocument();
    expect(screen.getByText('Insight')).toBeInTheDocument();
    expect(screen.getByText('Research')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Discovery')).toBeInTheDocument();
    expect(screen.queryByText('Extra')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Discovery interview patterns' })).toBeInTheDocument();
  });

  it('opens the feed detail from the card and CTA', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderCard({ onClick });

    await user.click(screen.getByRole('button', { name: /open summary: discovery interview patterns/i }));
    await user.click(screen.getByRole('button', { name: 'Open summary' }));

    expect(onClick).toHaveBeenCalledTimes(2);
    expect(onClick).toHaveBeenNthCalledWith(1, 'feed-1');
    expect(onClick).toHaveBeenNthCalledWith(2, 'feed-1');
  });

  it('saves without opening the card detail', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    const onSave = vi.fn();
    renderCard({ onClick, onSave });

    await user.click(screen.getByRole('button', { name: /keep it/i }));

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith('feed-1');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('shows the save loading state', () => {
    renderCard({ onSave: vi.fn(), saving: true });

    expect(screen.getByRole('button', { name: /keep it/i })).toBeDisabled();
  });

  it('uses channel and media fallbacks', () => {
    render(
      <MemoryRouter>
        <FeedCard
          item={{
            ...item,
            metadata: null,
            body: 'Fallback body insight',
            analysis: {
              ...item.analysis,
              summary: undefined,
            },
            video: {
              ...item.video,
              title: null,
              thumbnail: null,
              channelName: null,
              duration: null,
            },
          }}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText('Unknown channel')).toBeInTheDocument();
    expect(screen.getByText('YouTube analysis')).toBeInTheDocument();
    expect(screen.getAllByText('Fallback body insight')).toHaveLength(2);
  });
});
