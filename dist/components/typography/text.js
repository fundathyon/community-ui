import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
const variantClasses = {
    body: "text-body",
    "body-sm": "text-body-sm",
    label: "text-label",
    caption: "text-caption",
    // The scale's tracking comes from the token; caps are part of the style.
    overline: "text-overline uppercase",
    // Mono means "literal and copyable" (§03) — never decorative.
    code: "text-code font-mono",
};
const toneClasses = {
    default: "text-text",
    secondary: "text-text-secondary",
    muted: "text-text-muted",
    disabled: "text-text-disabled",
};
/**
 * Text — body copy on the level-named type scale (§03). `variant` is the level,
 * `tone` the emphasis. `code` is semantic: mono means "literal and copyable"
 * (paths, digests, commands, IDs) — if the user won't copy or compare it
 * character by character, it belongs in Inter.
 *
 * Server-component safe.
 */
export function Text({ variant = "body", tone = "default", as, tabular = false, className, ...props }) {
    const Tag = as ?? (variant === "body" ? "p" : "span");
    return (_jsx(Tag, { className: cn(variantClasses[variant], toneClasses[tone], tabular && "tabular-nums", className), ...props }));
}
