import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { truncateMiddle } from "../../lib/format";
import { CopyButton } from "./copy-button";
/**
 * Hash — a digest or id display (§20, §21 digest cell): mono, secondary,
 * middle-truncated so both ends stay verifiable, with a copy button that
 * ALWAYS copies the complete value. Everything truncated keeps its full copy.
 */
export function Hash({ value, truncate = true, head = 6, tail = 4, copy = true, copyLabel = "Copy", copiedLabel = "Copied", className, ...props }) {
    const display = truncate ? truncateMiddle(value, head, tail) : value;
    return (_jsxs("span", { className: cn("inline-flex items-center gap-1 font-mono text-code text-text-secondary", className), ...props, children: [_jsx("span", { title: display === value ? undefined : value, children: display }), copy && _jsx(CopyButton, { value: value, label: copyLabel, copiedLabel: copiedLabel, size: 12 })] }));
}
