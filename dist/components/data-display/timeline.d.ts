import type { HTMLAttributes, ReactNode } from "react";
import { type StatusKey } from "../../lib/status";
import type { ToneOrNeutral } from "../../lib/types";
export interface TimelineMarker {
    /** Semantic tone for a plain dot marker. */
    tone?: ToneOrNeutral;
    /** A canonical state — its icon and tone drive the marker (§19). Wins over `tone`. */
    status?: StatusKey;
}
export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
}
/**
 * Timeline — a vertical rail of events, each with a marker, a title line and a
 * muted meta line (§14). The connecting line is drawn automatically and stops at
 * the last entry. For the audit-log grammar (actor · verb · resource) use
 * ActivityFeed, which builds on the same rail.
 *
 * Server-component safe (the expandable detail delegates to Base UI Collapsible).
 */
export declare function Timeline({ className, ...props }: TimelineProps): import("react").JSX.Element;
export interface TimelineItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title" | "children"> {
    /** The marker: a tonal dot, or a state icon (§14). Defaults to a neutral dot. */
    marker?: TimelineMarker;
    /** The event line — "Token ci-deploy creado". */
    title: ReactNode;
    /** Muted caption under the title — "hace 2 h · maría@foundathyon.dev". */
    meta?: ReactNode;
    /** Expandable detail; when present the title becomes a disclosure trigger. */
    children?: ReactNode;
}
/**
 * TimelineItem — one entry on the Timeline rail. With `children`, the title turns
 * into a chevron disclosure that reveals the detail; without them it is a plain
 * line.
 */
export declare function TimelineItem({ marker, title, meta, className, children, ...props }: TimelineItemProps): import("react").JSX.Element;
