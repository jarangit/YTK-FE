import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import VideoPreviewCard from '../components/VideoPreviewCard';
import OutcomeCard from '../components/OutcomeCard';
import SummaryAccordion from '../components/SummaryAccordion';
import KeepButton from '../components/KeepButton';
import { findMockVideo } from '../data/mockVideos';
import { useLibrary } from '../hooks/useLibrary';
import type { MockVideo } from '../types';

export default function ResultPage() {
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url') ?? '';
  const [video, setVideo] = useState<MockVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const { add, remove, check } = useLibrary();

  useEffect(() => {
    const timer = setTimeout(() => {
      const found = findMockVideo(url);
      setVideo(found ?? null);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [url]);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-56px)] flex items-center justify-center px-5">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-accent animate-spin mx-auto mb-4" />
          <p className="text-sm text-ink-muted">Analyzing video…</p>
        </div>
      </main>
    );
  }

  if (!video) {
    return (
      <main className="min-h-[calc(100vh-56px)] flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-sm text-ink-muted mb-4">Could not analyze this video.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> Try another URL
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-56px)] px-5 py-6 sm:py-10">
      <div className="mx-auto max-w-read space-y-5 sm:space-y-6">
        <VideoPreviewCard video={video} />
        <OutcomeCard outcomes={video.outcomes} />
        <SummaryAccordion summary={video.summary} />
        <KeepButton
          video={video}
          onKeep={add}
          onRemove={remove}
          initiallyKept={check(video.id)}
        />
      </div>
    </main>
  );
}
