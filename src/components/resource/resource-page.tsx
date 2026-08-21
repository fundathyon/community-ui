import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ResourcePageProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * ResourcePage — the vertical composition wrapper for a resource detail view
 * (§25): header → tabs → content, stacked with consistent spacing. One template
 * serves user, repository, config, API key, role, org and job. Thin by design.
 *
 * Server-component safe.
 */
export function ResourcePage({ className, ...props }: ResourcePageProps) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}
