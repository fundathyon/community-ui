import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/cn";
/**
 * Blockquote — a styled quotation in docs prose (§26). A left rule and secondary
 * text mark it as quoted material. NOT an admonition: for advisory callouts
 * (Note/Tip/Warning/Danger/Important) use those components, which carry tone,
 * an icon and a title. Server-component safe.
 */
export function Blockquote({ className, ...props }) {
    return (_jsx("blockquote", { className: cn("my-4 border-l-2 border-border-strong pl-4 text-text-secondary", className), ...props }));
}
