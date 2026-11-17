import { type LucideIcon } from "lucide-react";
import { type HTMLAttributes } from "react";
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
/**
 * Tree — a Vault-style file tree (§14): folder chevrons, indentation guides and
 * a full keyboard model (arrows navigate and expand/collapse; Home/End jump;
 * Enter/Space select). Data-driven via `items`; use `mono` for file names.
 *
 * Implements the ARIA tree pattern — `role=tree`/`treeitem`/`group`, roving
 * tabindex, and `aria-expanded`/`aria-selected`.
 */
export declare function Tree({ items, mono, selectedId, defaultSelectedId, onSelect, className, ...props }: TreeProps): import("react").JSX.Element;
