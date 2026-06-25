import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LucideIcon } from 'lucide-react';
import VideoCollectionCard from './VideoCollectionCard';
import type { VideoAnalysis } from '../analysis/types';

// Mock dependencies
vi.mock('../../shared/components/atoms/Badge', () => ({
  default: ({ variant, className, children }: any) => (
    <span data-testid="badge" data-variant={variant} className={className}>
      {children}
    </span>
  )
}));

vi.mock('../../shared/components/atoms/Card', () => ({
  default: ({ interactive, children }: any) => (
    <div data-testid="card" data-interactive={interactive}>
      {children}
    </div>
  )
}));

vi.mock('../../shared/components/atoms/Text', () => ({
  default: ({ variant, as, color, className, children }: any) => (
    <span
      data-testid={`text-${variant}`}
      data-as={as}
      data-color={color}
      className={className}
    >
      {children}
    </span>
  )
}));

vi.mock('../../shared/components/molecules/MediaThumbnail', () => ({
  default: ({ src, alt, videoId, duration }: any) => (
    <img
      data-testid="media-thumbnail"
      data-src={src}
      data-alt={alt}
      data-video-id={videoId}
      data-duration={duration}
      src={src}
      alt={alt}
    />
  )
}));

vi.mock('../../shared/components/molecules/MetadataRow', () => ({
  default: ({ className, items }: any) => (
    <div data-testid="metadata-row" className={className}>
      {items.map((item: any, index: number) => (
        <div key={index}>
          <item.icon data-testid={`metadata-icon-${index}`} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}));

describe('VideoCollectionCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const mockVideo: VideoAnalysis = {
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
  };

  const mockDate = '2024-01-01T00:00:00.000Z';

  it('should render card with thumbnail', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    expect(getByTestId('media-thumbnail')).toBeInTheDocument();
    expect(getByTestId('media-thumbnail')).toHaveAttribute('data-src', 'https://example.com/thumb.jpg');
    expect(getByTestId('media-thumbnail')).toHaveAttribute('data-video-id', 'test-video-id');
  });

  it('should render card title', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const title = screen.getByText('Test Video');
    expect(title).toBeInTheDocument();
  });

  it('should render date with specified format', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const date = getByTestId('text-display');
    expect(date).toBeInTheDocument();
  });

  it('should render badge', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const badge = getByTestId('badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('TEST BADGE');
  });

  it('should render description from outcomes', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const description = getByTestId('text-caption');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Outcome 1');
  });

  it('should render description from oneLineSummary when outcomes is empty', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={{
          ...mockVideo,
          outcomes: [] as any
        }}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const description = getByTestId('text-caption');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Test summary');
  });

  it('should render description from full summary when both are empty', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={{
          ...mockVideo,
          outcomes: [] as any,
          summary: {
            oneLineSummary: '',
            summary: 'Detailed description from summary',
            points: []
          }
        }}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const description = getByTestId('text-caption');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Detailed description from summary');
  });

  it('should render fallback when all description fields are empty', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={{
          ...mockVideo,
          outcomes: [] as any,
          summary: {
            oneLineSummary: '',
            summary: '',
            points: []
          }
        }}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const description = getByTestId('text-caption');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('No description available');
  });

  it('should render channel name in footer', () => {
    const { getByText } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    expect(getByText('Test Channel')).toBeInTheDocument();
  });

  it('should render metadata row when provided', () => {
    const mockMetadata = [
      { icon: vi.fn() as any, label: 'Test Metadata' }
    ];

    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
        metadata={mockMetadata}
      />
    );

    const metadataRow = getByTestId('metadata-row');
    expect(metadataRow).toBeInTheDocument();
  });

  it('should render no metadata row when not provided', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const metadataRow = getByTestId('metadata-row');
    expect(metadataRow).not.toBeInTheDocument();
  });

  it('should render video duration when provided', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const thumbnail = getByTestId('media-thumbnail');
    expect(thumbnail).toHaveAttribute('data-duration', '120');
  });

  it('should not render footer when no channel name and no footer action', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={{
          ...mockVideo,
          channelName: ''
        }}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const footer = getByTestId('card').querySelector('[data-testid="card-footer"]');
    expect(footer).not.toBeInTheDocument();
  });

  it('should render footer when channel name is provided', () => {
    const { getByTestId, getByText } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const footer = getByTestId('card').querySelector('[data-testid="card-footer"]');
    expect(footer).toBeInTheDocument();
    expect(getByText('Test Channel')).toBeInTheDocument();
  });

  it('should render footer when footer action is provided', () => {
    const FooterAction = () => <button data-testid="footer-action">Click Me</button>;

    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
        footerAction={<FooterAction />}
      />
    );

    const footer = getByTestId('card').querySelector('[data-testid="card-footer"]');
    expect(footer).toBeInTheDocument();
    expect(getByTestId('footer-action')).toBeInTheDocument();
  });

  it('should render border between footer content', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const footer = getByTestId('card').querySelector('[data-testid="card-footer"]');
    expect(footer).toHaveStyle({ borderTop: '1px solid rgb(232, 239, 254)' });
  });

  it('should make card interactive when destination is provided', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
        destination="/test-path"
      />
    );

    const card = getByTestId('card');
    expect(card).toHaveAttribute('data-interactive', 'true');
  });

  it('should not make card interactive when no destination is provided', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const card = getByTestId('card');
    expect(card).toHaveAttribute('data-interactive', 'false');
  });

  it('should render channel name truncated when too long', () => {
    const longChannelName = 'A'.repeat(100);

    const { getByText } = render(
      <VideoCollectionCard
        video={{
          ...mockVideo,
          channelName: longChannelName
        }}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    expect(getByText(longChannelName)).toBeInTheDocument();
  });

  it('should render badge with custom className', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
        badgeClassName="custom-badge"
      />
    );

    const badge = getByTestId('badge');
    expect(badge).toHaveClass('custom-badge');
  });

  it('should handle metadata with multiple items', () => {
    const mockMetadata = [
      { icon: vi.fn() as any, label: 'Outcome 1' },
      { icon: vi.fn() as any, label: 'Outcome 2' },
      { icon: vi.fn() as any, label: 'Outcome 3' }
    ];

    const { getByTestId, getAllByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
        metadata={mockMetadata}
      />
    );

    const metadataRow = getByTestId('metadata-row');
    expect(metadataRow).toBeInTheDocument();
    expect(getAllByTestId(/metadata-icon/)).toHaveLength(3);
  });

  it('should handle metadata with empty array', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
        metadata={[]}
      />
    );

    const metadataRow = getByTestId('metadata-row');
    expect(metadataRow).not.toBeInTheDocument();
  });

  it('should render description with proper line clamping', () => {
    const { getByTestId } = render(
      <VideoCollectionCard
        video={mockVideo}
        date={mockDate}
        badge="TEST BADGE"
      />
    );

    const description = getByTestId('text-caption');
    expect(description).toHaveClass('line-clamp-2');
  });
});