import { type HTMLAttributes, type ReactNode } from "react";
export type TerminalLineKind = "input" | "output" | "comment";
export interface TerminalLineProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    children?: ReactNode;
    /** input (typed command, gets the prompt) · output · comment. */
    kind?: TerminalLineKind;
    /** Prompt glyph for input lines — select-none, excluded from copy. */
    prompt?: string;
}
/**
 * TerminalLine — one line inside a Terminal. Input lines render their prompt
 * as a non-selectable span so a manual text selection never drags a "$" along.
 */
export declare function TerminalLine({ kind, prompt, className, children, ...props }: TerminalLineProps): import("react").JSX.Element;
export interface TerminalProps extends HTMLAttributes<HTMLDivElement> {
    /** Header title, mono caption ("~/project"). */
    title?: string;
    /** Copies the INPUT lines only — never prompts, never output (§20). */
    copy?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
}
/**
 * Terminal — a session frame (§20): three muted dots, a mono title and a
 * darker body of TerminalLine children. Use it to show an interaction —
 * commands AND their output. For a copy-pasteable command on its own, use
 * CommandBlock. The copy button reproduces only what the user would type.
 */
export declare function Terminal({ title, copy, copyLabel, copiedLabel, className, children, ...props }: TerminalProps): import("react").JSX.Element;
