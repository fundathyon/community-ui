"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
/** Size → box + initials type scale. Exported for AvatarGroup's counter, not the barrel. */
export const avatarSizeClasses = {
    20: "size-5 text-caption",
    24: "size-6 text-caption",
    32: "size-8 text-label",
    40: "size-10 text-body",
};
/**
 * The five deterministic washes (§09). Four semantic tones plus neutral — the
 * background is NEVER random: it is derived from a stable hash of the identifier,
 * so the same person always gets the same color.
 */
const WASHES = [
    "bg-info-bg text-info",
    "bg-success-bg text-success",
    "bg-warning-bg text-warning",
    "bg-danger-bg text-danger",
    "bg-surface-hover text-text-secondary",
];
/** Stable string hash (deterministic across renders and reloads). */
function hashString(input) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
        hash = (hash * 31 + input.charCodeAt(i)) | 0;
    }
    return Math.abs(hash);
}
/** Pick a wash from the identifier — same identifier → same wash, always. */
export function washFor(identifier) {
    if (!identifier)
        return WASHES[WASHES.length - 1];
    return WASHES[hashString(identifier) % WASHES.length];
}
/** Initials from a display name: two words → first+last; email/single → sensible fallback. */
export function initialsFrom(name) {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0)
        return "?";
    if (parts.length >= 2) {
        const first = parts[0];
        const last = parts[parts.length - 1];
        return (first[0] + last[0]).toUpperCase();
    }
    const token = parts[0];
    if (token.includes("@"))
        return token[0].toUpperCase();
    return token.slice(0, 2).toUpperCase();
}
/**
 * Avatar — a person or entity's picture, or initials on a deterministic semantic
 * wash derived from a hash of the identifier (§09). The wash is NEVER random: the
 * same identifier always resolves to the same color. The presence dot appears only
 * where presence is meaningful. Use AvatarGroup to stack several with a "+n" counter.
 */
export const Avatar = forwardRef(function Avatar({ size = 24, name = "", identifier, src, alt, presence, className, ...props }, ref) {
    const seed = identifier ?? name ?? alt ?? "";
    const initials = initialsFrom(name || alt || "");
    const accessibleName = alt ?? name;
    return (_jsxs("span", { ref: ref, className: cn("relative inline-flex shrink-0", avatarSizeClasses[size].split(" ")[0]), ...props, children: [_jsxs(BaseAvatar.Root, { role: "img", "aria-label": accessibleName || undefined, className: cn("flex size-full select-none items-center justify-center overflow-hidden rounded-full", "bg-surface-hover font-medium leading-none", avatarSizeClasses[size], className), children: [src ? (_jsx(BaseAvatar.Image, { src: src, alt: "", className: "size-full object-cover" })) : null, _jsx(BaseAvatar.Fallback, { "aria-hidden": true, className: cn("flex size-full items-center justify-center", washFor(seed)), children: initials })] }), presence ? (_jsx("span", { "data-presence": presence, role: "img", "aria-label": presence === "online" ? "Online" : "Offline", className: cn("absolute bottom-0 right-0 rounded-full ring-2 ring-surface", size >= 32 ? "size-2.5" : "size-2", presence === "online" ? "bg-success" : "bg-border-strong") })) : null] }));
});
