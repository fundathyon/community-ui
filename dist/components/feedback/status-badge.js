import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { STATUS } from "../../lib/status";
import { Badge } from "./badge";
import { Spinner } from "./spinner";
/**
 * StatusBadge — the badge treatment of the state taxonomy (§19). Tone, icon
 * and treatment are FIXED per state across the whole suite; only the copy is
 * yours. Terminal states render as gray outline (place them in rows at 0.6
 * opacity); `unknown` is the only dashed badge. Never `line-through` (§M-01).
 *
 * For dense lists use StatusIndicator (dot + text); for narrow columns use it
 * in icon-only mode with a tooltip. Same color in every treatment.
 */
export function StatusBadge({ status, children, className, ...props }) {
    const spec = STATUS[status];
    return (_jsxs(Badge, { variant: spec.treatment === "tonal" ? "tonal" : "outline", tone: spec.treatment === "tonal" ? spec.tone : "neutral", dot: spec.dot, icon: spec.icon ?? undefined, dashed: spec.treatment === "outline-dashed", "data-status": status, className: cn(className), ...props, children: [spec.spinner && _jsx(Spinner, { size: 12, label: null }), children ?? spec.label] }));
}
