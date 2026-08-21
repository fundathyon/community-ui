"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
import { CopyButton } from "./copy-button";

export interface SecretProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "prefix"> {
  /** The full secret value. */
  value: string;
  /** Adds an eye toggle (aria-pressed) that reveals the full value. */
  revealable?: boolean;
  /** Characters kept visible at the start / end of the mask. */
  prefix?: number;
  suffix?: number;
  /** Copies the FULL value, masked or not (§20). */
  copy?: boolean;
  /** Badge marker text; empty string hides the badge. */
  label?: string;
  revealLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
}

/**
 * Secret — a masked sensitive value (§20): a secret is shown complete only
 * ONCE, at creation (see TokenDisplay); everywhere else only prefix + suffix
 * survive — "sk_live_de96••••••••••••j87TzX". The mask travels with a badge
 * marker, the copy button still copies the full value, and it never belongs
 * in logs or URLs.
 */
export function Secret({
  value,
  revealable = false,
  prefix = 8,
  suffix = 6,
  copy = true,
  label = "Secret",
  revealLabel = "Reveal secret",
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  ...props
}: SecretProps) {
  const [revealed, setRevealed] = useState(false);
  return (
    <span
      className={cn("inline-flex items-center gap-1.5 font-mono text-code text-text-secondary", className)}
      {...props}
    >
      <span className={cn("break-all", revealed && "text-text")}>
        {revealed ? value : maskSecret(value, prefix, suffix)}
      </span>
      {label && <Badge tone="warning">{label}</Badge>}
      {revealable && (
        <Tooltip content={revealLabel}>
          <button
            type="button"
            aria-pressed={revealed}
            aria-label={revealLabel}
            onClick={() => setRevealed(!revealed)}
            className={cn(
              "inline-flex size-5 shrink-0 select-none items-center justify-center rounded-md text-text-secondary",
              "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
              "hover:bg-surface-hover hover:text-text active:bg-surface-hover",
              "fdn-touch-target",
            )}
          >
            <Icon icon={revealed ? EyeOff : Eye} size={12} />
          </button>
        </Tooltip>
      )}
      {copy && <CopyButton value={value} label={copyLabel} copiedLabel={copiedLabel} size={12} />}
    </span>
  );
}
