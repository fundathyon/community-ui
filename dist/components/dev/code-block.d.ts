import { type HTMLAttributes, type ReactNode } from "react";
import { type CodeLanguage } from "./highlight";
export type { CodeLanguage } from "./highlight";
export interface CodeBlockTab {
    label: string;
    code: string;
    language?: CodeLanguage;
}
export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    /** The code to render. `children` (as a string) is equivalent. */
    code?: string;
    children?: string;
    /** bash · json · yaml · toml · http · text. Unknown languages render plain (§20). */
    language?: CodeLanguage;
    /**
     * `block` for source/config; `command` prefixes each line with a select-none
     * "$" prompt that is NEVER part of the copied text. Write commands WITHOUT
     * the prompt — the component renders it.
     */
    variant?: "block" | "command";
    /** Header filename, mono caption ("config.yaml"). */
    filename?: string;
    /** Header tabs that switch the rendered snippet (curl · node · go). */
    tabs?: CodeBlockTab[];
    /** Controlled active tab index. */
    activeTab?: number;
    defaultActiveTab?: number;
    onActiveTabChange?: (index: number) => void;
    /** Accessible name of the tablist. */
    tabsLabel?: string;
    lineNumbers?: boolean;
    /** Copy button, top-right — always visible, never hover-only (touch). */
    copy?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
    /** Collapse past this many lines behind a "Show more" toggle. */
    maxLines?: number;
    showMoreLabel?: string;
    showLessLabel?: string;
    /** Extra header content, right side (version badge, meta text…). */
    meta?: ReactNode;
}
/**
 * CodeBlock — THE code component of the suite (§20). Every code block in docs
 * and product comes out of this, never ad-hoc `<pre>` markup. Highlighting
 * uses only three semantic colors — accent for the verb, success for strings,
 * normal text for the rest — so the code never competes with the UI.
 *
 * When to use: any multi-line code, command or config. For a single symbol
 * inside prose use InlineCode; for an interactive session frame use Terminal.
 * Horizontal overflow scrolls INSIDE the block — never the page (§05).
 */
export declare const CodeBlock: import("react").ForwardRefExoticComponent<CodeBlockProps & import("react").RefAttributes<HTMLDivElement>>;
