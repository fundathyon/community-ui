"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * Tag — data the USER edits: image tags, project labels, applied filters
 * (§09). Shares Badge's visual scale but is a distinct component: Badge is
 * state the system decides, Tag is user data, and the two are never
 * interchanged. Pass `onRemove` to render a dismiss control; omit it for a
 * read-only tag. Carries no `tone` — state semantics stay on Badge.
 */
export function Tag({ children, onRemove, removeLabel, className, ...props }) {
    const defaultRemoveLabel = typeof children === "string" ? `Remove ${children}` : "Remove";
    return (_jsxs("span", { className: cn("inline-flex h-[1.125rem] shrink-0 items-center gap-1 rounded-full border border-border bg-surface-hover pl-2 text-caption font-medium leading-none text-text-secondary", onRemove ? "pr-1" : "pr-2", className), ...props, children: [children, onRemove && (_jsx("button", { type: "button", "aria-label": removeLabel ?? defaultRemoveLabel, onClick: onRemove, className: cn("fdn-touch-target grid size-3.5 shrink-0 place-items-center rounded-full text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-border-strong hover:text-text"), children: _jsx(Icon, { icon: X, size: 12 }) }))] }));
}
