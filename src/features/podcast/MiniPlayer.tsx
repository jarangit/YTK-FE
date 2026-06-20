import {
  Play,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface MiniPlayerProps {
  isPlaying?: boolean;
  title?: string;
  channelName?: string;
  progress?: number;
  onPlayPause?: () => void;
  className?: string;
}

export default function MiniPlayer({
  isPlaying = false,
  title = 'Easy English: Daily Phrases for Beginners',
  channelName = 'Easy Natural English',
  progress = 0.35,
  onPlayPause,
  className,
}: MiniPlayerProps) {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-player)]',
        'flex items-center gap-inline-lg h-[var(--mini-player-height)] px-5',
        'rounded-[var(--radius-xl)] bg-[color-mix(in_srgb,var(--color-bg-card)_88%,transparent)] backdrop-blur-xl',
        'shadow-[var(--shadow-heavy)] border border-[var(--color-border-subtle)]',
        'min-w-[480px] max-w-[600px]',
        'transition-all duration-300',
        className,
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-[600] text-[var(--color-text-primary)] truncate leading-tight">
          {title}
        </p>
        <p className="text-[11px] text-[var(--color-text-tertiary)] truncate leading-tight">
          {channelName}
        </p>
      </div>

      <div className="flex items-center gap-inline-md">
        <button
          type="button"
          aria-label={t('player.previous')}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <SkipBack size={18} />
        </button>

        <button
          type="button"
          aria-label={isPlaying ? t('player.pause') : t('player.play')}
          onClick={onPlayPause}
          className={clsx(
            'flex items-center justify-center w-10 h-10 rounded-full transition-all',
            'bg-accent text-[var(--color-accent-contrast)] hover:bg-accent-hover',
            'shadow-[var(--shadow-soft)]',
          )}
        >
          <Play size={18} fill="currentColor" />
        </button>

        <button
          type="button"
          aria-label={t('player.next')}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <SkipForward size={18} />
        </button>
      </div>

      <div className="flex items-center gap-inline-sm">
        <Volume2 size={14} className="text-[var(--color-text-tertiary)]" />
        <div className="w-16 h-1 rounded-full bg-[var(--color-gray-200)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--color-accent)] transition-all"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
