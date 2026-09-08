import { HTMLAttributes } from "react";
import { BORDER } from "@/lib/theme";

function cx(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

export function Separator({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("h-px w-full", className)}
      style={{ background: BORDER, ...style }}
      {...props}
    />
  );
}
