import { type HTMLAttributes } from "react";
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
/**
 * JsonViewer — collapsible JSON tree (§20): in a 200-key object what matters
 * is the SHAPE, so nodes collapse to "{ 4 fields }" / "[ 12 items ]" counts.
 * Keys are info, string literals success, other primitives accent, punctuation
 * muted. Any key listed in `secretKeys` renders masked with a badge even when
 * the payload came in clear — and the copied JSON is masked too.
 *
 * For a flat highlighted dump (no tree) use CodeBlock with `language="json"`.
 */
export declare const JsonViewer: import("react").ForwardRefExoticComponent<JsonViewerProps & import("react").RefAttributes<HTMLDivElement>>;
export {};
