import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FETCH_TIMEOUT_MS = 8000;
// 政府データカタログサイト（旧data.go.jp）は現在e-Govデータポータルに統合されており、
// CKAN標準のAPIをAPIキー登録なし・無料で利用できます。
const CKAN_ENDPOINT = "https://data.e-gov.go.jp/data/api/action/package_search";
const DATASET_BASE_URL = "https://data.e-gov.go.jp/data/dataset";

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
  } finally {
    clearTimeout(timeout);
  }
}

type CkanResource = { format?: string; url?: string; name?: string };
type CkanResult = {
  title?: string;
  notes?: string;
  name?: string;
  organization?: { title?: string };
  resources?: CkanResource[];
};

export async function POST(req: NextRequest) {
  let body: { query?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストの形式が正しくありません。" }, { status: 400 });
  }

  const query = (body.query || "").trim();
  if (!query) {
    return NextResponse.json({ error: "キーワードを入力してください。" }, { status: 400 });
  }
  if (query.length > 100) {
    return NextResponse.json({ error: "キーワードが長すぎます。" }, { status: 400 });
  }

  const url = `${CKAN_ENDPOINT}?q=${encodeURIComponent(query)}&rows=10`;

  let res: Response;
  try {
    res = await fetchWithTimeout(url);
  } catch {
    return NextResponse.json(
      { error: "データカタログサイトへの接続に失敗しました。時間をおいて再度お試しください。" },
      { status: 200 }
    );
  }

  if (!res.ok) {
    return NextResponse.json({ error: `データカタログサイトからエラーが返されました（${res.status}）。` }, { status: 200 });
  }

  let json: { success?: boolean; result?: { count?: number; results?: CkanResult[] } };
  try {
    json = await res.json();
  } catch {
    return NextResponse.json({ error: "データの解析に失敗しました。" }, { status: 200 });
  }

  if (!json.success || !json.result) {
    return NextResponse.json({ error: "検索結果を取得できませんでした。" }, { status: 200 });
  }

  const datasets = (json.result.results || []).map((r) => {
    const formats = Array.from(
      new Set((r.resources || []).map((res) => (res.format || "").toUpperCase()).filter(Boolean))
    ).slice(0, 5);
    return {
      title: r.title || "（タイトル不明）",
      notes: (r.notes || "").slice(0, 160),
      organization: r.organization?.title || "提供元不明",
      formats,
      url: r.name ? `${DATASET_BASE_URL}/${r.name}` : "https://data.e-gov.go.jp/",
    };
  });

  return NextResponse.json({
    query,
    count: json.result.count ?? datasets.length,
    datasets,
  });
}
