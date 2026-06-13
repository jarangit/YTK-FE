import clsx from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  interactive?: boolean;
  padded?: boolean;
  children: React.ReactNode;
}

export default function Card({
  as: Tag = 'article',
  interactive = false,
  padded = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <Tag
      className={clsx(
        'overflow-hidden rounded-card border border-[var(--color-border-subtle)] bg-[var(--color-bg-card)] shadow-card',
        interactive && 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover',
        padded && 'p-inset-md sm:p-inset-lg',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
