import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface PlayPillProps {
  duration: string;
  isPlaying?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PlayPill({ duration, isPlaying = false, onClick, className }: PlayPillProps) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex items-center gap-inline-sm px-inline-md py-stack-xs rounded-full text-[12px] font-[600]',
        'backdrop-blur-md transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        isPlaying
          ? 'bg-accent text-[var(--color-accent-contrast)] shadow-[var(--shadow-soft)]'
          : 'bg-white/90 text-[var(--color-text-primary)] hover:bg-white',
        className,
      )}
    >
      <Play size={12} fill={isPlaying ? 'currentColor' : 'none'} />
      <span>{isPlaying ? t('player.playing') : duration}</span>
    </button>
  );
}
