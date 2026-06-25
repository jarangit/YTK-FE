import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Card from '../../shared/components/atoms/Card';
import { Button } from '../../shared/components/atoms/Button';
import {
  getCookieConsentChoice,
  setCookieConsentChoice,
  type CookieConsentChoice,
} from '../../shared/analytics/cookieConsent';
import { initializeClarity } from '../../shared/analytics/clarity';

const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID ?? '';

export default function CookieConsentBanner() {
  const { t } = useTranslation();
  const [consentChoice, setConsentChoice] = useState<CookieConsentChoice | null>(null);

  useEffect(() => {
    setConsentChoice(getCookieConsentChoice());
  }, []);

  useEffect(() => {
    if (consentChoice === 'accepted') {
      initializeClarity(clarityProjectId);
    }
  }, [consentChoice]);

  const shouldRender = useMemo(
    () => clarityProjectId.trim().length > 0 && consentChoice === null,
    [consentChoice],
  );

  if (!shouldRender) {
    return null;
  }

  const handleChoice = (choice: CookieConsentChoice) => {
    setCookieConsentChoice(choice);
    setConsentChoice(choice);
  };

  return (
    <div className="fixed inset-x-inset-md bottom-inset-md z-50 sm:inset-x-auto sm:bottom-inset-lg sm:right-inset-lg sm:max-w-[420px]">
      <Card className="border-border/80 bg-[var(--color-bg-card)]">
        <div className="p-inset-md sm:p-inset-lg">
          <p className="text-sm font-semibold text-ink">{t('cookie.title')}</p>
          <p className="mt-stack-sm text-sm leading-6 text-ink-muted">
            {t('cookie.description')}
          </p>
          <div className="mt-stack-sm">
            <Link
              to="/privacy"
              className="text-sm font-medium text-accent no-underline hover:text-accent-hover"
            >
              {t('cookie.learnMore')}
            </Link>
          </div>
          <div className="mt-stack-lg flex flex-wrap gap-inline-sm">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleChoice('declined')}
            >
              {t('cookie.decline')}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => handleChoice('accepted')}
            >
              {t('cookie.accept')}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
