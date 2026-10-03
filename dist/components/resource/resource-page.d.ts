import type { HTMLAttributes } from "react";
export interface ResourcePageProps extends HTMLAttributes<HTMLDivElement> {
}
/**
 * ResourcePage — the vertical composition wrapper for a resource detail view
 * (§25): header → tabs → content, stacked with consistent spacing. One template
 * serves user, repository, config, API key, role, org and job. Thin by design.
 *
 * Server-component safe.
 */
export declare function ResourcePage({ className, ...props }: ResourcePageProps): import("react").JSX.Element;
