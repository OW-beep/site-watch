"use client";
import { useEffect } from "react";
import { ADSENSE_CLIENT } from "@/lib/site";

export default function AdUnit({ slot }: { slot?: string }) {
  useEffect(() => {
    if (!slot || !ADSENSE_CLIENT) return;
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch {}
  }, [slot]);
  if (!slot || !ADSENSE_CLIENT) return null;
  return (
    <aside className="my-10" aria-label="広告">
      <p className="text-[10px] text-sumi-soft mb-1">広告</p>
      <ins className="adsbygoogle" style={{ display: "block" }} data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
