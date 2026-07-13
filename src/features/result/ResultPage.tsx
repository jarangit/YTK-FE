import { useSearchParams, Link } from "react-router-dom";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLibraryQuery } from "../library/hooks/useLibraryQuery";
import ResultContent from "./ResultContent";
import { useVideoAnalysisQuery } from "./hooks/useVideoAnalysisQuery";
import ContentTransition from "../../shared/components/atoms/ContentTransition";
import Card from "../../shared/components/atoms/Card";
import TranscriptSection from "./TranscriptSection";
import ResultWaitingQuestions from "./ResultWaitingQuestions";

export default function ResultPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const analysisId =
    searchParams.get("analysisId") ?? searchParams.get("videoId") ?? "";
  const { data, isLoading, isError } = useVideoAnalysisQuery(analysisId);
  const { add, remove, check } = useLibraryQuery();
  const video = data?.video ?? null;
  const status = data?.status;
  const transcript = data?.transcript ?? [];
  const transcriptEn = data?.transcriptEn;
  const transcriptTh = data?.transcriptTh;
  const failureMessage = data?.failureMessage;
  const youtubeUrl = data?.youtubeUrl;

  const isWaiting =
    isLoading || status === "PENDING" || status === "PROCESSING";
  const isFailed = status === "FAILED";
  const isMissingAnalysisId = analysisId.trim().length === 0;
  const resultState = isWaiting ? "loading" : video ? "success" : "error";

  let content: React.ReactNode;

  if (isMissingAnalysisId) {
    content = (
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-inset-lg">
        <div className="text-center">
          <p className="text-sm text-ink-muted mb-stack-md">
            {t("result.missing")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> {t("result.retry")}
          </Link>
        </div>
      </main>
    );
  } else if (isWaiting) {
    content = <ResultWaitingQuestions />;
  } else if (isFailed) {
    content = (
      <main className="min-h-[calc(100vh-64px)] px-inset-lg py-stack-md sm:py-10">
        <div className="mx-auto max-w-read space-y-stack-md sm:space-y-stack-lg">
          <Card padded as="section" className="bg-[var(--color-bg-card)]">
            <div className="flex items-start gap-inline-sm">
              <div className="mt-1 rounded-full bg-danger-soft p-2 text-danger">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h1 className="font-display text-lg font-semibold text-ink">
                  {t("result.failed")}
                </h1>
                <p className="mt-stack-xs text-sm text-ink-muted">
                  {failureMessage || t("result.failedDescription")}
                </p>

                <div className="mt-stack-md flex flex-wrap items-center gap-inline-md">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
                  >
                    <ArrowLeft className="w-4 h-4" /> {t("result.retry")}
                  </Link>
                  {youtubeUrl && (
                    <a
                      href={youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
                    >
                      {t("result.openOnYoutube")}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {transcript.length > 0 && (
            <TranscriptSection
              transcript={transcript}
              transcriptEn={transcriptEn}
              transcriptTh={transcriptTh}
            />
          )}
        </div>
      </main>
    );
  } else if (isError || !video) {
    content = (
      <main className="min-h-[calc(100vh-64px)] flex items-center justify-center px-inset-lg">
        <div className="text-center">
          <p className="text-sm text-ink-muted mb-stack-md">
            {t("result.error")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-inline-xs text-sm font-medium text-accent hover:text-accent-hover no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> {t("result.retry")}
          </Link>
        </div>
      </main>
    );
  } else {
    content = (
      <main className="min-h-[calc(100vh-64px)]">
        <section className="border-b border-accent/15 bg-accent/[0.04]">
          <div className="mx-auto max-w-[var(--app-header-max-width)] px-inset-lg py-3 sm:px-8">
            <div className="flex flex-col gap-stack-xs sm:flex-row sm:items-center sm:gap-inline-sm">
              <span className="inline-flex w-fit items-center rounded-full border border-accent/15 bg-accent/5 px-3 py-1 text-xs font-semibold text-accent">
                {t('summary.summaryOnlyTag')}
              </span>
              <p className="text-sm leading-6 text-ink-muted">
                {t('summary.summaryOnlyNote')}
              </p>
            </div>
          </div>
        </section>

        <div className="px-inset-lg py-stack-md sm:py-10">
          <ResultContent
            video={video}
            onKeep={add}
            onRemove={remove}
            initiallyKept={check(video.analysisId)}
          />
        </div>
      </main>
    );
  }

  return (
    <ContentTransition transitionKey={resultState}>{content}</ContentTransition>
  );
}
