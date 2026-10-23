import type { Locale } from "date-fns";
import type { HTMLAttributes, ReactNode } from "react";
import type { DateInput } from "../../lib/format";
import type { ToneOrNeutral } from "../../lib/types";
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
export declare function SecurityEvent({ actor, action, target, timestamp, locale, tone, technical, systemLabel, copyLabel, className, ...props }: SecurityEventProps): import("react").JSX.Element;
/** AuditEvent — the audit-log name for SecurityEvent (§24). Same component. */
export declare const AuditEvent: typeof SecurityEvent;
export type AuditEventProps = SecurityEventProps;
