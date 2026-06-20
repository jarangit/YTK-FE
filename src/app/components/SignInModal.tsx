import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../shared/auth/AuthContext";
import Avatar from "../../shared/components/atoms/Avatar";
import { Button } from "../../shared/components/atoms/Button";
import Dialog from "../../shared/components/organisms/Dialog";

export default function SignInModal() {
  const { t } = useTranslation();
  const {
    user,
    isAuthenticated,
    isSigningIn,
    authError,
    isSignInModalOpen,
    closeSignInModal,
    reportGoogleSignInError,
    signInWithGoogle,
    signOut,
  } = useAuth();

  useEffect(() => {
    if (!isSignInModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSignInModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeSignInModal, isSignInModalOpen]);

  return (
    <Dialog
      open={isSignInModalOpen}
      onClose={closeSignInModal}
      closeLabel={t("auth.close")}
    >
      <div className="flex items-start justify-between gap-inline-md pr-[var(--app-header-control-height)]">
        <div>
          <p className="text-[length:var(--modal-eyebrow-font-size)] font-semibold uppercase tracking-[var(--modal-eyebrow-letter-spacing)] text-ink-faint">
            {t("auth.eyebrow")}
          </p>
          <h2 className="mt-stack-sm font-display text-[length:var(--modal-title-size)] font-semibold leading-[var(--modal-title-line-height)] text-ink">
            {isAuthenticated ? t("auth.accountTitle") : t("auth.title")}
          </h2>
        </div>
      </div>

      {!isAuthenticated ? (
        <>
          <p className="mt-stack-md text-[length:var(--text-body-size)] leading-[var(--modal-body-line-height)] text-ink-muted">
            {t("auth.subtitle")}
          </p>

          <div className="mt-stack-lg flex min-h-[44px] items-center justify-center">
            {isSigningIn ? (
              <div className="inline-flex items-center gap-inline-sm text-sm font-medium text-ink-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("auth.signingIn")}
              </div>
            ) : import.meta.env.VITE_GOOGLE_CLIENT_ID &&
              import.meta.env.VITE_API_BASE_URL ? (
              <GoogleLogin
                onSuccess={(response) => {
                  if (response.credential) {
                    void signInWithGoogle(response.credential);
                  }
                }}
                onError={reportGoogleSignInError}
                useOneTap={false}
                theme="outline"
                shape="pill"
                size="large"
                width="340"
                text="continue_with"
              />
            ) : (
              <p className="text-sm text-danger">
                {t("auth.googleNotConfigured")}
              </p>
            )}
          </div>

          <p className="mt-stack-md text-[length:var(--text-caption-size)] leading-[var(--modal-disclaimer-line-height)] text-ink-faint">
            {t("auth.disclaimer")}
          </p>
          {authError && (
            <p className="mt-inline-md text-[length:var(--text-caption-size)] leading-[var(--modal-disclaimer-line-height)] text-danger">
              {t(authError)}
            </p>
          )}
        </>
      ) : (
        <>
          <div className="mt-stack-xl flex items-center gap-inline-md rounded-[var(--modal-card-radius)] bg-surface px-inset-md py-stack-md">
            <Avatar
              src={user?.avatarUrl ?? undefined}
              alt={user?.name ?? user?.email}
              fallback={user?.name ?? user?.email}
            />
            <div>
              <p className="text-[length:var(--text-body-size)] font-semibold text-ink">
                {user?.name}
              </p>
              <p className="mt-stack-xs text-[length:var(--text-caption-size)] text-ink-muted">
                {user?.email}
              </p>
            </div>
          </div>

          <p className="mt-stack-md text-[length:var(--text-body-size)] leading-[var(--modal-body-line-height)] text-ink-muted">
            {t("auth.accountDescription")}
          </p>

          <div className="mt-stack-lg flex gap-inline-sm">
            <Button
              type="button"
              onClick={closeSignInModal}
              variant="ghost"
              fullWidth
            >
              {t("auth.done")}
            </Button>
            <Button
              type="button"
              onClick={() => void signOut()}
              variant="secondary"
              fullWidth
            >
              {t("auth.signOut")}
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}
