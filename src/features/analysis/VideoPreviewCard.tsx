import { ExternalLink, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VideoAnalysis } from './types';
import Card from '../../shared/components/atoms/Card';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';

interface Props {
  video: VideoAnalysis;
  action?: React.ReactNode;
}

export default function VideoPreviewCard({ video, action }: Props) {
  const { t } = useTranslation();
  const videoId = video.videoId.trim();
  const embedUrl = videoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`
    : null;

  return (
    <Card className="bg-[var(--color-bg-card)]">
      {embedUrl ? (
        <div className="aspect-video overflow-hidden bg-surface">
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
        <MediaThumbnail
          src={video.thumbnailUrl}
          alt={video.title}
          videoId={video.videoId}
          duration={video.duration}
        />
      )}
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex flex-col gap-stack-md sm:flex-row sm:items-start sm:justify-between">
          <h2 className="font-display text-lg font-semibold leading-snug text-ink">
            {video.title}
          </h2>
          {action && <div className="shrink-0">{action}</div>}
        </div>
        <MetadataRow
          className="mt-stack-sm flex items-center gap-inline-lg text-xs text-ink-muted"
          items={[
            { icon: User, label: video.channelName },
            { icon: Clock, label: video.duration },
          ]}
        />
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-inline-xs mt-stack-sm text-xs font-medium text-accent hover:text-accent-hover transition-colors no-underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          {t('result.openOnYoutube')}
        </a>
      </div>
    </Card>
  );
}
