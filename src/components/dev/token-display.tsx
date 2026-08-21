"use client";

import { Check, Copy, TriangleAlert } from "lucide-react";
import { type HTMLAttributes, type ReactNode } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Icon } from "../typography/icon";

export interface TokenDisplayProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The full token — visible here and never again (§20). */
  value: string;
  /** Warning line under the token. Pass `null` to omit. */
  warning?: ReactNode;
  copyLabel?: string;
  copiedLabel?: string;
}

/**
 * TokenDisplay — the ONE time a secret is shown complete: right after creation
 * (§20). Warning treatment, the full token in mono, and a prominent built-in
 * copy button. After this screen only prefix + suffix survive — render the
 * stored value with Secret from then on.
 */
export function TokenDisplay({
  value,
  warning = "Make sure to copy it now — you won't see it again.",
  copyLabel = "Copy token",
  copiedLabel = "Copied",
  className,
  ...props
}: TokenDisplayProps) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <div
      className={cn("rounded-lg border border-warning-border bg-warning-bg p-3", className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        <code className="min-w-0 flex-1 break-all font-mono text-code text-text">{value}</code>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => void copy(value)}
          leading={
            copied ? <Icon icon={Check} size={14} className="text-success" /> : <Icon icon={Copy} size={14} />
          }
          className="shrink-0"
        >
          {copied ? copiedLabel : copyLabel}
        </Button>
      </div>
      {warning && (
        <p className="mt-2 flex items-center gap-1.5 text-caption text-warning">
          <Icon icon={TriangleAlert} size={12} />
          {warning}
        </p>
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </div>
  );
}
