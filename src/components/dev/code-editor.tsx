"use client";

import {
  forwardRef,
  useCallback,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
  type UIEvent,
} from "react";
import { cn } from "../../lib/cn";
import { CopyButton } from "./copy-button";
import { TOKEN_CLASS, tokenize, type CodeLanguage, type CodeToken } from "./highlight";

export type { CodeLanguage } from "./highlight";

export interface CodeEditorProps {
  /** Controlled text. Pair with `onChange`. */
  value: string;
  /** Uncontrolled initial value. Ignored when `value` is provided. */
  defaultValue?: string;
  /** Fires with the new text on every keystroke. */
  onChange?: (value: string) => void;
  /** bash · json · yaml · http · text (§20 tokenizer). */
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

function renderTokens(tokens: CodeToken[]): ReactNode {
  if (tokens.length === 0) return " ";
  return tokens.map((token, i) =>
    token.kind === "plain" ? (
      token.text
    ) : (
      <span key={i} className={TOKEN_CLASS[token.kind]}>
        {token.text}
      </span>
    ),
  );
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
export const CodeEditor = forwardRef<CodeEditorHandle, CodeEditorProps>(function CodeEditor(
  {
    value,
    defaultValue,
    onChange,
    language = "text",
    filename,
    toolbar,
    copy = false,
    copyLabel = "Copy",
    copiedLabel = "Copied",
    lineNumbers = false,
    minRows = 6,
    maxRows,
    placeholder,
    readOnly = false,
    disabled = false,
    invalid = false,
    errorLine,
    tabSize = 2,
    name,
    id,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    className,
    wrap = "off",
    onFocus,
    onBlur,
  },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  // Uncontrolled state — used only when `value` is not provided.
  const controlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string>(defaultValue ?? "");
  const current = controlled ? value : uncontrolled;

  useImperativeHandle(
    ref,
    () => ({
      focus: () => textareaRef.current?.focus(),
      setSelection: (start, end) => {
        const ta = textareaRef.current;
        if (!ta) return;
        ta.focus();
        ta.setSelectionRange(start, end ?? start);
      },
      getElement: () => textareaRef.current,
    }),
    [],
  );

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!controlled) setUncontrolled(event.target.value);
    onChange?.(event.target.value);
  };

  // Sync scroll: the highlighted <pre> and the line-number gutter must
  // follow the textarea 1:1 or the caret and its token stop matching.
  const handleScroll = useCallback((event: UIEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    if (preRef.current) {
      preRef.current.scrollTop = target.scrollTop;
      preRef.current.scrollLeft = target.scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = target.scrollTop;
    }
  }, []);

  // Tab key indent: replace the default focus-navigation behavior with an
  // insert of `tabSize` spaces so nested JSON / YAML actually indents.
  // Uses execCommand for a single-step undo entry; falls back to a manual
  // splice with the same net effect if the browser rejects it.
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab" || tabSize <= 0 || readOnly || disabled) return;
    event.preventDefault();
    const ta = event.currentTarget;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const indent = " ".repeat(tabSize);
    ta.focus();
    let inserted = false;
    try {
      inserted = document.execCommand("insertText", false, indent);
    } catch {
      inserted = false;
    }
    if (!inserted) {
      const next = current.slice(0, start) + indent + current.slice(end);
      if (!controlled) setUncontrolled(next);
      onChange?.(next);
      requestAnimationFrame(() => {
        ta.setSelectionRange(start + indent.length, start + indent.length);
      });
    }
  };

  // Recompute tokens on every render — the tokenizer is O(n) per line and
  // this component targets payloads well under a few thousand lines.
  const lines = tokenize(current, language);
  const lineCount = Math.max(lines.length, 1);

  // Line-height math: the code face is `text-code` — 0.71875rem font-size,
  // 1.125rem line-height (see tokens). Keep both editor + preview locked to
  // it so caret alignment survives font-size changes elsewhere.
  const style: CSSProperties = { lineHeight: "1.125rem", tabSize };

  const rowLineHeightPx = 18; // 1.125rem @ 16px root.
  const minHeightPx = rowLineHeightPx * minRows;
  const maxHeightPx = maxRows ? rowLineHeightPx * maxRows : undefined;

