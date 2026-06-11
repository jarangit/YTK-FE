import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface Props {
  onAnalyze?: (url: string) => void;
  compact?: boolean;
}

export default function UrlInputForm({ onAnalyze, compact }: Props) {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    const dest = `/result?url=${encodeURIComponent(url.trim())}`;
    if (onAnalyze) onAnalyze(url.trim());
    navigate(dest);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube URL here..."
            className="w-full h-12 pl-10 pr-4 bg-white border border-border rounded-btn text-sm text-ink placeholder:text-ink-faint outline-none transition-shadow focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,113,227,0.15)]"
            autoFocus={!compact}
            required
          />
        </div>
        <button
          type="submit"
          className="h-12 px-5 sm:px-6 bg-accent text-white rounded-btn text-sm font-semibold transition-all hover:bg-accent-hover active:scale-[0.98]"
        >
          Analyze
        </button>
      </div>
    </form>
  );
}
