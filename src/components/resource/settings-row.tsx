import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

export interface SettingsRowProps extends HTMLAttributes<HTMLDivElement> {
  /** The setting name. */
  label: ReactNode;
  /** A line explaining what the setting does or affects. */
  description?: ReactNode;
  /** The control on the right — a Switch, Select or segmented control (§25). */
  control: ReactNode;
  /** id of the control, to associate the label with it for assistive tech. */
  htmlFor?: string;
}

/**
 * SettingsRow — one settings entry (§25): label and description on the left, the
 * control on the right, separated from its neighbours by a hairline. Switches
 * apply instantly; the ones that change org-wide security defer to a SaveBar
 * instead of a page-level "Save".
 *
 * Server-component safe.
 */
export function SettingsRow({ label, description, control, htmlFor, className, ...props }: SettingsRowProps) {
  const LabelTag = htmlFor ? "label" : "span";
  return (
    <div
      className={cn("flex items-start justify-between gap-4 border-b border-border py-4 last:border-b-0", className)}
      {...props}
    >
      <div className="min-w-0">
        <LabelTag htmlFor={htmlFor} className="text-body font-medium text-text">
          {label}
        </LabelTag>
        {description ? <p className="mt-0.5 text-caption text-text-muted">{description}</p> : null}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}
