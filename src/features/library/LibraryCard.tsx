import { useState } from 'react';
import { Bookmark, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Badge from '../../shared/components/atoms/Badge';
import IconButton from '../../shared/components/atoms/IconButton';
import Text from '../../shared/components/atoms/Text';
import type { KeptItem } from './types';
import Card from '../../shared/components/atoms/Card';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';

interface LibraryCardProps {
  item: KeptItem;
  onRemove: (videoId: string) => void;
}

export default function LibraryCard({ item, onRemove }: LibraryCardProps) {
  const { t } = useTranslation();
  const { video } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    window.setTimeout(() => onRemove(video.id), 160);
  };

  return (
    <Card
      interactive
      aria-hidden={isRemoving}
      className={isRemoving ? 'pointer-events-none scale-[0.98] opacity-0' : 'scale-100 opacity-100'}
    >
      <Link
        to={`/result?url=${encodeURIComponent(video.videoUrl)}`}
        className="block text-inherit no-underline"
      >
        <MediaThumbnail src={video.thumbnailUrl} alt={video.title} duration={video.duration} />

        <div className="p-inset-md sm:p-inset-lg">
          <div className="mb-stack-sm flex flex-wrap items-center gap-inline-sm">
            <Badge variant="accent">{t('library.savedBadge')}</Badge>
            <Text variant="caption" color="tertiary">
              {new Date(item.keptAt).toLocaleDateString('en-US', {
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
            {video.outcomes[0] ?? video.summary.bigIdea}
          </Text>

          <MetadataRow
            className="mb-stack-md flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]"
            items={[
              { icon: FileText, label: video.outcomes.length },
              { icon: Bookmark, label: t('keep.kept') },
            ]}
          />
        </div>
      </Link>

      <div className="px-inset-md pb-inset-md sm:px-inset-lg sm:pb-inset-lg">
        <div className="flex items-center justify-between gap-inline-md border-t border-[var(--color-border-subtle)] pt-stack-sm">
          <Text variant="caption" color="tertiary" className="truncate">
            {video.channelName}
          </Text>
          <IconButton
            icon={Trash2}
            ariaLabel={t('card.remove')}
            variant="ghost"
            size="sm"
            onClick={handleRemove}
          />
        </div>
      </div>
    </Card>
  );
}
