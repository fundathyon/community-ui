/**
 * Brand header of every email — logo (or product name in the accent) on the
 * left, optional muted meta on the right ("Security", an env name).
 */
import { type ReactNode } from "react";
export interface EmailHeaderProps {
    /** Right-aligned muted meta, e.g. the email category ("Security"). */
    meta?: ReactNode;
}
/**
 * Product identity row. Rendered by default at the top of `EmailLayout`'s
 * card; pass a customized instance via the layout's `header` slot. Falls back
 * to `productName` text when `logoUrl` is unset or images are blocked — the
 * message never depends on an image.
 */
export declare function EmailHeader({ meta }: EmailHeaderProps): import("react").JSX.Element;
