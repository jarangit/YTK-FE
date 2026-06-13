import { ExternalLink, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VideoAnalysis } from './types';
import Card from '../../shared/components/atoms/Card';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';

interface Props {
  video: VideoAnalysis;
}

export default function VideoPreviewCard({ video }: Props) {
  const { t } = useTranslation();

  return (
    <Card className="bg-white">
      <MediaThumbnail src={video.thumbnailUrl} alt={video.title} duration={video.duration} />
      <div className="p-inset-md sm:p-inset-lg">
        <h2 className="font-display font-semibold text-lg text-ink leading-snug mb-stack-sm">
          {video.title}
        </h2>
        <MetadataRow
          className="flex items-center gap-inline-lg text-xs text-ink-muted"
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
