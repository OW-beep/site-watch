"use client";
import { useState } from "react";

type Row = { name: string; w: number; s: number[] };
const SAMPLE_C = ["部屋A", "部屋B", "部屋C"];
const SAMPLE_R: Row[] = [
  { name: "家賃", w: 3, s: [4, 3, 5] }, { name: "通勤", w: 3, s: [5, 3, 2] },
  { name: "広さ", w: 2, s: [2, 4, 5] }, { name: "駅から", w: 1, s: [5, 3, 2] },
];
const inp = "border-2 border-sumi bg-white px-2 py-1 text-sm w-full";
const clamp = (v: string) => Math.max(0, Math.min(5, Math.round(Number(v) || 0)));

export default function CompareTool() {
  const [cands, setCands] = useState<string[]>(SAMPLE_C);
  const [rows, setRows] = useState<Row[]>(SAMPLE_R);
  const totals = cands.map((_, i) => rows.reduce((a, r) => a + r.w * (r.s[i] || 0), 0));
  const sorted = [...totals].sort((a, b) => b - a);
  const topIdx = totals.indexOf(sorted[0]);
  const gap = sorted.length > 1 ? sorted[0] - sorted[1] : sorted[0];
  const setRow = (i: number, f: (r: Row) => Row) => setRows(rows.map((r, j) => (j === i ? f(r) : r)));

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-2 border-sumi bg-white text-sm">
          <thead>
            <tr className="bg-paper-kraft">
              <th className="p-2 border-b-2 border-sumi text-left w-40">判断軸</th>
              <th className="p-2 border-b-2 border-sumi w-24">重み(1〜5)</th>
              {cands.map((c, i) => (
                <th key={i} className="p-2 border-b-2 border-sumi">
                  <label className="sr-only" htmlFor={`c${i}`}>候補{i + 1}の名前</label>
                  <input id={`c${i}`} className={inp} value={c} onChange={(e) => setCands(cands.map((x, j) => (j === i ? e.target.value : x)))} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-sumi/20">
                <td className="p-2"><input aria-label={`軸${i + 1}の名前`} className={inp} value={r.name} onChange={(e) => setRow(i, (x) => ({ ...x, name: e.target.value }))} /></td>
                <td className="p-2"><input aria-label={`${r.name}の重み`} type="number" min={1} max={5} className={inp} value={r.w} onChange={(e) => setRow(i, (x) => ({ ...x, w: Math.max(1, clamp(e.target.value)) }))} /></td>
                {cands.map((_, k) => (
                  <td key={k} className="p-2"><input aria-label={`${r.name}の点数(${cands[k]})`} type="number" min={0} max={5} className={inp} value={r.s[k] ?? 0}
                    onChange={(e) => setRow(i, (x) => ({ ...x, s: x.s.map((v, j) => (j === k ? clamp(e.target.value) : v)) }))} /></td>
                ))}
              </tr>
            ))}
            <tr className="bg-paper">
              <td className="p-2 font-bold" colSpan={2}>合計(点数 × 重み)</td>
              {totals.map((t, i) => (
                <td key={i} className={`p-2 text-center text-lg font-bold ${i === topIdx ? "bg-marker" : ""}`}>{t}点</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm leading-loose border-2 border-sumi bg-white p-4">
        いちばん高いのは<strong>「{cands[topIdx]}」({sorted[0]}点)</strong>です。
        {gap <= 2 ? "2位との差が小さいので、数字だけで決めず、重みを変えて順位が入れ替わるか試してみてください。" : "2位との差がはっきりあります。点数が低かった軸が、自分にとって致命的でないかだけ確かめましょう。"}
      </p>

      <div className="mt-4 flex gap-3 flex-wrap">
        <button type="button" className="fuda px-4 py-2 text-sm font-bold" onClick={() => setRows([...rows, { name: "新しい軸", w: 1, s: cands.map(() => 0) }].slice(0, 6))}>軸を足す(最大6)</button>
        <button type="button" className="fuda px-4 py-2 text-sm font-bold" onClick={() => rows.length > 1 && setRows(rows.slice(0, -1))}>最後の軸を消す</button>
        <button type="button" className="fuda px-4 py-2 text-sm font-bold" onClick={() => { setCands(SAMPLE_C); setRows(SAMPLE_R); }}>例に戻す</button>
        <button type="button" className="fuda px-4 py-2 text-sm font-bold" onClick={() => { setCands(["候補1", "候補2", "候補3"]); setRows([{ name: "", w: 1, s: [0, 0, 0] }]); }}>空にして始める</button>
      </div>
    </div>
  );
}
