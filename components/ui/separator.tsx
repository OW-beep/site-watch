import { HTMLAttributes } from "react";

function cx(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

export function Separator({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx("h-px w-full", className)}
      style={{ background: "#262B31", ...style }}
      {...props}
    />
  );
}
