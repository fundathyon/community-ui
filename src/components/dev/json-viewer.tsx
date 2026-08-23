"use client";

import { Check, ChevronRight, ChevronsDownUp, ChevronsUpDown, Copy, Link2 } from "lucide-react";
import { forwardRef, useCallback, useMemo, useState, type HTMLAttributes, type ReactNode } from "react";
import { useCopyToClipboard } from "../../hooks/use-copy-to-clipboard";
import { cn } from "../../lib/cn";
import { maskSecret } from "../../lib/format";
import { Badge } from "../feedback/badge";
import { Tooltip } from "../overlays/tooltip";
import { Icon } from "../typography/icon";
import { CopyButton } from "./copy-button";

type CountKind = "object" | "array";

/**
 * How the tree should behave for expand/collapse when an "expandAll" /
 * "collapseAll" affordance is present.
 *   - `all`  : recursively open every node · recursively close every node.
 *   - `root` : only the top-level object/array flips — children stay put.
 */
export type JsonViewerBulkMode = "all" | "root";

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
  /**
   * Show Expand-all / Collapse-all buttons in the header. Requires `label` OR
   * `copy` (otherwise there is no header row to attach them to). Default
   * `false` for backward compatibility.
   */
  expandable?: boolean;
  expandAllLabel?: string;
  collapseAllLabel?: string;
  /**
   * Per-node hover actions: "copy value" (JSON stringified) and "copy path"
   * (dot/bracket notation, e.g. `users[0].email`). Off by default because
   * they add a hover-reveal affordance on every row.
   */
  copyValue?: boolean;
  copyPath?: boolean;
  copyValueLabel?: string;
  copyPathLabel?: string;
  /** Collapsed-node count text — default "{n} fields" / "{n} items". */
  countLabel?: (count: number, kind: CountKind) => string;
  /**
   * Escape hatch to replace the default primitive rendering — return a
   * ReactNode to override, or `undefined` to fall through. Fires for every
   * scalar node (not for objects/arrays). Used sparingly, e.g. to add a
   * tooltip over an `exp` claim in a JWT payload.
   */
  renderValue?: (context: {
    key: string | undefined;
    value: unknown;
    path: string;
    depth: number;
  }) => ReactNode | undefined;
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

/** Compose a JSON path like `users[0].email` — safe for use in copy/scroll. */
function composePath(base: string, name: string | undefined, isArrayIndex: boolean, index: number): string {
  if (isArrayIndex) return `${base}[${index}]`;
  if (name === undefined) return base;
  if (/^[A-Za-z_$][\w$]*$/.test(name)) return base ? `${base}.${name}` : name;
  // Quoted-key form for non-identifier keys — `body["x-header"]`.
  return `${base || ""}["${name.replace(/"/g, '\\"')}"]`;
}

