import { ButtonHTMLAttributes, forwardRef } from "react";
import { ACCENT, PANEL2, TEXT, BORDER } from "@/lib/theme";

function cx(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

type Variant = "primary" | "secondary" | "outline";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
>(({ className, style, variant = "primary", disabled, ...props }, ref) => {
  const variantStyle: React.CSSProperties =
    variant === "primary"
      ? { background: disabled ? BORDER : ACCENT, color: "#FFFFFF", border: "1px solid transparent" }
      : variant === "secondary"
      ? { background: PANEL2, color: TEXT, border: "1px solid transparent" }
      : { background: "transparent", color: TEXT, border: `1px solid ${BORDER}` };

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cx(
        "inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-transform",
        !disabled && "hover:-translate-y-0.5",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      style={{ ...variantStyle, ...style }}
      {...props}
    />
  );
});
Button.displayName = "Button";
