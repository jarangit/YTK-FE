interface MediaThumbnailProps {
  src: string;
  alt: string;
  duration?: string;
}

export default function MediaThumbnail({ src, alt, duration }: MediaThumbnailProps) {
  return (
    <div className="relative aspect-video overflow-hidden bg-surface">
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      {duration && (
        <span className="absolute bottom-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
          {duration}
        </span>
      )}
    </div>
  );
}
