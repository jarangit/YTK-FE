import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Button } from '../../shared/components/atoms/Button';
import Card from '../../shared/components/atoms/Card';
import FormField from '../../shared/components/molecules/FormField';
import Toast from '../../shared/components/molecules/Toast';
import RatingPills from '../../shared/components/atoms/RatingPills';
import ReasonChips from '../../shared/components/atoms/ReasonChips';
import Textarea from '../../shared/components/atoms/Textarea';
import { postFeedback, ApiRequestError } from './api/feedbackApi';
import { FEEDBACK_RATINGS, FEEDBACK_REASONS, type FeedbackRating, type FeedbackReason } from './types';

const COMMENT_MAX_LENGTH = 500;

interface FeedbackFormProps {
  analysisId?: string;
  className?: string;
  bare?: boolean;
  hideHeader?: boolean;
  fullWidthSubmit?: boolean;
  onSubmitSuccess?: () => void;
}

interface FeedbackErrorResponse {
  data?: {
    code?: string;
    message?: string[];
  };
}

export default function FeedbackForm({
  analysisId,
  className,
  bare,
  hideHeader,
  fullWidthSubmit,
  onSubmitSuccess,
}: FeedbackFormProps) {
  const { t } = useTranslation();
  const [rating, setRating] = useState<FeedbackRating | null>(null);
  const [reasons, setReasons] = useState<FeedbackReason[]>([]);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const showToast = (message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(''), 2500);
  };

  const toggleReason = (reason: FeedbackReason) => {
    setReasons((current) => (
      current.includes(reason)
        ? current.filter((item) => item !== reason)
        : [...current, reason]
    ));
  };

  const resetForm = () => {
    setRating(null);
    setReasons([]);
    setComment('');
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!rating) {
      setError(t('feedback.ratingRequired'));
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await postFeedback({
        analysisId,
        rating,
        comment,
        reasons,
      });

      resetForm();
      showToast(response.message || t('feedback.success'));
      onSubmitSuccess?.();
    } catch (submitError) {
      if (submitError instanceof ApiRequestError) {
        const payload = submitError.data as FeedbackErrorResponse | undefined;
        const code = payload?.data?.code;

        if (code === 'ANALYSIS_NOT_FOUND') {
          setError(t('feedback.analysisNotFound'));
          return;
        }

        const messages = payload?.data?.message;
        if (Array.isArray(messages) && messages.length > 0) {
          setError(messages[0]);
          return;
        }
      }

      setError(t('feedback.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingOptions = FEEDBACK_RATINGS.map((value) => ({
    value,
    label: t(`feedback.rating.${value}`),
  }));

  const reasonOptions = FEEDBACK_REASONS.map((value) => ({
    value,
    label: t(`feedback.reason.${value}`),
  }));

  const content = (
    <>
      {!hideHeader && (
        <>
          <h2 className="font-display text-lg font-semibold text-ink">{t('feedback.title')}</h2>
          <p className="mt-stack-xs text-sm text-ink-muted">{t('feedback.subtitle')}</p>
        </>
      )}

      <form onSubmit={handleSubmit} className={clsx('space-y-stack-md', !hideHeader && 'mt-stack-md')}>
        <FormField id="feedback-rating" label={t('feedback.ratingLabel')} error={error}>
          <RatingPills
            id="feedback-rating"
            options={ratingOptions}
            value={rating}
            onChange={(value) => {
              setRating(value);
              if (error) setError('');
            }}
            disabled={isSubmitting}
          />
        </FormField>

        <FormField id="feedback-reasons" label={t('feedback.reasonsLabel')}>
          <ReasonChips
            id="feedback-reasons"
            options={reasonOptions}
            value={reasons}
            onToggle={toggleReason}
            disabled={isSubmitting}
          />
        </FormField>

        <FormField id="feedback-comment" label={t('feedback.commentLabel')}>
          <Textarea
            id="feedback-comment"
            name="feedback-comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={t('feedback.commentPlaceholder')}
            maxLength={COMMENT_MAX_LENGTH}
            disabled={isSubmitting}
            rows={3}
          />
        </FormField>

        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          loading={isSubmitting}
          fullWidth={fullWidthSubmit}
        >
          {isSubmitting ? t('feedback.submitting') : t('feedback.submit')}
        </Button>
      </form>

      <Toast visible={Boolean(toastMessage)}>{toastMessage}</Toast>
    </>
  );

  if (bare) {
    return <div className={className}>{content}</div>;
  }

  return (
    <Card padded as="section" className={className}>
      {content}
    </Card>
  );
}
