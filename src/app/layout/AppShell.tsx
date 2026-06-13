import clsx from 'clsx';

interface AppShellProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  player?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function AppShell({
  sidebar,
  children,
  player,
  className,
  contentClassName,
}: AppShellProps) {
  return (
    <div className={clsx('app-shell', className)}>
      {sidebar}
      <main className="app-shell__main">
        <div className={clsx('app-shell__content', contentClassName)}>
          {children}
        </div>
      </main>
      {player}
    </div>
  );
}
