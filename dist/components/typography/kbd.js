import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
/**
 * Kbd — a keyboard shortcut chip: `<Kbd>⌘K</Kbd>`. Used in menus, tooltips and
 * the command menu to display the suite-wide shortcuts (§17). Mono because a
 * shortcut is literal (§03). Purely presentational — it never handles keys.
 *
 * Server-component safe.
 */
export function Kbd({ className, ...props }) {
    return (_jsx("kbd", { className: cn("inline-flex min-w-[1.25rem] items-center justify-center rounded-sm border border-border bg-bg-subtle px-1 text-center font-mono text-caption text-text-secondary", className), ...props }));
}
