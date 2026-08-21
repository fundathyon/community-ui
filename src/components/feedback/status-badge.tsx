import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { STATUS, type StatusKey } from "../../lib/status";
import { Badge } from "./badge";
import { Spinner } from "./spinner";

export interface StatusBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** One of the sixteen canonical states (§19). A product never invents one locally. */
  status: StatusKey;
  /** Product copy for the state. Defaults to the canonical English label. */
  children?: ReactNode;
}

/**
 * StatusBadge — the badge treatment of the state taxonomy (§19). Tone, icon
 * and treatment are FIXED per state across the whole suite; only the copy is
 * yours. Terminal states render as gray outline (place them in rows at 0.6
 * opacity); `unknown` is the only dashed badge. Never `line-through` (§M-01).
 *
 * For dense lists use StatusIndicator (dot + text); for narrow columns use it
 * in icon-only mode with a tooltip. Same color in every treatment.
 */
export function StatusBadge({ status, children, className, ...props }: StatusBadgeProps) {
  const spec = STATUS[status];
  return (
    <Badge
      variant={spec.treatment === "tonal" ? "tonal" : "outline"}
      tone={spec.treatment === "tonal" ? spec.tone : "neutral"}
      dot={spec.dot}
      icon={spec.icon ?? undefined}
      dashed={spec.treatment === "outline-dashed"}
      data-status={status}
      className={cn(className)}
      {...props}
    >
      {spec.spinner && <Spinner size={12} label={null} />}
      {children ?? spec.label}
    </Badge>
  );
}
