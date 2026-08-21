import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { formatRelativeDate, type DateInput } from "../../lib/format";
import { STATUS, type StatusKey } from "../../lib/status";
import { Secret } from "../dev/secret";
import { StatusBadge } from "../feedback/status-badge";
import { ScopeBadge } from "./scope-badge";

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export interface ApiKeyItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Key name — "ci-deploy". */
  name: ReactNode;
  /**
   * The key value, rendered through the dev Secret (masked to prefix + suffix).
   * Keys are shown in full only once, at creation (§20), so `revealable` is off
   * by default here.
   */
  maskedValue: string;
  /** Let the row reveal the value. Off by default (§20). */
  revealable?: boolean;
  createdAt?: DateInput;
  lastUsed?: DateInput;
  /** When set and within 7 days, an `expiring` StatusBadge is computed WITH the
   * deadline (§19). Past → `expired`. */
  expiresAt?: DateInput;
  /** Force a specific state; otherwise it's derived from `expiresAt`. */
  status?: StatusKey;
  scopes?: string[];
  locale?: Locale;
  /** Rotate / Revoke controls — the app passes Buttons or a menu (§25). */
  actions?: ReactNode;
  createdLabel?: string;
  lastUsedLabel?: string;
  expiresLabel?: string;
  neverUsedLabel?: string;
}

/**
 * ApiKeyItem — one API key row (§20, §25): name + masked value, created / last
 * used / expiry metadata as running text, scope chips, and an actions slot. The
 * expiry state is computed — a key expiring within 7 days shows an `expiring`
 * badge with the concrete deadline (§19); an expired key shows `expired`.
 *
 * A key in a terminal state (revoked/expired) should sit at 0.6 opacity in the
 * list — pass that via `className` on the row when you know its state.
 */
export function ApiKeyItem({
  name,
  maskedValue,
  revealable = false,
  createdAt,
  lastUsed,
  expiresAt,
  status,
  scopes,
  locale = enUS,
  actions,
  createdLabel = "created",
  lastUsedLabel = "last used",
  expiresLabel = "expires",
  neverUsedLabel = "never used",
  className,
  ...props
}: ApiKeyItemProps) {
  let resolved: StatusKey | undefined = status;
  if (resolved == null && expiresAt != null) {
    const diff = new Date(expiresAt as Date | string | number).getTime() - Date.now();
    if (!Number.isNaN(diff)) {
      if (diff <= 0) resolved = "expired";
      else if (diff < SEVEN_DAYS_MS) resolved = "expiring";
    }
  }

  const badge =
    resolved === "expiring" && expiresAt != null ? (
      <StatusBadge status="expiring">{`${expiresLabel} ${formatRelativeDate(expiresAt, locale).display}`}</StatusBadge>
    ) : resolved != null ? (
      <StatusBadge status={resolved} />
    ) : null;

  const terminal = resolved != null && STATUS[resolved].terminal;

  return (
    <div className={cn("flex flex-col gap-2 py-3", terminal && "opacity-60", className)} {...props}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-label text-text">{name}</span>
            {badge}
          </div>
          <Secret value={maskedValue} revealable={revealable} label="" />
        </div>
        {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>

      {(createdAt != null || lastUsed != null || (expiresAt != null && resolved !== "expiring")) && (
        <div className="flex flex-wrap items-center gap-x-1.5 text-caption text-text-muted">
          {createdAt != null && (
            <span>
              {createdLabel} {formatRelativeDate(createdAt, locale).display}
            </span>
          )}
          {(createdAt != null && (lastUsed != null || expiresAt != null)) && <span aria-hidden>·</span>}
          {lastUsed != null ? (
            <span>
              {lastUsedLabel} {formatRelativeDate(lastUsed, locale).display}
            </span>
          ) : (
            <span>{neverUsedLabel}</span>
          )}
          {expiresAt != null && resolved !== "expiring" && (
            <>
              <span aria-hidden>·</span>
              <span>
                {expiresLabel} {formatRelativeDate(expiresAt, locale).display}
              </span>
            </>
          )}
        </div>
      )}

      {scopes != null && scopes.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {scopes.map((scope) => (
            <ScopeBadge key={scope} scope={scope} />
          ))}
        </div>
      )}
    </div>
  );
}

export interface ApiKeyListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/** ApiKeyList — stacks ApiKeyItems with divider rules between them. */
export function ApiKeyList({ children, className, ...props }: ApiKeyListProps) {
  return (
    <div className={cn("divide-y divide-border", className)} {...props}>
      {children}
    </div>
  );
}
