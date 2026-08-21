import type { Locale } from "date-fns";
import type { HTMLAttributes, ReactNode } from "react";
import type { DateInput } from "../../lib/format";
export type DeviceType = "desktop" | "mobile" | "tablet" | "unknown";
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
export declare function SessionItem({ device, current, currentLabel, ip, location, lastActive, locale, deviceType, onRevoke, revokeLabel, className, ...props }: SessionItemProps): import("react").JSX.Element;
export interface SessionListProps extends HTMLAttributes<HTMLDivElement> {
    /** The SessionItem rows. */
    children: ReactNode;
}
/** SessionList — stacks SessionItems with divider rules between them (§23). */
export declare function SessionList({ children, className, ...props }: SessionListProps): import("react").JSX.Element;
