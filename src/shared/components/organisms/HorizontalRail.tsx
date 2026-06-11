import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface HorizontalRailProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function HorizontalRail({
  title,
  subtitle,
  children,
  className,
}: HorizontalRailProps) {
  const { t } = useTranslation();

  return (
    <section className={clsx('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[22px] font-[700] leading-[1.2] text-[var(--color-text-primary)]">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          className="flex items-center gap-0.5 text-[13px] font-[500] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
        >
          {t('rail.seeAll')}
          <ChevronRight size={14} />
        </button>
      </div>
      <div
        className="flex gap-3 overflow-x-auto pb-2 -mx-[var(--content-padding-x)] px-[var(--content-padding-x)] scrollbar-thin"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'var(--color-gray-300) transparent',
        }}
      >
        {children}
      </div>
    </section>
  );
}
