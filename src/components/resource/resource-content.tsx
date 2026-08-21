import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface ResourceContentProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * ResourceContent — the content region under the tabs of a resource detail (§25):
 * a padded vertical stack for the sections of a single tab. The summary tab ends
 * with a DangerZone; a settings section ends with a SaveBar.
 *
 * Server-component safe.
 */
export function ResourceContent({ className, ...props }: ResourceContentProps) {
  return <div className={cn("flex flex-col gap-6 py-2", className)} {...props} />;
}
