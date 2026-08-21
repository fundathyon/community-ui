import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { CopyButton } from "./copy-button";

export interface EnvironmentVariableProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** Variable name — "DATABASE_URL". */
  name: string;
  value: string;
  /** Masks the value and adds the badge marker (§20 env vars). */
  secret?: boolean;
  secretLabel?: string;
  /** Per-row copy — copies `NAME=value` with the FULL value, even when masked. */
  copy?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

/**
 * EnvironmentVariable — one KEY=value row (§20): name in mono medium, value in
 * mono secondary. A `secret` variable renders masked with a badge, but its
 * copy still produces the complete `NAME=value` line — the mask is for eyes,
 * not for clipboards.
 */
export function EnvironmentVariable({
  name,
  value,
  secret = false,
  secretLabel = "Secret",
  copy = true,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  ...props
}: EnvironmentVariableProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(8rem,auto)_minmax(0,1fr)_auto] items-center gap-x-3 rounded-sm px-2 py-1 font-mono text-code",
        "hover:bg-surface-hover",
        className,
      )}
      {...props}
    >
      <span className="font-medium text-text">{name}</span>
      <span className="inline-flex min-w-0 items-center gap-1.5 text-text-secondary">
        <span className="truncate">{secret ? maskSecret(value) : value}</span>
        {secret && <Badge tone="warning">{secretLabel}</Badge>}
      </span>
      {copy ? (
        <CopyButton value={`${name}=${value}`} label={copyLabel} copiedLabel={copiedLabel} size={12} />
      ) : (
        <span />
      )}
    </div>
  );
}

export interface EnvironmentVariablesProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  variables: { name: string; value: string; secret?: boolean }[];
  /** Header left — "production/.env". */
  title?: ReactNode;
  /** Header right — "3 variables · 1 secret". */
  meta?: ReactNode;
  secretLabel?: string;
  copy?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
}

/**
 * EnvironmentVariables — the framed list of EnvironmentVariable rows (§20),
 * with the "production/.env · 3 variables · 1 secret" style header via
 * `title`/`meta`. Secret rows mask on screen but copy complete.
 */
export function EnvironmentVariables({
  variables,
  title,
  meta,
  secretLabel = "Secret",
  copy = true,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
  ...props
}: EnvironmentVariablesProps) {
  return (
    <div className={cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className)} {...props}>
      {(title || meta) && (
        <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-1.5">
          <span className="font-mono text-caption text-text-secondary">{title}</span>
          {meta && <span className="text-caption text-text-muted">{meta}</span>}
        </div>
      )}
      <div className="p-1">
        {variables.map((variable) => (
          <EnvironmentVariable
            key={variable.name}
            name={variable.name}
            value={variable.value}
            secret={variable.secret}
            secretLabel={secretLabel}
            copy={copy}
            copyLabel={copyLabel}
            copiedLabel={copiedLabel}
          />
        ))}
      </div>
    </div>
  );
}
