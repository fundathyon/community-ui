"use client";

import { ChevronRight } from "lucide-react";
import { useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Badge } from "../components/feedback/badge";
import { Icon } from "../components/typography/icon";
import {
  ApiName,
  ApiType,
  RequiredBadge,
  apiCell,
  apiHeadCell,
  apiRowDivider,
  apiTable,
  apiTableWrapper,
} from "./api-shared";

/** A node of an object schema (§26). Recursive: objects carry `properties`,
 * arrays carry `items`. */
export interface SchemaNode {
  name?: string;
  type: string;
  description?: ReactNode;
  required?: boolean;
  /** Allowed literal values — rendered as small Badges. */
  enum?: string[];
  /** Object fields. */
  properties?: SchemaNode[];
  /** Array element schema. */
  items?: SchemaNode;
}

/** The expandable children of a node: object properties, or an array's item fields. */
function childrenOf(node: SchemaNode): SchemaNode[] | undefined {
  if (node.properties && node.properties.length > 0) return node.properties;
  if (node.items) {
    const item = node.items;
    if (item.properties && item.properties.length > 0) return item.properties;
    return [{ ...item, name: item.name ?? "items" }];
  }
  return undefined;
}

interface Row {
  node: SchemaNode;
  depth: number;
  path: string;
  hasKids: boolean;
}

function buildRows(nodes: SchemaNode[], expanded: Set<string>, depth: number, prefix: string): Row[] {
  const rows: Row[] = [];
  nodes.forEach((node, i) => {
    const path = prefix ? `${prefix}.${i}` : `${i}`;
    const kids = childrenOf(node);
    const hasKids = kids !== undefined && kids.length > 0;
    rows.push({ node, depth, path, hasKids });
    if (hasKids && expanded.has(path)) rows.push(...buildRows(kids, expanded, depth + 1, path));
  });
  return rows;
}

function topNodesOf(schema: SchemaNode): SchemaNode[] {
  return childrenOf(schema) ?? [schema];
}

export interface ApiSchemaProps extends HTMLAttributes<HTMLDivElement> {
  schema: SchemaNode;
  /** "required" marker label. Overridable (products ship Spanish copy). */
  requiredLabel?: string;
  /** Accessible names for the expand/collapse toggles. Overridable. */
  expandLabel?: string;
  collapseLabel?: string;
}

/**
 * ApiSchema — an object schema as an expandable tree (§26). Each node shows a
 * monospace name, a muted type, a "required" marker and any `enum` values as
 * small Badges; nested objects and arrays collapse behind a chevron (top level
 * open by default). The unified schema view — see `PropertyTable` for a flat
 * property list and `EnumTable` for a value list, both sharing these internals.
 */
export function ApiSchema({
  schema,
  requiredLabel = "required",
  expandLabel = "Expand",
  collapseLabel = "Collapse",
  className,
  ...props
}: ApiSchemaProps) {
  const top = topNodesOf(schema);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Start with every top-level expandable node open.
    const initial = new Set<string>();
    top.forEach((node, i) => {
      if (childrenOf(node)) initial.add(`${i}`);
    });
    return initial;
  });

  const rows = buildRows(top, expanded, 0, "");

  const toggle = (path: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });

  return (
    <div className={cn(apiTableWrapper, "divide-y divide-border", className)} {...props}>
      {rows.map(({ node, depth, path, hasKids }) => {
        const open = expanded.has(path);
        return (
          <div key={path} className="flex items-start gap-1.5 px-3 py-2" style={{ paddingLeft: 12 + depth * 16 }}>
            {hasKids ? (
              <button
                type="button"
                aria-expanded={open}
                aria-label={open ? collapseLabel : expandLabel}
                onClick={() => toggle(path)}
                className="-ml-1 mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm text-text-muted hover:bg-surface-hover hover:text-text fdn-touch-target"
              >
                <Icon
                  icon={ChevronRight}
                  size={14}
                  className={cn("transition-transform duration-[var(--fdn-dur-fast)]", open && "rotate-90")}
                />
              </button>
            ) : (
              <span aria-hidden className="mt-0.5 size-5 shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                {node.name !== undefined && <ApiName>{node.name}</ApiName>}
                <ApiType>{node.type}</ApiType>
                {node.required && <RequiredBadge label={requiredLabel} />}
                {node.enum?.map((value) => (
                  <Badge key={value} variant="tonal" tone="neutral" className="font-mono">
                    {value}
                  </Badge>
                ))}
              </div>
              {node.description !== undefined && (
                <div className="mt-0.5 text-body-sm leading-[1.6] text-text-secondary">{node.description}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export interface PropertyRow {
  name: string;
  type: string;
  description?: ReactNode;
  required?: boolean;
}

export interface PropertyTableProps extends HTMLAttributes<HTMLDivElement> {
  rows: PropertyRow[];
  requiredLabel?: string;
  headers?: { name?: string; type?: string; description?: string };
}

/**
 * PropertyTable — a flat property list (§26): the tabular preset of ApiSchema for
 * a single object with no nesting. Name (monospace + "required" Badge), type
 * and description. Server-safe rendering; shares the API table internals.
 */
export function PropertyTable({ rows, requiredLabel = "required", headers, className, ...props }: PropertyTableProps) {
  const head = { name: "Property", type: "Type", description: "Description", ...headers };
  return (
    <div className={cn(apiTableWrapper, className)} {...props}>
      <table className={apiTable}>
        <thead>
          <tr>
            <th className={apiHeadCell}>{head.name}</th>
            <th className={apiHeadCell}>{head.type}</th>
            <th className={apiHeadCell}>{head.description}</th>
          </tr>
        </thead>
        <tbody className={apiRowDivider}>
          {rows.map((row) => (
            <tr key={row.name}>
              <td className={cn(apiCell, "whitespace-nowrap")}>
                <div className="flex items-center gap-1.5">
                  <ApiName>{row.name}</ApiName>
                  {row.required && <RequiredBadge label={requiredLabel} />}
                </div>
              </td>
              <td className={cn(apiCell, "whitespace-nowrap")}>
                <ApiType>{row.type}</ApiType>
              </td>
              <td className={cn(apiCell, "text-text-secondary")}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export interface EnumRow {
  value: string;
  description?: ReactNode;
}

export interface EnumTableProps extends HTMLAttributes<HTMLDivElement> {
  values: EnumRow[];
  headers?: { value?: string; description?: string };
}

/**
 * EnumTable — an enumeration's values and their meaning (§26): the value-list
 * preset sharing the API table internals. Values render monospace. Server-safe.
 */
export function EnumTable({ values, headers, className, ...props }: EnumTableProps) {
  const head = { value: "Value", description: "Description", ...headers };
  return (
    <div className={cn(apiTableWrapper, className)} {...props}>
      <table className={apiTable}>
        <thead>
          <tr>
            <th className={apiHeadCell}>{head.value}</th>
            <th className={apiHeadCell}>{head.description}</th>
          </tr>
        </thead>
        <tbody className={apiRowDivider}>
          {values.map((row) => (
            <tr key={row.value}>
              <td className={cn(apiCell, "whitespace-nowrap")}>
                <ApiName>{row.value}</ApiName>
              </td>
              <td className={cn(apiCell, "text-text-secondary")}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
