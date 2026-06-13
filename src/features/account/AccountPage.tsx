import { useTranslation } from 'react-i18next';
import { useAuth } from '../../shared/auth/AuthContext';
import Text from '../../shared/components/atoms/Text';

export default function AccountPage() {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();

  return (
    <main className="min-h-[calc(100vh-var(--app-header-height))] bg-white px-inset-lg py-stack-xl sm:px-8 sm:py-stack-2xl">
      <section className="mx-auto w-full max-w-read">
        <Text variant="label" color="tertiary" as="p" className="mb-stack-sm">
          {t('account.eyebrow')}
        </Text>
        <Text variant="display" as="h1" className="mb-stack-md font-display">
          {t('account.title')}
        </Text>
        <Text variant="body" color="secondary" as="p" className="mb-stack-lg leading-7">
          {t('account.subtitle')}
        </Text>

        <div className="rounded-card border border-border/60 bg-surface p-inset-lg">
          <div className="flex items-center gap-inline-md">
            {user?.avatarUrl && (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-12 w-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-[length:var(--text-body-size)] font-semibold text-[var(--color-text-primary)]">
                {user?.name}
              </p>
              <p className="mt-stack-xs text-[length:var(--text-caption-size)] text-[var(--color-text-secondary)]">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={signOut}
            className="mt-stack-lg inline-flex h-[var(--app-header-control-height)] items-center rounded-full border border-border bg-white px-[var(--app-header-control-padding-x)] text-[length:var(--app-header-control-font-size)] font-semibold text-ink transition-colors hover:border-ink-faint hover:bg-white/70"
          >
            {t('auth.signOut')}
          </button>
        </div>
      </section>
    </main>
  );
}
