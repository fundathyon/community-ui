"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { Input } from "./input";
/**
 * PasswordInput — the "campo secreto" Input variant (§10): the same Input with
 * a trailing visibility toggle, never a separate control family. Always inside
 * a FormField. The toggle exposes its state via `aria-pressed`.
 *
 * Never autocapitalizes or autocorrects — secrets must arrive exactly as typed.
 */
export const PasswordInput = forwardRef(function PasswordInput({ showPasswordLabel = "Show password", hidePasswordLabel = "Hide password", defaultVisible = false, disabled, ...props }, ref) {
    const [visible, setVisible] = useState(defaultVisible);
    return (_jsx(Input, { ref: ref, type: visible ? "text" : "password", autoCapitalize: "none", autoCorrect: "off", spellCheck: false, disabled: disabled, trailing: _jsx("button", { type: "button", "aria-label": visible ? hidePasswordLabel : showPasswordLabel, "aria-pressed": visible, disabled: disabled, onClick: () => setVisible((v) => !v), className: cn("grid size-5 shrink-0 place-items-center rounded-sm text-text-muted", "transition-colors duration-[var(--fdn-dur-fast)] hover:text-text", "disabled:cursor-not-allowed", "fdn-touch-target"), children: _jsx(Icon, { icon: visible ? EyeOff : Eye, size: 14 }) }), ...props }));
});
