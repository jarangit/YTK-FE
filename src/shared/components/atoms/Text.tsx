import clsx from 'clsx';

interface TextProps {
  variant?: 'display' | 'title' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<TextProps['variant']>, string> = {
  display: 'text-[length:var(--text-display-size)] leading-[1.2] font-[700]',
  title: 'text-[length:var(--text-title-size)] leading-[1.3] font-[600]',
  body: 'text-[length:var(--text-body-size)] leading-[1.4] font-[400]',
  caption: 'text-[length:var(--text-caption-size)] leading-[1.4] font-[400]',
  label:
    'text-[length:var(--text-label-size)] leading-[1.3] font-[600] tracking-[var(--badge-letter-spacing)] uppercase',
};

const colorStyles: Record<NonNullable<TextProps['color']>, string> = {
  primary: 'text-[var(--color-text-primary)]',
  secondary: 'text-[var(--color-text-secondary)]',
  tertiary: 'text-[var(--color-text-tertiary)]',
  inverse: 'text-[var(--color-text-inverse)]',
};

export default function Text({
  variant = 'body',
  color = 'primary',
  as: Tag = 'span',
  children,
  className,
}: TextProps) {
  return (
    <Tag className={clsx(variantStyles[variant], colorStyles[color], className)}>
      {children}
    </Tag>
  );
}
