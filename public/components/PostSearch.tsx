"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Item = { s: string; t: string; c: string; e: string };

export default function PostSearch() {
  const [items, setItems] = useState<Item[]>([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    fetch("/search-index.json").then((r) => r.json()).then(setItems).catch(() => {});
  }, []);
  const key = q.trim();
  const hits = key ? items.filter((i) => (i.t + i.e + i.c).includes(key)).slice(0, 20) : [];
  return (
    <div className="mb-10">
      <label htmlFor="q" className="block text-sm font-bold mb-2">記事をさがす</label>
      <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="例:フェルミ推定、読書、AI"
        className="w-full border-2 border-sumi bg-white px-3 py-2 text-sm" />
      {key && (
        <div className="mt-3 border-2 border-sumi bg-white p-4 text-sm">
          {hits.length === 0 ? <p>見つかりませんでした。別の言葉でお試しください。</p> : (
            <ul className="space-y-2">
              {hits.map((h) => (
                <li key={h.s}><Link href={`/posts/${h.s}`} className="underline font-bold">{h.t}</Link>
                  <span className="text-xs text-sumi-soft ml-2">{h.c}</span></li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
