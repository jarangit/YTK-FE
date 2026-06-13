interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
};

export default function Avatar({ src, alt, fallback, size = 'lg' }: AvatarProps) {
  if (src) {
    return <img src={src} alt={alt ?? ''} className={`${sizeStyles[size]} rounded-full object-cover`} />;
  }

  return (
    <span className={`${sizeStyles[size]} inline-flex items-center justify-center rounded-full bg-surface font-semibold text-ink`}>
      {(fallback ?? alt ?? '?').charAt(0).toUpperCase()}
    </span>
  );
}
