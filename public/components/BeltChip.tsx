import type { Belt } from "@/lib/posts";

export const BELT_INFO: Record<Belt, { label: string; level: string; desc: string; cls: string }> = {
  white: { label: "白帯", level: "入門", desc: "道具も知識もいらない。1〜5分で試せる", cls: "bg-white text-sumi" },
  yellow: { label: "黄帯", level: "初級", desc: "身近な題材で、型を一つ覚える", cls: "bg-marker text-sumi" },
  green: { label: "緑帯", level: "中級", desc: "型を使って、数字や原因を扱う", cls: "bg-[#2E7D4F] text-white" },
  blue: { label: "青帯", level: "上級", desc: "仮説を立て、根拠で支えて結論を出す", cls: "bg-pencil text-white" },
  black: { label: "黒帯", level: "実務", desc: "仕事の現場で、そのまま使える進め方", cls: "bg-sumi text-white" },
};

export default function BeltChip({ belt }: { belt: Belt }) {
  const b = BELT_INFO[belt];
  return (
    <span className={`inline-block border-2 border-sumi px-2 py-0.5 text-[11px] font-bold ${b.cls}`}>
      {b.label}・{b.level}
    </span>
  );
}
