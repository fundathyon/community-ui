"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * Drawer (§13) — lateral work without losing the list context: detail of a
 * tag, long edition, filters. 420px from the right by default. If the content
 * needs its own tabs or more than 6 fields, it stops being an overlay and
 * becomes a page. On <sm viewports it becomes a bottom sheet automatically;
 * for an explicitly mobile pattern use Sheet.
 *
 * Shares the overlay contract (§13): focus trapped, Esc closes, focus returns
 * to the trigger, background inert and scroll-locked — Base UI Drawer provides
 * all of it, plus swipe-to-dismiss on touch (`swipeDirection` on the root,
 * default `"down"` — matches the mobile bottom sheet; pass `"right"`/`"left"`
 * to swipe the side panel toward its edge).
 *
 * ```tsx
 * <Drawer>
 *   <DrawerTrigger render={<Button variant="ghost">Detalle</Button>} />
 *   <DrawerContent size="md">
 *     <DrawerHeader>
 *       <DrawerTitle>library/nginx</DrawerTitle>
 *       <DrawerDescription>sha256:4a3ed8…9f21</DrawerDescription>
 *     </DrawerHeader>
 *     <DrawerBody>…</DrawerBody>
 *     <DrawerFooter>
 *       <DrawerClose render={<Button variant="ghost">Cancelar</Button>} />
 *       <Button variant="primary">Guardar cambios</Button>
 *     </DrawerFooter>
 *   </DrawerContent>
 * </Drawer>
 * ```
 */
export const Drawer = BaseDrawer.Root;
export const DrawerTrigger = BaseDrawer.Trigger;
export const DrawerClose = BaseDrawer.Close;
/** sm 360 · md 420 (§13 default) · lg 560 — via max-width, so small screens stay fluid. */
const sizeClasses = {
    sm: "sm:max-w-[360px]",
    md: "sm:max-w-[420px]",
    lg: "sm:max-w-[560px]",
};
const sideClasses = {
    right: cn("sm:ml-auto sm:border-l sm:border-t-0", 
    // §06 drawer recipe: slides from its origin edge
    "sm:data-[starting-style]:[translate:100%_0] sm:data-[ending-style]:[translate:100%_0]"),
    left: cn("sm:mr-auto sm:border-r sm:border-t-0", "sm:data-[starting-style]:[translate:-100%_0] sm:data-[ending-style]:[translate:-100%_0]"),
};
export function DrawerContent({ side = "right", size = "md", hideClose = false, className, children, ...props }) {
    return (_jsxs(BaseDrawer.Portal, { children: [_jsx(BaseDrawer.Backdrop, { className: cn(
                // §06: overlay fades at 180ms while the panel slides at dur-slow
                "fixed inset-0 fdn-z-modal bg-black/60", "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]", "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0") }), _jsx(BaseDrawer.Viewport, { className: "fixed inset-0 fdn-z-modal flex flex-col justify-end sm:flex-row sm:justify-normal", children: _jsxs(BaseDrawer.Popup, { className: cn("relative flex flex-col border-t border-border bg-surface-raised shadow-lg", 
                    // <sm: bottom sheet (§08)
                    "max-h-[92dvh] w-full rounded-t-xl", 
                    // ≥sm: full-height side panel
                    "sm:h-full sm:max-h-none sm:rounded-none", 
                    // slide from the origin edge, dur-slow; exit accelerates at ~2/3 (§06)
                    "[translate:var(--drawer-swipe-movement-x,0px)_var(--drawer-swipe-movement-y,0px)]", "transition-[translate] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]", "data-[ending-style]:duration-[var(--fdn-dur-base)] data-[ending-style]:ease-[var(--fdn-ease-exit)]", "data-[swiping]:transition-none", "data-[starting-style]:[translate:0_100%] data-[ending-style]:[translate:0_100%]", sideClasses[side], sizeClasses[size], className), ...props, children: [children, !hideClose && (_jsx(BaseDrawer.Close, { "aria-label": "Close", className: cn("absolute right-3 top-3 grid size-6 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text", "fdn-touch-target"), children: _jsx(Icon, { icon: X, size: 14 }) }))] }) })] }));
}
export function DrawerHeader({ className, ...props }) {
    return _jsx("div", { className: cn("flex flex-col gap-1 border-b border-border p-4 pr-10", className), ...props });
}
export function DrawerTitle({ className, ...props }) {
    return _jsx(BaseDrawer.Title, { className: cn("text-h4 text-text", className), ...props });
}
export function DrawerDescription({ className, ...props }) {
    return _jsx(BaseDrawer.Description, { className: cn("text-body text-text-secondary", className), ...props });
}
/**
 * Scrollable middle region. Rendered as Base UI's drawer content so
 * swipe-to-dismiss and inner touch scrolling never fight each other.
 */
export function DrawerBody({ className, ...props }) {
    return _jsx(BaseDrawer.Content, { className: cn("flex-1 overflow-y-auto p-4", className), ...props });
}
export function DrawerFooter({ className, ...props }) {
    return (_jsx("div", { className: cn("flex items-center justify-end gap-2 border-t border-border p-4", className), ...props }));
}
