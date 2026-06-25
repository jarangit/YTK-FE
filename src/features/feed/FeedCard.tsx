import {
  Bookmark,
  Clock,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { FeedItem } from './types';
import Badge from '../../shared/components/atoms/Badge';
import IconButton from '../../shared/components/atoms/IconButton';
import Card from '../../shared/components/atoms/Card';
import { Button } from '../../shared/components/atoms/Button';
import VideoPreviewCard from '../analysis/VideoPreviewCard';
import { toVideoAnalysis } from './FeedDetailContent';

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
  onSave?: (id: string) => void;
  saving?: boolean;
}

function metadataString(item: FeedItem, key: string) {
  const value = item.metadata?.[key];
  return typeof value === 'string' ? value : '';
}

export default function FeedCard({ item, to, onClick, onRemove, onSave, saving = false }: FeedCardProps) {
  const { t } = useTranslation();
  const insight = metadataString(item, 'insight') || item.body;
  const displayTitle = insight;
  const description = item.analysis.summary && item.analysis.summary !== displayTitle
    ? item.analysis.summary
    : item.body;
  const videoTitle = item.video.title ?? 'YouTube analysis';
  const channelName = item.video.channelName ?? 'Unknown channel';
  const video = toVideoAnalysis(item);
  const readTime = item.video.duration
    ? `${Math.max(1, Math.ceil(item.video.duration / 60))} min read`
    : `${Math.max(1, Math.ceil(insight.length / 520))} min read`;

  const CardLink = onClick
    ? ({ children }: { children: React.ReactNode }) => (
        <div
          className="block cursor-pointer text-inherit no-underline"
          onClick={() => onClick(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onClick(item.id);
          }}
        >
          {children}
        </div>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <Link
          to={to ?? `/feed/${extractVideoId(item.video.youtubeUrl)}`}
          className="block text-inherit no-underline"
        >
          {children}
        </Link>
      );

  return (
    <Card className="group relative bg-[var(--color-bg-card)]">
      <div className="absolute right-inset-md top-inset-md z-10 flex items-center gap-inline-xs sm:right-inset-lg sm:top-inset-lg">
        <a
          href={item.video.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-[var(--control-size-sm)] w-[var(--control-size-sm)] items-center justify-center rounded-full text-[var(--color-text-tertiary)] transition-colors hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]"
          aria-label={t('feed.openVideo')}
        >
          <MoreHorizontal className="h-4 w-4" />
        </a>
      </div>

      <CardLink>
        <div className="grid min-h-[260px] gap-stack-lg p-inset-md pr-[calc(var(--space-4)+var(--control-size-sm))] sm:p-inset-lg sm:pr-[calc(var(--space-6)+var(--control-size-sm))] md:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] md:items-center md:gap-inline-xl">
          <div className="min-w-0">
            <div className="mb-stack-md flex flex-wrap items-center gap-inline-sm">
              <Badge variant="accent" className="gap-inline-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                {item.type.charAt(0) + item.type.slice(1).toLowerCase()}
              </Badge>
            </div>

            <h3 className="line-clamp-2 max-w-[42rem] font-display text-2xl font-semibold leading-[1.18] text-ink sm:text-3xl">
              {displayTitle}
            </h3>

            <p className="mt-stack-sm line-clamp-2 max-w-[42rem] text-[length:var(--text-body-size)] leading-7 text-[var(--color-text-secondary)]">
              {description}
            </p>

            {/* <div className="mt-stack-lg flex flex-wrap items-center gap-inline-lg text-sm text-[var(--color-text-tertiary)]">
              <span className="max-w-[18rem] truncate font-medium text-[var(--color-text-secondary)]">
                {videoTitle}
              </span>
              <span className="max-w-[12rem] truncate">{channelName}</span>
              <span className="inline-flex items-center gap-inline-xs">
                <Clock className="h-4 w-4" />
                {readTime}
              </span>
            </div> */}
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-card border border-[var(--color-border-subtle)] [&>article]:rounded-none [&>article]:border-0 [&>article]:shadow-none">
              <VideoPreviewCard video={video} size="xs" />
            </div>
          </div>
        </div>
      </CardLink>

      {/* <div className="absolute bottom-inset-md right-inset-md z-10 flex items-center gap-inline-xs sm:bottom-inset-lg sm:right-inset-lg">
          {onRemove && (
            <IconButton
              icon={Trash2}
              ariaLabel={t('card.remove')}
              variant="ghost"
              size="sm"
              onClick={() => onRemove(item.id)}
            />
          )}
          {onSave && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              iconLeft={Bookmark}
              loading={saving}
              onClick={() => onSave(item.id)}
              aria-label={t('keep.button')}
            >
              <span className="sr-only">{t('keep.button')}</span>
            </Button>
          )}
      </div> */}
    </Card>
  );
}
