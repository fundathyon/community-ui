import type { HTMLAttributes } from "react";
export interface ResourceContentProps extends HTMLAttributes<HTMLDivElement> {
}
/**
 * ResourceContent — the content region under the tabs of a resource detail (§25):
 * a padded vertical stack for the sections of a single tab. The summary tab ends
 * with a DangerZone; a settings section ends with a SaveBar.
 *
 * Server-component safe.
 */
export declare function ResourceContent({ className, ...props }: ResourceContentProps): import("react").JSX.Element;
