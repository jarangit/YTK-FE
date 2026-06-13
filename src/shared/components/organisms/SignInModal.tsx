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
        className="absolute inset-0 bg-black/18 backdrop-blur-sm"
      />

      <section className="relative w-full max-w-[420px] rounded-[28px] border border-border/60 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.12)] sm:p-8">
        <div className="flex items-start justify-between gap-inline-md">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-ink-faint">
              {t('auth.eyebrow')}
            </p>
            <h2 className="mt-2 font-display text-[28px] font-semibold leading-[1.1] text-ink">
              {isAuthenticated ? t('auth.accountTitle') : t('auth.title')}
            </h2>
          </div>
          <button
            type="button"
            onClick={closeSignInModal}
            aria-label={t('auth.close')}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-black/[0.04] hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {!isAuthenticated ? (
          <>
            <p className="mt-4 text-[15px] leading-6 text-ink-muted">
              {t('auth.subtitle')}
            </p>

            <button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={isSigningIn}
              className="mt-8 inline-flex w-full items-center justify-center gap-inline-sm rounded-full border border-border bg-white px-5 py-3.5 text-[15px] font-semibold text-ink transition-all hover:border-ink-faint hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningIn ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('auth.signingIn')}
                </>
              ) : (
                <>
                  <span className="grid h-5 w-5 place-items-center rounded-full border border-border bg-white text-[11px] font-bold text-[#4285F4]">
                    G
                  </span>
                  {t('auth.continueWithGoogle')}
                </>
              )}
            </button>

            <p className="mt-4 text-[13px] leading-5 text-ink-faint">
              {t('auth.disclaimer')}
            </p>
            {authError && (
              <p className="mt-3 text-[13px] leading-5 text-red-500">{t(authError)}</p>
            )}
          </>
        ) : (
          <>
            <div className="mt-6 flex items-center gap-inline-md rounded-[22px] bg-surface px-4 py-4">
              <img
                src={user?.avatarUrl}
                alt={user?.name}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-[15px] font-semibold text-ink">{user?.name}</p>
                <p className="mt-1 text-[13px] text-ink-muted">{user?.email}</p>
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-6 text-ink-muted">
              {t('auth.accountDescription')}
            </p>

            <div className="mt-8 flex gap-inline-sm">
              <button
                type="button"
                onClick={closeSignInModal}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-surface px-5 py-3 text-[14px] font-semibold text-ink transition-colors hover:bg-black/[0.04]"
              >
                {t('auth.done')}
              </button>
              <button
                type="button"
                onClick={signOut}
                className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-5 py-3 text-[14px] font-semibold text-ink-muted transition-colors hover:border-ink-faint hover:text-ink"
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
