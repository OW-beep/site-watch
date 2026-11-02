import { ADSENSE_CLIENT } from "@/lib/site";

// ads.txt は環境変数のパブリッシャーIDから自動生成されます
export const dynamic = "force-static";
export function GET() {
  const id = ADSENSE_CLIENT.replace(/^ca-/, "");
  const body = id ? `google.com, ${id}, DIRECT, f08c47fec0942fa0\n` : "";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
