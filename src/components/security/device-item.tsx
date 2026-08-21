"use client";

import type { Locale } from "date-fns";
import { Monitor, ShieldAlert } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { DateInput } from "../../lib/format";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
import { RelativeTime } from "./relative-time";

export interface DeviceItemProps extends Omit<HTMLAttributes<HTMLDivElement>, "onReject"> {
  /** Device label — "New device · Firefox on Linux". */
  device: ReactNode;
  browser?: ReactNode;
  /** Verifiable data → mono (§23). */
  ip: string;
  location?: string;
  /** Copy when the location is unknown; overridable. */
  unknownLocationLabel?: ReactNode;
  time: DateInput;
  locale?: Locale;
  /**
   * Whether this device is already trusted. An UNRECOGNIZED device gets a
   * warning treatment (not danger — we don't yet know it's an attack, §23) plus
   * two actions.
   */
  recognized?: boolean;
  /** "Not me" — destructive-subtle. Only shown when unrecognized. */
  onReject?: () => void;
  rejectLabel?: string;
  /** "Recognize" — secondary. Only shown when unrecognized. */
  onRecognize?: () => void;
  recognizeLabel?: string;
}

/**
 * DeviceItem — a sign-in from a device pending review (§23). When unrecognized
 * it carries a WARNING treatment (warning-bg + warning-border, never danger:
 * an unfamiliar device isn't proof of an attack) and offers two actions —
 * "Not me" (destructive-subtle) and "Recognize" (secondary). A recognized
 * device renders as a plain bordered row.
 */
export function DeviceItem({
  device,
  browser,
  ip,
  location,
  unknownLocationLabel = "Unknown location",
  time,
  locale,
  recognized = false,
  onReject,
  rejectLabel = "Not me",
  onRecognize,
  recognizeLabel = "Recognize",
  className,
  ...props
}: DeviceItemProps) {
  const showActions = !recognized && (onReject != null || onRecognize != null);
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-3",
        recognized ? "border-border bg-surface" : "border-warning-border bg-warning-bg",
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <Icon
          icon={recognized ? Monitor : ShieldAlert}
          size={20}
          className={cn("mt-0.5 shrink-0", recognized ? "text-text-muted" : "text-warning")}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <div className="text-label text-text">
            {device}
            {browser != null && (
              <>
                <span aria-hidden> · </span>
                {browser}
              </>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-x-1.5 text-caption text-text-muted">
            <span className="font-mono">{ip}</span>
            <span aria-hidden>·</span>
            <span className="font-mono">{location ?? unknownLocationLabel}</span>
            <span aria-hidden>·</span>
            <RelativeTime value={time} locale={locale} />
          </div>
        </div>
      </div>
      {showActions && (
        <div className="flex items-center gap-2 pl-8">
          {onReject != null && (
            <Button variant="destructive-subtle" size="sm" onClick={onReject}>
              {rejectLabel}
            </Button>
          )}
          {onRecognize != null && (
            <Button variant="secondary" size="sm" onClick={onRecognize}>
              {recognizeLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export interface DeviceListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** DeviceList — stacks DeviceItems (each is a self-contained boxed row). */
export function DeviceList({ children, className, ...props }: DeviceListProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}
