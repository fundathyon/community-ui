import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * DescriptionItem — one `<dt>`/`<dd>` row inside a DescriptionList. Use `mono`
 * for literal, copy-and-compare values (digests, IDs, paths).
 *
 * Server-component safe.
 */
export function DescriptionItem({ label, mono = false, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex flex-col gap-0.5", className), ...props, children: [_jsx("dt", { className: "text-caption text-text-muted", children: label }), _jsx("dd", { className: cn("text-body text-text", mono && "font-mono text-code tabular-nums"), children: children })] }));
}
/**
 * DescriptionList — a `<dl>` grid of term/value rows for the stable facts of a
 * resource. Feed it `items` or compose DescriptionItem children. For the
 * running-text metadata under a resource title use ResourceMeta instead (§25):
 * a key-value table there would steal height from the content.
 *
 * Server-component safe.
 */
export function DescriptionList({ items, columns = 1, className, children, ...props }) {
    return (_jsx("dl", { className: cn("grid gap-x-8 gap-y-3", columns === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1", className), ...props, children: items
            ? items.map((item, index) => (_jsx(DescriptionItem, { label: item.label, mono: item.mono, children: item.value }, index)))
            : children }));
}
