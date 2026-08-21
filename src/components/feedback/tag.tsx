"use client";

import { X } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The tag's label. */
  children: ReactNode;
  /** Renders a dismiss control when present; omit for a read-only tag. */
  onRemove?: () => void;
  /** Accessible name for the remove control. Defaults to "Remove {children}"
   * when the label is plain text, otherwise the generic "Remove". Overridable
   * product copy. */
  removeLabel?: string;
}

/**
 * Tag — data the USER edits: image tags, project labels, applied filters
 * (§09). Shares Badge's visual scale but is a distinct component: Badge is
 * state the system decides, Tag is user data, and the two are never
 * interchanged. Pass `onRemove` to render a dismiss control; omit it for a
 * read-only tag. Carries no `tone` — state semantics stay on Badge.
 */
export function Tag({ children, onRemove, removeLabel, className, ...props }: TagProps) {
  const defaultRemoveLabel = typeof children === "string" ? `Remove ${children}` : "Remove";

  return (
    <span
      className={cn(
        "inline-flex h-[1.125rem] shrink-0 items-center gap-1 rounded-full border border-border bg-surface-hover pl-2 text-caption font-medium leading-none text-text-secondary",
        onRemove ? "pr-1" : "pr-2",
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel ?? defaultRemoveLabel}
          onClick={onRemove}
          className={cn(
            "fdn-touch-target grid size-3.5 shrink-0 place-items-center rounded-full text-text-muted",
            "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
            "hover:bg-border-strong hover:text-text",
          )}
        >
          <Icon icon={X} size={12} />
        </button>
      )}
    </span>
  );
}
