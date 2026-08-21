"use client";

import { ChevronRight, File as FileIcon, Folder, FolderOpen, type LucideIcon } from "lucide-react";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

export interface TreeNode {
  /** Stable id. Falls back to a positional path id when omitted. */
  id?: string;
  label: string;
  /** Overrides the default folder/file glyph. */
  icon?: LucideIcon;
  children?: TreeNode[];
  /** Start expanded (folders only). */
  defaultExpanded?: boolean;
  disabled?: boolean;
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLUListElement>, "onSelect"> {
  items: TreeNode[];
  /** Render labels in mono — for file names and paths (§14). */
  mono?: boolean;
  /** Controlled selected id. */
  selectedId?: string;
  /** Initial selected id (uncontrolled). */
  defaultSelectedId?: string;
  onSelect?: (node: TreeNode, id: string) => void;
}

interface FlatNode {
  id: string;
  node: TreeNode;
  level: number;
  parentId: string | null;
  hasChildren: boolean;
}

function nodeId(node: TreeNode, parentKey: string, index: number): string {
  return node.id ?? `${parentKey}.${index}`;
}

/** Ids that should start expanded, using the same positional scheme as render. */
function collectDefaultExpanded(items: TreeNode[]): string[] {
  const out: string[] = [];
  const walk = (nodes: TreeNode[], parentKey: string) => {
    nodes.forEach((node, index) => {
      const id = nodeId(node, parentKey, index);
      if (node.defaultExpanded && node.children?.length) out.push(id);
      if (node.children?.length) walk(node.children, id);
    });
  };
  walk(items, "root");
  return out;
}

/** The currently visible nodes, top-to-bottom, for keyboard navigation. */
function buildVisible(items: TreeNode[], expanded: Set<string>): FlatNode[] {
  const out: FlatNode[] = [];
  const walk = (nodes: TreeNode[], level: number, parentId: string | null, parentKey: string) => {
    nodes.forEach((node, index) => {
      const id = nodeId(node, parentKey, index);
      const hasChildren = !!node.children?.length;
      out.push({ id, node, level, parentId, hasChildren });
      if (hasChildren && expanded.has(id)) walk(node.children!, level + 1, id, id);
    });
  };
  walk(items, 0, null, "root");
  return out;
}

/**
 * Tree — a Vault-style file tree (§14): folder chevrons, indentation guides and
 * a full keyboard model (arrows navigate and expand/collapse; Home/End jump;
 * Enter/Space select). Data-driven via `items`; use `mono` for file names.
 *
 * Implements the ARIA tree pattern — `role=tree`/`treeitem`/`group`, roving
 * tabindex, and `aria-expanded`/`aria-selected`.
 */
export function Tree({
  items,
  mono = false,
  selectedId,
  defaultSelectedId,
  onSelect,
  className,
  ...props
}: TreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(collectDefaultExpanded(items)));
  const [selected, setSelected] = useControllableState<string>({
    value: selectedId,
    defaultValue: defaultSelectedId ?? "",
    onChange: undefined,
  });

  const visible = useMemo(() => buildVisible(items, expanded), [items, expanded]);
  const [activeId, setActiveId] = useState<string>(() => visible[0]?.id ?? "");
  const effectiveActive = visible.some((v) => v.id === activeId) ? activeId : visible[0]?.id ?? "";

  const refs = useRef<Map<string, HTMLLIElement>>(new Map());

  const focusItem = useCallback((id: string) => {
    setActiveId(id);
    refs.current.get(id)?.focus();
  }, []);

  const toggleExpanded = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const activate = useCallback(
    (flat: FlatNode) => {
      setActiveId(flat.id);
      if (flat.node.disabled) return;
      if (flat.hasChildren) toggleExpanded(flat.id);
      setSelected(flat.id);
      onSelect?.(flat.node, flat.id);
    },
    [onSelect, setSelected, toggleExpanded],
  );

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLUListElement>) => {
      const index = visible.findIndex((v) => v.id === effectiveActive);
      if (index < 0) return;
      const current = visible[index];
      if (!current) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (index < visible.length - 1) focusItem(visible[index + 1]!.id);
          break;
        case "ArrowUp":
          event.preventDefault();
          if (index > 0) focusItem(visible[index - 1]!.id);
          break;
        case "ArrowRight":
          event.preventDefault();
          if (current.hasChildren) {
            if (!expanded.has(current.id)) toggleExpanded(current.id);
            else if (visible[index + 1]?.parentId === current.id) focusItem(visible[index + 1]!.id);
          }
          break;
        case "ArrowLeft":
          event.preventDefault();
          if (current.hasChildren && expanded.has(current.id)) toggleExpanded(current.id);
          else if (current.parentId) focusItem(current.parentId);
          break;
        case "Home":
          event.preventDefault();
          if (visible[0]) focusItem(visible[0].id);
          break;
        case "End":
          event.preventDefault();
          if (visible.length > 0) focusItem(visible[visible.length - 1]!.id);
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          activate(current);
          break;
        default:
          break;
      }
    },
    [activate, effectiveActive, expanded, focusItem, toggleExpanded, visible],
  );

  const renderNodes = (nodes: TreeNode[], level: number, parentKey: string): ReactNode =>
    nodes.map((node, index) => {
      const id = nodeId(node, parentKey, index);
      const hasChildren = !!node.children?.length;
      const isOpen = hasChildren && expanded.has(id);
      const isSelected = selected === id && selected !== "";
      const GlyphIcon: LucideIcon = node.icon ?? (hasChildren ? (isOpen ? FolderOpen : Folder) : FileIcon);

      const onClick = (event: MouseEvent<HTMLLIElement>) => {
        event.stopPropagation();
        activate({ id, node, level, parentId: null, hasChildren });
      };

      return (
        <li
          key={id}
          role="treeitem"
          aria-expanded={hasChildren ? isOpen : undefined}
          aria-selected={node.disabled ? undefined : isSelected}
          aria-disabled={node.disabled || undefined}
          data-id={id}
          tabIndex={effectiveActive === id ? 0 : -1}
          ref={(el) => {
            if (el) refs.current.set(id, el);
            else refs.current.delete(id);
          }}
          onClick={onClick}
          className={cn(
            "cursor-pointer rounded-md outline-none",
            "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-focus",
            node.disabled && "cursor-not-allowed opacity-45",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-md px-1.5 py-1 transition-colors duration-[var(--fdn-dur-fast)]",
              !node.disabled && "hover:bg-surface-hover",
              isSelected && "bg-surface-hover",
            )}
          >
            {hasChildren ? (
              <Icon
                icon={ChevronRight}
                size={14}
                className={cn("shrink-0 text-text-muted transition-transform", isOpen && "rotate-90")}
              />
            ) : (
              <span aria-hidden className="size-3.5 shrink-0" />
            )}
            <Icon icon={GlyphIcon} size={16} className="shrink-0 text-text-muted" />
            <span
              className={cn(
                "truncate text-body",
                isSelected ? "font-medium text-text" : "text-text-secondary",
                mono && "font-mono text-code",
              )}
            >
              {node.label}
            </span>
          </div>
          {hasChildren && isOpen ? (
            <ul role="group" className="ml-3 border-l border-border pl-1.5">
              {renderNodes(node.children!, level + 1, id)}
            </ul>
          ) : null}
        </li>
      );
    });

  return (
    <ul role="tree" className={cn("text-text", className)} onKeyDown={onKeyDown} {...props}>
      {renderNodes(items, 0, "root")}
    </ul>
  );
}
