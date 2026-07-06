import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  outcomes: string[];
}

export default function OutcomeCard({ outcomes }: Props) {
  const { t } = useTranslation();

  if (outcomes.length === 0) return null;

  return (
    <section className="border-t border-accent/15 pt-stack-lg sm:pt-stack-xl">
      <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.02em] text-ink sm:text-[1.8rem] mb-stack-xs">
        {t('outcome.title')}
      </h2>
      <p className="max-w-[34rem] text-[15px] leading-7 text-ink-muted mb-stack-md">
        {t('outcome.subtitle')}
      </p>
      <ul className="space-y-stack-md">
        {outcomes.map((outcome, i) => (
          <li key={i} className="flex items-start gap-inline-sm border-l border-accent/20 pl-5 sm:pl-6">
            <CheckCircle className="w-4 h-4 text-accent mt-1 shrink-0" />
            <span className="text-[15px] leading-7 text-ink">{outcome}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
