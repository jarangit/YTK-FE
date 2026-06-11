import { Link } from 'react-router-dom';
import { ExternalLink, Trash2, CheckCircle } from 'lucide-react';
import type { KeptItem } from '../types';

interface Props {
  item: KeptItem;
  onRemove: (videoId: string) => void;
}

export default function LibraryCard({ item, onRemove }: Props) {
  const { video, keptAt } = item;
  const keptDate = new Date(keptAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden transition-shadow hover:shadow-card-hover">
      <div className="flex flex-col sm:flex-row">
        <div className="sm:w-48 shrink-0">
          <div className="aspect-video sm:aspect-[16/9] bg-ink-faint/10 relative overflow-hidden">
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-semibold text-sm text-ink leading-snug mb-1.5 line-clamp-2">
              {video.title}
            </h3>
            <ul className="space-y-1 mb-2">
              {video.outcomes.slice(0, 2).map((o, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-ink-muted">
                  <CheckCircle className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
            <span className="text-xs text-ink-faint">{keptDate}</span>
            <div className="flex items-center gap-1">
              <Link
                to={`/result?url=${encodeURIComponent(video.videoUrl)}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-btn text-xs font-medium text-accent hover:bg-accent-light transition-colors no-underline"
              >
                <ExternalLink className="w-3 h-3" />
                Open summary
              </Link>
              <button
                type="button"
                onClick={() => onRemove(video.id)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-btn text-xs font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
