import { Lightbulb } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { AnalysisSummary } from '../analysis/types';
import Card from '../../shared/components/atoms/Card';

interface OverviewSectionProps {
  summary: AnalysisSummary;
}

export default function OverviewSection({ summary }: OverviewSectionProps) {
  const { t } = useTranslation();
  const overview = summary.summary.trim();
  const kicker = summary.oneLineSummary.trim();

  if (!overview) return null;

  return (
    <Card
      as="section"
      className="border-accent/20 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(246,248,250,1)_100%)]"
    >
      <div className="p-inset-lg sm:p-[calc(var(--space-inset-lg)*1.2)]">
        <div className="flex items-center gap-inline-xs text-sm font-semibold text-accent">
          <Lightbulb className="h-4 w-4" />
          <span className="uppercase tracking-[0.08em]">{t('summary.startHere')}</span>
        </div>
        <h2 className="mt-stack-sm max-w-[40rem] font-display text-[1.5rem] font-semibold leading-[1.25] tracking-[-0.02em] text-ink sm:text-[1.85rem]">
          {kicker || t('summary.overview')}
        </h2>
        <p className="mt-stack-md max-w-[46rem] text-base leading-8 text-ink-muted">{overview}</p>
      </div>
    </Card>
  );
}
