interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={className}>
      <h2 className="text-[22px] font-[700] leading-[1.2] text-[var(--color-text-primary)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[13px] font-[400] text-[var(--color-text-secondary)] mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}
