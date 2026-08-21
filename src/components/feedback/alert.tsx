"use client";

import { CircleCheck, CircleX, Info, TriangleAlert, X, type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Tone } from "../../lib/types";
import { Icon } from "../typography/icon";

/** Fixed icon per tone across the whole suite (§07) — never swapped locally. */
export const TONE_ICON: Record<Tone, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  warning: TriangleAlert,
  danger: CircleX,
};

export const TONE_TEXT: Record<Tone, string> = {
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export const TONE_WASH: Record<Tone, string> = {
  info: "bg-info-bg border-info-border",
  success: "bg-success-bg border-success-border",
  warning: "bg-warning-bg border-warning-border",
  danger: "bg-danger-bg border-danger-border",
};

interface AlertBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** One line. What is true right now. */
  title: ReactNode;
  /** Body — two lines maximum (§11). */
  children?: ReactNode;
  /** A single action (§11). Pass a small Button or Link. */
  action?: ReactNode;
  /** Override the tone's fixed icon — rarely justified (§07). */
  icon?: LucideIcon;
  /** Accessible name of the dismiss button. Overridable product copy. */
  dismissLabel?: string;
}

export type AlertProps = AlertBaseProps &
  (
    | {
        tone?: Exclude<Tone, "danger">;
        /** Renders a dismiss button. Only non-critical alerts are dismissable —
         * a danger Alert stays until the user resolves the cause (§11). */
        onDismiss?: () => void;
      }
    | { tone: "danger"; onDismiss?: never }
  );

/**
 * Alert — persistent and contextual (§11): it lives inside the page it refers
 * to and describes a state that stays true even when not looked at. Feedback
 * sits as close to its cause as possible — session-wide messages go in Banner,
 * confirmations of what the user just did go in Toast (§17).
 *
 * `danger` announces with `role="alert"` and cannot be dismissed; other tones
 * are polite (`role="status"`).
 */
export function Alert({
  tone = "info",
  title,
  children,
  action,
  icon,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
  ...props
}: AlertProps) {
  const critical = tone === "danger";
  return (
    <div
      role={critical ? "alert" : "status"}
      data-tone={tone}
      className={cn("flex gap-2 rounded-lg border p-3", TONE_WASH[tone], className)}
      {...props}
    >
      <Icon icon={icon ?? TONE_ICON[tone]} size={16} className={cn("mt-0.5", TONE_TEXT[tone])} />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="text-h5 text-text">{title}</div>
        {children && <div className="text-body-sm text-text-secondary">{children}</div>}
        {action && <div className="pt-1.5">{action}</div>}
      </div>
      {!critical && onDismiss && (
        <button
          type="button"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className={cn(
            "-mr-1 -mt-1 grid size-6 shrink-0 place-items-center self-start rounded-sm text-text-muted",
            "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover hover:text-text",
            "fdn-touch-target",
          )}
        >
          <Icon icon={X} size={14} />
        </button>
      )}
    </div>
  );
}
