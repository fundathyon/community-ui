import type { BlockquoteHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface BlockquoteProps extends BlockquoteHTMLAttributes<HTMLQuoteElement> {}

/**
 * Blockquote — a styled quotation in docs prose (§26). A left rule and secondary
 * text mark it as quoted material. NOT an admonition: for advisory callouts
 * (Note/Tip/Warning/Danger/Important) use those components, which carry tone,
 * an icon and a title. Server-component safe.
 */
export function Blockquote({ className, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={cn("my-4 border-l-2 border-border-strong pl-4 text-text-secondary", className)}
      {...props}
    />
  );
}
