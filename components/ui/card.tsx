import { HTMLAttributes, forwardRef } from "react";

function cx(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={cx("rounded-lg border", className)}
      style={{ background: "#131619", borderColor: "#262B31", ...style }}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx("flex flex-col space-y-1.5 p-4", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cx("font-medium leading-none", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cx("text-sm", className)} {...props} />
);
CardDescription.displayName = "CardDescription";

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cx("p-4 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";
