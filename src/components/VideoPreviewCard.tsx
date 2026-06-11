import { ExternalLink, Clock, User } from 'lucide-react';
import type { MockVideo } from '../types';

interface Props {
  video: MockVideo;
}

export default function VideoPreviewCard({ video }: Props) {
  return (
    <div className="bg-white rounded-card shadow-card overflow-hidden">
      <div className="aspect-video bg-ink-faint/10 relative overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded-md">
          {video.duration}
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <h2 className="font-display font-semibold text-lg text-ink leading-snug mb-2">
          {video.title}
        </h2>
        <div className="flex items-center gap-4 text-xs text-ink-muted">
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {video.channelName}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {video.duration}
          </span>
        </div>
        <a
          href={video.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-accent hover:text-accent-hover transition-colors no-underline"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          Open on YouTube
        </a>
      </div>
    </div>
  );
}
