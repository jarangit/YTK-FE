import { Loader2, type LucideIcon } from 'lucide-react';
import Text from '../atoms/Text';

interface StateBlockProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
  loading?: boolean;
  action?: React.ReactNode;
}

export default function StateBlock({ title, description, icon: Icon, loading, action }: StateBlockProps) {
  return (
    <div className="flex flex-col items-center justify-center px-inset-lg py-stack-2xl text-center">
      {loading ? (
        <Loader2 className="mb-stack-md h-8 w-8 animate-spin text-accent" />
      ) : Icon ? (
        <div className="mb-stack-md flex h-14 w-14 items-center justify-center rounded-full bg-accent-light text-accent">
          <Icon className="h-6 w-6" />
        </div>
      ) : null}
      {title && (
        <Text variant="title" as="h2" className="mb-stack-xs">
          {title}
        </Text>
      )}
      {description && (
        <Text variant="body" color="secondary" as="p" className="max-w-[420px]">
          {description}
        </Text>
      )}
      {action && <div className="mt-stack-lg">{action}</div>}
    </div>
  );
}
