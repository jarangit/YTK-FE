import { ExternalLink, Heart, Bookmark, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeedItem } from './types';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';
import IconButton from '../../shared/components/atoms/IconButton';
import { useTranslation } from 'react-i18next';

interface FeedCardProps {
  item: FeedItem;
  to?: string;
  onClick?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function FeedCard({ item, to, onClick, onRemove }: FeedCardProps) {
  const { t } = useTranslation();

  const CardLink = onClick
    ? ({ children }: { children: React.ReactNode }) => (
        <div
          className="block no-underline text-inherit cursor-pointer"
          onClick={() => onClick(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(item.id); }}
        >
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <Link to={to ?? `/feed/${item.id}`} className="block no-underline text-inherit">
          {children}
        </Link>
      );

  return (
    <article className="overflow-hidden rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover">
      <CardLink>
        <div className="aspect-video relative overflow-hidden bg-surface">
          <img
            src={item.thumbnailUrl}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
            {item.duration}
          </span>
        </div>

        <div className="p-inset-md sm:p-inset-lg">
          <div className="mb-stack-sm flex flex-wrap items-center gap-inline-sm">
            <Badge variant="accent">{item.topic}</Badge>
            <Text variant="caption" color="tertiary">
              {item.publishedAt}
            </Text>
          </div>

          <Text variant="title" as="h3" className="mb-stack-sm leading-snug line-clamp-2">
            {item.title}
          </Text>

          <Text variant="caption" color="secondary" className="mb-stack-md line-clamp-2">
            {item.excerpt}
          </Text>

          <div className="mb-stack-md flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]">
            <span className="flex items-center gap-inline-xs">
              <FileText className="w-3.5 h-3.5" />
              {t('feed.summaryCount', { count: item.summaryCount })}
            </span>
            <span className="flex items-center gap-inline-xs">
              <Heart className="w-3.5 h-3.5" />
              {item.likes}
            </span>
            <span className="flex items-center gap-inline-xs">
              <Bookmark className="w-3.5 h-3.5" />
              {item.savedCount}
            </span>
          </div>

          <div className="mb-stack-md flex flex-wrap gap-inline-xs">
            {item.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </CardLink>

      <div className="px-inset-md sm:px-inset-lg pb-inset-md sm:pb-inset-lg">
        <div className="flex items-center justify-between gap-inline-md border-t border-[var(--color-border-subtle)] pt-stack-sm">
          <Text variant="caption" color="tertiary" className="truncate">
            {item.channelName}
          </Text>
          <div className="flex items-center gap-inline-xs">
            {onRemove && (
              <IconButton
                icon={Trash2}
                ariaLabel={t('card.remove')}
                variant="ghost"
                size="sm"
                onClick={() => onRemove(item.id)}
              />
            )}
            <a
              href={item.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-inline-xs text-xs font-medium text-accent no-underline transition-colors hover:text-accent-hover"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t('feed.openVideo')}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
