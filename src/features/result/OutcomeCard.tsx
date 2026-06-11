import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  outcomes: string[];
}

export default function OutcomeCard({ outcomes }: Props) {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-card shadow-card p-5 sm:p-6">
      <h2 className="font-display font-semibold text-lg text-ink mb-1">
        {t('outcome.title')}
      </h2>
      <p className="text-sm text-ink-muted mb-4">
        {t('outcome.subtitle')}
      </p>
      <ul className="space-y-2.5">
        {outcomes.map((outcome, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="text-sm text-ink leading-relaxed">{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
