import { Loader2, X } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { useAuth } from '../../auth/AuthContext';

export default function SignInModal() {
  const { t } = useTranslation();
  const {
    user,
    isAuthenticated,
    isSigningIn,
    authError,
    isSignInModalOpen,
    closeSignInModal,
    signInWithGoogle,
    signOut,
  } = useAuth();

  useEffect(() => {
    if (!isSignInModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSignInModal();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [closeSignInModal, isSignInModalOpen]);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center px-inset-md transition-opacity duration-200',
        isSignInModalOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      aria-hidden={!isSignInModalOpen}
    >
      <button
        type="button"
        aria-label={t('auth.close')}
        onClick={closeSignInModal}
        className="absolute inset-0 bg-[var(--modal-overlay-background)] backdrop-blur-sm"
      />

      <section className="relative w-full max-w-[var(--modal-max-width)] rounded-[var(--modal-radius)] border border-border/60 bg-white p-[var(--modal-padding)] shadow-[var(--modal-shadow)] sm:p-[var(--modal-padding-wide)]">
        <div className="flex items-start justify-between gap-inline-md">
          <div>
            <p className="text-[length:var(--modal-eyebrow-font-size)] font-semibold uppercase tracking-[var(--modal-eyebrow-letter-spacing)] text-ink-faint">
              {t('auth.eyebrow')}
            </p>
            <h2 className="mt-stack-sm font-display text-[length:var(--modal-title-size)] font-semibold leading-[var(--modal-title-line-height)] text-ink">
              {isAuthenticated ? t('auth.accountTitle') : t('auth.title')}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSignInModal}
            aria-label={t('auth.close')}
            className="inline-flex h-[var(--app-header-control-height)] w-[var(--app-header-control-height)] items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-[var(--color-bg-hover)] hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isAuthenticated ? (
          <>
            <p className="mt-stack-md text-[length:var(--text-body-size)] leading-[var(--modal-body-line-height)] text-ink-muted">
              {t('auth.subtitle')}
            </p>

            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={isSigningIn}
              className="mt-stack-lg inline-flex w-full items-center justify-center gap-inline-sm rounded-full border border-border bg-white px-5 py-3.5 text-[length:var(--text-body-size)] font-semibold text-ink transition-all hover:border-ink-faint hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('auth.signingIn')}
                </>
              ) : (
                <>
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-border bg-white text-[length:var(--text-label-size)] font-bold text-[var(--modal-google-color)]">
                    G
                  </span>
                  {t('auth.continueWithGoogle')}
                </>
              )}
            </button>

            <p className="mt-stack-md text-[length:var(--text-caption-size)] leading-[var(--modal-disclaimer-line-height)] text-ink-faint">
              {t('auth.disclaimer')}
            </p>
            {authError && (
              <p className="mt-inline-md text-[length:var(--text-caption-size)] leading-[var(--modal-disclaimer-line-height)] text-red-500">{t(authError)}</p>
            )}
          </>
        ) : (
          <>
            <div className="mt-stack-xl flex items-center gap-inline-md rounded-[var(--modal-card-radius)] bg-surface px-inset-md py-stack-md">
              <img
                src={user?.avatarUrl}
                alt={user?.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-[length:var(--text-body-size)] font-semibold text-ink">{user?.name}</p>
                <p className="mt-stack-xs text-[length:var(--text-caption-size)] text-ink-muted">{user?.email}</p>
              </div>
            </div>

            <p className="mt-stack-md text-[length:var(--text-body-size)] leading-[var(--modal-body-line-height)] text-ink-muted">
              {t('auth.accountDescription')}
            </p>

            <div className="mt-stack-lg flex gap-inline-sm">
              <button
                type="button"
                onClick={closeSignInModal}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-surface px-5 py-3 text-[length:var(--app-header-control-font-size)] font-semibold text-ink transition-colors hover:bg-[var(--color-bg-hover)]"
              >
                {t('auth.done')}
              </button>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-5 py-3 text-[length:var(--app-header-control-font-size)] font-semibold text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
              >
                {t('auth.signOut')}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
