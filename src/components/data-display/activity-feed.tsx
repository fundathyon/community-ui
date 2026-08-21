"use client";

import { Collapsible } from "@base-ui/react/collapsible";
import { Check, ChevronDown, Cog } from "lucide-react";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { formatRelativeDate, type DateInput } from "../../lib/format";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
import { Avatar } from "./avatar";

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

export interface ActivityFeedProps extends HTMLAttributes<HTMLUListElement> {}

/**
 * ActivityFeed — the audit-log event list (§24). Every entry reads in one line —
 * actor · past-tense verb · resource · detail — and the technical metadata and
 * any diff EXPAND below, never the reverse. Built on the Timeline rail.
 */
export const ActivityFeed = forwardRef<HTMLUListElement, ActivityFeedProps>(function ActivityFeed(
  { className, ...props },
  ref,
) {
  return (
    <ul
      ref={ref}
      className={cn(
        "flex flex-col",
        "[&>li:last-child_[data-feed-line]]:hidden [&>li:last-child_[data-feed-content]]:pb-0",
        className,
      )}
      {...props}
    />
  );
});

const panelAnimation = cn(
  "h-[var(--collapsible-panel-height)] overflow-hidden",
  "transition-[height] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
  "data-[starting-style]:h-0 data-[ending-style]:h-0",
);

/** A single mono metadata token whose value copies on click (§24). */
function CopyableToken({ prefix, value }: { prefix?: string; value: string }) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={cn(
        "inline-flex items-center gap-1 rounded-sm outline-none transition-colors hover:text-text-secondary",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
      )}
      title={`Copy ${value}`}
    >
      {prefix ? <span className="text-text-disabled">{prefix}</span> : null}
      <span>{value}</span>
      {copied ? <Icon icon={Check} size={12} className="text-success" /> : null}
    </button>
  );
}

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
export function ActivityFeedItem({
  actor,
  action,
  timestamp,
  badge,
  technical,
  detailsLabel = "Details",
  className,
  children,
  ...props
}: ActivityFeedItemProps) {
  const when = formatRelativeDate(timestamp);
  const actorName = actor.name ?? actor.email ?? "";
  const hasDetail = children != null && children !== false;
  const hasTechnical =
    technical && (technical.ip || technical.traceId || technical.requestId || technical.event);

  return (
    <li className={cn("flex gap-3", className)} {...props}>
      <div className="flex flex-col items-center">
        {actor.system ? (
          <span
            role="img"
            aria-label={actorName || "System"}
            className="relative z-[1] flex size-6 items-center justify-center rounded-full border border-border bg-surface text-text-muted"
          >
            <Icon icon={Cog} size={14} />
          </span>
        ) : (
          <Avatar size={24} name={actorName} className="relative z-[1]" />
        )}
        <span data-feed-line aria-hidden className="mt-1 w-px grow bg-border" />
      </div>

      <div data-feed-content className="min-w-0 flex-1 pb-4">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1 text-body-sm text-text-secondary [&_strong]:font-medium [&_strong]:text-text">
            {action}
          </div>
          {badge ? <span className="shrink-0">{badge}</span> : null}
          <Tooltip content={when.absolute}>
            <time className="shrink-0 whitespace-nowrap text-caption text-text-muted">{when.display}</time>
          </Tooltip>
        </div>

        {hasTechnical ? (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-caption text-text-muted">
            {technical!.ip ? <CopyableToken prefix="ip" value={technical!.ip} /> : null}
            {technical!.traceId ? <CopyableToken prefix="trace" value={technical!.traceId} /> : null}
            {technical!.requestId ? <CopyableToken prefix="req" value={technical!.requestId} /> : null}
            {technical!.event ? <CopyableToken value={technical!.event} /> : null}
          </div>
        ) : null}

        {hasDetail ? (
          <Collapsible.Root className="mt-1.5">
            <Collapsible.Trigger
              className={cn(
                "group inline-flex items-center gap-1 rounded-sm text-caption text-text-muted outline-none transition-colors hover:text-text-secondary",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
              )}
            >
              <Icon
                icon={ChevronDown}
                size={12}
                className="transition-transform duration-[var(--fdn-dur-fast)] group-data-[panel-open]:rotate-180"
              />
              <span>{detailsLabel}</span>
            </Collapsible.Trigger>
            <Collapsible.Panel className={panelAnimation}>
              <div className="pt-1.5 text-body-sm text-text-secondary">{children}</div>
            </Collapsible.Panel>
          </Collapsible.Root>
        ) : null}
      </div>
    </li>
  );
}
