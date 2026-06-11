import clsx from 'clsx';

interface TextProps {
  variant?: 'display' | 'title' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'tertiary' | 'inverse';
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<NonNullable<TextProps['variant']>, string> = {
  display: 'text-[24px] leading-[1.2] font-[700]',
  title: 'text-[17px] leading-[1.3] font-[600]',
  body: 'text-[15px] leading-[1.4] font-[400]',
  caption: 'text-[13px] leading-[1.4] font-[400]',
  label: 'text-[11px] leading-[1.3] font-[600] tracking-[0.02em] uppercase',
};

const colorMap: Record<NonNullable<TextProps['color']>, string> = {
  primary: '--color-text-primary',
  secondary: '--color-text-secondary',
  tertiary: '--color-text-tertiary',
  inverse: '--color-text-inverse',
};

export default function Text({
  variant = 'body',
  color = 'primary',
  as: Tag = 'span',
  children,
  className,
}: TextProps) {
  return (
    <Tag
      className={clsx(variantStyles[variant], className)}
      style={{ color: `var(${colorMap[color]})` }}
    >
      {children}
    </Tag>
  );
}
