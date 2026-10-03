import type { HTMLAttributes } from "react";
export interface KbdProps extends HTMLAttributes<HTMLElement> {
}
/**
 * Kbd — a keyboard shortcut chip: `<Kbd>⌘K</Kbd>`. Used in menus, tooltips and
 * the command menu to display the suite-wide shortcuts (§17). Mono because a
 * shortcut is literal (§03). Purely presentational — it never handles keys.
 *
 * Server-component safe.
 */
export declare function Kbd({ className, ...props }: KbdProps): import("react").JSX.Element;
