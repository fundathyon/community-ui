"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { Tooltip } from "../overlays/tooltip";
import { CopyButton } from "./copy-button";
const sizeClasses = {
    xs: "h-control-xs px-2 text-body-sm",
    sm: "h-control-sm px-2.5 text-body",
    md: "h-control-md px-2.5 text-body",
    lg: "h-control-lg px-3 text-body",
};
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
export function SecretField({ value, size, defaultRevealed = false, revealed: revealedProp, onRevealChange, hideReveal = false, hideCopy = false, prefix = 8, suffix = 6, disabled = false, revealLabel = "Reveal", hideLabel = "Hide", copyLabel = "Copy", copiedLabel = "Copied", className, ...props }) {
    const [internalRevealed, setInternalRevealed] = useState(defaultRevealed);
    const revealed = revealedProp ?? internalRevealed;
    const setRevealed = (next) => {
        if (revealedProp === undefined)
            setInternalRevealed(next);
        onRevealChange?.(next);
    };
    const resolvedSize = useDefaultSize(size);
    const toggleLabel = revealed ? hideLabel : revealLabel;
    const display = revealed ? value : maskSecret(value, prefix, suffix);
    return (_jsxs("span", { "aria-disabled": disabled || undefined, className: cn(
        // Input parity: border carrier + readonly bg (this is always a display, never editable).
        "flex w-full min-w-0 items-center gap-1.5 rounded-md border border-border-strong bg-bg-subtle text-text", "transition-colors duration-[var(--fdn-dur-fast)]", disabled && "cursor-not-allowed opacity-45", sizeClasses[resolvedSize], className), ...props, children: [_jsx("span", { title: revealed ? value : undefined, className: cn(
                // flex:1 + min-width:0 + truncate keeps long values from displacing the trailing actions.
                "min-w-0 flex-1 select-all truncate font-mono text-code", revealed ? "text-text" : "text-text-secondary"), children: display }), !hideReveal && (_jsx(Tooltip, { content: toggleLabel, children: _jsx("button", { type: "button", "aria-pressed": revealed, "aria-label": toggleLabel, disabled: disabled, onClick: () => setRevealed(!revealed), className: cn("grid size-5 shrink-0 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text active:bg-surface-hover", "disabled:cursor-not-allowed", "fdn-touch-target"), children: _jsx(Icon, { icon: revealed ? EyeOff : Eye, size: 14 }) }) })), !hideCopy && (_jsx(CopyButton, { value: value, label: copyLabel, copiedLabel: copiedLabel, size: 14, disabled: disabled, className: "shrink-0" }))] }));
}
