import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, forwardRef } from "react";

function cx(...c: (string | undefined | false)[]) {
  return c.filter(Boolean).join(" ");
}

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto">
      <table ref={ref} className={cx("w-full border-collapse text-sm", className)} {...props} />
    </div>
  )
);
Table.displayName = "Table";

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <thead ref={ref} {...props} />
);
TableHeader.displayName = "TableHeader";

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => <tbody ref={ref} {...props} />
);
TableBody.displayName = "TableBody";

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
  ({ className, style, ...props }, ref) => (
    <tr ref={ref} className={cx("border-b", className)} style={{ borderColor: "#262B31", ...style }} {...props} />
  )
);
TableRow.displayName = "TableRow";

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cx("px-3 py-2 text-left font-medium", className)} {...props} />
  )
);
TableHead.displayName = "TableHead";

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => <td ref={ref} className={cx("px-3 py-2.5", className)} {...props} />
);
TableCell.displayName = "TableCell";
