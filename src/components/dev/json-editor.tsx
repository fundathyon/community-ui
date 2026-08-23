"use client";

import { Check, Sparkles, TriangleAlert } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { CodeEditor, type CodeEditorHandle, type CodeEditorProps } from "./code-editor";

export interface JsonParseError {
  message: string;
  /** 1-indexed line, when the browser reports it (Chrome/Firefox include it). */
  line?: number;
  /** 1-indexed column, when reported. */
  column?: number;
}

export interface JsonEditorProps
  extends Omit<CodeEditorProps, "language" | "invalid" | "errorLine" | "onChange"> {
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
 * Extract a 1-indexed (line, column) pair from a native `JSON.parse` error.
 * Chrome says `... at position 42 (line 5 column 3)`; Firefox says
 * `line 5 column 3 ... of the JSON data`; Safari only reports the position.
 * We probe all three shapes and fall back to a byte-offset walk when only a
 * position is present so the editor still highlights the right line.
 */
function parseErrorLocation(source: string, message: string): { line?: number; column?: number } {
  const lineCol = message.match(/line (\d+)[^\d]+column (\d+)/i);
  if (lineCol) {
    return { line: Number(lineCol[1]), column: Number(lineCol[2]) };
  }
  const positionMatch = message.match(/position (\d+)/i);
  if (positionMatch) {
    const pos = Number(positionMatch[1]);
    let line = 1;
    let col = 1;
    for (let i = 0; i < Math.min(pos, source.length); i++) {
      if (source.charCodeAt(i) === 10) {
        line += 1;
        col = 1;
      } else {
        col += 1;
      }
    }
    return { line, column: col };
  }
  return {};
}

function safeParse(value: string): JsonParseError | null {
  if (value.trim() === "") return null; // empty is not an error — Save can gate it.
  try {
    JSON.parse(value);
    return null;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const loc = parseErrorLocation(value, message);
    return { message, line: loc.line, column: loc.column };
  }
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
export const JsonEditor = forwardRef<CodeEditorHandle, JsonEditorProps>(function JsonEditor(
  {
    value,
    defaultValue,
    onChange,
    onValidChange,
    externalError,
    format = true,
    formatLabel = "Format",
    formatIndent = 2,
    showValidity = true,
    validLabel = "Valid JSON",
    toolbar,
    ...rest
  },
  ref,
) {
  const controlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string>(defaultValue ?? "");
  const current = controlled ? (value ?? "") : uncontrolled;

  const parseError = useMemo(() => safeParse(current), [current]);
  const activeError = parseError ?? externalError ?? null;

  useEffect(() => {
    onValidChange?.(parseError);
    // Intentionally not depending on onValidChange to avoid re-firing when
    // the caller inlines a fresh closure each render — same escape hatch as
    // useControllableState in this package.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parseError?.message, parseError?.line, parseError?.column]);

  const handleChange = (next: string) => {
    if (!controlled) setUncontrolled(next);
    onChange?.(next);
  };

  const handleFormat = () => {
    try {
      const pretty = JSON.stringify(JSON.parse(current), null, formatIndent);
      if (typeof pretty !== "string") return;
      handleChange(pretty);
    } catch {
      // A format on invalid JSON is a no-op — the editor already shows why.
    }
  };

  const canFormat = format && parseError === null && current.trim() !== "";

  const toolbarNode = (
    <>
      {toolbar}
      {showValidity && current.trim() !== "" && (
        activeError ? (
          <span className="inline-flex items-center gap-1 text-caption text-danger" title={activeError.message}>
            <Icon icon={TriangleAlert} size={12} />
            <span className="hidden sm:inline">{activeError.line ? `Line ${activeError.line}` : "Invalid"}</span>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-caption text-success" aria-label={validLabel}>
            <Icon icon={Check} size={12} />
            <span className="hidden sm:inline">{validLabel}</span>
          </span>
        )
      )}
      {format && (
        <button
          type="button"
          onClick={handleFormat}
          disabled={!canFormat || rest.readOnly || rest.disabled}
          className={cn(
            "inline-flex h-6 items-center gap-1 rounded-md px-2 text-caption text-text-secondary",
            "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover hover:text-text",
            "disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-text-secondary",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus",
          )}
        >
          <Icon icon={Sparkles} size={12} />
          {formatLabel}
        </button>
      )}
    </>
  );

  return (
    <CodeEditor
      ref={ref}
      {...rest}
      language="json"
      value={current}
      onChange={handleChange}
      invalid={activeError !== null}
      errorLine={activeError?.line}
      toolbar={toolbarNode}
    />
  );
});
