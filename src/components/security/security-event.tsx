import type { Locale } from "date-fns";
import { Cog } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { DateInput } from "../../lib/format";
import type { ToneOrNeutral } from "../../lib/types";
import { CopyButton } from "../dev/copy-button";
import { Icon } from "../typography/icon";
import { RelativeTime } from "./relative-time";

export interface SecurityEventActor {
  name?: string;
  email?: string;
  /** A system/automation actor — rendered with an icon, not an avatar, so it
   * never pretends there's a person behind it (§24). */
  system?: boolean;
}

export interface SecurityEventTechnical {
  ip?: string;
  userAgent?: string;
  traceId?: string;
  requestId?: string;
  /** The event name — "accounts.auth.lockout". */
  event?: string;
}

export interface SecurityEventProps extends Omit<HTMLAttributes<HTMLDivElement>, "action"> {
  actor: SecurityEventActor;
  /** Past-tense verb phrase — "changed the role of", "revoked the shared link of". */
  action: ReactNode;
  /** The affected resource. */
  target?: ReactNode;
  timestamp: DateInput;
  locale?: Locale;
  /** Optional left-accent tone: lockouts warning, revocations neutral… (§24). */
  tone?: ToneOrNeutral;
  /** Technical metadata — mono, muted, second line, each value copy-on-click
   * (§24). Present for support, invisible to whoever just reviews what happened. */
  technical?: SecurityEventTechnical;
  systemLabel?: string;
  copyLabel?: string;
}

const ACCENT_BORDER: Record<ToneOrNeutral, string> = {
  neutral: "border-border",
  info: "border-info-border",
  success: "border-success-border",
  warning: "border-warning-border",
  danger: "border-danger-border",
};

function TechDatum({ prefix, value, copyLabel }: { prefix?: string; value: string; copyLabel?: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span>
        {prefix != null && <span className="text-text-disabled">{prefix} </span>}
        {value}
      </span>
      <CopyButton value={value} size={12} label={copyLabel} />
    </span>
  );
}

/**
 * SecurityEvent — one row of the actor · past-tense verb · resource · detail
 * grammar (§24), specialized for security contexts. The event reads in one
 * line; the technical metadata (IP, trace id, request id, user agent, event
 * name) sits mono and muted on a second line, each value copyable. A `system`
 * actor gets an icon instead of an avatar (§24).
 *
 * `AuditEvent` is the same component under the audit-log name. This is a
 * deliberately minimal, standalone row; data-display's ActivityFeed is parallel
 * and may unify with it later.
 */
export function SecurityEvent({
  actor,
  action,
  target,
  timestamp,
  locale,
  tone,
  technical,
  systemLabel = "system",
  copyLabel = "Copy",
  className,
  ...props
}: SecurityEventProps) {
  const actorName = actor.system ? systemLabel : (actor.name ?? actor.email ?? "");
  const initial = (actor.name ?? actor.email ?? "?").trim().charAt(0).toUpperCase() || "?";

  const techEntries: ReactNode[] = [];
  if (technical != null) {
    if (technical.ip != null) techEntries.push(<TechDatum key="ip" prefix="ip" value={technical.ip} copyLabel={copyLabel} />);
    if (technical.traceId != null)
      techEntries.push(<TechDatum key="trace" prefix="trace" value={technical.traceId} copyLabel={copyLabel} />);
    if (technical.requestId != null)
      techEntries.push(<TechDatum key="req" prefix="req" value={technical.requestId} copyLabel={copyLabel} />);
    if (technical.userAgent != null)
      techEntries.push(<TechDatum key="ua" prefix="ua" value={technical.userAgent} copyLabel={copyLabel} />);
    if (technical.event != null)
      techEntries.push(<TechDatum key="event" value={technical.event} copyLabel={copyLabel} />);
  }

  return (
    <div
      className={cn(
        "flex gap-3 py-3",
        tone != null && cn("border-l-2 pl-3", ACCENT_BORDER[tone]),
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-surface-hover text-caption font-medium text-text-secondary"
      >
        {actor.system ? <Icon icon={Cog} size={14} className="text-text-muted" /> : initial}
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="text-body-sm text-text-secondary">
          <span className="font-medium text-text">{actorName}</span> {action}
          {target != null && <> <span className="font-medium text-text">{target}</span></>}
        </div>
        <RelativeTime value={timestamp} locale={locale} className="text-caption text-text-muted" />
        {techEntries.length > 0 && (
          <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption text-text-muted">
            {techEntries}
          </div>
        )}
      </div>
    </div>
  );
}

/** AuditEvent — the audit-log name for SecurityEvent (§24). Same component. */
export const AuditEvent = SecurityEvent;
export type AuditEventProps = SecurityEventProps;
