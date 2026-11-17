import type { HTMLAttributes } from "react";
export interface InlineCodeProps extends HTMLAttributes<HTMLElement> {
}
/**
 * InlineCode — a code token inside prose (§20): a prop name, a path, a flag.
 * For anything multi-line — or anything the reader will copy — use CodeBlock,
 * which owns the copy affordance. Server-component safe.
 */
export declare function InlineCode({ className, ...props }: InlineCodeProps): import("react").JSX.Element;
