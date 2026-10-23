import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type { ComponentProps, HTMLAttributes } from "react";
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
export declare const Drawer: typeof BaseDrawer.Root;
export declare const DrawerTrigger: BaseDrawer.Trigger;
export declare const DrawerClose: BaseDrawer.Close;
export type DrawerSide = "right" | "left";
export type DrawerSize = "sm" | "md" | "lg";
export interface DrawerContentProps extends ComponentProps<typeof BaseDrawer.Popup> {
    /** Edge the panel slides from on ≥sm. Below sm it is always a bottom sheet (§08). */
    side?: DrawerSide;
    /** sm 360 · md 420 · lg 560. */
    size?: DrawerSize;
    /** Hide the corner close button. */
    hideClose?: boolean;
}
export declare function DrawerContent({ side, size, hideClose, className, children, ...props }: DrawerContentProps): import("react").JSX.Element;
export declare function DrawerHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function DrawerTitle({ className, ...props }: ComponentProps<typeof BaseDrawer.Title>): import("react").JSX.Element;
export declare function DrawerDescription({ className, ...props }: ComponentProps<typeof BaseDrawer.Description>): import("react").JSX.Element;
/**
 * Scrollable middle region. Rendered as Base UI's drawer content so
 * swipe-to-dismiss and inner touch scrolling never fight each other.
 */
export declare function DrawerBody({ className, ...props }: ComponentProps<typeof BaseDrawer.Content>): import("react").JSX.Element;
export declare function DrawerFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
