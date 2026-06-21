import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Card from '../../shared/components/atoms/Card';

interface Props {
  outcomes: string[];
}

export default function OutcomeCard({ outcomes }: Props) {
  const { t } = useTranslation();

  if (outcomes.length === 0) return null;

  return (
    <Card padded className="border-border/70 bg-surface">
      <h2 className="font-display font-semibold text-base text-ink mb-stack-xs">
        {t('outcome.title')}
      </h2>
      <p className="text-sm text-ink-muted mb-stack-md">
        {t('outcome.subtitle')}
      </p>
      <ul className="space-y-stack-sm">
        {outcomes.map((outcome, i) => (
          <li key={i} className="flex items-start gap-inline-sm">
            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="text-sm text-ink leading-relaxed">{outcome}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
