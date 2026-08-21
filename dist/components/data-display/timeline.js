import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { STATUS } from "../../lib/status";
import { Icon } from "../typography/icon";
const TONE_TEXT = {
    neutral: "text-text-secondary",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
};
const TONE_DOT = {
    neutral: "bg-text-muted",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
};
/**
 * Timeline — a vertical rail of events, each with a marker, a title line and a
 * muted meta line (§14). The connecting line is drawn automatically and stops at
 * the last entry. For the audit-log grammar (actor · verb · resource) use
 * ActivityFeed, which builds on the same rail.
 *
 * Server-component safe (the expandable detail delegates to Base UI Collapsible).
 */
export function Timeline({ className, ...props }) {
    return (_jsx("ol", { className: cn("flex flex-col", 
        // The rail must not dangle past the final marker.
        "[&>li:last-child_[data-timeline-line]]:hidden [&>li:last-child_[data-timeline-content]]:pb-0", className), ...props }));
}
const panelAnimation = cn("h-[var(--collapsible-panel-height)] overflow-hidden", "transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:h-0 data-[ending-style]:h-0");
function Marker({ marker }) {
    const spec = marker?.status ? STATUS[marker.status] : undefined;
    const tone = spec ? (spec.treatment === "tonal" ? spec.tone : "neutral") : marker?.tone ?? "neutral";
    const MarkerIcon = spec?.icon ?? null;
    return (_jsx("span", { className: "relative z-[1] flex size-6 shrink-0 items-center justify-center", children: MarkerIcon ? (_jsx("span", { className: cn("flex size-6 items-center justify-center rounded-full border border-border bg-surface", TONE_TEXT[tone]), children: _jsx(Icon, { icon: MarkerIcon, size: 12 }) })) : (_jsx("span", { className: cn("size-2.5 rounded-full", TONE_DOT[tone]) })) }));
}
/**
 * TimelineItem — one entry on the Timeline rail. With `children`, the title turns
 * into a chevron disclosure that reveals the detail; without them it is a plain
 * line.
 */
export function TimelineItem({ marker, title, meta, className, children, ...props }) {
    const hasDetail = children != null && children !== false;
    return (_jsxs("li", { className: cn("flex gap-3", className), ...props, children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx(Marker, { marker: marker }), _jsx("span", { "data-timeline-line": true, "aria-hidden": true, className: "mt-1 w-px grow bg-border" })] }), _jsx("div", { "data-timeline-content": true, className: "min-w-0 flex-1 pb-5", children: hasDetail ? (_jsxs(Collapsible.Root, { children: [_jsxs(Collapsible.Trigger, { className: cn("group flex w-full items-center gap-1.5 rounded-md text-left outline-none", "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"), children: [_jsx("span", { className: "min-w-0 text-body text-text", children: title }), _jsx(Icon, { icon: ChevronDown, size: 14, className: "shrink-0 text-text-muted transition-transform duration-[var(--fdn-dur-fast)] group-data-[panel-open]:rotate-180" })] }), meta ? _jsx("div", { className: "text-caption text-text-muted", children: meta }) : null, _jsx(Collapsible.Panel, { className: panelAnimation, children: _jsx("div", { className: "pt-2 text-body-sm text-text-secondary", children: children }) })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "text-body text-text", children: title }), meta ? _jsx("div", { className: "text-caption text-text-muted", children: meta }) : null] })) })] }));
}
