"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronDown, ChevronUp } from "lucide-react";
import { forwardRef, useId, useRef, useState, } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { CopyButton } from "./copy-button";
import { TOKEN_CLASS, tokenize } from "./highlight";
function renderTokens(tokens) {
    if (tokens.length === 0)
        return " ";
    return tokens.map((token, i) => token.kind === "plain" ? (token.text) : (_jsx("span", { className: TOKEN_CLASS[token.kind], children: token.text }, i)));
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
export const CodeBlock = forwardRef(function CodeBlock({ code, children, language = "text", variant = "block", filename, tabs, activeTab, defaultActiveTab, onActiveTabChange, tabsLabel = "Code samples", lineNumbers = false, copy = true, copyLabel = "Copy code", copiedLabel = "Copied", maxLines, showMoreLabel = "Show more", showLessLabel = "Show less", meta, className, ...props }, ref) {
    const id = useId();
    const tabRefs = useRef([]);
    const [active, setActive] = useControllableState({
        value: activeTab,
        defaultValue: defaultActiveTab ?? 0,
        onChange: onActiveTabChange,
    });
    const [expanded, setExpanded] = useState(false);
    const tabList = tabs ?? [];
    const hasTabs = tabList.length > 0;
    const activeIndex = hasTabs ? Math.min(Math.max(active, 0), tabList.length - 1) : 0;
    const activeDef = hasTabs ? tabList[activeIndex] : undefined;
    const source = (activeDef ? activeDef.code : (children ?? code)) ?? "";
    const raw = source.replace(/\n$/, "");
    const lines = tokenize(raw, activeDef?.language ?? language);
    const rawLines = raw.split("\n");
    const collapsed = maxLines !== undefined && lines.length > maxLines;
    const visible = collapsed && !expanded ? lines.slice(0, maxLines) : lines;
    const hasHeader = Boolean(filename || hasTabs || meta);
    const isContinuation = (index) => {
        if (index === 0)
            return false;
        const previous = rawLines[index - 1];
        return previous !== undefined && /\\\s*$/.test(previous);
    };
    const onTablistKeyDown = (event) => {
        let next = null;
        if (event.key === "ArrowRight")
            next = (activeIndex + 1) % tabList.length;
        else if (event.key === "ArrowLeft")
            next = (activeIndex - 1 + tabList.length) % tabList.length;
        else if (event.key === "Home")
            next = 0;
        else if (event.key === "End")
            next = tabList.length - 1;
        if (next !== null) {
            event.preventDefault();
            setActive(next);
            tabRefs.current[next]?.focus();
        }
    };
    return (_jsxs("div", { ref: ref, className: cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className), ...props, children: [hasHeader && (_jsxs("div", { className: "flex items-center gap-3 border-b border-border px-3 py-1", children: [filename && _jsx("span", { className: "font-mono text-caption text-text-secondary", children: filename }), hasTabs && (_jsx("div", { role: "tablist", "aria-label": tabsLabel, className: "flex items-center gap-1", onKeyDown: onTablistKeyDown, children: tabList.map((tab, i) => (_jsx("button", { ref: (el) => {
                                tabRefs.current[i] = el;
                            }, type: "button", role: "tab", id: `${id}-tab-${i}`, "aria-selected": i === activeIndex, "aria-controls": `${id}-panel`, tabIndex: i === activeIndex ? 0 : -1, onClick: () => setActive(i), className: cn("rounded-md px-2 py-0.5 font-mono text-caption", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", i === activeIndex ? "bg-surface-hover text-text" : "text-text-muted hover:text-text"), children: tab.label }, tab.label))) })), _jsxs("div", { className: "ml-auto flex items-center gap-2", children: [meta, copy && _jsx(CopyButton, { value: source, label: copyLabel, copiedLabel: copiedLabel, size: 14 })] })] })), _jsxs("div", { className: "relative", children: [!hasHeader && copy && (_jsx(CopyButton, { value: source, label: copyLabel, copiedLabel: copiedLabel, size: 14, className: "absolute right-1.5 top-1.5 bg-bg-subtle" })), _jsx("pre", { id: hasTabs ? `${id}-panel` : undefined, role: hasTabs ? "tabpanel" : undefined, "aria-labelledby": hasTabs ? `${id}-tab-${activeIndex}` : undefined, className: cn("overflow-x-auto p-3 font-mono text-code text-text", !hasHeader && copy && "pr-12"), children: _jsx("code", { className: "block w-max min-w-full", children: visible.map((tokens, i) => (_jsxs("span", { className: "flex", children: [lineNumbers && (_jsx("span", { "aria-hidden": true, className: "w-7 shrink-0 select-none pr-3 text-right text-text-muted tabular-nums", children: i + 1 })), variant === "command" && (_jsx("span", { "aria-hidden": true, className: "select-none pr-2 text-text-muted", children: isContinuation(i) ? " " : "$" })), _jsx("span", { className: "whitespace-pre", children: renderTokens(tokens) })] }, i))) }) })] }), collapsed && (_jsxs("button", { type: "button", "aria-expanded": expanded, onClick: () => setExpanded(!expanded), className: cn("flex w-full items-center justify-center gap-1 border-t border-border px-3 py-1 text-caption font-medium text-text-secondary", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", "hover:bg-surface-hover hover:text-text"), children: [_jsx(Icon, { icon: expanded ? ChevronUp : ChevronDown, size: 12 }), expanded ? showLessLabel : showMoreLabel] }))] }));
});
