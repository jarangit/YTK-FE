import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ResultLoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div
      role="status"
      aria-label={t('result.loadingAnalysis')}
      className="flex flex-col items-center justify-center py-stack-2xl text-center"
    >
      <span className="sr-only">{t('result.loadingAnalysis')}</span>
      <Loader2 className="mb-stack-md h-10 w-10 animate-spin text-accent" />
      <p className="font-display text-base font-semibold text-ink">
        {t('result.loading')}
      </p>
      <p className="mt-stack-xs text-sm text-ink-muted">
        {t('result.loadingAnalysis')}
      </p>
    </div>
  );
}
