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

  if (!overview) return null;

  return (
    <Card as="section" className="bg-[var(--color-bg-card)]">
      <div className="p-inset-md sm:p-inset-lg">
        <div className="flex items-center gap-inline-xs text-sm font-semibold text-ink">
          <Lightbulb className="h-4 w-4 text-accent" />
          <h2 className="font-display text-lg font-semibold text-ink">{t('summary.overview')}</h2>
        </div>
        <p className="mt-stack-sm max-w-[46rem] text-sm leading-7 text-ink-muted">{overview}</p>
      </div>
    </Card>
  );
}
