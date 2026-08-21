"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Collapsible } from "@base-ui/react/collapsible";
import { Check, ChevronDown, Cog } from "lucide-react";
import { forwardRef } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { formatRelativeDate } from "../../lib/format";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
import { Avatar } from "./avatar";
/**
 * ActivityFeed — the audit-log event list (§24). Every entry reads in one line —
 * actor · past-tense verb · resource · detail — and the technical metadata and
 * any diff EXPAND below, never the reverse. Built on the Timeline rail.
 */
export const ActivityFeed = forwardRef(function ActivityFeed({ className, ...props }, ref) {
    return (_jsx("ul", { ref: ref, className: cn("flex flex-col", "[&>li:last-child_[data-feed-line]]:hidden [&>li:last-child_[data-feed-content]]:pb-0", className), ...props }));
});
const panelAnimation = cn("h-[var(--collapsible-panel-height)] overflow-hidden", "transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:h-0 data-[ending-style]:h-0");
/** A single mono metadata token whose value copies on click (§24). */
function CopyableToken({ prefix, value }) {
    const { copied, copy } = useCopyToClipboard();
    return (_jsxs("button", { type: "button", onClick: () => copy(value), className: cn("inline-flex items-center gap-1 rounded-sm transition-colors hover:text-text-secondary", 
        // No `outline-none`: see status-indicator.tsx for why it would poison
        // the `--tw-outline-style` this focus-visible rule depends on.
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"), title: `Copy ${value}`, children: [prefix ? _jsx("span", { className: "text-text-disabled", children: prefix }) : null, _jsx("span", { children: value }), copied ? _jsx(Icon, { icon: Check, size: 12, className: "text-success" }) : null] }));
}
/**
 * ActivityFeedItem — one audit event on the ActivityFeed rail. Line one is the
 * sentence plus timestamp and optional badge; line two is the copyable technical
 * metadata; a diff or before/after expands underneath. A `system` actor shows an
 * icon instead of an avatar (§24).
 */
export function ActivityFeedItem({ actor, action, timestamp, badge, technical, detailsLabel = "Details", className, children, ...props }) {
    const when = formatRelativeDate(timestamp);
    const actorName = actor.name ?? actor.email ?? "";
    const hasDetail = children != null && children !== false;
    const hasTechnical = technical && (technical.ip || technical.traceId || technical.requestId || technical.event);
    return (_jsxs("li", { className: cn("flex gap-3", className), ...props, children: [_jsxs("div", { className: "flex flex-col items-center", children: [actor.system ? (_jsx("span", { role: "img", "aria-label": actorName || "System", className: "relative z-[1] flex size-6 items-center justify-center rounded-full border border-border bg-surface text-text-muted", children: _jsx(Icon, { icon: Cog, size: 14 }) })) : (_jsx(Avatar, { size: 24, name: actorName, className: "relative z-[1]" })), _jsx("span", { "data-feed-line": true, "aria-hidden": true, className: "mt-1 w-px grow bg-border" })] }), _jsxs("div", { "data-feed-content": true, className: "min-w-0 flex-1 pb-4", children: [_jsxs("div", { className: "flex items-start gap-2", children: [_jsx("div", { className: "min-w-0 flex-1 text-body-sm text-text-secondary [&_strong]:font-medium [&_strong]:text-text", children: action }), badge ? _jsx("span", { className: "shrink-0", children: badge }) : null, _jsx(Tooltip, { content: when.absolute, children: _jsx("time", { className: "shrink-0 whitespace-nowrap text-caption text-text-muted", children: when.display }) })] }), hasTechnical ? (_jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption text-text-muted", children: [technical.ip ? _jsx(CopyableToken, { prefix: "ip", value: technical.ip }) : null, technical.traceId ? _jsx(CopyableToken, { prefix: "trace", value: technical.traceId }) : null, technical.requestId ? _jsx(CopyableToken, { prefix: "req", value: technical.requestId }) : null, technical.event ? _jsx(CopyableToken, { value: technical.event }) : null] })) : null, hasDetail ? (_jsxs(Collapsible.Root, { className: "mt-1.5", children: [_jsxs(Collapsible.Trigger, { className: cn("group inline-flex items-center gap-1 rounded-sm text-caption text-text-muted transition-colors hover:text-text-secondary", 
                                // No `outline-none`: see status-indicator.tsx for why it would
                                // poison the `--tw-outline-style` this rule depends on.
                                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"), children: [_jsx(Icon, { icon: ChevronDown, size: 12, className: "transition-transform duration-[var(--fdn-dur-fast)] group-data-[panel-open]:rotate-180" }), _jsx("span", { children: detailsLabel })] }), _jsx(Collapsible.Panel, { className: panelAnimation, children: _jsx("div", { className: "pt-1.5 text-body-sm text-text-secondary", children: children }) })] })) : null] })] }));
}
