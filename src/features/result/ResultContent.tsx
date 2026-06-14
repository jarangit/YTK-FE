import AnalysisContent from '../analysis/AnalysisContent';
import type { VideoAnalysis } from '../analysis/types';
import TranscriptSection from './TranscriptSection';

interface ResultContentProps {
  video: VideoAnalysis;
  onKeep: (video: VideoAnalysis) => void;
  onRemove: (videoId: string) => void;
  initiallyKept: boolean;
}

export default function ResultContent(props: ResultContentProps) {
  return (
    <>
      <AnalysisContent {...props} />
      <div className="mx-auto mt-stack-md max-w-read sm:mt-stack-lg">
        <TranscriptSection transcript={props.video.transcript} />
      </div>
    </>
  );
}
