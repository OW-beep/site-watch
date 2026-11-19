import type { Age } from "@/lib/posts";

export const AGE_INFO: Record<Age, { label: string; desc: string; cls: string }> = {
  elem: { label: "小学生から", desc: "道具いらず、または紙とペンだけ。計算や言葉あそび中心で、保護者の方と一緒でも楽しめます", cls: "bg-[#fde8ef] text-sumi" },
  junior: { label: "中学生から", desc: "割合・概数・論理の組み立てなど、学校で習う考え方を使う稽古です", cls: "bg-[#d3e0f5] text-sumi" },
};

export default function AgeChip({ age }: { age: Age }) {
  const a = AGE_INFO[age];
  return (
    <span className={`inline-block border-2 border-sumi px-2 py-0.5 text-[11px] font-bold ${a.cls}`}>
      {a.label}
    </span>
  );
}
