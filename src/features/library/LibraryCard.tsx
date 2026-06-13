import { Bookmark, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Badge from '../../shared/components/atoms/Badge';
import IconButton from '../../shared/components/atoms/IconButton';
import Text from '../../shared/components/atoms/Text';
import type { KeptItem } from './types';

interface LibraryCardProps {
  item: KeptItem;
  onRemove: (videoId: string) => void;
}

export default function LibraryCard({ item, onRemove }: LibraryCardProps) {
  const { t } = useTranslation();
  const { video } = item;

  return (
    <article className="overflow-hidden rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <Link
        to={`/result?url=${encodeURIComponent(video.videoUrl)}`}
        className="block text-inherit no-underline"
      >
        <div className="relative aspect-video overflow-hidden bg-surface">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
            {video.duration}
          </span>
        </div>

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

          <div className="mb-stack-md flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-inline-xs">
              <FileText className="h-3.5 w-3.5" />
              {video.outcomes.length}
            </span>
            <span className="flex items-center gap-inline-xs">
              <Bookmark className="h-3.5 w-3.5" />
              {t('keep.kept')}
            </span>
          </div>
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
            onClick={() => onRemove(video.id)}
          />
        </div>
      </div>
    </article>
  );
}
