import { useTranslation } from 'react-i18next';
import type { PeriodOption } from '../types';

const periods: PeriodOption[] = ['7d', '30d', '90d'];

interface PeriodSelectorProps {
  value: PeriodOption;
  onChange: (period: PeriodOption) => void;
}

export default function PeriodSelector({ value, onChange }: PeriodSelectorProps) {
  const { t } = useTranslation();

  const labelMap: Record<PeriodOption, string> = {
    '7d': t('report.period7d'),
    '30d': t('report.period30d'),
    '90d': t('report.period90d'),
  };

  return (
    <div className="inline-flex overflow-hidden rounded-full border border-[var(--color-border-medium)] bg-[var(--color-bg-elevated)]">
      {periods.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            value === p
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-contrast)]'
              : 'text-ink-muted hover:bg-[var(--color-bg-hover)]'
          }`}
        >
          {labelMap[p]}
        </button>
      ))}
    </div>
  );
}
