"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
import { CopyButton } from "./copy-button";

const sizeClasses: Record<Size, string> = {
  xs: "h-control-xs px-2 text-body-sm",
  sm: "h-control-sm px-2.5 text-body",
  md: "h-control-md px-2.5 text-body",
  lg: "h-control-lg px-3 text-body",
};

export interface SecretFieldProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children" | "prefix"> {
  /** The full sensitive value. Copy always writes THIS, never the masked form (§20). */
  value: string;
  /** Matches Input's size scale. Defaults to the density's size. */
  size?: Size;
  /** Uncontrolled initial reveal state. Ignored when `revealed` is provided. */
  defaultRevealed?: boolean;
  /** Controlled reveal state — pair with onRevealChange. */
  revealed?: boolean;
  onRevealChange?: (revealed: boolean) => void;
  /** Hide the eye toggle when the value must always stay masked. */
  hideReveal?: boolean;
  /** Hide the copy button. */
  hideCopy?: boolean;
  /** Characters kept visible at the start / end of the mask. */
  prefix?: number;
  suffix?: number;
  /** Non-interactive, faded. */
  disabled?: boolean;
  revealLabel?: string;
  hideLabel?: string;
  copyLabel?: string;
  copiedLabel?: string;
  /** Extra classes on the outer field wrapper. */
  className?: string;
}

/**
 * SecretField — the field-shaped variant of Secret (§10, §20). Same visual box
 * as Input (border, radius, height per density) so a token / JWT / API key
 * reads as a control the user can copy, not as inline prose. The value is
 * monospace, masked by default (`sk_live_de96••••••••••••j87TzX`), and
 * truncates with ellipsis when the revealed value overflows — long JWTs never
 * grow the container or displace the trailing actions.
 *
 * Composition:
 * ```tsx
 * <FormField label="Access Token (JWT)">
 *   <SecretField value={token} revealLabel="Mostrar" copyLabel="Copiar" />
 * </FormField>
 * ```
 *
 * Prefer Secret (inline span) for values that sit inside prose or a table
 * cell; use SecretField whenever the value would naturally live in a form
 * field slot.
 */
export function SecretField({
  value,
  size,
  defaultRevealed = false,
  revealed: revealedProp,
  onRevealChange,
  hideReveal = false,
  hideCopy = false,
  prefix = 8,
  suffix = 6,
  disabled = false,
  revealLabel = "Reveal",
  hideLabel = "Hide",
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  ...props
}: SecretFieldProps) {
  const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
  const revealed = revealedProp ?? internalRevealed;
  const setRevealed = (next: boolean) => {
    if (revealedProp === undefined) setInternalRevealed(next);
    onRevealChange?.(next);
  };
  const resolvedSize = useDefaultSize(size);
  const toggleLabel = revealed ? hideLabel : revealLabel;
  const display = revealed ? value : maskSecret(value, prefix, suffix);
  return (
    <span
      aria-disabled={disabled || undefined}
      className={cn(
        // Input parity: border carrier + readonly bg (this is always a display, never editable).
        "flex w-full min-w-0 items-center gap-1.5 rounded-md border border-border-strong bg-bg-subtle text-text",
        "transition-colors duration-[var(--fdn-dur-fast)]",
        disabled && "cursor-not-allowed opacity-45",
        sizeClasses[resolvedSize],
        className,
      )}
      {...props}
    >
      <span
        title={revealed ? value : undefined}
        className={cn(
          // flex:1 + min-width:0 + truncate keeps long values from displacing the trailing actions.
          "min-w-0 flex-1 select-all truncate font-mono text-code",
          revealed ? "text-text" : "text-text-secondary",
        )}
      >
        {display}
      </span>
      {!hideReveal && (
        <Tooltip content={toggleLabel}>
          <button
            type="button"
            aria-pressed={revealed}
            aria-label={toggleLabel}
            disabled={disabled}
            onClick={() => setRevealed(!revealed)}
            className={cn(
              "grid size-5 shrink-0 place-items-center rounded-sm text-text-muted",
              "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
              "hover:bg-surface-hover hover:text-text active:bg-surface-hover",
              "disabled:cursor-not-allowed",
              "fdn-touch-target",
            )}
          >
            <Icon icon={revealed ? EyeOff : Eye} size={14} />
          </button>
        </Tooltip>
      )}
      {!hideCopy && (
        <CopyButton
          value={value}
          label={copyLabel}
          copiedLabel={copiedLabel}
          size={14}
          disabled={disabled}
          className="shrink-0"
        />
      )}
    </span>
  );
}
