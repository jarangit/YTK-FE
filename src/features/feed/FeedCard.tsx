import { ExternalLink, Heart, Bookmark, FileText, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FeedItem } from './types';
import Text from '../../shared/components/atoms/Text';
import Badge from '../../shared/components/atoms/Badge';
import IconButton from '../../shared/components/atoms/IconButton';
import Card from '../../shared/components/atoms/Card';
import MediaThumbnail from '../../shared/components/molecules/MediaThumbnail';
import MetadataRow from '../../shared/components/molecules/MetadataRow';
import { useTranslation } from 'react-i18next';

function extractVideoId(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    return url.searchParams.get('v') ?? videoUrl;
  } catch {
    return videoUrl;
  }
}

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
        <Link to={to ?? `/feed/${extractVideoId(item.videoUrl)}`} className="block no-underline text-inherit">
          {children}
        </Link>
      );

  return (
    <Card interactive>
      <CardLink>
        <MediaThumbnail
          src={item.thumbnailUrl}
          alt={item.title}
          videoId={extractVideoId(item.videoUrl)}
          duration={item.duration}
        />

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

          <MetadataRow
            className="mb-stack-md flex flex-wrap items-center gap-inline-md text-[12px] text-[var(--color-text-secondary)]"
            items={[
              { icon: FileText, label: t('feed.summaryCount', { count: item.summaryCount }) },
              { icon: Heart, label: item.likes },
              { icon: Bookmark, label: item.savedCount },
            ]}
          />

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
    </Card>
  );
}
