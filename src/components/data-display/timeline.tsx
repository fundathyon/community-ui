import { Collapsible } from "@base-ui/react/collapsible";
import { ChevronDown } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { STATUS, type StatusKey } from "../../lib/status";
import type { ToneOrNeutral } from "../../lib/types";
import { Icon } from "../typography/icon";

const TONE_TEXT: Record<ToneOrNeutral, string> = {
  neutral: "text-text-secondary",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

const TONE_DOT: Record<ToneOrNeutral, string> = {
  neutral: "bg-text-muted",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

export interface TimelineMarker {
  /** Semantic tone for a plain dot marker. */
  tone?: ToneOrNeutral;
  /** A canonical state — its icon and tone drive the marker (§19). Wins over `tone`. */
  status?: StatusKey;
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {}

/**
 * Timeline — a vertical rail of events, each with a marker, a title line and a
 * muted meta line (§14). The connecting line is drawn automatically and stops at
 * the last entry. For the audit-log grammar (actor · verb · resource) use
 * ActivityFeed, which builds on the same rail.
 *
 * Server-component safe (the expandable detail delegates to Base UI Collapsible).
 */
export function Timeline({ className, ...props }: TimelineProps) {
  return (
    <ol
      className={cn(
        "flex flex-col",
        // The rail must not dangle past the final marker.
        "[&>li:last-child_[data-timeline-line]]:hidden [&>li:last-child_[data-timeline-content]]:pb-0",
        className,
      )}
      {...props}
    />
  );
}

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

const panelAnimation = cn(
  "h-[var(--collapsible-panel-height)] overflow-hidden",
  "transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
  "data-[starting-style]:h-0 data-[ending-style]:h-0",
);

function Marker({ marker }: { marker?: TimelineMarker }) {
  const spec = marker?.status ? STATUS[marker.status] : undefined;
  const tone: ToneOrNeutral = spec ? (spec.treatment === "tonal" ? spec.tone : "neutral") : marker?.tone ?? "neutral";
  const MarkerIcon = spec?.icon ?? null;

  return (
    <span className="relative z-[1] flex size-6 shrink-0 items-center justify-center">
      {MarkerIcon ? (
        <span
          className={cn(
            "flex size-6 items-center justify-center rounded-full border border-border bg-surface",
            TONE_TEXT[tone],
          )}
        >
          <Icon icon={MarkerIcon} size={12} />
        </span>
      ) : (
        <span className={cn("size-2.5 rounded-full", TONE_DOT[tone])} />
      )}
    </span>
  );
}

/**
 * TimelineItem — one entry on the Timeline rail. With `children`, the title turns
 * into a chevron disclosure that reveals the detail; without them it is a plain
 * line.
 */
export function TimelineItem({ marker, title, meta, className, children, ...props }: TimelineItemProps) {
  const hasDetail = children != null && children !== false;

  return (
    <li className={cn("flex gap-3", className)} {...props}>
      <div className="flex flex-col items-center">
        <Marker marker={marker} />
        <span data-timeline-line aria-hidden className="mt-1 w-px grow bg-border" />
      </div>
      <div data-timeline-content className="min-w-0 flex-1 pb-5">
        {hasDetail ? (
          <Collapsible.Root>
            <Collapsible.Trigger
              className={cn(
                "group flex w-full items-center gap-1.5 rounded-md text-left outline-none",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              )}
            >
              <span className="min-w-0 text-body text-text">{title}</span>
              <Icon
                icon={ChevronDown}
                size={14}
                className="shrink-0 text-text-muted transition-transform duration-[var(--fdn-dur-fast)] group-data-[panel-open]:rotate-180"
              />
            </Collapsible.Trigger>
            {meta ? <div className="text-caption text-text-muted">{meta}</div> : null}
            <Collapsible.Panel className={panelAnimation}>
              <div className="pt-2 text-body-sm text-text-secondary">{children}</div>
            </Collapsible.Panel>
          </Collapsible.Root>
        ) : (
          <>
            <div className="text-body text-text">{title}</div>
            {meta ? <div className="text-caption text-text-muted">{meta}</div> : null}
          </>
        )}
      </div>
    </li>
  );
}
