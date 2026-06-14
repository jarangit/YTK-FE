import clsx from 'clsx';

interface ContentTransitionProps {
  transitionKey: React.Key;
  children: React.ReactNode;
  className?: string;
}

export default function ContentTransition({
  transitionKey,
  children,
  className,
}: ContentTransitionProps) {
  return (
    <div key={transitionKey} className={clsx('content-transition-enter', className)}>
      {children}
    </div>
  );
}
