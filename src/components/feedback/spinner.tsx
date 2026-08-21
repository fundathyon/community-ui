import { cn } from "../../lib/cn";
import type { IconSize } from "../typography/icon";

export interface SpinnerProps {
  size?: IconSize;
  /**
   * Accessible label announced to screen readers. Pass your product copy
   * (e.g. "Sincronizando…"). Pass `null` when a parent already announces the
   * busy state (e.g. a Button with `loading`).
   */
  label?: string | null;
  className?: string;
}

/**
 * Indeterminate spinner — for a short in-flight action (< 1s expected) or when
 * the shape of the incoming content is unknown. If the shape IS known and the
 * wait exceeds 300ms, use Skeleton instead. Never both at once (§09).
 *
 * Under `prefers-reduced-motion` the rotation becomes a soft opacity pulse.
 * Server-component safe.
 */
export function Spinner({ size = 16, label = "Loading…", className }: SpinnerProps) {
  return (
    <span
      role={label ? "status" : undefined}
      aria-label={label ?? undefined}
      aria-hidden={label ? undefined : true}
      className={cn("inline-flex shrink-0", className)}
    >
      <svg
        className="fdn-spin"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <path
          d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
