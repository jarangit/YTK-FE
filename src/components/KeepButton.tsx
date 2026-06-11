import { useState } from 'react';
import { Bookmark } from 'lucide-react';
import clsx from 'clsx';
import type { MockVideo } from '../types';

interface Props {
  video: MockVideo;
  onKeep: (video: MockVideo) => void;
  onRemove: (videoId: string) => void;
  initiallyKept?: boolean;
}

export default function KeepButton({ video, onKeep, onRemove, initiallyKept }: Props) {
  const [kept, setKept] = useState(initiallyKept ?? false);
  const [toast, setToast] = useState(false);

  const handleClick = () => {
    if (kept) {
      onRemove(video.id);
      setKept(false);
    } else {
      onKeep(video);
      setKept(true);
      setToast(true);
      setTimeout(() => setToast(false), 2500);
    }
  };

  return (
    <>
      <div className="bg-white rounded-card shadow-card p-5 sm:p-6">
        <h2 className="font-display font-semibold text-lg text-ink mb-1">
          Keep for later
        </h2>
        <p className="text-sm text-ink-muted mb-4">
          Save this to your library to revisit anytime.
        </p>
        <button
          type="button"
          onClick={handleClick}
          className={clsx(
            'inline-flex items-center gap-2 px-5 py-2.5 rounded-btn text-sm font-semibold transition-all active:scale-[0.98]',
            kept
              ? 'bg-accent-light text-accent border border-accent/20'
              : 'bg-accent text-white hover:bg-accent-hover',
          )}
        >
          <Bookmark className={clsx('w-4 h-4', kept && 'fill-accent')} />
          {kept ? 'Kept' : 'Keep It'}
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-white text-sm font-medium px-4 py-2.5 rounded-btn shadow-lg animate-[fadeInUp_0.3s_ease-out]">
          Saved to your library
        </div>
      )}
    </>
  );
}
