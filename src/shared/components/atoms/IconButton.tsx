import { type LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface IconButtonProps {
  icon: LucideIcon;
  ariaLabel: string;
  variant?: 'ghost' | 'filled';
  size?: 'sm' | 'md';
  onClick?: () => void;
  className?: string;
}

const sizeStyles = {
  sm: 'h-[var(--control-size-sm)] w-[var(--control-size-sm)]',
  md: 'h-[var(--control-size-md)] w-[var(--control-size-md)]',
};

const iconSizes = {
  sm: 'var(--control-icon-size-sm)',
  md: 'var(--control-icon-size-md)',
};

const variantStyles = {
  ghost:
    'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)] active:bg-[var(--color-bg-active)]',
  filled:
    'bg-accent text-[var(--color-accent-contrast)] hover:bg-accent-hover shadow-[var(--shadow-soft)]',
};

export default function IconButton({
  icon: Icon,
  ariaLabel,
  variant = 'ghost',
  size = 'md',
  onClick,
  className,
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center rounded-full transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]',
        sizeStyles[size],
        variantStyles[variant],
        className,
      )}
    >
      <Icon size={iconSizes[size]} />
    </button>
  );
}
