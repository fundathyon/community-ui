import type { HTMLAttributes } from "react";
/** content 1360px (app screens) · prose 720px (docs, long-form) — §04. */
export type ContainerWidth = "content" | "prose";
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    /** Max width: `content` 1360 for product screens, `prose` 720 for reading. */
    width?: ContainerWidth;
}
/**
 * Container — max width + lateral page padding (§15). Two widths only:
 * content 1360 and prose 720 (§04). Content stops and centers at 2xl (§08).
 * Page padding is 24px on desktop, 16px under `md`.
 *
 * Server-component safe.
 */
export declare function Container({ width, className, ...props }: ContainerProps): import("react").JSX.Element;
