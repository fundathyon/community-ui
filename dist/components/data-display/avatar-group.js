import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Children, isValidElement } from "react";
import { cn } from "../../lib/cn";
import { avatarSizeClasses } from "./avatar";
/**
 * AvatarGroup — overlapped avatars cut at `max` with a "+n" counter styled like
 * one more avatar (§09). Each face wears a `ring-surface` so the overlap reads as
 * separate people, not a blur. Pass Avatar children of a single size and set the
 * matching `size` so the counter lines up.
 */
export function AvatarGroup({ max = 3, size = 24, className, children, ...props }) {
    const items = Children.toArray(children).filter(isValidElement);
    const visible = items.slice(0, max);
    const remainder = items.length - visible.length;
    const ring = "rounded-full ring-2 ring-surface";
    return (_jsxs("div", { className: cn("flex items-center", className), ...props, children: [visible.map((child, index) => (_jsx("span", { className: cn(ring, index > 0 && "-ml-2"), children: child }, index))), remainder > 0 ? (_jsxs("span", { className: cn("z-0 -ml-2 inline-flex items-center justify-center bg-surface-hover font-medium leading-none text-text-secondary", ring, avatarSizeClasses[size]), "aria-label": `${remainder} more`, children: ["+", remainder] })) : null] }));
}
