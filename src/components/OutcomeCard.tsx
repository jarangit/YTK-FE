import { CheckCircle } from 'lucide-react';

interface Props {
  outcomes: string[];
}

export default function OutcomeCard({ outcomes }: Props) {
  return (
    <div className="bg-white rounded-card shadow-card p-5 sm:p-6">
      <h2 className="font-display font-semibold text-lg text-ink mb-1">
        After this video, you'll be able to…
      </h2>
      <p className="text-sm text-ink-muted mb-4">
        These are the concrete outcomes you can expect from watching.
      </p>
      <ul className="space-y-2.5">
        {outcomes.map((outcome, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckCircle className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            <span className="text-sm text-ink leading-relaxed">{outcome}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
