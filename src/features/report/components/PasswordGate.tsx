import { useTranslation } from 'react-i18next';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Lock } from 'lucide-react';

const STORAGE_KEY = 'report_password_verified';

interface PasswordGateProps {
  children: ReactNode;
}

const REPORT_PASSWORD = import.meta.env.VITE_REPORT_PASSWORD as string | undefined;

export default function PasswordGate({ children }: PasswordGateProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState(
    () => !REPORT_PASSWORD || sessionStorage.getItem(STORAGE_KEY) === 'true',
  );

  if (!REPORT_PASSWORD) {
    return <>{children}</>;
  }

  if (verified) {
    return <>{children}</>;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (value === REPORT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setVerified(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[var(--color-bg-app)] px-inset-lg">
      <div className="w-full max-w-[400px] text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-light)]">
          <Lock className="h-6 w-6 text-[var(--color-accent)]" />
        </div>

        <h1 className="mb-2 font-display text-2xl font-semibold text-ink">
          {t('report.passwordTitle')}
        </h1>

        <form onSubmit={handleSubmit} className="mt-6 text-left">
          <label
            htmlFor="report-password"
            className="mb-2 block text-sm font-medium text-ink-muted"
          >
            {t('report.passwordLabel')}
          </label>
          <input
            id="report-password"
            type="password"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError(false);
            }}
            className="w-full rounded-card border border-[var(--color-border-medium)] bg-[var(--color-bg-card)] px-4 py-3 text-base text-ink outline-none transition-colors focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-focus-ring)]"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-sm text-[var(--color-danger)]">
              {t('report.passwordIncorrect')}
            </p>
          )}
          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-[var(--color-accent)] px-6 py-3 text-base font-semibold text-[var(--color-accent-contrast)] transition-opacity hover:opacity-90"
          >
            {t('report.passwordSubmit')}
          </button>
        </form>
      </div>
    </main>
  );
}
