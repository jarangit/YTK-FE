import { ExternalLink } from 'lucide-react';
import type { FeedItem, MockVideo } from '../../shared/types';
import ResultContent from '../result/ResultContent';

interface FeedDetailContentProps {
  item: FeedItem;
  onKeep: (video: MockVideo) => void;
  onRemove: (videoId: string) => void;
  initiallyKept: boolean;
}

function toMockVideo(item: FeedItem): MockVideo {
  return {
    id: item.id,
    videoId: item.id,
    title: item.title,
    channelName: item.channelName,
    channelUrl: item.channelUrl,
    duration: item.duration,
    thumbnailUrl: item.thumbnailUrl,
    videoUrl: item.videoUrl,
    keywords: item.tags,
    outcomes: item.outcomes,
    summary: item.summary,
  };
}

export default function FeedDetailContent({
  item,
  onKeep,
  onRemove,
  initiallyKept,
}: FeedDetailContentProps) {
  const video = toMockVideo(item);

  return (
    <div className="p-inset-md sm:p-inset-lg">
      <div className="flex items-center justify-between mb-stack-sm">
        <span className="font-display font-semibold text-sm text-[var(--color-text-tertiary)] tracking-[0.06em] uppercase">
          Video Analysis
        </span>
        <a
          href={`/result?url=${encodeURIComponent(video.videoUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          title="Open in full page"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <ResultContent
        video={video}
        onKeep={onKeep}
        onRemove={onRemove}
        initiallyKept={initiallyKept}
      />
    </div>
  );
}
