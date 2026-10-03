import { type ReactNode } from "react";
import { type CodeEditorHandle, type CodeEditorProps } from "./code-editor";
export interface JsonParseError {
    message: string;
    /** 1-indexed line, when the browser reports it (Chrome/Firefox include it). */
    line?: number;
    /** 1-indexed column, when reported. */
    column?: number;
}
export interface JsonEditorProps extends Omit<CodeEditorProps, "language" | "invalid" | "errorLine" | "onChange"> {
    onChange?: (value: string) => void;
    /**
     * Fires after every parse attempt: `null` when the JSON is valid, a
     * structured error otherwise. Use this to gate the Save action or wire the
     * error into your FormField. The editor already highlights the error line
     * and the border, so a Toast is usually redundant.
     */
    onValidChange?: (error: JsonParseError | null) => void;
    /**
     * Extra external error (schema violation, server-side reject) painted with
     * the same treatment as a parse error. Ignored when the parse fails.
     */
    externalError?: JsonParseError | null;
    /** Show a "Format" button in the toolbar. Default true. */
    format?: boolean;
    formatLabel?: string;
    formatIndent?: number;
    /**
     * Show the built-in validity indicator (check/warning) in the toolbar.
     * Default true. Turn off when the surrounding FormField already reports
     * the state to avoid duplicating the signal.
     */
    showValidity?: boolean;
    validLabel?: string;
    /** Extra content injected into the toolbar to the left of Format. */
    toolbar?: ReactNode;
}
/**
 * JsonEditor — CodeEditor pre-configured for JSON: live parsing, a
 * "Format" affordance in the toolbar, a validity indicator, and error
 * treatment wired to the exact line the parser tripped on. Anything the base
 * CodeEditor accepts flows through (`readOnly`, `filename`, `minRows`, …).
 *
 * Callers still own the data via `value`/`onChange` — parsing is only for
 * visual + accessibility feedback, never a gate on typing.
 */
export declare const JsonEditor: import("react").ForwardRefExoticComponent<JsonEditorProps & import("react").RefAttributes<CodeEditorHandle>>;
