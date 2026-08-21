"use client";

import { useState, type ReactNode } from "react";
import { Checkbox } from "../forms/checkbox";
import { Card, CardBody } from "../layout/card";
import { TokenDisplay } from "../dev/token-display";

export interface TokenRevealProps {
  /** The full token — shown complete this one time (§20). */
  value: string;
  /** Warning line inside the token box. Pass `null` to omit. */
  warning?: ReactNode;
  /** Extra note under the token (e.g. "Expires in 90 days"). */
  expiryNote?: ReactNode;
  /** Label of the "I've stored it" gate checkbox. */
  confirmLabel?: ReactNode;
  /** Fired with the checkbox state so the app can enable/disable its Continue. */
  onConfirmed?: (confirmed: boolean) => void;
  copyLabel?: string;
  copiedLabel?: string;
}

/**
 * TokenReveal — the one-time reveal of a freshly created token (§20), composed
 * from the dev TokenDisplay plus an "I've stored it safely" checkbox that gates
 * the app's Continue. After this screen the token is only ever shown masked
 * (render the stored value with Secret from then on).
 */
export function TokenReveal({
  value,
  warning,
  expiryNote,
  confirmLabel = "I've stored this token safely",
  onConfirmed,
  copyLabel,
  copiedLabel,
}: TokenRevealProps) {
  const [confirmed, setConfirmed] = useState(false);
  return (
    <Card>
      <CardBody className="flex flex-col gap-3">
        <TokenDisplay
          value={value}
          warning={warning}
          copyLabel={copyLabel}
          copiedLabel={copiedLabel}
        />
        {expiryNote != null && <p className="text-caption text-text-muted">{expiryNote}</p>}
        <Checkbox
          label={confirmLabel}
          checked={confirmed}
          onCheckedChange={(checked) => {
            const next = checked === true;
            setConfirmed(next);
            onConfirmed?.(next);
          }}
        />
      </CardBody>
    </Card>
  );
}
