import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Menu } from "lucide-react";
import { cn } from "../lib/cn";
import { Drawer, DrawerBody, DrawerContent, DrawerTrigger } from "../components/overlays/drawer";
import { Icon } from "../components/typography/icon";
/**
 * DocsSidebarTrigger — the mobile hamburger that opens the sidebar Drawer.
 * Place it in `DocsHeader`'s `menu` slot; `DocsLayout` provides the Drawer it
 * controls, so it only works inside a `DocsLayout` that has a `sidebar` (much
 * like `SidebarTrigger` needs `SidebarProvider`). Shown below `lg`.
 */
export function DocsSidebarTrigger({ label = "Open navigation", className }) {
    return (_jsx(DrawerTrigger, { "aria-label": label, className: cn("grid size-7 shrink-0 select-none place-items-center rounded-md text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text", "fdn-touch-target", className), children: _jsx(Icon, { icon: Menu, size: 16 }) }));
}
/**
 * DocsLayout — the three-column documentation frame (§26): a fixed 240px sidebar
 * on the left (sticky, its own scroll), the reading column in the center
 * (min-w-0, capped at the 72ch prose measure by `DocsPage`), and a 200px table
 * of contents on the right (sticky, hidden below `xl`). The sticky `header`
 * spans the full width above all three.
 *
 * Below `lg` the sidebar collapses into a Drawer (reusing the overlays Drawer),
 * opened by a `DocsSidebarTrigger` in the header. Server-component safe — the
 * interactive Drawer parts come from the overlays domain.
 */
export function DocsLayout({ sidebar, toc, header, className, children, ...props }) {
    const railScroll = "sticky top-header max-h-[calc(100dvh-var(--fdn-header-height))] self-start overflow-y-auto";
    const content = (_jsxs("div", { className: "mx-auto flex w-full max-w-[var(--fdn-container-max)] gap-8 px-4", children: [sidebar && (
            // 240px fixed sidebar, sticky under the header with its own scroll (§26).
            _jsx("aside", { className: cn(railScroll, "hidden w-[240px] shrink-0 lg:block"), children: sidebar })), _jsx("main", { className: "min-w-0 flex-1 py-8", children: children }), toc && (
            // 200px ToC rail, revealed at xl (§26).
            _jsx("aside", { className: cn(railScroll, "hidden w-[200px] shrink-0 py-8 xl:block"), children: toc }))] }));
    return (_jsx("div", { className: cn("min-h-dvh bg-bg", className), ...props, children: sidebar ? (_jsxs(Drawer, { children: [header, content, _jsx(DrawerContent, { side: "left", className: "lg:hidden", children: _jsx(DrawerBody, { children: sidebar }) })] })) : (_jsxs(_Fragment, { children: [header, content] })) }));
}
