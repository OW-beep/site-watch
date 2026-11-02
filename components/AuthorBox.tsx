import Link from "next/link";
import { SITE_NAME } from "@/lib/site";
import { PROFILE } from "@/lib/profile";

export default function AuthorBox() {
  return (
    <aside className="fuda mt-14 p-5 bg-paper-kraft" aria-label="この記事を書いた人">
      <p className="font-display text-lg mb-2">この記事を書いた人</p>
      <p className="font-bold">{SITE_NAME} 道場主</p>
      <p className="text-sm leading-loose mt-1">
        公務員を経てITコンサルタントに転身し、フリーランスとして約50の企業・団体の業務支援に携わってきました。データ分析・データ活用の支援が専門です。仕事で使う考え方を、身近な例題に直して紹介しています。
      </p>
      <p className="text-sm leading-loose mt-1">
        仕事では、{PROFILE.usedMethods.join("・")}を使ってきました。{PROFILE.years && `経験年数:${PROFILE.years}。`}{PROFILE.qualifications.length > 0 && `保有資格:${PROFILE.qualifications.join("、")}。`}
      </p>
      <p className="text-xs mt-3 flex gap-4 flex-wrap">
        <Link href="/about" className="underline">運営者情報</Link>
        <Link href="/editorial-policy" className="underline">編集方針</Link>
      </p>
    </aside>
  );
}
