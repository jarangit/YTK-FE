import { getShowGradient } from './podcasts.mock';
import clsx from 'clsx';

interface ShowCardProps {
  imageUrl?: string;
  title: string;
  category: string;
  meta: string;
  onClick?: () => void;
  className?: string;
}

export default function ShowCard({
  imageUrl,
  title,
  category,
  meta,
  onClick,
  className,
}: ShowCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex-shrink-0 text-left group cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-[var(--radius-md)]',
        className,
      )}
    >
      <div
        className={clsx(
          'w-[var(--show-card-image-size)] h-[var(--show-card-image-size)] rounded-[var(--radius-md)] overflow-hidden',
          'shadow-[var(--shadow-soft)] transition-all duration-300',
          'group-hover:shadow-[var(--shadow-elevated)] group-hover:-translate-y-0.5',
        )}
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
            style={{ background: getShowGradient(title) }}
          >
            <span className="text-[40px] font-[700] text-white/30 select-none">
              {title.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="mt-stack-sm px-0.5">
        <h3
          className="text-[13px] font-[600] leading-[1.3] text-[var(--color-text-primary)] line-clamp-1"
          style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {title}
        </h3>
        <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5 leading-[1.3] line-clamp-1">
          {category} · {meta}
        </p>
      </div>
    </button>
  );
}
