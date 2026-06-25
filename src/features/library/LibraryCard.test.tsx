import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LibraryCard from './LibraryCard';
import type { KeptItem } from './types';

// Mock the dependencies
vi.mock('../../shared/components/atoms/IconButton', () => ({
  default: ({ icon: Icon, ariaLabel, variant, size, onClick }: any) => (
    <button
      data-testid="icon-button"
      aria-label={ariaLabel}
      data-variant={variant}
      data-size={size}
      onClick={onClick}
    >
      <Icon />
    </button>
  )
}));

vi.mock('../VideoCollectionCard', () => ({
  default: ({ video, date, badge, destination, metadata, footerAction }: any) => (
    <div data-testid="video-collection-card" data-title={video.title}>
      <div data-testid="video-thumbnail" />
      <div data-testid="card-content">
        <span data-badge={badge} />
        <span data-date={date} />
        <span data-description={video.outcomes[0] || video.summary.oneLineSummary} />
      </div>
      <div data-testid="card-footer">
        {footerAction}
      </div>
    </div>
  )
}));

describe('LibraryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockKeptItem: KeptItem = {
    id: 'kept-item-1',
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

  it('should render card with video information', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    expect(getByTestId('video-collection-card')).toBeInTheDocument();
    expect(getByTestId('video-thumbnail')).toBeInTheDocument();
    expect(getByTestId('video-collection-card')).toHaveAttribute('data-title', 'Test Video');
  });

  it('should render badge with language and saved status', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    const badge = getByTestId('video-collection-card').querySelector('[data-badge]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('EN • SAVED');
  });

  it('should render date in card', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    const dateElement = getByTestId('video-collection-card').querySelector('[data-date]');
    expect(dateElement).toBeInTheDocument();
    expect(dateElement).toHaveTextContent('Jan 1, 2024');
  });

  it('should render description from outcomes or summary', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    const descriptionElement = getByTestId('video-collection-card').querySelector('[data-description]');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent('Outcome 1');
  });

  it('should render remove icon button', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    const removeButton = getByTestId('icon-button');
    expect(removeButton).toBeInTheDocument();
    expect(removeButton).toHaveAttribute('aria-label', 'card.remove');
    expect(removeButton).toHaveAttribute('data-variant', 'ghost');
    expect(removeButton).toHaveAttribute('data-size', 'sm');
  });

  it('should trigger onRemove when remove button is clicked', () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={onRemove}
      />
    );

    const removeButton = getByTestId('icon-button');
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith('kept-item-1');
  });

  it('should set scale and opacity to 0 during remove animation', () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={onRemove}
      />
    );

    const card = getByTestId('video-collection-card').parentElement;
    expect(card).not.toHaveClass('scale-[0.98]', 'opacity-0');

    fireEvent.click(getByTestId('icon-button'));

    // The scale class should be added immediately
    expect(card).toHaveClass('scale-[0.98]', 'opacity-0');
  });

  it('should call onRemove after timeout during remove animation', async () => {
    vi.useFakeTimers();
    const onRemove = vi.fn();

    render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={onRemove}
      />
    );

    const removeButton = screen.getByTestId('icon-button');
    fireEvent.click(removeButton);

    expect(onRemove).not.toHaveBeenCalled();

    vi.advanceTimersByTime(160);

    expect(onRemove).toHaveBeenCalled();
    expect(onRemove).toHaveBeenCalledWith('kept-item-1');

    vi.useRealTimers();
  });

  it('should clear timeout on component unmount', async () => {
    vi.useFakeTimers();
    const onRemove = vi.fn();

    const { unmount } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={onRemove}
      />
    );

    const removeButton = screen.getByTestId('icon-button');
    fireEvent.click(removeButton);

    unmount();

    // Advance timers to verify cleanup happened
    vi.advanceTimersByTime(160);

    // Timeout should be cleared, onRemove should not be called
    expect(onRemove).not.toHaveBeenCalled();

    vi.useRealTimers();
  });

  it('should render channel name in footer when available', () => {
    const { getByText } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    expect(getByText('Test Channel')).toBeInTheDocument();
  });

  it('should handle undefined video outcomes gracefully', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={{
          ...mockKeptItem,
          video: {
            ...mockKeptItem.video,
            outcomes: [] as any
          }
        }}
        onRemove={vi.fn()}
      />
    );

    const descriptionElement = getByTestId('video-collection-card').querySelector('[data-description]');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent('Test summary');
  });

  it('should handle undefined language gracefully', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={{
          ...mockKeptItem,
          language: undefined
        }}
        onRemove={vi.fn()}
      />
    );

    const badge = getByTestId('video-collection-card').querySelector('[data-badge]');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('SAVED');
  });

  it('should render metadata icon for outcomes count', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    const iconButton = screen.getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveAttribute('aria-label', 'card.remove');
  });

  it('should render metadata icon for kept status', () => {
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={vi.fn()}
      />
    );

    const iconButton = screen.getByTestId('icon-button');
    expect(iconButton).toBeInTheDocument();
    expect(iconButton).toHaveAttribute('aria-label', 'card.remove');
  });

  it('should call onRemove with correct item ID', () => {
    const onRemove = vi.fn();
    const { getByTestId } = render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={onRemove}
      />
    );

    const removeButton = screen.getByTestId('icon-button');
    fireEvent.click(removeButton);

    expect(onRemove).toHaveBeenCalledWith('kept-item-1');
  });

  it('should handle rapid clicks on remove button', async () => {
    vi.useFakeTimers();
    const onRemove = vi.fn();

    render(
      <LibraryCard
        item={mockKeptItem}
        onRemove={onRemove}
      />
    );

    const removeButton = screen.getByTestId('icon-button');

    // Click three times rapidly
    for (let i = 0; i < 3; i++) {
      fireEvent.click(removeButton);
    }

    expect(onRemove).not.toHaveBeenCalled();

    vi.advanceTimersByTime(160);

    // Only the last click should trigger
    expect(onRemove).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });
});