interface JsonNodeProps {
  name?: string;
  value: unknown;
  depth: number;
  last: boolean;
  path: string;
  isArrayIndex: boolean;
  arrayIndex: number;
  forceState: "expanded" | "collapsed" | null;
  defaultExpandDepth: number;
  isSecretKey: (key: string) => boolean;
  secretLabel: string;
  countLabel: (count: number, kind: CountKind) => string;
  copyValue: boolean;
  copyPath: boolean;
  copyValueLabel: string;
  copyPathLabel: string;
  secretKeys?: string[];
  renderValue?: (context: {
    key: string | undefined;
    value: unknown;
    path: string;
    depth: number;
  }) => ReactNode | undefined;
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

/** Tiny inline action used for hover-reveal copy affordances on each node. */
function NodeActionButton({
  label,
  onClick,
  icon,
  copiedIcon = Check,
  copied,
}: {
  label: string;
  onClick: () => void;
  icon: typeof Copy;
  copiedIcon?: typeof Copy;
  copied: boolean;
}) {
  return (
    <Tooltip content={copied ? "Copied" : label}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={label}
        className={cn(
          "inline-flex size-5 items-center justify-center rounded-sm text-text-muted",
          "opacity-0 transition-opacity duration-[var(--fdn-dur-fast)] group-hover:opacity-100 focus-visible:opacity-100",
          "hover:bg-surface-hover hover:text-text",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
        )}
      >
        <Icon icon={copied ? copiedIcon : icon} size={12} />
      </button>
    </Tooltip>
  );
}

function useShortlivedCopy() {
  const { copy } = useCopyToClipboard();
  const [flag, setFlag] = useState<null | string>(null);
  const trigger = useCallback(
    (id: string, value: string) => {
      copy(value);
      setFlag(id);
      window.setTimeout(() => setFlag((current) => (current === id ? null : current)), 1600);
    },
    [copy],
  );
  return { flag, trigger };
}

function JsonNode({
  name,
  value,
  depth,
  last,
  path,
  isArrayIndex,
  arrayIndex,
  forceState,
  defaultExpandDepth,
  isSecretKey,
  secretLabel,
  countLabel,
  copyValue,
  copyPath,
  copyValueLabel,
  copyPathLabel,
  secretKeys,
  renderValue,
}: JsonNodeProps) {
  const initialOpen = depth < defaultExpandDepth;
  const [localOpen, setLocalOpen] = useState(initialOpen);
  const open = forceState === "expanded" ? true : forceState === "collapsed" ? false : localOpen;
  const secret = name !== undefined && isSecretKey(name);
  const composite = !secret && value !== null && typeof value === "object";

  const { flag, trigger } = useShortlivedCopy();

  const currentPath = composePath(path, name, isArrayIndex, arrayIndex);

  const nodeActions = (
    <span className="ml-1 inline-flex items-center gap-0.5">
      {copyValue && (
        <NodeActionButton
          label={copyValueLabel}
          icon={Copy}
          copied={flag === "value"}
          onClick={() =>
            trigger(
              "value",
              typeof value === "string" ? value : serializeJson(secret ? maskValue(value) : value, secretKeys),
            )
          }
        />
      )}
      {copyPath && currentPath !== "" && (
        <NodeActionButton
          label={copyPathLabel}
          icon={Link2}
          copied={flag === "path"}
          onClick={() => trigger("path", currentPath)}
        />
      )}
    </span>
  );

  if (!composite) {
    const custom = renderValue?.({ key: name, value, path: currentPath, depth });
    return (
      <div className="group flex items-center gap-1 whitespace-pre rounded-sm px-1 py-px pl-5 hover:bg-surface-hover">
        {name !== undefined && <Key name={name} />}
        {secret ? (
          <span className="inline-flex items-center gap-1.5">
            <span className="text-text-secondary">{maskValue(value)}</span>
            <Badge tone="warning">{secretLabel}</Badge>
          </span>
        ) : custom !== undefined && custom !== null ? (
          custom
        ) : (
          <Primitive value={value} />
        )}
        {!last && <span className="text-text-muted">,</span>}
        {(copyValue || copyPath) && nodeActions}
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
    <div className="group">
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setLocalOpen(!open)}
          className={cn(
            "flex flex-1 items-center gap-1 whitespace-pre rounded-sm px-1 py-px text-left",
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
        {(copyValue || copyPath) && nodeActions}
      </div>
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
                path={currentPath}
                isArrayIndex={isArray}
                arrayIndex={i}
                forceState={forceState}
                defaultExpandDepth={defaultExpandDepth}
                isSecretKey={isSecretKey}
                secretLabel={secretLabel}
                countLabel={countLabel}
                copyValue={copyValue}
                copyPath={copyPath}
                copyValueLabel={copyValueLabel}
                copyPathLabel={copyPathLabel}
                secretKeys={secretKeys}
                renderValue={renderValue}
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
 * For an editable variant use JsonEditor.
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
    expandable = false,
    expandAllLabel = "Expand all",
    collapseAllLabel = "Collapse all",
    copyValue = false,
    copyPath = false,
    copyValueLabel = "Copy value",
    copyPathLabel = "Copy path",
    countLabel = useMemoCountLabel,
    renderValue,
    className,
    ...props
  },
  ref,
) {
  const secretSet = useMemo(
    () => new Set((secretKeys ?? []).map((k) => k.toLowerCase())),
    [secretKeys],
  );
  const isSecretKey = useCallback((key: string) => secretSet.has(key.toLowerCase()), [secretSet]);

  const [forceState, setForceState] = useState<"expanded" | "collapsed" | null>(null);

  const hasHeader = Boolean(label) || (expandable && (copy || label));

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-lg border border-border bg-bg-subtle p-2 font-mono text-code text-text",
        className,
      )}
      {...props}
    >
      {hasHeader ? (
        <div className="mb-1 flex items-center justify-between gap-2 px-1">
          <span className="text-caption text-text-secondary">{label}</span>
          <div className="flex items-center gap-1.5">
            {expandable && (
              <>
                <Tooltip content={expandAllLabel}>
                  <button
                    type="button"
                    aria-label={expandAllLabel}
                    onClick={() => setForceState("expanded")}
                    className="inline-flex size-5 items-center justify-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <Icon icon={ChevronsUpDown} size={12} />
                  </button>
                </Tooltip>
                <Tooltip content={collapseAllLabel}>
                  <button
                    type="button"
                    aria-label={collapseAllLabel}
                    onClick={() => setForceState("collapsed")}
                    className="inline-flex size-5 items-center justify-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  >
                    <Icon icon={ChevronsDownUp} size={12} />
                  </button>
                </Tooltip>
              </>
            )}
            {copy && (
              <CopyButton
                value={() => serializeJson(data, secretKeys)}
                label={copyLabel}
                copiedLabel={copiedLabel}
                size={14}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          {expandable && (
            <div className="absolute right-9 top-1.5 z-10 flex items-center gap-1.5">
              <Tooltip content={expandAllLabel}>
                <button
                  type="button"
                  aria-label={expandAllLabel}
                  onClick={() => setForceState("expanded")}
                  className="inline-flex size-5 items-center justify-center rounded-sm bg-bg-subtle text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  <Icon icon={ChevronsUpDown} size={12} />
                </button>
              </Tooltip>
              <Tooltip content={collapseAllLabel}>
                <button
                  type="button"
                  aria-label={collapseAllLabel}
                  onClick={() => setForceState("collapsed")}
                  className="inline-flex size-5 items-center justify-center rounded-sm bg-bg-subtle text-text-muted hover:bg-surface-hover hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                >
                  <Icon icon={ChevronsDownUp} size={12} />
                </button>
              </Tooltip>
            </div>
          )}
          {copy && (
            <CopyButton
              value={() => serializeJson(data, secretKeys)}
              label={copyLabel}
              copiedLabel={copiedLabel}
              size={14}
              className="absolute right-1.5 top-1.5 z-10 bg-bg-subtle"
            />
          )}
        </>
      )}
      <JsonNode
        value={data}
        depth={0}
        last
        path=""
        isArrayIndex={false}
        arrayIndex={0}
        forceState={forceState}
        defaultExpandDepth={defaultExpandDepth}
        isSecretKey={isSecretKey}
        secretLabel={secretLabel}
        countLabel={countLabel}
        copyValue={copyValue}
        copyPath={copyPath}
        copyValueLabel={copyValueLabel}
        copyPathLabel={copyPathLabel}
        secretKeys={secretKeys}
        renderValue={renderValue}
      />
    </div>
  );
});

// Kept as a stable identifier so callers can `import { defaultCountLabel }`
// without pulling the whole JsonViewer surface.
function useMemoCountLabel(count: number, kind: CountKind): string {
  return defaultCountLabel(count, kind);
}
