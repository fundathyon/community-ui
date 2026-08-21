"use client";

import { Fingerprint } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../actions/button";
import { Icon } from "../typography/icon";

export interface PasskeyButtonProps extends Omit<ButtonProps, "variant" | "leading" | "children"> {
  /** Button copy. */
  label?: ReactNode;
}

/**
 * PasskeyButton — the "Continue with a passkey" affordance (§16, §29). A
 * full-width secondary button with a fingerprint glyph. Just the affordance:
 * the WebAuthn ceremony lives in the app (`onClick`), which flips `loading`
 * while the platform authenticator prompts.
 */
export const PasskeyButton = forwardRef<HTMLButtonElement, PasskeyButtonProps>(function PasskeyButton(
  { label = "Continue with a passkey", size = "lg", className, ...props },
  ref,
) {
  return (
    <Button
      ref={ref}
      variant="secondary"
      size={size}
      leading={<Icon icon={Fingerprint} size={16} />}
      className={cn("w-full", className)}
      {...props}
    >
      {label}
    </Button>
  );
});
