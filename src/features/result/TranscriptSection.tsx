import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Clock, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TranscriptSegment } from '../analysis/types';
import { Button } from '../../shared/components/atoms/Button';
import Card from '../../shared/components/atoms/Card';
import DropdownMenu from '../../shared/components/molecules/DropdownMenu';
import Toast from '../../shared/components/molecules/Toast';

interface TranscriptSectionProps {
  transcript: TranscriptSegment[];
}

type CopyStatus = 'idle' | 'withTime' | 'withoutTime' | 'error';

const PREVIEW_SEGMENT_COUNT = 4;

export function formatTranscriptTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
  }

  return [minutes, seconds].map((value) => String(value).padStart(2, '0')).join(':');
}

export default function TranscriptSection({ transcript }: TranscriptSectionProps) {
  const { t } = useTranslation();
  const [sectionOpen, setSectionOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visibleTranscript = expanded ? transcript : transcript.slice(0, PREVIEW_SEGMENT_COUNT);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const showCopyStatus = (status: CopyStatus) => {
    setCopyStatus(status);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setCopyStatus('idle'), 2500);
  };

  const copyTranscript = async (includeTimestamps: boolean) => {
    const content = transcript
      .map((segment) => includeTimestamps
        ? `[${formatTranscriptTime(segment.startSeconds)}] ${segment.text}`
        : segment.text)
      .join('\n');

    try {
      await navigator.clipboard.writeText(content);
      showCopyStatus(includeTimestamps ? 'withTime' : 'withoutTime');
    } catch {
      showCopyStatus('error');
    }
  };

  const toastMessage = copyStatus === 'error'
    ? t('transcript.copyError')
    : copyStatus === 'withTime'
      ? t('transcript.copiedWithTime')
      : t('transcript.copiedWithoutTime');

  return (
    <>
      <Card as="section" className="bg-white">
        <div className="flex items-center gap-inline-md p-inset-md sm:p-inset-lg">
          <button
            type="button"
            onClick={() => setSectionOpen((value) => !value)}
            className="flex min-w-0 flex-1 items-center justify-between gap-inline-md rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-expanded={sectionOpen}
            aria-controls="transcript-content"
          >
            <div>
              <h2 className="font-display text-lg font-semibold text-ink">{t('transcript.title')}</h2>
              <p className="mt-stack-xs text-sm text-ink-muted">{t('transcript.subtitle')}</p>
            </div>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-accent transition-transform duration-[var(--motion-duration-standard)] ${
                sectionOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {sectionOpen && transcript.length > 0 && (
            <DropdownMenu
              label={t('transcript.copy')}
              icon={Copy}
              items={[
                {
                  id: 'with-time',
                  label: t('transcript.copyWithTime'),
                  icon: Clock,
                  onSelect: () => void copyTranscript(true),
                },
                {
                  id: 'without-time',
                  label: t('transcript.copyWithoutTime'),
                  icon: Copy,
                  onSelect: () => void copyTranscript(false),
                },
              ]}
            />
          )}
        </div>

        <div
          id="transcript-content"
          className={`grid transition-[grid-template-rows,opacity] duration-[var(--motion-duration-standard)] ${
            sectionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="border-t border-border/50 px-inset-md pb-inset-md pt-inset-md sm:px-inset-lg sm:pb-inset-lg">
              {transcript.length === 0 ? (
                <p className="rounded-card bg-surface p-inset-md text-sm text-ink-muted">
                  {t('transcript.empty')}
                </p>
              ) : (
                <>
                  <ol className="divide-y divide-border/60">
                    {visibleTranscript.map((segment, index) => (
                      <li key={`${segment.startSeconds}-${index}`} className="grid grid-cols-[72px_1fr] gap-inline-md py-stack-md first:pt-0 last:pb-0">
                        <span className="inline-flex items-start gap-inline-xs font-mono text-xs font-semibold text-accent">
                          <Clock className="mt-px h-3.5 w-3.5 shrink-0" />
                          {formatTranscriptTime(segment.startSeconds)}
                        </span>
                        <p className="text-sm leading-6 text-ink">{segment.text}</p>
                      </li>
                    ))}
                  </ol>

                  {transcript.length > PREVIEW_SEGMENT_COUNT && (
                    <Button
                      variant="ghost"
                      size="sm"
                      iconRight={expanded ? ChevronUp : ChevronDown}
                      onClick={() => setExpanded((value) => !value)}
                      className="mt-stack-lg"
                      aria-expanded={expanded}
                    >
                      {expanded ? t('transcript.collapse') : t('transcript.expand', { count: transcript.length })}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Toast visible={copyStatus !== 'idle'}>
        <span className="inline-flex items-center gap-inline-xs">
          {copyStatus !== 'error' && <Check className="h-4 w-4" />}
          {toastMessage}
        </span>
      </Toast>
    </>
  );
}
