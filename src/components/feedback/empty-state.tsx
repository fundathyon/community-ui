import { Inbox, SearchX, type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

export type EmptyStateKind = "empty" | "no-results";

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /**
   * `empty` — first time, nothing exists yet: primary action to create/sync.
   * `no-results` — filters/search matched nothing. NOT the same state (§11):
   * the data exists; the exit is "clear filters", not "create".
   */
  kind?: EmptyStateKind;
  /** 20px icon in a subtle circle. Defaults per kind (Inbox / SearchX). */
  icon?: LucideIcon;
  title: ReactNode;
  /** Three sentences maximum (§11). */
  description?: ReactNode;
  /** The one exit every empty state must offer (§11). Pass a Button. */
  action?: ReactNode;
  /** Optional secondary exit (e.g. "Ver docs" as a ghost Button or Link). */
  secondaryAction?: ReactNode;
}

/**
 * EmptyState (§11) — three sentences maximum and ALWAYS one exit. "First
 * time" gets a primary action; "no search results" gets "clear filters" and is
 * a different state (`kind="no-results"`), never this component's default.
 * Errors are not empty states — use ErrorState.
 */
export function EmptyState({
  kind = "empty",
  icon,
  title,
  description,
  action,
  secondaryAction,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      data-kind={kind}
      className={cn("flex flex-col items-center justify-center px-6 py-12 text-center", className)}
      {...props}
    >
      <span className="mb-3 grid size-10 place-items-center rounded-full bg-surface-hover text-text-muted">
        <Icon icon={icon ?? (kind === "no-results" ? SearchX : Inbox)} size={20} />
      </span>
      <h3 className="text-h4 text-text">{title}</h3>
      {description && (
        <p className="mt-1 max-w-96 text-body text-text-secondary">{description}</p>
      )}
      {(action || secondaryAction) && (
        <div className="mt-4 flex items-center gap-2">
          {action}
          {secondaryAction}
        </div>
      )}
    </div>
  );
}
