import { NextRequest, NextResponse } from "next/server";

// 社内向けツールのための簡易Basic認証（Next.js 16の "proxy" 規約に対応）。
// SITE_USER / SITE_PASS を Vercel の環境変数に設定して使う。
// 代わりに Vercel の「Deployment Protection」機能を使う場合は、
// このファイルごと削除してよい（どちらか一方で十分）。

export function proxy(req: NextRequest) {
  const user = process.env.SITE_USER;
  const pass = process.env.SITE_PASS;

  // 環境変数が未設定の場合は認証をスキップ（ローカル開発用）
  if (!user || !pass) return NextResponse.next();

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const [, base64] = authHeader.split(" ");
    const [reqUser, reqPass] = atob(base64).split(":");
    if (reqUser === user && reqPass === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("認証が必要です", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Site Watch"' },
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
