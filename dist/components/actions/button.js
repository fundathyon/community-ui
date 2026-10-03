"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Spinner } from "../feedback/spinner";
const buttonVariants = cva([
    // §M-06: pressed darkens the fill — no translate, no scale, ever.
    "relative inline-flex shrink-0 select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-md font-medium",
    "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
    // §C-03 recipe: disabled = 45% opacity + not-allowed. Never for "no permission" —
    // in that case keep the button active and explain, or hide it.
    "disabled:cursor-not-allowed disabled:opacity-45",
    "fdn-touch-target",
], {
    variants: {
        variant: {
            /** One per screen. The only accent-solid surface of the page. */
            primary: "bg-accent-solid text-accent-on-solid hover:bg-accent-solid-hover active:bg-accent-solid-active disabled:hover:bg-accent-solid shadow-xs",
            /** A real alternative action. */
            secondary: "border border-border-strong bg-surface text-text hover:bg-surface-hover active:bg-surface-hover disabled:hover:bg-surface",
            /** Row and toolbar actions. */
            ghost: "text-text-secondary hover:bg-surface-hover hover:text-text active:bg-surface-hover disabled:hover:bg-transparent disabled:hover:text-text-secondary",
            /** Final confirmation inside a dialog — the only solid danger surface. */
            destructive: "bg-danger-solid text-on-solid hover:brightness-[0.94] active:brightness-[0.88] disabled:hover:brightness-100 shadow-xs",
            /** Destructive in a list/row context. */
            "destructive-subtle": "text-danger hover:bg-danger-bg active:bg-danger-bg disabled:hover:bg-transparent",
        },
        size: {
            xs: "h-control-xs px-2 text-label [&_svg]:size-3",
            sm: "h-control-sm px-2.5 text-label [&_svg]:size-3.5",
            md: "h-control-md px-3 text-label [&_svg]:size-4",
            lg: "h-control-lg px-4 text-body font-medium [&_svg]:size-4",
        },
    },
    defaultVariants: {
        variant: "secondary",
    },
});
/**
 * Button — executes an action. If it navigates to another route it is a Link,
 * even if it looks like a button (§09).
 *
 * When to use: one `primary` per screen; `secondary` for a real alternative;
 * `ghost` for row/toolbar actions; `destructive` only as final confirmation
 * inside a dialog; `destructive-subtle` for destructive actions in list context.
 *
 * Anti-patterns: two primaries competing; a primary inside a table row; generic
 * copy ("Aceptar") — the button says the verb: "Revocar enlace".
 */
export const Button = forwardRef(function Button({ className, variant, size, loading = false, leading, trailing, disabled, type = "button", children, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    return (_jsxs("button", { ref: ref, type: type, disabled: disabled || loading, "aria-busy": loading || undefined, "data-loading": loading || undefined, className: cn(buttonVariants({ variant, size: resolvedSize }), className), ...props, children: [loading && (_jsx("span", { className: "absolute inset-0 grid place-items-center", children: _jsx(Spinner, { size: resolvedSize === "xs" ? 12 : 14, label: null }) })), _jsxs("span", { className: cn("inline-flex items-center gap-1.5", loading && "invisible"), children: [leading, children, trailing] })] }));
});
export { buttonVariants };
