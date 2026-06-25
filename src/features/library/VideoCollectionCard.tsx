import type { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../../shared/components/atoms/Badge';
import Card from '../../shared/components/atoms/Card';
import Text from '../../shared/components/atoms/Text';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';
import type { VideoAnalysis } from '../analysis/types';

interface VideoCollectionCardProps {
  video: VideoAnalysis;
  date: string;
  badge: string;
  badgeClassName?: string;
  destination?: string;
  metadata?: Array<{ icon: LucideIcon; label: React.ReactNode }>;
  footerAction?: React.ReactNode;
}

export default function VideoCollectionCard({
  video,
  date,
  badge,
  badgeClassName,
  destination,
  metadata = [],
  footerAction,
}: VideoCollectionCardProps) {
  const content = (
    <>
      <MediaThumbnail
        src={video.thumbnailUrl}
        alt={video.title}
        videoId={video.videoId}
        duration={video.duration || undefined}
      />
      <div className="p-inset-md sm:p-inset-lg">
        <div className="mb-stack-sm flex flex-wrap items-center gap-inline-sm">
          <Badge variant="accent" className={badgeClassName}>{badge}</Badge>
          <Text variant="caption" color="tertiary">
            {new Date(date).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </div>
        <Text variant="title" as="h3" className="mb-stack-sm line-clamp-2 leading-snug">
          {video.title}
        </Text>
        <Text variant="caption" color="secondary" className="mb-stack-md line-clamp-2">
          {video.outcomes?.[0] || video.summary?.oneLineSummary || video.summary?.summary || 'No description available'}
        </Text>
        {metadata.length > 0 && (
          <MetadataRow
            className="mb-stack-md flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]"
            items={metadata}
          />
        )}
      </div>
    </>
  );

  return (
    <Card interactive={Boolean(destination)}>
      {destination ? (
        <Link to={destination} className="block text-inherit no-underline">{content}</Link>
      ) : (
        <div>{content}</div>
      )}
      {(video.channelName || footerAction) && (
        <div className="px-inset-md pb-inset-md sm:px-inset-lg sm:pb-inset-lg">
          <div className="flex items-center justify-between gap-inline-md border-t border-[var(--color-border-subtle)] pt-stack-sm">
            <Text variant="caption" color="tertiary" className="truncate">
              {video.channelName}
            </Text>
            {footerAction}
          </div>
        </div>
      )}
    </Card>
  );
}
