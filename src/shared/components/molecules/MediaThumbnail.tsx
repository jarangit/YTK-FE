interface MediaThumbnailProps {
  src: string;
  alt: string;
  videoId?: string;
  duration?: string;
}

export default function MediaThumbnail({ src, alt, videoId, duration }: MediaThumbnailProps) {
  const normalizedVideoId = videoId?.trim();
  const embedUrl = normalizedVideoId
    ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(normalizedVideoId)}?controls=0&disablekb=1&modestbranding=1`
    : null;

  return (
    <div className="relative aspect-video overflow-hidden bg-surface">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={alt}
          className="pointer-events-none h-full w-full border-0"
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
        />
      ) : (
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      )}
      {duration && (
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
      )}
    </div>
  );
}
