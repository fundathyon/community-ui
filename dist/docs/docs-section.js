"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, Link as LinkIcon } from "lucide-react";
import { useCopyToClipboard } from "../hooks/use-copy-to-clipboard";
import { cn } from "../lib/cn";
import { Heading } from "../components/typography/heading";
import { Icon } from "../components/typography/icon";
/** Build the absolute URL for an in-page anchor, SSR-safe. */
function anchorHref(id) {
    if (typeof window === "undefined")
        return `#${id}`;
    const { origin, pathname } = window.location;
    return `${origin}${pathname}#${id}`;
}
function CopyLinkButton({ id, label, copiedLabel }) {
    const { copied, copy } = useCopyToClipboard();
    return (_jsx("button", { type: "button", "aria-label": copied ? copiedLabel : label, onClick: () => void copy(anchorHref(id)), className: cn("inline-flex size-6 shrink-0 select-none items-center justify-center rounded-md text-text-muted", "opacity-0 transition-[color,opacity] duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text focus-visible:opacity-100 group-hover:opacity-100", "fdn-touch-target"), children: _jsx(Icon, { icon: copied ? Check : LinkIcon, size: 14, className: copied ? "text-success" : undefined }) }));
}
/**
 * DocsSection — an anchored content section (§26). Renders an `h2`/`h3` with a
 * stable `id`, and a copy-link affordance that appears on hover/focus and copies
 * the section's absolute `#anchor` URL. Section spacing follows the reading
 * rhythm; headings share the anchor offset so they clear the sticky header.
 */
export function DocsSection({ id, heading, level = 2, copyLinkLabel = "Copy link to section", copiedLabel = "Link copied", className, children, ...props }) {
    return (_jsxs("section", { id: id, 
        // Clear the sticky header when navigated to via #anchor.
        className: cn("scroll-mt-header", level === 2 ? "mt-10 first:mt-0" : "mt-6", className), ...props, children: [_jsxs(Heading, { level: level, className: "group -ml-1 flex items-center gap-1.5 pl-1", children: [_jsx("a", { href: `#${id}`, className: "rounded-sm", children: heading }), _jsx(CopyLinkButton, { id: id, label: copyLinkLabel, copiedLabel: copiedLabel })] }), _jsx("div", { className: "mt-3 text-sm leading-[1.7]", children: children })] }));
}
