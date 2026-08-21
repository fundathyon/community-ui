import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../lib/cn";
/**
 * DocsHeader — the sticky top bar of a docs site (§26/§12): product on the left,
 * the search trigger in the center, version/theme actions on the right. Sits at
 * `header` height with a bottom border on `bg`, above the sidebar and content.
 *
 * It is a pure frame — it owns no state. The mobile sidebar toggle goes in the
 * `menu` slot (a `DocsSidebarTrigger`, which `DocsLayout` wires to its Drawer).
 * Server-component safe.
 */
export function DocsHeader({ logo, menu, search, actions, className, children, ...props }) {
    return (_jsxs("header", { className: cn("sticky top-0 fdn-z-sticky flex h-header items-center gap-3 border-b border-border bg-bg px-4", className), ...props, children: [menu && _jsx("div", { className: "flex items-center lg:hidden", children: menu }), logo && _jsx("div", { className: "flex min-w-0 shrink-0 items-center", children: logo }), _jsx("div", { className: "flex min-w-0 flex-1 justify-center", children: search }), actions && _jsx("div", { className: "flex shrink-0 items-center gap-1", children: actions }), children] }));
}
