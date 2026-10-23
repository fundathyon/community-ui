import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/cn";
import { Badge } from "../components/feedback/badge";
/** Bordered, rounded table shell — matches the app's table chrome (§21). */
export const apiTableWrapper = "my-4 overflow-x-auto rounded-lg border border-border";
export const apiTable = "w-full border-collapse text-body-sm";
export const apiHeadCell = "border-b border-border bg-bg-subtle px-3 py-2 text-left align-bottom text-overline uppercase font-medium text-text-muted";
export const apiCell = "px-3 py-2 align-top";
/** Row divider — put on the tbody so only inter-row borders render (the first
 * row sits flush under the header, so its top border is removed). */
export const apiRowDivider = "[&>tr]:border-t [&>tr]:border-border [&>tr:first-child]:border-t-0";
/** Monospace symbol name; struck through and muted when deprecated (§26). */
export function ApiName({ children, deprecated }) {
    return (_jsx("span", { className: cn("font-mono text-code", deprecated ? "text-text-muted line-through" : "text-text"), children: children }));
}
/** Muted monospace type annotation. */
export function ApiType({ children }) {
    return _jsx("span", { className: "font-mono text-code text-text-muted", children: children });
}
/** The "required" marker — a danger outline Badge, label overridable (§26). */
export function RequiredBadge({ label }) {
    return (_jsx(Badge, { variant: "outline", tone: "danger", children: label }));
}
