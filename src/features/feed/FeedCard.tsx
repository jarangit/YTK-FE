import { memo } from 'react';
import { Bookmark, Clock, Sparkles, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import type { FeedItem } from './types';
import IconButton from '../../shared/components/atoms/IconButton';
import Card from '../../shared/components/atoms/Card';
import { Button } from '../../shared/components/atoms/Button';

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
  layout?: 'auto' | 'stacked';
}

function metadataString(item: FeedItem, key: string) {
  const value = item.metadata?.[key];
  return typeof value === 'string' ? value : '';
}

function formatDuration(totalSeconds: number | null) {
  if (totalSeconds == null) return '';
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function formatScore(score: number) {
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

function titleCase(value: string) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function YouTubeLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M21.58 7.19a2.99 2.99 0 0 0-2.1-2.12C17.62 4.5 12 4.5 12 4.5s-5.62 0-7.48.57a2.99 2.99 0 0 0-2.1 2.12A31.2 31.2 0 0 0 1.88 12c0 1.62.2 3.23.54 4.81a2.99 2.99 0 0 0 2.1 2.12c1.86.57 7.48.57 7.48.57s5.62 0 7.48-.57a2.99 2.99 0 0 0 2.1-2.12c.34-1.58.54-3.19.54-4.81 0-1.62-.2-3.23-.54-4.81Z"
        fill="#FF0033"
      />
      <path d="m10 15.5 5-3.5-5-3.5v7Z" fill="white" />
    </svg>
  );
}

