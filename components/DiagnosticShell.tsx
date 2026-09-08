import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TEXT, MUTED } from "@/lib/theme";

export function DiagnosticShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <Link href="/diagnostics" className="text-xs inline-flex items-center gap-1.5" style={{ color: MUTED }}>
        <ArrowLeft size={13} /> 診断一覧に戻る
      </Link>
      <div>
        <h1 className="text-2xl font-semibold" style={{ color: TEXT }}>
          {title}
        </h1>
        <p className="text-sm mt-1" style={{ color: MUTED }}>
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}
