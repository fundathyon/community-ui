"use client";

import { ChevronRight } from "lucide-react";
import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { Icon } from "../typography/icon";
import { CopyButton } from "./copy-button";

type CountKind = "object" | "array";

export interface JsonViewerProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** JSON-serializable data. */
  data: unknown;
  /** Nodes at depth < this start open. 1 = root open, children collapsed. */
  defaultExpandDepth?: number;
  /**
   * Keys (case-insensitive) whose values render masked with a badge marker,
   * EVEN IF the JSON came in clear — §20 hard rule. When set, the copied JSON
   * is masked too: secrets never leave through logs or clipboards.
   */
  secretKeys?: string[];
  /** Badge text on masked values. */
  secretLabel?: string;
  /** Copies the full JSON (masked when `secretKeys` is set). */
  copy?: boolean;
  copyLabel?: string;
  copiedLabel?: string;
  /** Header label ("response body"). Without it the copy button floats top-right. */
  label?: string;
  /** Collapsed-node count text — default "{n} fields" / "{n} items". */
  countLabel?: (count: number, kind: CountKind) => string;
}

function defaultCountLabel(count: number, kind: CountKind): string {
  if (kind === "array") return `${count} ${count === 1 ? "item" : "items"}`;
  return `${count} ${count === 1 ? "field" : "fields"}`;
}

function maskValue(value: unknown): string {
  if (value === null || typeof value === "object") return "••••••••••••";
  return maskSecret(String(value));
}

/**
 * Serialize for copy. Without secretKeys the raw data is copied verbatim;
 * with secretKeys every matching value is masked in the copied text as well —
 * the DS rule is that secrets never travel in clear (§20).
 */
function serializeJson(data: unknown, secretKeys?: string[]): string {
  if (!secretKeys || secretKeys.length === 0) return JSON.stringify(data, null, 2) ?? "";
  const secret = new Set(secretKeys.map((k) => k.toLowerCase()));
  return (
    JSON.stringify(
      data,
      function replacer(key: string, value: unknown) {
        if (key && secret.has(key.toLowerCase())) return maskValue(value);
        return value;
      },
      2,
    ) ?? ""
  );
}

interface JsonNodeProps {
  name?: string;
  value: unknown;
  depth: number;
  last: boolean;
  defaultExpandDepth: number;
  isSecretKey: (key: string) => boolean;
  secretLabel: string;
  countLabel: (count: number, kind: CountKind) => string;
}

function Key({ name }: { name: string }) {
  return (
    <>
      <span className="text-info">{`"${name}"`}</span>
      <span className="text-text-muted">{": "}</span>
    </>
  );
}

function Primitive({ value }: { value: unknown }) {
  if (typeof value === "string") return <span className="text-success">{`"${value}"`}</span>;
  return <span className="text-accent">{String(value)}</span>;
}

function JsonNode({
  name,
  value,
  depth,
  last,
  defaultExpandDepth,
  isSecretKey,
  secretLabel,
  countLabel,
}: JsonNodeProps) {
  const [open, setOpen] = useState(depth < defaultExpandDepth);
  const secret = name !== undefined && isSecretKey(name);
  const composite = !secret && value !== null && typeof value === "object";

  if (!composite) {
    return (
      <div className="flex items-center gap-1 whitespace-pre rounded-sm px-1 py-px pl-5 hover:bg-surface-hover">
        {name !== undefined && <Key name={name} />}
        {secret ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="text-text-secondary">{maskValue(value)}</span>
            <Badge tone="warning">{secretLabel}</Badge>
          </span>
        ) : (
          <Primitive value={value} />
        )}
        {!last && <span className="text-text-muted">,</span>}
      </div>
    );
  }

  const isArray = Array.isArray(value);
  const entries: [string | undefined, unknown][] = isArray
    ? (value as unknown[]).map((item): [string | undefined, unknown] => [undefined, item])
    : Object.entries(value as Record<string, unknown>);
  const openBracket = isArray ? "[" : "{";
  const closeBracket = isArray ? "]" : "}";
  const count = countLabel(entries.length, isArray ? "array" : "object");

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-1 whitespace-pre rounded-sm px-1 py-px text-left",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover",
        )}
      >
        <Icon
          icon={ChevronRight}
          size={12}
          className={cn(
            "text-text-muted transition-transform duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
            open && "rotate-90",
          )}
        />
        {name !== undefined && <Key name={name} />}
        <span className="text-text-muted">
          {open ? openBracket : `${openBracket} ${count} ${closeBracket}${last ? "" : ","}`}
        </span>
      </button>
      {open && (
        <>
          <div className="ml-2 border-l border-border pl-3">
            {entries.map(([key, item], i) => (
              <JsonNode
                key={key ?? i}
                name={key}
                value={item}
                depth={depth + 1}
                last={i === entries.length - 1}
                defaultExpandDepth={defaultExpandDepth}
                isSecretKey={isSecretKey}
                secretLabel={secretLabel}
                countLabel={countLabel}
              />
            ))}
          </div>
          <div className="px-1 pl-5 text-text-muted">{`${closeBracket}${last ? "" : ","}`}</div>
        </>
      )}
    </div>
  );
}

/**
 * JsonViewer — collapsible JSON tree (§20): in a 200-key object what matters
 * is the SHAPE, so nodes collapse to "{ 4 fields }" / "[ 12 items ]" counts.
 * Keys are info, string literals success, other primitives accent, punctuation
 * muted. Any key listed in `secretKeys` renders masked with a badge even when
 * the payload came in clear — and the copied JSON is masked too.
 *
 * For a flat highlighted dump (no tree) use CodeBlock with `language="json"`.
 */
export const JsonViewer = forwardRef<HTMLDivElement, JsonViewerProps>(function JsonViewer(
  {
    data,
    defaultExpandDepth = 1,
    secretKeys,
    secretLabel = "Secret",
    copy = true,
    copyLabel = "Copy",
    copiedLabel = "Copied",
    label,
    countLabel = defaultCountLabel,
    className,
    ...props
  },
  ref,
) {
  const secretSet = new Set((secretKeys ?? []).map((k) => k.toLowerCase()));
  const isSecretKey = (key: string) => secretSet.has(key.toLowerCase());
  return (
    <div
      ref={ref}
      className={cn("relative rounded-lg border border-border bg-bg-subtle p-2 font-mono text-code text-text", className)}
      {...props}
    >
      {label ? (
        <div className="mb-1 flex items-center justify-between gap-2 px-1">
          <span className="text-caption text-text-secondary">{label}</span>
          {copy && (
            <CopyButton
              value={() => serializeJson(data, secretKeys)}
              label={copyLabel}
              copiedLabel={copiedLabel}
              size={14}
            />
          )}
        </div>
      ) : (
        copy && (
          <CopyButton
            value={() => serializeJson(data, secretKeys)}
            label={copyLabel}
            copiedLabel={copiedLabel}
            size={14}
            className="absolute right-1.5 top-1.5 bg-bg-subtle"
          />
        )
      )}
      <JsonNode
        value={data}
        depth={0}
        last
        defaultExpandDepth={defaultExpandDepth}
        isSecretKey={isSecretKey}
        secretLabel={secretLabel}
        countLabel={countLabel}
      />
    </div>
  );
});