function FeedCardComponent({ item, to, onClick, onRemove, onSave, saving = false, layout = 'auto' }: FeedCardProps) {
  const { t } = useTranslation();
  const isStacked = layout === 'stacked';
  const insight = metadataString(item, 'insight') || item.body;
  const description = item.analysis.summary && item.analysis.summary !== insight
    ? item.analysis.summary
    : item.body;
  const videoTitle = item.video.title ?? 'YouTube analysis';
  const channelName = item.video.channelName ?? 'Unknown channel';
  const duration = formatDuration(item.video.duration);
  const readTime = item.video.duration
    ? `${Math.max(1, Math.ceil(item.video.duration / 60))} min read`
    : `${Math.max(1, Math.ceil(insight.length / 520))} min read`;
  const keywords = item.keywords.slice(0, 3);
  const detailTarget = to ?? `/feed/${extractVideoId(item.video.youtubeUrl)}`;
  const cardBackground = item.video.thumbnail
    ? { backgroundImage: `url(${item.video.thumbnail})` }
    : undefined;

  const handleOpen = () => {
    onClick?.(item.id);
  };

  const handleOpenKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick(item.id);
    }
  };

  const stopCardClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const content = (
    <div
      className={clsx(
        'relative flex h-full flex-col overflow-hidden rounded-card bg-black',
        isStacked && 'min-h-[100%]',
        !isStacked && 'sm:min-h-[320px] lg:min-h-[300px]',
      )}
    >
      <div
        className={clsx(
          'relative aspect-video overflow-hidden bg-surface',
          !isStacked && 'sm:absolute sm:inset-y-0 sm:left-auto sm:right-0 sm:top-0 sm:h-auto sm:w-[54%] sm:aspect-auto',
        )}
      >
        {item.video.thumbnail ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={cardBackground}
            role="img"
            aria-label={videoTitle}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#d7ede5_0%,#9fc7b9_45%,#516c63_100%)]">
            <Sparkles className="h-12 w-12 text-white/70" aria-hidden="true" />
          </div>
        )}
        <div
          className={clsx(
            'absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.58)_100%)]',
            !isStacked && 'sm:bg-[linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.48)_34%,rgba(0,0,0,0.02)_68%)]',
          )}
        />
      </div>

      <div
        className={clsx(
          'relative z-[1] flex flex-1 flex-col p-inset-md',
          !isStacked && 'sm:min-h-[320px] sm:max-w-[70%] sm:p-inset-lg lg:min-h-[300px] lg:max-w-[64%]',
        )}
      >
        <div>
          <div className="mb-stack-sm flex items-center gap-inline-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-base font-semibold text-white shadow-[0_14px_32px_rgba(0,0,0,0.28)] ring-4 ring-black/80">
              {channelName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <h3 className="truncate font-display text-xl font-semibold leading-tight text-white">
                {channelName}
              </h3>
              <p className="mt-1 line-clamp-1 text-sm font-medium text-white/60">
                {videoTitle}
              </p>
            </div>
          </div>

          <p
            className={clsx(
              'line-clamp-2 max-w-[34rem] font-display text-[1.35rem] font-semibold leading-[1.14] text-white',
              !isStacked && 'sm:text-2xl',
            )}
          >
            {insight}
          </p>

          <p className="mt-stack-xs line-clamp-2 max-w-[32rem] text-sm leading-6 text-white/60">
            {description}
          </p>

          <div className="mt-stack-md flex flex-wrap items-center gap-y-stack-sm text-sm text-white/50">
            <div className="pr-inline-md">
              <div className="flex items-center gap-inline-xs font-semibold text-white">
                <Sparkles className="h-4 w-4 fill-current" aria-hidden="true" />
                {formatScore(item.score)}
              </div>
              <div className="mt-1 text-xs">score</div>
            </div>
            <div className="border-l border-white/10 px-inline-md">
              <div className="font-semibold text-white">{readTime}</div>
              <div className="mt-1 text-xs">duration</div>
            </div>
            <div className="border-l border-white/10 pl-inline-md">
              <div className="font-semibold text-white">{titleCase(item.type)}</div>
              <div className="mt-1 text-xs">type</div>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'mt-stack-md flex flex-col gap-stack-sm',
            isStacked && 'mt-auto pt-stack-md',
            !isStacked && 'sm:flex-row sm:items-end sm:justify-between sm:pr-44',
          )}
        >
          <div className="flex min-w-0 flex-wrap items-center gap-inline-sm">
            {keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full bg-white/10 px-inset-sm py-1 text-xs font-semibold text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.3)] ring-1 ring-white/10 backdrop-blur"
              >
                {keyword}
              </span>
            ))}
            {duration && (
              <span className="inline-flex items-center gap-inline-xs rounded-full bg-white/10 px-inset-sm py-1 text-xs font-semibold text-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.3)] ring-1 ring-white/10 backdrop-blur">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {duration}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        className={clsx(
          'relative z-20 mt-auto flex justify-end px-inset-md pb-inset-md',
          isStacked && 'justify-stretch',
          !isStacked && 'sm:absolute sm:bottom-inset-lg sm:right-inset-lg sm:px-0 sm:pb-0',
        )}
      >
        {onClick ? (
          <button
            type="button"
            className={clsx(
              'inline-flex shrink-0 items-center justify-center gap-inline-sm rounded-full border border-transparent bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1))_padding-box,linear-gradient(110deg,#34d399,#38bdf8,#a78bfa,#f472b6,#facc15)_border-box] font-semibold text-white no-underline transition-all hover:bg-[linear-gradient(rgba(255,255,255,0.15),rgba(255,255,255,0.15))_padding-box,linear-gradient(110deg,#34d399,#38bdf8,#a78bfa,#f472b6,#facc15)_border-box] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
              isStacked
                ? 'h-[var(--button-height-sm)] w-full justify-center px-inset-md text-[length:var(--button-font-size-sm)]'
                : 'h-[var(--button-height-md)] px-inset-xl text-[length:var(--button-font-size-md)]',
            )}
            onClick={(event) => {
              event.stopPropagation();
              onClick(item.id);
            }}
          >
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            {t('card.openSummary')}
          </button>
        ) : (
          <Link
            to={detailTarget}
            className={clsx(
              'inline-flex shrink-0 items-center justify-center gap-inline-sm rounded-full border border-transparent bg-[linear-gradient(rgba(255,255,255,0.1),rgba(255,255,255,0.1))_padding-box,linear-gradient(110deg,#34d399,#38bdf8,#a78bfa,#f472b6,#facc15)_border-box] font-semibold text-white no-underline shadow-[0_18px_45px_rgba(56,189,248,0.3),0_0_28px_rgba(167,139,250,0.3)] transition-all hover:bg-[linear-gradient(rgba(255,255,255,0.15),rgba(255,255,255,0.15))_padding-box,linear-gradient(110deg,#34d399,#38bdf8,#a78bfa,#f472b6,#facc15)_border-box] hover:text-white active:scale-[0.98]',
              isStacked
                ? 'h-[var(--button-height-sm)] w-full justify-center px-inset-md text-[length:var(--button-font-size-sm)]'
                : 'h-[var(--button-height-md)] px-inset-xl text-[length:var(--button-font-size-md)]',
            )}
            onClick={stopCardClick}
          >
            <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            {t('card.openSummary')}
          </Link>
        )}
      </div>

      <div className="absolute right-inset-md top-inset-md z-10 flex items-center gap-inline-xs sm:right-inset-lg sm:top-inset-lg">
        {onSave && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            loading={saving}
            onClick={(event) => {
              event.stopPropagation();
              onSave(item.id);
            }}
            aria-label={t('keep.button')}
            className="h-11 min-h-11 w-11 min-w-11 rounded-full border border-white/20 bg-black/55 p-0 text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl hover:bg-white/20"
          >
            <Bookmark className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">{t('keep.button')}</span>
          </Button>
        )}
        <a
          href={item.video.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 min-h-11 w-11 min-w-11 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-colors hover:bg-white/20"
          aria-label={t('feed.openVideo')}
          onClick={stopCardClick}
        >
          <YouTubeLogo className="h-4 w-4" />
        </a>
      </div>

      {onRemove && (
        <div
          className="absolute bottom-inset-md left-inset-md z-10 sm:bottom-inset-lg sm:left-inset-lg"
          onClick={stopCardClick}
        >
          <IconButton
            icon={Trash2}
            ariaLabel={t('card.remove')}
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
          />
        </div>
      )}
    </div>
  );

  return (
    <Card className="relative h-full rounded-card border-white/10 bg-black shadow-none">
      {onClick ? (
        <div
          className="block h-full cursor-pointer text-inherit no-underline"
          onClick={handleOpen}
          role="button"
          aria-label={`${t('card.openSummary')}: ${videoTitle}`}
          tabIndex={0}
          onKeyDown={handleOpenKeyDown}
        >
          {content}
        </div>
      ) : (
        <div className="h-full text-inherit no-underline">
          {content}
          <Link
            to={detailTarget}
            className="absolute inset-0 z-[2]"
            aria-label={`${t('card.openSummary')}: ${videoTitle}`}
          >
            <span className="sr-only">{t('card.openSummary')}</span>
          </Link>
        </div>
      )}
    </Card>
  );
}

const FeedCard = memo(FeedCardComponent);

export default FeedCard;
