"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Fingerprint } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";
/**
 * PasskeyButton — the "Continue with a passkey" affordance (§16, §29). A
 * full-width secondary button with a fingerprint glyph. Just the affordance:
 * the WebAuthn ceremony lives in the app (`onClick`), which flips `loading`
 * while the platform authenticator prompts.
 */
export const PasskeyButton = forwardRef(function PasskeyButton({ label = "Continue with a passkey", size = "lg", className, ...props }, ref) {
    return (_jsx(Button, { ref: ref, variant: "secondary", size: size, leading: _jsx(Icon, { icon: Fingerprint, size: 16 }), className: cn("w-full", className), ...props, children: label }));
});
