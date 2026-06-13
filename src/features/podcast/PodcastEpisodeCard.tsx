import PlayPill from './components/PlayPill';
import { getGradientForChannel } from './podcasts.mock';
import clsx from 'clsx';

interface PodcastEpisodeCardProps {
  title: string;
  description: string;
  channelName: string;
  date: string;
  duration: string;
  imageUrl?: string;
  backgroundColor?: string;
  textColor?: string;
  isPlaying?: boolean;
  onPlay?: () => void;
  className?: string;
}

export default function PodcastEpisodeCard({
  title,
  description,
  channelName,
  date,
  duration,
  imageUrl,
  backgroundColor,
  textColor,
  isPlaying = false,
  onPlay,
  className,
}: PodcastEpisodeCardProps) {
  const bgColor = backgroundColor || '#f5a623';
  const txtColor = textColor || '#1d1d1f';

  return (
    <article
      className={clsx(
        'group relative flex-shrink-0 w-[var(--podcast-card-width)] rounded-[var(--radius-lg)] overflow-hidden',
        'bg-white shadow-[var(--shadow-soft)] transition-all duration-300',
        'hover:shadow-[var(--shadow-elevated)] hover:-translate-y-0.5',
        'cursor-pointer',
        className,
      )}
      style={{ willChange: 'transform' }}
    >
      <div
        className="relative w-full h-[var(--podcast-card-image-height)] overflow-hidden"
        style={{ backgroundColor: bgColor }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: getGradientForChannel(channelName),
            }}
          >
            <span
              className="text-[36px] font-[700] opacity-30 select-none"
              style={{ color: txtColor }}
            >
              {channelName.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute bottom-2.5 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <PlayPill duration={duration} isPlaying={isPlaying} onClick={onPlay} />
        </div>
      </div>

      <div className="p-3 space-y-1.5">
        <span className="block text-[11px] font-[600] tracking-[0.02em] uppercase text-[var(--color-text-tertiary)]">
          {channelName} · {date}
        </span>
        <h3
          className="text-[13px] font-[600] leading-[1.3] text-[var(--color-text-primary)] line-clamp-2"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {title}
        </h3>
        <p
          className="text-[12px] leading-[1.3] text-[var(--color-text-secondary)] line-clamp-2"
          style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
