const CRAWLER_RE = /bot|crawler|spider|facebook|twitter|discord|slack|telegram|whatsapp|line|linkedin|pinterest|slack|embed|preview/i;

const OG_TITLE = 'youtive - YouTube Knowledge';
const OG_DESC = 'Transform YouTube videos into structured knowledge with AI-powered analysis';

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

interface BackendAnalysisPayload {
  oneLineSummary?: string;
  summary?: string;
}

interface BackendResponseData {
  title?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  channelName?: string;
  duration?: number;
  analysis?: BackendAnalysisPayload;
}

interface BackendResponse {
  data?: BackendResponseData;
  [key: string]: unknown;
}

function buildOgHtml(url: URL, videoTitle: string, description: string, thumbnail: string, channelName: string): string {
  const siteUrl = `https://youtive.vercel.app${url.pathname}${url.search}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${escapeHtml(videoTitle)} - youtive</title>
<meta name="description" content="${escapeHtml(description)}"/>
<meta property="og:title" content="${escapeHtml(videoTitle)}"/>
<meta property="og:description" content="${escapeHtml(description)}"/>
<meta property="og:image" content="${escapeHtml(thumbnail)}"/>
<meta property="og:url" content="${escapeHtml(siteUrl)}"/>
<meta property="og:type" content="article"/>
<meta property="og:site_name" content="youtive"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${escapeHtml(videoTitle)}"/>
<meta name="twitter:description" content="${escapeHtml(description)}"/>
<meta name="twitter:image" content="${escapeHtml(thumbnail)}"/>
${channelName ? `<meta name="author" content="${escapeHtml(channelName)}"/>` : ''}
</head>
<body>
<script>location.href='${escapeHtml(url.pathname + url.search)}'</script>
</body>
</html>`;
}

export const config = {
  matcher: '/result',
};

export default async function middleware(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url);
  const userAgent = request.headers.get('user-agent') ?? '';

  if (!CRAWLER_RE.test(userAgent)) {
    return undefined;
  }

  const analysisId = url.searchParams.get('analysisId');
  if (!analysisId?.trim()) {
    return undefined;
  }

  try {
    const apiBase = (process.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
    if (!apiBase) {
      return undefined;
    }

    const apiUrl = `${apiBase}/videos/analyses/${encodeURIComponent(analysisId.trim())}`;
    const res = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      return undefined;
    }

    const json: BackendResponse = await res.json();
    const video: BackendResponseData = json.data ?? json;

    const videoTitle = video.title ?? OG_TITLE;
    const description = video.analysis?.oneLineSummary ?? video.analysis?.summary ?? OG_DESC;
    const thumbnail = video.thumbnailUrl ?? video.thumbnail ?? '';
    const channelName = video.channelName ?? '';

    return new Response(buildOgHtml(url, videoTitle, description, thumbnail, channelName), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  } catch {
    return undefined;
  }
}
