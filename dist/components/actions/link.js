import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { ExternalLink } from "lucide-react";
import { cloneElement, forwardRef, } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
const variantClasses = {
    // §09: the underline always appears on hover — color alone never indicates a link.
    accent: "text-accent decoration-accent hover:underline",
    neutral: "text-text underline decoration-border-strong hover:decoration-text-muted",
};
/**
 * Link — navigates to another route or document. If it executes an action it
 * is a Button, even if it looks like a link (§09). Renders an `<a>` by default;
 * pass `render` to substitute a framework router link.
 *
 * Two types only: `accent` in prose, underlined `neutral` inside data. Color
 * alone never indicates a link — the underline appears on hover (§09).
 */
export const Link = forwardRef(function Link({ variant = "accent", external = false, render, className, children, ...props }, ref) {
    const classes = cn("rounded-sm underline-offset-2 transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", variantClasses[variant], className);
    const content = external ? (_jsxs(_Fragment, { children: [children, _jsx(Icon, { icon: ExternalLink, size: 12, className: "ml-1 inline-block align-[-0.0625em]" })] })) : (children);
    const anchorProps = {
        ...props,
        ...(external ? { target: "_blank", rel: "noreferrer" } : null),
    };
    if (render) {
        return cloneElement(render, {
            ...anchorProps,
            // @ts-expect-error — ref is a valid prop for host/forwardRef elements.
            ref,
            className: cn(classes, render.props.className),
            children: content,
        });
    }
    return (_jsx("a", { ref: ref, className: classes, ...anchorProps, children: content }));
});
