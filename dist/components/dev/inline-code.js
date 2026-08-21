import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * InlineCode — a code token inside prose (§20): a prop name, a path, a flag.
 * For anything multi-line — or anything the reader will copy — use CodeBlock,
 * which owns the copy affordance. Server-component safe.
 */
export function InlineCode({ className, ...props }) {
    return (_jsx("code", { className: cn("rounded-sm border border-border bg-bg-subtle px-1 py-px font-mono text-code text-text", className), ...props }));
}
