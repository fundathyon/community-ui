import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * Card — bordered surface for grouped content (§15). Cards do NOT float: in
 * this suite elevation means "floats over the page", so a card has a border
 * and NO shadow. Header and footer are optional; the body is not.
 *
 * Server-component safe.
 */
export function Card({ interactive = false, className, ...props }) {
    return (_jsx("div", { className: cn("flex flex-col rounded-xl border border-border bg-surface", interactive &&
            "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus", className), ...props }));
}
/** Card header — title (text-h5, §03) plus optional right-aligned actions. */
export function CardHeader({ actions, className, children, ...props }) {
    return (_jsxs("div", { className: cn("flex items-start justify-between gap-2 px-4 pt-4", className), ...props, children: [_jsx("div", { className: "min-w-0 text-h5 text-text", children: children }), actions && _jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions })] }));
}
/** Card body — 16px padding (§04). The only mandatory region of a card. */
export function CardBody({ className, ...props }) {
    return _jsx("div", { className: cn("flex-1 p-4", className), ...props });
}
/** Card footer — separated by a border, actions aligned right. */
export function CardFooter({ className, ...props }) {
    return (_jsx("div", { className: cn("flex items-center justify-end gap-2 border-t border-border px-4 py-3", className), ...props }));
}
