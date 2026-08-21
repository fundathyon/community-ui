import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { ToneOrNeutral } from "../../lib/types";
import { Badge } from "../feedback/badge";

/**
 * Tone of a scope by its EFFECT (§23): read is info, write is success, delete is
 * danger, admin is warning (broad power). Unknown suffixes stay neutral — a scope
 * we can't classify never borrows a semantic color.
 *
 * The suffix is the segment after the last `:` — `registry:read` → `read`,
 * `config:write` → `write`. A bare `read` also classifies.
 */
export function scopeTone(scope: string): ToneOrNeutral {
  const suffix = scope.split(":").pop()?.trim().toLowerCase() ?? "";
  switch (suffix) {
    case "read":
    case "readonly":
    case "list":
      return "info";
    case "write":
    case "create":
    case "update":
      return "success";
    case "delete":
    case "destroy":
      return "danger";
    case "admin":
    case "manage":
    case "owner":
      return "warning";
    default:
      return "neutral";
  }
}

export interface ScopeBadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The scope string, e.g. "registry:read". Rendered in mono. */
  scope: string;
  /** Override the auto tone (from `scopeTone`). */
  tone?: ToneOrNeutral;
  /** Override the displayed text (defaults to the scope string). */
  children?: ReactNode;
}

/**
 * ScopeBadge — a permission scope chip colored by its effect (§23): reads are
 * info, writes success, deletes danger, admin warning. Mono, because a scope is
 * verifiable literal data. Use `scopeTone(scope)` directly when you need the
 * tone without the badge.
 */
export function ScopeBadge({ scope, tone, children, className, ...props }: ScopeBadgeProps) {
  return (
    <Badge tone={tone ?? scopeTone(scope)} className={cn("font-mono", className)} {...props}>
      {children ?? scope}
    </Badge>
  );
}
