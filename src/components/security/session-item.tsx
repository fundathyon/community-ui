"use client";

import type { Locale } from "date-fns";
import { HelpCircle, Monitor, Smartphone, Tablet, type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { DateInput } from "../../lib/format";
import { Button } from "../actions/button";
import { Badge } from "../feedback/badge";
import { Icon } from "../typography/icon";
import { RelativeTime } from "./relative-time";

export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";

const DEVICE_ICON: Record<DeviceType, LucideIcon> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
  unknown: HelpCircle,
};

export interface SessionItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onRevoke"> {
  /** Human label — "MacBook Pro · Chrome 128". */
  device: ReactNode;
  /** The session this request is coming from. Current sessions are NEVER
   * revocable from the list (§23) — no action is rendered. */
  current?: boolean;
  /** Badge on the current session; overridable copy. */
  currentLabel?: ReactNode;
  /** Verifiable data → rendered in mono (§23). */
  ip: string;
  location?: string;
  lastActive: DateInput;
  locale?: Locale;
  deviceType?: DeviceType;
  /** Revoke handler. Only rendered when NOT the current session. */
  onRevoke?: () => void;
  revokeLabel?: string;
}

/**
 * SessionItem — one active session (§23). Device on top, IP + location + last
 * activity below; IP and location are mono because they're verifiable. The
 * current session shows a badge and NO revoke action — you can't sign yourself
 * out of the list you're reading it from (§23).
 */
export function SessionItem({
  device,
  current = false,
  currentLabel = "This session",
  ip,
  location,
  lastActive,
  locale,
  deviceType = "unknown",
  onRevoke,
  revokeLabel = "Revoke",
  className,
  ...props
}: SessionItemProps) {
  return (
    <div className={cn("flex items-center gap-3 py-3", className)} {...props}>
      <Icon icon={DEVICE_ICON[deviceType]} size={20} className="shrink-0 text-text-muted" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-center gap-2 text-label text-text">
          <span className="truncate">{device}</span>
          {current && <Badge tone="neutral">{currentLabel}</Badge>}
        </div>
        <div className="flex flex-wrap items-center gap-x-1.5 text-caption text-text-muted">
          <span className="font-mono">{ip}</span>
          {location != null && (
            <>
              <span aria-hidden>·</span>
              <span className="font-mono">{location}</span>
            </>
          )}
          <span aria-hidden>·</span>
          <RelativeTime value={lastActive} locale={locale} />
        </div>
      </div>
      {!current && onRevoke != null && (
        <Button variant="destructive-subtle" size="sm" onClick={onRevoke} className="shrink-0">
          {revokeLabel}
        </Button>
      )}
    </div>
  );
}

export interface SessionListProps extends HTMLAttributes<HTMLDivElement> {
  /** The SessionItem rows. */
  children: ReactNode;
}

/** SessionList — stacks SessionItems with divider rules between them (§23). */
export function SessionList({ children, className, ...props }: SessionListProps) {
  return (
    <div className={cn("divide-y divide-border", className)} {...props}>
      {children}
    </div>
  );
}
