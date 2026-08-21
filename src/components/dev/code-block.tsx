"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import {
  forwardRef,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
import { CopyButton } from "./copy-button";
import { TOKEN_CLASS, tokenize, type CodeToken, type CodeLanguage } from "./highlight";

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
  /** bash · json · yaml · http · text. Unknown languages render plain (§20). */
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
 * CodeBlock — THE code component of the suite (§20). Every code block in docs
 * and product comes out of this, never ad-hoc `<pre>` markup. Highlighting
 * uses only three semantic colors — accent for the verb, success for strings,
 * normal text for the rest — so the code never competes with the UI.
 *
 * When to use: any multi-line code, command or config. For a single symbol
 * inside prose use InlineCode; for an interactive session frame use Terminal.
 * Horizontal overflow scrolls INSIDE the block — never the page (§05).
 */
export const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(function CodeBlock(
  {
    code,
    children,
    language = "text",
    variant = "block",
    filename,
    tabs,
    activeTab,
    defaultActiveTab,
    onActiveTabChange,
    tabsLabel = "Code samples",
    lineNumbers = false,
    copy = true,
    copyLabel = "Copy code",
    copiedLabel = "Copied",
    maxLines,
    showMoreLabel = "Show more",
    showLessLabel = "Show less",
    meta,
    className,
    ...props
  },
  ref,
) {
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useControllableState<number>({
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

  const isContinuation = (index: number): boolean => {
    if (index === 0) return false;
    const previous = rawLines[index - 1];
    return previous !== undefined && /\\\s*$/.test(previous);
  };

  const onTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let next: number | null = null;
    if (event.key === "ArrowRight") next = (activeIndex + 1) % tabList.length;
    else if (event.key === "ArrowLeft") next = (activeIndex - 1 + tabList.length) % tabList.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabList.length - 1;
    if (next !== null) {
      event.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div
      ref={ref}
      className={cn("overflow-hidden rounded-lg border border-border bg-bg-subtle", className)}
      {...props}
    >
      {hasHeader && (
        <div className="flex items-center gap-3 border-b border-border px-3 py-1">
          {filename && <span className="font-mono text-caption text-text-secondary">{filename}</span>}
          {hasTabs && (
            <div role="tablist" aria-label={tabsLabel} className="flex items-center gap-1" onKeyDown={onTablistKeyDown}>
              {tabList.map((tab, i) => (
                <button
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${i}`}
                  aria-selected={i === activeIndex}
                  aria-controls={`${id}-panel`}
                  tabIndex={i === activeIndex ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "rounded-md px-2 py-0.5 font-mono text-caption",
                    "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
                    i === activeIndex ? "bg-surface-hover text-text" : "text-text-muted hover:text-text",
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            {meta}
            {copy && <CopyButton value={source} label={copyLabel} copiedLabel={copiedLabel} size={14} />}
          </div>
        </div>
      )}
      <div className="relative">
        {!hasHeader && copy && (
          <CopyButton
            value={source}
            label={copyLabel}
            copiedLabel={copiedLabel}
            size={14}
            className="absolute right-1.5 top-1.5 bg-bg-subtle"
          />
        )}
        <pre
          id={hasTabs ? `${id}-panel` : undefined}
          role={hasTabs ? "tabpanel" : undefined}
          aria-labelledby={hasTabs ? `${id}-tab-${activeIndex}` : undefined}
          className={cn("overflow-x-auto p-3 font-mono text-code text-text", !hasHeader && copy && "pr-12")}
        >
          <code className="block w-max min-w-full">
            {visible.map((tokens, i) => (
              <span key={i} className="flex">
                {lineNumbers && (
                  <span aria-hidden className="w-7 shrink-0 select-none pr-3 text-right text-text-muted tabular-nums">
                    {i + 1}
                  </span>
                )}
                {variant === "command" && (
                  <span aria-hidden className="select-none pr-2 text-text-muted">
                    {isContinuation(i) ? " " : "$"}
                  </span>
                )}
                <span className="whitespace-pre">{renderTokens(tokens)}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
      {collapsed && (
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className={cn(
            "flex w-full items-center justify-center gap-1 border-t border-border px-3 py-1 text-caption font-medium text-text-secondary",
            "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
            "hover:bg-surface-hover hover:text-text",
          )}
        >
          <Icon icon={expanded ? ChevronUp : ChevronDown} size={12} />
          {expanded ? showLessLabel : showMoreLabel}
        </button>
      )}
    </div>
  );
});
