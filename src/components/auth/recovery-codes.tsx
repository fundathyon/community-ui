"use client";

import { Check, Copy, Download, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { Button } from "../actions/button";
import { Badge } from "../feedback/badge";
import { Card, CardBody, CardFooter } from "../layout/card";
import { Icon } from "../typography/icon";

export interface RecoveryCodesProps {
  /** The one-time recovery codes. Shown once, at generation (§20). */
  codes: string[];
  /** Codes already spent — rendered dimmed with a "used" badge, NEVER struck
   * through (§M-01, §19: line-through isn't read by screen readers). */
  markUsed?: string[];
  /** Warning copy above the grid. */
  warningSlot?: ReactNode;
  /** Fires after the codes are copied (they're copied to the clipboard here). */
  onCopyAll?: (text: string) => void;
  /** The app builds the download (file writing is app-land). */
  onDownload?: () => void;
  copyAllLabel?: string;
  copiedLabel?: string;
  downloadLabel?: string;
  /** Badge text on a spent code. */
  usedLabel?: string;
}

/**
 * RecoveryCodes — the grid of one-time backup codes shown once at generation
 * (§20, §23). Mono, tabular, two columns inside a Card, with copy-all and an
 * app-provided download. Spent codes (`markUsed`) dim to 60% and get a "used"
 * badge — never a strike-through, which screen readers skip (§M-01).
 */
export function RecoveryCodes({
  codes,
  markUsed,
  warningSlot = "Store these somewhere safe. Each code works once.",
  onCopyAll,
  onDownload,
  copyAllLabel = "Copy all",
  copiedLabel = "Copied",
  downloadLabel = "Download",
  usedLabel = "used",
}: RecoveryCodesProps) {
  const { copied, copy } = useCopyToClipboard();
  const used = new Set(markUsed ?? []);

  function handleCopyAll() {
    const text = codes.join("\n");
    void copy(text).then((ok) => {
      if (ok) onCopyAll?.(text);
    });
  }

  return (
    <Card>
      <CardBody className="flex flex-col gap-3">
        {warningSlot != null && (
          <p className="flex items-start gap-1.5 text-caption text-warning">
            <Icon icon={TriangleAlert} size={12} className="mt-px" />
            <span>{warningSlot}</span>
          </p>
        )}
        <ul className="grid grid-cols-2 gap-2">
          {codes.map((code) => {
            const isUsed = used.has(code);
            return (
              <li
                key={code}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-md border border-border bg-bg-subtle px-2.5 py-1.5",
                  isUsed && "opacity-60",
                )}
              >
                <span className="font-mono text-code tabular-nums text-text">{code}</span>
                {isUsed && <Badge tone="neutral">{usedLabel}</Badge>}
              </li>
            );
          })}
        </ul>
      </CardBody>
      {(onDownload != null || codes.length > 0) && (
        <CardFooter>
          {onDownload != null && (
            <Button variant="ghost" size="sm" onClick={onDownload} leading={<Icon icon={Download} size={14} />}>
              {downloadLabel}
            </Button>
          )}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCopyAll}
            leading={<Icon icon={copied ? Check : Copy} size={14} className={copied ? "text-success" : undefined} />}
          >
            {copied ? copiedLabel : copyAllLabel}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
