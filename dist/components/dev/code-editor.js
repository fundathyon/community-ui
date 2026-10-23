"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useCallback, useId, useImperativeHandle, useRef, useState, } from "react";
import { cn } from "../../lib/cn";
import { CopyButton } from "./copy-button";
import { TOKEN_CLASS, tokenize } from "./highlight";
function renderTokens(tokens) {
    if (tokens.length === 0)
        return " ";
    return tokens.map((token, i) => token.kind === "plain" ? (token.text) : (_jsx("span", { className: TOKEN_CLASS[token.kind], children: token.text }, i)));
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
export const CodeEditor = forwardRef(function CodeEditor({ value, defaultValue, onChange, language = "text", filename, toolbar, copy = false, copyLabel = "Copy", copiedLabel = "Copied", lineNumbers = false, minRows = 6, maxRows, placeholder, readOnly = false, disabled = false, invalid = false, errorLine, tabSize = 2, name, id, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, className, wrap = "off", onFocus, onBlur, }, ref) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const textareaRef = useRef(null);
    const preRef = useRef(null);
    const gutterRef = useRef(null);
    // Uncontrolled state — used only when `value` is not provided.
    const controlled = value !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultValue ?? "");
    const current = controlled ? value : uncontrolled;
    useImperativeHandle(ref, () => ({
        focus: () => textareaRef.current?.focus(),
        setSelection: (start, end) => {
            const ta = textareaRef.current;
            if (!ta)
                return;
            ta.focus();
            ta.setSelectionRange(start, end ?? start);
        },
        getElement: () => textareaRef.current,
    }), []);
    const handleChange = (event) => {
        if (!controlled)
            setUncontrolled(event.target.value);
        onChange?.(event.target.value);
    };
    // Sync scroll: the highlighted <pre> and the line-number gutter must
    // follow the textarea 1:1 or the caret and its token stop matching.
    const handleScroll = useCallback((event) => {
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
    const handleKeyDown = (event) => {
        if (event.key !== "Tab" || tabSize <= 0 || readOnly || disabled)
            return;
        event.preventDefault();
        const ta = event.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const indent = " ".repeat(tabSize);
        ta.focus();
        let inserted = false;
        try {
            inserted = document.execCommand("insertText", false, indent);
        }
        catch {
            inserted = false;
        }
        if (!inserted) {
            const next = current.slice(0, start) + indent + current.slice(end);
            if (!controlled)
                setUncontrolled(next);
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
    const style = { lineHeight: "1.125rem", tabSize };
    const rowLineHeightPx = 18; // 1.125rem @ 16px root.
    const minHeightPx = rowLineHeightPx * minRows;
    const maxHeightPx = maxRows ? rowLineHeightPx * maxRows : undefined;
    const hasHeader = Boolean(filename || toolbar || (copy && !readOnly));
    const showFloatingCopy = copy && !hasHeader;
    const showPlaceholder = current.length === 0 && placeholder != null;
    const wrapClass = wrap === "off" ? "whitespace-pre" : "whitespace-pre-wrap break-words";
    // The focus indication is deliberately an INSET 1px box-shadow ring
    // instead of the DS's standard outset outline (`outline-2 offset-2`).
    // A code editor grows to fill its container — often the full width of a
    // wide dialog — so an outset ring sits within a few pixels of the dialog
    // frame and reads as if it were touching or overflowing, even when the
    // dialog's overflow-hidden safely clips it. Painting a THIN ring inside
    // the border-box keeps focus obvious for keyboard users without adding
    // any pixel to the container's outer footprint or thickening the frame.
    const surfaceClasses = cn("group relative overflow-hidden rounded-lg border bg-bg-subtle transition-colors duration-[var(--fdn-dur-fast)]", invalid ? "border-danger-border" : "border-border", disabled && "cursor-not-allowed opacity-45", !disabled &&
        !readOnly &&
        "focus-within:ring-1 focus-within:ring-inset focus-within:ring-focus", className);
    return (_jsxs("div", { className: surfaceClasses, "data-invalid": invalid || undefined, "data-readonly": readOnly || undefined, children: [hasHeader && (_jsxs("div", { className: "flex items-center gap-3 border-b border-border px-3 py-1", children: [filename && (_jsx("span", { className: "min-w-0 truncate font-mono text-caption text-text-secondary", children: filename })), _jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [toolbar, copy && !readOnly && (_jsx(CopyButton, { value: () => current, label: copyLabel, copiedLabel: copiedLabel, size: 14 }))] })] })), _jsxs("div", { className: "relative flex", style: { minHeight: minHeightPx, maxHeight: maxHeightPx }, children: [lineNumbers && (
                    // The gutter drops its explicit `border-r` + `bg-bg-subtle`: the
                    // border-r formed a hard vertical line that, next to the inset
                    // focus ring, read as an extra frame on the left of the editor.
                    // Inheriting the parent surface and separating with generous
                    // padding keeps line numbers legible without noisy chrome.
                    _jsx("div", { ref: gutterRef, "aria-hidden": true, className: "pointer-events-none select-none overflow-hidden py-3 pl-3 pr-3 font-mono text-code text-text-muted", style: style, children: Array.from({ length: lineCount }, (_, i) => (_jsx("div", { className: cn("text-right tabular-nums", errorLine === i + 1 && "text-danger"), children: i + 1 }, i))) })), showFloatingCopy && (_jsx(CopyButton, { value: () => current, label: copyLabel, copiedLabel: copiedLabel, size: 14, className: "absolute right-1.5 top-1.5 z-20 bg-bg-subtle" })), _jsxs("div", { className: "relative min-w-0 flex-1", children: [_jsx("pre", { ref: preRef, "aria-hidden": true, className: cn("pointer-events-none absolute inset-0 m-0 overflow-hidden p-3 font-mono text-code text-text", wrapClass, showFloatingCopy && "pr-12"), style: style, children: lines.map((tokens, i) => (_jsx("div", { className: cn(errorLine === i + 1 && "-mx-3 bg-danger-bg/70 px-3"), children: renderTokens(tokens) }, i))) }), showPlaceholder && (_jsx("div", { "aria-hidden": true, className: cn("pointer-events-none absolute inset-0 m-0 overflow-hidden p-3 font-mono text-code text-text-muted", wrapClass, showFloatingCopy && "pr-12"), style: style, children: placeholder })), _jsx("textarea", { ref: textareaRef, id: fieldId, name: name, value: current, onChange: handleChange, onScroll: handleScroll, onKeyDown: handleKeyDown, onFocus: onFocus, onBlur: onBlur, readOnly: readOnly, disabled: disabled, "aria-invalid": invalid || undefined, "aria-label": ariaLabel, "aria-describedby": ariaDescribedBy, spellCheck: false, autoCorrect: "off", autoCapitalize: "off", autoComplete: "off", wrap: wrap, className: cn(
                                // Layered over the highlighted <pre>. The visible text uses
                                // `text-transparent` so only the pre paints, while the caret
                                // stays legible via the explicit `caretColor` in style below.
                                "relative m-0 block w-full resize-none overflow-auto border-0 bg-transparent p-3 font-mono text-code text-transparent", "selection:bg-focus/30 selection:text-transparent", wrapClass, "focus:outline-none", readOnly && "cursor-default", disabled && "cursor-not-allowed", showFloatingCopy && "pr-12"), style: {
                                    ...style,
                                    minHeight: minHeightPx,
                                    maxHeight: maxHeightPx,
                                    // Caret can't come from `currentColor` — the layer above is
                                    // transparent — so tie it to the DS's text token directly.
                                    caretColor: "var(--fdn-text)",
                                } })] })] })] }));
});
