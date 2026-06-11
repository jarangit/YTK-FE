import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  outcomes: string[];
}

export default function OutcomeCard({ outcomes }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-card shadow-card p-inset-md sm:p-inset-lg">
      <h2 className="font-display font-semibold text-lg text-ink mb-stack-xs">
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
    </div>
  );
}
