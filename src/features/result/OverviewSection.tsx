import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

interface OverviewSectionProps {
  overview?: string;
}

export default function OverviewSection({ overview = '' }: OverviewSectionProps) {
  const { t } = useTranslation();
  const normalizedOverview = overview.trim();

  if (!normalizedOverview) return null;

  return (
    <section className="border-t border-accent/20 pt-stack-lg sm:pt-stack-xl">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
          {t('summary.startHere')}
        </div>
        <h2 className="mt-stack-sm max-w-[34rem] font-display text-[1.7rem] font-semibold leading-[1.08] tracking-[-0.03em] text-ink sm:text-[2.3rem]">
          {t('summary.overview')}
        </h2>
        <div className="mt-stack-md max-w-[42rem] border-l-2 border-accent/25 pl-5 sm:pl-6 text-[1.06rem] leading-[1.95] text-ink [&>p]:mb-stack-md [&>p:last-child]:mb-0">
          <ReactMarkdown>{normalizedOverview}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}
