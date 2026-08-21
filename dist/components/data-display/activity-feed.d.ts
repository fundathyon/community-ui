import { type HTMLAttributes, type ReactNode } from "react";
import { type DateInput } from "../../lib/format";
export interface ActivityActor {
    name?: string;
    email?: string;
    /** System actor — rendered with an icon, never an avatar, so it does not
     * fake a person behind the action (§24). */
    system?: boolean;
}
export interface ActivityTechnical {
    ip?: string;
    traceId?: string;
    requestId?: string;
    /** Canonical event name — "accounts.role.update". */
    event?: string;
}
export interface ActivityFeedProps extends HTMLAttributes<HTMLUListElement> {
}
/**
 * ActivityFeed — the audit-log event list (§24). Every entry reads in one line —
 * actor · past-tense verb · resource · detail — and the technical metadata and
 * any diff EXPAND below, never the reverse. Built on the Timeline rail.
 */
export declare const ActivityFeed: import("react").ForwardRefExoticComponent<ActivityFeedProps & import("react").RefAttributes<HTMLUListElement>>;
export interface ActivityFeedItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "children"> {
    /** Who acted — drives the avatar, or a system icon when `system` is set (§24). */
    actor: ActivityActor;
    /** The event sentence, composed by the app with inline <strong>/mono pieces. */
    action: ReactNode;
    /** When it happened — relative under 7 days, absolute in the tooltip (§17). */
    timestamp: DateInput;
    /** Optional badge slot on the first line (e.g. a StatusBadge). */
    badge?: ReactNode;
    /** Technical metadata — a second mono/muted line, each value copyable (§24). */
    technical?: ActivityTechnical;
    /** Label for the disclosure that reveals `children`. Default "Details". */
    detailsLabel?: ReactNode;
    /** Expandable detail — a diff, before/after, etc. */
    children?: ReactNode;
}
/**
 * ActivityFeedItem — one audit event on the ActivityFeed rail. Line one is the
 * sentence plus timestamp and optional badge; line two is the copyable technical
 * metadata; a diff or before/after expands underneath. A `system` actor shows an
 * icon instead of an avatar (§24).
 */
export declare function ActivityFeedItem({ actor, action, timestamp, badge, technical, detailsLabel, className, children, ...props }: ActivityFeedItemProps): import("react").JSX.Element;
