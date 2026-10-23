import { type HTMLAttributes, type ReactNode } from "react";
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
export declare const JsonViewer: import("react").ForwardRefExoticComponent<JsonViewerProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
