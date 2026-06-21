import { ExternalLink, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { VideoAnalysis } from './types';
import Card from '../../shared/components/atoms/Card';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';

type VideoPreviewCardSize = 's' | 'm' | 'l';

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
  const isSmall = size === 's';
  const isMedium = size === 'm';
  const isLarge = size === 'l';

  return (
    <Card className="bg-[var(--color-bg-card)]">
      <div
        className={clsx(
          isLarge && 'block',
          isMedium && 'md:grid md:grid-cols-[minmax(260px,340px)_1fr] md:items-stretch',
          isSmall && 'grid grid-cols-[148px_1fr] items-stretch gap-0',
        )}
      >
        <div
          className={clsx(
            isLarge && '',
            isMedium && '',
            isSmall && 'h-full',
          )}
        >
          {embedUrl ? (
            <div
              className={clsx(
                'overflow-hidden bg-surface',
                isLarge && 'aspect-video',
                isMedium && 'aspect-video md:h-full md:aspect-auto',
                isSmall && 'h-full min-h-[148px] w-full',
              )}
            >
              <iframe
                src={embedUrl}
                title={video.title}
                className="h-full w-full border-0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          ) : (
            <div className={clsx(isSmall && 'h-full')}>
              <MediaThumbnail
                src={video.thumbnailUrl}
                alt={video.title}
                videoId={video.videoId}
                duration={video.duration}
              />
            </div>
          )}
        </div>

        <div
          className={clsx(
            isLarge && 'p-inset-md sm:p-inset-lg',
            isMedium && 'p-inset-md sm:p-inset-lg',
            isSmall && 'flex min-w-0 flex-col justify-between p-3 sm:p-4',
          )}
        >
          <div className={clsx(!isSmall && 'flex flex-col gap-stack-md sm:flex-row sm:items-start sm:justify-between')}>
            <h2
              className={clsx(
                'font-display font-semibold leading-snug tracking-[-0.02em] text-ink',
                isLarge && 'text-xl sm:text-2xl',
                isMedium && 'text-lg sm:text-xl',
                isSmall && 'line-clamp-2 text-base',
              )}
            >
              {video.title}
            </h2>
            {action && (
              <div className={clsx('shrink-0', isSmall && 'mt-3')}>
                {action}
              </div>
            )}
          </div>

          <MetadataRow
            className={clsx(
              'flex flex-wrap items-center text-ink-muted',
              isLarge && 'mt-stack-sm gap-inline-lg text-xs',
              isMedium && 'mt-stack-sm gap-inline-md text-xs',
              isSmall && 'mt-3 gap-2 text-[11px]',
            )}
            items={[
              { icon: User, label: video.channelName },
              { icon: Clock, label: video.duration },
            ]}
          />

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'inline-flex items-center gap-inline-xs font-medium text-accent transition-colors hover:text-accent-hover no-underline',
              isLarge && 'mt-stack-sm text-xs',
              isMedium && 'mt-stack-sm text-xs',
              isSmall && 'mt-3 text-[11px]',
            )}
          >
            <ExternalLink className={clsx(isSmall ? 'h-3 w-3' : 'w-3.5 h-3.5')} />
            {t('result.openOnYoutube')}
          </a>
        </div>
      </div>
    </Card>
  );
}
