import type { CodeBlockProps } from "./code-block";
export interface CommandBlockProps extends Omit<CodeBlockProps, "children" | "code" | "language" | "variant" | "tabs" | "activeTab" | "defaultActiveTab" | "onActiveTabChange" | "tabsLabel"> {
    /** One command, or several — one per line. Written WITHOUT the "$" prompt. */
    command: string | string[];
}
/**
 * CommandBlock — CodeBlock preset for shell commands (§20): `variant="command"`,
 * bash highlighting, the "$" prompt rendered select-none and excluded from
 * copy. Use it wherever docs say "run this".
 */
export declare function CommandBlock({ command, ...props }: CommandBlockProps): import("react").JSX.Element;
