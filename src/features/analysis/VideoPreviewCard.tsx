import { ExternalLink, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { VideoAnalysis } from './types';
import Card from '../../shared/components/atoms/Card';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';

type VideoPreviewCardSize = 'xs' | 's' | 'm' | 'l';

interface Props {
  video: VideoAnalysis;
  action?: React.ReactNode;
  size?: VideoPreviewCardSize;
}

export default function VideoPreviewCard({ video, action, size = 'l' }: Props) {
  const { t } = useTranslation();
  const videoId = video.videoId.trim();
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
    : null;
  const metadataItems = [
    { icon: User, label: video.channelName.trim() },
    { icon: Clock, label: video.duration.trim() },
  ].filter((item) => item.label.length > 0);
  const isExtraSmall = size === 'xs';
  const isSmall = size === 's';
  const isMedium = size === 'm';
  const isLarge = size === 'l';

  if (isExtraSmall) {
    return (
      <Card className="bg-[var(--color-bg-card)]">
        <PreviewMedia
          embedUrl={embedUrl}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl}
          videoId={video.videoId}
          duration={video.duration}
          className="aspect-video"
        />
      </Card>
    );
  }

  return (
    <Card className="bg-[var(--color-bg-card)]">
      <div
        className={clsx(
          isLarge && 'block',
          isMedium && 'md:grid md:grid-cols-[minmax(260px,340px)_1fr] md:items-stretch',
          isExtraSmall && 'grid grid-cols-[112px_1fr] items-stretch gap-0',
          isSmall && 'grid grid-cols-[148px_1fr] items-stretch gap-0',
        )}
      >
        <div
          className={clsx(
            isLarge && '',
            isMedium && '',
            isExtraSmall && 'h-full',
            isSmall && 'h-full',
          )}
        >
          <PreviewMedia
            embedUrl={embedUrl}
            title={video.title}
            thumbnailUrl={video.thumbnailUrl}
            videoId={video.videoId}
            duration={video.duration}
            className={clsx(
              isLarge && 'aspect-video',
              isMedium && 'aspect-video md:h-full md:aspect-auto',
              isSmall && 'h-full min-h-[148px] w-full',
            )}
          />
        </div>

        <div
          className={clsx(
            isLarge && 'p-inset-md sm:p-inset-lg',
            isMedium && 'p-inset-md sm:p-inset-lg',
            isExtraSmall && 'flex min-w-0 flex-col justify-between p-3',
            isSmall && 'flex min-w-0 flex-col justify-between p-3 sm:p-4',
          )}
        >
          <div className={clsx(!(isExtraSmall || isSmall) && 'flex flex-col gap-stack-md sm:flex-row sm:items-start sm:justify-between')}>
            <h2
              className={clsx(
                'font-display font-semibold leading-snug tracking-[-0.02em] text-ink',
                isLarge && 'text-xl sm:text-2xl',
                isMedium && 'text-lg sm:text-xl',
                isExtraSmall && 'line-clamp-2 text-sm',
                isSmall && 'line-clamp-2 text-base',
              )}
            >
              {video.title}
            </h2>
            {action && (
              <div className={clsx('shrink-0', (isExtraSmall || isSmall) && 'mt-3')}>
                {action}
              </div>
            )}
          </div>

          {metadataItems.length > 0 && (
            <MetadataRow
              className={clsx(
                'flex flex-wrap items-center text-ink-muted',
                isLarge && 'mt-stack-sm gap-inline-lg text-xs',
                isMedium && 'mt-stack-sm gap-inline-md text-xs',
                isExtraSmall && 'mt-2 gap-2 text-[10px]',
                isSmall && 'mt-3 gap-2 text-[11px]',
              )}
              items={metadataItems}
            />
          )}

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'inline-flex items-center gap-inline-xs font-medium text-accent transition-colors hover:text-accent-hover no-underline',
              isLarge && 'mt-stack-sm text-xs',
              isMedium && 'mt-stack-sm text-xs',
              isExtraSmall && 'mt-2 text-[10px]',
              isSmall && 'mt-3 text-[11px]',
            )}
          >
            <ExternalLink className={clsx(isExtraSmall || isSmall ? 'h-3 w-3' : 'w-3.5 h-3.5')} />
            {t('result.openOnYoutube')}
          </a>
        </div>
      </div>
    </Card>
  );
}

interface PreviewMediaProps {
  embedUrl: string | null;
  title: string;
  thumbnailUrl: string;
  videoId: string;
  duration: string;
  className?: string;
}

function PreviewMedia({
  embedUrl,
  title,
  thumbnailUrl,
  videoId,
  duration,
  className,
}: PreviewMediaProps) {
  if (embedUrl) {
    return (
      <div className={clsx('overflow-hidden bg-surface', className)}>
        <iframe
          src={embedUrl}
          title={title}
          className="h-full w-full border-0"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <MediaThumbnail
        src={thumbnailUrl}
        alt={title}
        videoId={videoId}
        duration={duration}
      />
    </div>
  );
}
