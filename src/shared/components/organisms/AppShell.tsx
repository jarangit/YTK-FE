import clsx from 'clsx';

interface AppShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  player?: React.ReactNode;
  className?: string;
}

export default function AppShell({ sidebar, children, player, className }: AppShellProps) {
  return (
    <div className={clsx('min-h-screen bg-[var(--color-bg-app)]', className)}>
      {sidebar}
      <main
        className="min-h-screen"
        style={{
          marginLeft: 'var(--sidebar-width)',
          padding: 'var(--content-padding-top) var(--content-padding-x)',
          paddingBottom: 'calc(var(--mini-player-height) + var(--space-6) + 24px)',
          maxWidth: 'var(--content-max-width)',
        }}
      >
        {children}
      </main>
      {player}
    </div>
  );
}
