import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';

interface Props {
  message?: string;
}

export default function EmptyState({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-5 text-center">
      <div className="w-14 h-14 rounded-full bg-accent-light flex items-center justify-center mb-4">
        <Bookmark className="w-6 h-6 text-accent" />
      </div>
      <p className="text-lg font-display font-semibold text-ink mb-2">
        {message ?? "You haven't kept anything yet."}
      </p>
      <p className="text-sm text-ink-muted mb-6">
        Analyze a video and save it here to come back later.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-btn text-sm font-semibold transition-all hover:bg-accent-hover active:scale-[0.98] no-underline"
      >
        Analyze a video
      </Link>
    </div>
  );
}
