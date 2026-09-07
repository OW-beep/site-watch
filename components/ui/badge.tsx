import { HTMLAttributes } from "react";

function cx(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

export function Badge({ className, style, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        className
      )}
      style={style}
      {...props}
    />
  );
}
