"use client";
import { useState } from "react";

type Ans = "y" | "n" | "";
type Item = { name: string; q1: Ans; q2: Ans; q3: Ans };

function judge(i: Item) {
  if (i.q3 === "y") return { label: "自分に残す", cls: "bg-[#ffd6d2]", advice: "判断と責任は自分に。案出し・下書き・整理だけをAIに頼み、決めるのは自分で。" };
  if (i.q1 === "y" && i.q2 === "y") return { label: "任せやすい", cls: "bg-[#cfe8d6]", advice: "AIに任せて構いません。結果は、自分の目で確認してください。" };
  if (i.q1 === "y") return { label: "案出しだけ任せる", cls: "bg-marker", advice: "正解が1つに決まらないので、AIには案を出してもらい、採用は自分で決めます。" };
  return { label: "裏取りが必要", cls: "bg-[#d3e0f5]", advice: "やり直しがきかないので、AIの答えは、出典や数字を自分で確かめてから使ってください。" };
}

const Q = ({ legend, value, onChange, name }: { legend: string; value: Ans; onChange: (a: Ans) => void; name: string }) => (
  <fieldset className="mb-3">
    <legend className="text-sm font-bold mb-1">{legend}</legend>
    <div className="flex gap-5 text-sm">
      {([["y", "はい"], ["n", "いいえ"]] as const).map(([v, l]) => (
        <label key={v} className="flex items-center gap-1.5"><input type="radio" name={name} checked={value === v} onChange={() => onChange(v)} />{l}</label>
      ))}
    </div>
  </fieldset>
);

export default function AiShiwake() {
  const [cur, setCur] = useState<Item>({ name: "", q1: "", q2: "", q3: "" });
  const [list, setList] = useState<Item[]>([]);
  const ready = cur.name.trim() && cur.q1 && cur.q2 && cur.q3;
  return (
    <div>
      <div className="fuda p-5 bg-white">
        <label className="block text-sm font-bold mb-3">仕分けたい作業(例:議事録の下書き)
          <input value={cur.name} onChange={(e) => setCur({ ...cur, name: e.target.value })} className="mt-1 w-full border-2 border-sumi bg-white px-3 py-2 text-sm font-normal" maxLength={40} />
        </label>
        <Q name="q1" legend="① やり直しがきく?(間違えても、すぐ直せる)" value={cur.q1} onChange={(a) => setCur({ ...cur, q1: a })} />
        <Q name="q2" legend="② 正解がある?(誰がやっても、ほぼ同じ答えになる)" value={cur.q2} onChange={(a) => setCur({ ...cur, q2: a })} />
        <Q name="q3" legend="③ 最終的な責任は、自分が取る?" value={cur.q3} onChange={(a) => setCur({ ...cur, q3: a })} />
        <button type="button" disabled={!ready} onClick={() => { setList([...list, cur].slice(-8)); setCur({ name: "", q1: "", q2: "", q3: "" }); }}
          className="stamp px-5 py-2 text-base bg-white hover:bg-marker disabled:opacity-40">仕分ける</button>
      </div>

      {list.length > 0 && (
        <div className="mt-8">
          <h2 className="font-display text-xl mb-3">仕分けの結果</h2>
          <ul className="space-y-3">
            {list.map((it, i) => { const j = judge(it); return (
              <li key={i} className="fuda p-4 flex flex-col sm:flex-row gap-3 sm:items-center">
                <span className="font-bold sm:w-48 shrink-0">{it.name}</span>
                <span className={`inline-block border-2 border-sumi px-2 py-0.5 text-xs font-bold shrink-0 ${j.cls}`}>{j.label}</span>
                <span className="text-sm leading-relaxed flex-1">{j.advice}</span>
                <button type="button" className="text-xs underline shrink-0" onClick={() => setList(list.filter((_, k) => k !== i))}>消す</button>
              </li>); })}
          </ul>
          <button type="button" className="mt-4 text-sm underline" onClick={() => setList([])}>すべて消す</button>
        </div>
      )}
    </div>
  );
}
