import clsx from 'clsx';

interface PageLayoutProps {
  children: React.ReactNode;
  width?: 'read' | 'content';
  centered?: boolean;
  className?: string;
}

export default function PageLayout({ children, width = 'content', centered, className }: PageLayoutProps) {
  return (
    <main
      className={clsx(
        'min-h-[calc(100vh-var(--app-header-height))] bg-[var(--color-bg-app)] px-inset-lg py-stack-xl sm:px-8 sm:py-stack-2xl',
        centered && 'grid place-items-center',
        className,
      )}
    >
      <section className={clsx('mx-auto w-full', width === 'read' ? 'max-w-read' : 'max-w-[var(--content-max-width)]')}>
        {children}
      </section>
    </main>
  );
}