  const hasHeader = Boolean(filename || toolbar || (copy && !readOnly));
  const showFloatingCopy = copy && !hasHeader;
  const showPlaceholder = current.length === 0 && placeholder != null;

  const wrapClass = wrap === "off" ? "whitespace-pre" : "whitespace-pre-wrap break-words";

  const surfaceClasses = cn(
    "group relative overflow-hidden rounded-lg border bg-bg-subtle transition-colors duration-[var(--fdn-dur-fast)]",
    invalid ? "border-danger-border" : "border-border",
    disabled && "cursor-not-allowed opacity-45",
    !disabled &&
      !readOnly &&
      "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
    className,
  );

  return (
    <div className={surfaceClasses} data-invalid={invalid || undefined} data-readonly={readOnly || undefined}>
      {hasHeader && (
        <div className="flex items-center gap-3 border-b border-border px-3 py-1">
          {filename && (
            <span className="min-w-0 truncate font-mono text-caption text-text-secondary">{filename}</span>
          )}
          <div className="ml-auto flex items-center gap-1.5">
            {toolbar}
            {copy && !readOnly && (
              <CopyButton value={() => current} label={copyLabel} copiedLabel={copiedLabel} size={14} />
            )}
          </div>
        </div>
      )}

      <div className="relative flex" style={{ minHeight: minHeightPx, maxHeight: maxHeightPx }}>
        {lineNumbers && (
          <div
            ref={gutterRef}
            aria-hidden
            className="pointer-events-none select-none overflow-hidden border-r border-border bg-bg-subtle py-3 pl-3 pr-2 font-mono text-code text-text-muted"
            style={style}
          >
            {Array.from({ length: lineCount }, (_, i) => (
              <div
                key={i}
                className={cn("text-right tabular-nums", errorLine === i + 1 && "text-danger")}
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}

        {showFloatingCopy && (
          <CopyButton
            value={() => current}
            label={copyLabel}
            copiedLabel={copiedLabel}
            size={14}
            className="absolute right-1.5 top-1.5 z-20 bg-bg-subtle"
          />
        )}

        <div className="relative min-w-0 flex-1">
          <pre
            ref={preRef}
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 m-0 overflow-hidden p-3 font-mono text-code text-text",
              wrapClass,
              showFloatingCopy && "pr-12",
            )}
            style={style}
          >
            {lines.map((tokens, i) => (
              <div
                key={i}
                className={cn(
                  errorLine === i + 1 && "-mx-3 bg-danger-bg/70 px-3",
                )}
              >
                {renderTokens(tokens)}
              </div>
            ))}
          </pre>

          {showPlaceholder && (
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 m-0 overflow-hidden p-3 font-mono text-code text-text-muted",
                wrapClass,
                showFloatingCopy && "pr-12",
              )}
              style={style}
            >
              {placeholder}
            </div>
          )}

          <textarea
            ref={textareaRef}
            id={fieldId}
            name={name}
            value={current}
            onChange={handleChange}
            onScroll={handleScroll}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            readOnly={readOnly}
            disabled={disabled}
            aria-invalid={invalid || undefined}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoComplete="off"
            wrap={wrap}
            className={cn(
              // Layered over the highlighted <pre>. The visible text uses
              // `text-transparent` so only the pre paints, while the caret
              // stays legible via the explicit `caretColor` in style below.
              "relative m-0 block w-full resize-none overflow-auto border-0 bg-transparent p-3 font-mono text-code text-transparent",
              "selection:bg-focus/30 selection:text-transparent",
              wrapClass,
              "focus:outline-none",
              readOnly && "cursor-default",
              disabled && "cursor-not-allowed",
              showFloatingCopy && "pr-12",
            )}
            style={{
              ...style,
              minHeight: minHeightPx,
              maxHeight: maxHeightPx,
              // Caret can't come from `currentColor` — the layer above is
              // transparent — so tie it to the DS's text token directly.
              caretColor: "var(--fdn-text)",
            }}
          />
        </div>
      </div>
    </div>
  );
});
