import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import Text from './atoms/Text';
import IconButton from './atoms/IconButton';

interface Props {
  message?: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: 'var(--color-accent-light)' }}
      >
        <Bookmark className="w-6 h-6" style={{ color: 'var(--color-accent)' }} />
      </div>
      <Text variant="title" as="p" className="mb-2">
        {message ?? "You haven't kept anything yet."}
      </Text>
      <Text variant="body" color="secondary" className="mb-6">
        Analyze a video and save it here to come back later.
      </Text>
      <Link to="/" className="no-underline">
        <IconButton
          icon={Bookmark}
          ariaLabel="Analyze a video"
          variant="filled"
          size="md"
        />
      </Link>
    </div>
  );
}
