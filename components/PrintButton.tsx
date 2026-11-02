"use client";
export default function PrintButton({ label = "このページを印刷する" }: { label?: string }) {
  return (
    <button type="button" onClick={() => window.print()} className="print:hidden stamp px-5 py-2 text-base bg-white hover:bg-marker">
      {label}
    </button>
  );
}
