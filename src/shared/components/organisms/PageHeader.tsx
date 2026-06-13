import Text from '../atoms/Text';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function PageHeader({ eyebrow, title, subtitle, centered, className }: PageHeaderProps) {
  return (
    <header className={className}>
      {eyebrow && (
        <Text variant="label" color="tertiary" as="p" className="mb-stack-sm">
          {eyebrow}
        </Text>
      )}
      <Text variant="display" as="h1" className="mb-stack-md font-display">
        {title}
      </Text>
      {subtitle && (
        <Text
          variant="body"
          color="secondary"
          as="p"
          className={centered ? 'mx-auto max-w-[560px] leading-7' : 'leading-7'}
        >
          {subtitle}
        </Text>
      )}
    </header>
  );
}
