import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

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
export function Container({ width = "content", className, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 md:px-6",
        width === "content" ? "max-w-container-max" : "max-w-prose-max",
        className,
      )}
      {...props}
    />
  );
}
