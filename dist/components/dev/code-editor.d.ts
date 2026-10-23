import { type ReactNode } from "react";
import { type CodeLanguage } from "./highlight";
export type { CodeLanguage } from "./highlight";
export interface CodeEditorProps {
    /** Controlled text. Pair with `onChange`. */
    value: string;
    /** Uncontrolled initial value. Ignored when `value` is provided. */
    defaultValue?: string;
    /** Fires with the new text on every keystroke. */
    onChange?: (value: string) => void;
    /** bash · json · yaml · toml · http · text (§20 tokenizer). */
    language?: CodeLanguage;
    /** Header filename ("payload.json"). Turns on the header row. */
    filename?: string;
    /** Extra content in the header, right side — put Format/Validate/etc here. */
    toolbar?: ReactNode;
    /**
     * Show a copy affordance. In the header when a header is rendered, or
     * floating over the code otherwise. Copies the full value.
     */
    copy?: boolean;
    copyLabel?: string;
    copiedLabel?: string;
    /** Left gutter with line numbers, aligned per line with the code. */
    lineNumbers?: boolean;
    /** Visible height as a number of rows (line-height multiples). */
    minRows?: number;
    /** Never grow past this many rows — content scrolls internally after. */
    maxRows?: number;
    /** Placeholder when the value is empty. */
    placeholder?: string;
    /** Non-editable but selectable/copyable. Renders as a display, not a form field. */
    readOnly?: boolean;
    /** Not editable, faded out — matches Input/Textarea's disabled state. */
    disabled?: boolean;
    /**
     * Marks the editor as invalid (border turns danger). Pair with `errorLine`
     * to highlight the exact row (1-indexed) where the parser tripped.
     */
    invalid?: boolean;
    /** 1-indexed line to paint with a subtle danger background. */
    errorLine?: number;
    /** Tab key inserts this many spaces. Set 0 to keep the default tab behavior (focus change). */
    tabSize?: number;
    /** Passed straight to the underlying textarea. */
    name?: string;
    id?: string;
    /** Accessible name — required whenever the editor lives outside a FormField. */
    "aria-label"?: string;
    /** Accessible description id — set by FormField automatically. */
    "aria-describedby"?: string;
    className?: string;
    /** Wrap behavior — `off` disables wrapping (long lines scroll horizontally). */
    wrap?: "hard" | "soft" | "off";
    /** Focus + selection callbacks. */
    onFocus?: () => void;
    onBlur?: () => void;
}
/** Imperative handle: focus the editor and set the cursor. */
export interface CodeEditorHandle {
    focus: () => void;
    /** Selects the given range in the underlying textarea (0-indexed offsets). */
    setSelection: (start: number, end?: number) => void;
    /** Returns the underlying textarea for advanced integrations. */
    getElement: () => HTMLTextAreaElement | null;
}
/**
 * CodeEditor — the editable counterpart of CodeBlock (§20). Same visual frame
 * (`rounded-lg border border-border bg-bg-subtle`), same tokenizer, same
 * three-color rule — but with a real cursor, selection, undo, and clipboard.
 * Under the hood it's the classic overlay: a hidden textarea catches every
 * keystroke, and a highlighted `<pre>` paints exactly the same characters
 * beneath, with the two locked to the same font, padding and line-height so
 * tokens align pixel-perfect.
 *
 * When to use: any editable code or config surface — a JSON body, a YAML
 * config, a raw payload. For flat display use CodeBlock; for a tree view of
 * JSON use JsonViewer; for freeform prose use Textarea. Always place inside a
 * FormField so the label and error messages come from the DS.
 */
export declare const CodeEditor: import("react").ForwardRefExoticComponent<CodeEditorProps & import("react").RefAttributes<CodeEditorHandle>>;
