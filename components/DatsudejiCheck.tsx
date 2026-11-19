"use client";
import { useState } from "react";
import Link from "next/link";

// はい=2点、ときどき=1点、いいえ=0点。「デジタルの使い方のクセ」を見る簡易診断です。
const QUESTIONS = [
  "朝起きて、最初にすることはスマホを見ることだ",
  "調べものをするとき、検索やAIの答えをそのまま信じることが多い",
  "待ち時間が数分あると、ついスマホを開いてしまう",
  "メモや予定は、すべてスマホやパソコンの中にしかない",
  "数字を見たとき、自分でざっくり計算してみることは、ほぼない",
  "長い文章は、要約サービスやAIに任せることが多い",
  "考えがまとまらないときも、紙に書き出すことはしない",
  "通知が来ると、作業中でもすぐ確認してしまう",
  "道順や電話番号など、覚える努力をしなくなった",
  "1日の終わりに、今日考えたことを振り返る時間はない",
];

type Result = { belt: string; title: string; body: string; links: [string, string][] };

function judge(score: number): Result {
  if (score >= 15) return {
    belt: "白帯から出直し", title: "デジタルの波に、かなり飲まれています",
    body: "考える作業の多くを、デジタルに預けている状態です。まずは「置く場面を1つ決める」ことから。食事中だけスマホを離す、だけでも変わります。",
    links: [["/posts/smartphone-oku-2shukan", "スマホを置く生活を2週間試して分かったこと"], ["/posts/datsudeji-toha-5-kata", "脱デジとは?5つの型"], ["/age/elem", "小学生からできる稽古"]],
  };
  if (score >= 9) return {
    belt: "黄帯レベル", title: "使い分けが、あと一歩です",
    body: "便利さは活かせていますが、考える場面まで任せがちです。調べる前に「先に予想を1分書く」稽古が効きます。",
    links: [["/posts/sakini-yoso-1pun", "「先に予想」を1分書くだけの稽古"], ["/posts/kakidashi-memo-a4", "A4用紙1枚の書き出しメモ"], ["/tools/ai-shiwake", "AIに任せる/残す 仕分けツール"]],
  };
  if (score >= 4) return {
    belt: "緑帯レベル", title: "自分の頭の出番を、残せています",
    body: "デジタルと自分の頭の使い分けが、だいぶできています。次は、ざっくり計算や原因のしぼり込みなど、型を使う稽古へ。",
    links: [["/posts/fermi-nyumon-gohan", "ざっくり当てる方法(フェルミ推定)"], ["/posts/warikan-1en-made", "割り勘は1円単位まで割るべきか"], ["/age/junior", "中学生からできる稽古"]],
  };
  return {
    belt: "青帯レベル", title: "デジタルに負けない頭が、育っています",
    body: "考える作業を自分の手に残す習慣が身についています。実務の型や、SNSの議論をロジックで解く読み物で、さらに鍛えましょう。",
    links: [["/posts/kadai-sekkei-helpdesk", "あいまいな依頼を分解する(課題設計)"], ["/posts/warikan-1en-made", "割り勘は1円単位まで割るべきか"], ["/training", "稽古メニュー"]],
  };
}

export default function DatsudejiCheck() {
  const [ans, setAns] = useState<number[]>(Array(QUESTIONS.length).fill(-1));
  const [done, setDone] = useState(false);
  const answered = ans.filter((a) => a >= 0).length;
  const score = ans.reduce((s, a) => s + (a >= 0 ? a : 0), 0);
  const r = judge(score);
  return (
    <div>
      <div className="space-y-4">
        {QUESTIONS.map((q, i) => (
          <fieldset key={i} className="fuda p-4 bg-white">
            <legend className="text-sm font-bold px-1">{i + 1}. {q}</legend>
            <div className="flex gap-5 text-sm mt-1">
              {([[2, "はい"], [1, "ときどき"], [0, "いいえ"]] as const).map(([v, l]) => (
                <label key={v} className="flex items-center gap-1.5">
                  <input type="radio" name={`q${i}`} checked={ans[i] === v}
                    onChange={() => { const n = [...ans]; n[i] = v; setAns(n); setDone(false); }} />{l}
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <button type="button" disabled={answered < QUESTIONS.length}
        onClick={() => setDone(true)}
        className="stamp px-6 py-2 text-lg bg-white hover:bg-marker disabled:opacity-40 mt-6">
        診断する({answered}/{QUESTIONS.length})
      </button>
      {done && (
        <section className="fuda p-6 mt-8 bg-paper-kraft" aria-live="polite">
          <p className="text-xs font-bold text-shu">{r.belt}・{score}点 / 20点</p>
          <h2 className="font-display text-2xl mt-2">{r.title}</h2>
          <p className="text-sm leading-loose mt-3">{r.body}</p>
          <h3 className="font-bold text-sm mt-5 mb-2">おすすめの稽古</h3>
          <ul className="list-disc pl-5 text-sm space-y-1.5">
            {r.links.map(([h, t]) => <li key={h}><Link href={h} className="underline">{t}</Link></li>)}
          </ul>
          <p className="text-xs text-sumi-soft mt-4">この診断は、考え方の目安を楽しむためのものです。医学的な診断ではありません。</p>
        </section>
      )}
    </div>
  );
}
