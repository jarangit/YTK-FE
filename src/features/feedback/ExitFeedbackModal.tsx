import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../shared/components/atoms/Button';
import Dialog from '../../shared/components/organisms/Dialog';
import FeedbackForm from './FeedbackForm';
import { useExitFeedbackGuard } from './ExitFeedbackContext';

export default function ExitFeedbackModal() {
  const { t } = useTranslation();
  const { activeAnalysisId, isModalOpen, markFeedbackGiven, skipFeedback } = useExitFeedbackGuard();

  useEffect(() => {
    if (!isModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        skipFeedback();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen, skipFeedback]);

  return (
    <Dialog open={isModalOpen} onClose={skipFeedback} closeLabel={t('feedback.exitModal.close')}>
      <p className="text-[length:var(--modal-eyebrow-font-size)] font-semibold uppercase tracking-[var(--modal-eyebrow-letter-spacing)] text-ink-faint">
        {t('feedback.exitModal.eyebrow')}
      </p>
      <h2 className="mt-stack-sm font-display text-[length:var(--modal-title-size)] font-semibold leading-[var(--modal-title-line-height)] text-ink">
        {t('feedback.exitModal.title')}
      </h2>

      <FeedbackForm
        analysisId={activeAnalysisId ?? undefined}
        bare
        hideHeader
        fullWidthSubmit
        onSubmitSuccess={markFeedbackGiven}
        className="mt-stack-lg"
      />

      <Button
        type="button"
        variant="link"
        onClick={skipFeedback}
        className="mt-stack-md"
      >
        {t('feedback.exitModal.skip')}
      </Button>
    </Dialog>
  );
}
