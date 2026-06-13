import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../shared/auth/AuthContext';
import Avatar from '../../shared/components/atoms/Avatar';
import { Button } from '../../shared/components/atoms/Button';
import Dialog from '../../shared/components/organisms/Dialog';

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
    <Dialog open={isSignInModalOpen} onClose={closeSignInModal} closeLabel={t('auth.close')}>
        <div className="flex items-start justify-between gap-inline-md pr-[var(--app-header-control-height)]">
          <div>
            <p className="text-[length:var(--modal-eyebrow-font-size)] font-semibold uppercase tracking-[var(--modal-eyebrow-letter-spacing)] text-ink-faint">
              {t('auth.eyebrow')}
            </p>
            <h2 className="mt-stack-sm font-display text-[length:var(--modal-title-size)] font-semibold leading-[var(--modal-title-line-height)] text-ink">
              {isAuthenticated ? t('auth.accountTitle') : t('auth.title')}
            </h2>
          </div>
        </div>

        {!isAuthenticated ? (
          <>
            <p className="mt-stack-md text-[length:var(--text-body-size)] leading-[var(--modal-body-line-height)] text-ink-muted">
              {t('auth.subtitle')}
            </p>

            <Button
              type="button"
              onClick={() => void signInWithGoogle()}
              disabled={isSigningIn}
              variant="secondary"
              fullWidth
              className="mt-stack-lg h-auto py-3.5 text-[length:var(--text-body-size)]"
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
            </Button>

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
              <Avatar src={user?.avatarUrl} alt={user?.name} fallback={user?.name} />
              <div>
                <p className="text-[length:var(--text-body-size)] font-semibold text-ink">{user?.name}</p>
                <p className="mt-stack-xs text-[length:var(--text-caption-size)] text-ink-muted">{user?.email}</p>
              </div>
            </div>

            <p className="mt-stack-md text-[length:var(--text-body-size)] leading-[var(--modal-body-line-height)] text-ink-muted">
              {t('auth.accountDescription')}
            </p>

            <div className="mt-stack-lg flex gap-inline-sm">
              <Button
                type="button"
                onClick={closeSignInModal}
                variant="ghost"
                fullWidth
              >
                {t('auth.done')}
              </Button>
              <Button
                type="button"
                onClick={signOut}
                variant="secondary"
                fullWidth
              >
                {t('auth.signOut')}
              </Button>
            </div>
          </>
        )}
    </Dialog>
  );
}
