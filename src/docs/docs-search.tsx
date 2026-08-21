"use client";

import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Search } from "lucide-react";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../lib/cn";
import { Spinner } from "../components/feedback/spinner";
import { SearchInput } from "../components/forms/search-input";
import { Icon } from "../components/typography/icon";
import { Kbd } from "../components/typography/kbd";

export interface DocsSearchResult {
  id: string;
  title: string;
  /** Snippet shown under the title. */
  excerpt?: string;
  /** Group heading this result belongs to ("Getting started", "API"). */
  section?: string;
  /** Destination — navigated to on select when no `onSelect` is given. */
  href?: string;
}

export interface DocsSearchProps {
  /** Runs the query. Debounced internally; may be async. */
  onSearch: (query: string) => DocsSearchResult[] | Promise<DocsSearchResult[]>;
  /** Handles a chosen result. When omitted, the result's `href` is navigated to. */
  onSelect?: (result: DocsSearchResult) => void;
  /** Text on the trigger button (looks like a search field). Overridable. */
  triggerLabel?: string;
  /** Placeholder / accessible name of the dialog input. Overridable. */
  placeholder?: string;
  /** Filtered-empty state — distinct from the initial empty input (§C-03). */
  emptyMessage?: ReactNode;
  /** Accessible name of the dialog. Overridable (products ship Spanish copy). */
  label?: string;
  /** Bind ⌘K / Ctrl+K to toggle the dialog. Default true. */
  shortcut?: boolean;
  /** Keyboard hint rendered in the trigger. */
  shortcutHint?: string;
  /** Debounce before calling `onSearch`, ms. Default 250 (§16). */
  debounceMs?: number;
  /** Extra classes for the trigger. */
  className?: string;
}

interface FlatOption {
  result: DocsSearchResult;
  index: number;
}

/**
 * DocsSearch — the docs-scoped ⌘K search (§26/§16). A trigger that looks like a
 * search field opens a top-aligned dialog; results are grouped by section and
 * driven by your `onSearch` (debounced 250ms, sync or async). Full combobox
 * a11y: the input keeps focus and owns `aria-activedescendant`; Arrow/Home/End
 * move, Enter selects, Esc closes.
 *
 * It searches docs content — for the app's global command menu use the overlays
 * CommandPalette instead (§16).
 */
export function DocsSearch({
  onSearch,
  onSelect,
  triggerLabel = "Search…",
  placeholder = "Search documentation…",
  emptyMessage = "No results",
  label = "Search",
  shortcut = true,
  shortcutHint = "⌘K",
  debounceMs = 250,
  className,
}: DocsSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DocsSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useRef(onSearch);
  onSearchRef.current = onSearch;
  const reqId = useRef(0);

  const baseId = useId();
  const listId = `${baseId}-list`;
  const optionId = (result: DocsSearchResult) => `${baseId}-opt-${result.id}`;

  // ⌘K / Ctrl+K toggles the dialog (§16 — the suite-wide shortcut).
  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && (event.key === "k" || event.key === "K")) {
        event.preventDefault();
        setOpen((previous) => !previous);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [shortcut]);

  // Fresh state whenever the dialog opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
      setLoading(false);
    }
  }, [open]);

  // Debounced search; a request token drops stale responses (§16).
  useEffect(() => {
    if (!open) return;
    const q = query.trim();
    if (q === "") {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = ++reqId.current;
    const timer = setTimeout(() => {
      Promise.resolve(onSearchRef.current(q))
        .then((res) => {
          if (id !== reqId.current) return;
          setResults(res);
          setActiveIndex(0);
        })
        .catch(() => {
          if (id === reqId.current) setResults([]);
        })
        .finally(() => {
          if (id === reqId.current) setLoading(false);
        });
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, open, debounceMs]);

  const groups = useMemo(() => {
    const order: string[] = [];
    const bySection = new Map<string, DocsSearchResult[]>();
    for (const result of results) {
      const key = result.section ?? "";
      const bucket = bySection.get(key);
      if (bucket) bucket.push(result);
      else {
        bySection.set(key, [result]);
        order.push(key);
      }
    }
    let index = 0;
    return order.map((section) => ({
      section,
      options: (bySection.get(section) ?? []).map((result): FlatOption => ({ result, index: index++ })),
    }));
  }, [results]);

  const flat = useMemo(() => groups.flatMap((group) => group.options), [groups]);
  const activeIdx = flat.length === 0 ? -1 : Math.min(activeIndex, flat.length - 1);
  const activeResult = activeIdx === -1 ? undefined : flat[activeIdx]?.result;
  const activeId = activeResult ? optionId(activeResult) : undefined;

  const select = (result: DocsSearchResult) => {
    setOpen(false);
    if (onSelect) {
      onSelect(result);
      return;
    }
    if (result.href && typeof window !== "undefined") window.location.href = result.href;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (flat.length === 0) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((activeIdx + 1) % flat.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((activeIdx - 1 + flat.length) % flat.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(flat.length - 1);
        break;
      case "Enter":
        if (event.nativeEvent.isComposing) return;
        event.preventDefault();
        if (activeResult) select(activeResult);
        break;
      default:
        break;
    }
  };

  const showEmpty = !loading && query.trim() !== "" && flat.length === 0;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={triggerLabel}
        aria-keyshortcuts={shortcut ? "Meta+K Control+K" : undefined}
        className={cn(
          "flex h-control-sm items-center gap-2 rounded-md border border-border-strong bg-surface px-2.5 text-body text-text-muted",
          "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)] hover:bg-surface-hover",
          "fdn-touch-target w-full sm:w-64",
          className,
        )}
      >
        <Icon icon={Search} size={14} />
        <span className="min-w-0 flex-1 truncate text-left">{triggerLabel}</span>
        {shortcut && <Kbd aria-hidden>{shortcutHint}</Kbd>}
      </button>

      <BaseDialog.Root open={open} onOpenChange={setOpen}>
        <BaseDialog.Portal>
          <BaseDialog.Backdrop
            className={cn(
              "fixed inset-0 fdn-z-command bg-black/60",
              "transition-opacity duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-standard)]",
              "data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            )}
          />
          <BaseDialog.Popup
            aria-label={label}
            initialFocus={inputRef}
            className={cn(
              "fixed inset-x-4 top-[12vh] fdn-z-command mx-auto flex max-h-[70vh] flex-col overflow-hidden",
              "rounded-xl border border-border bg-surface-raised shadow-xl",
              "sm:inset-x-0 sm:w-full sm:max-w-modal-md",
              "transition-[opacity,transform] duration-[var(--fdn-dur-slow)] ease-[var(--fdn-ease-enter)]",
              "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0",
            )}
          >
            <div className="flex shrink-0 items-center gap-2 border-b border-border pr-3">
              <SearchInput
                ref={inputRef}
                size="lg"
                role="combobox"
                aria-expanded
                aria-controls={listId}
                aria-activedescendant={activeId}
                aria-autocomplete="list"
                aria-label={placeholder}
                placeholder={placeholder}
                value={query}
                onValueChange={setQuery}
                onKeyDown={handleKeyDown}
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                // Inset, not suppressed (§C-02): this row sits flush against the
                // dialog's own rounded top edge, so the wrapper's normal
                // positive-offset ring would clip — same fix as CommandPalette.
                // `focus-within` (not FOCUS_RING_INSET's `focus-visible`) because
                // the ring belongs to this wrapper when its inner input is
                // focused, not to the wrapper itself.
                wrapperClassName="border-0 rounded-none focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-focus"
                className="bg-transparent"
              />
              {loading && <Spinner size={16} label={null} className="text-text-muted" />}
            </div>

            <div id={listId} role="listbox" aria-label={label} className="flex-1 overflow-y-auto overscroll-contain p-1">
              {groups.map((group, groupIndex) => {
                const headingId = `${baseId}-group-${groupIndex}`;
                return (
                  <div key={group.section || `group-${groupIndex}`} role="group" aria-labelledby={headingId}>
                    {group.section && (
                      <div id={headingId} role="presentation" className="px-2 pb-1 pt-2 text-overline uppercase text-text-muted">
                        {group.section}
                      </div>
                    )}
                    {group.options.map(({ result, index }) => (
                      <div
                        key={result.id}
                        id={optionId(result)}
                        role="option"
                        aria-selected={index === activeIdx}
                        onMouseMove={() => setActiveIndex(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => select(result)}
                        className={cn(
                          "flex cursor-default select-none flex-col gap-0.5 rounded-md px-2 py-1.5",
                          index === activeIdx && "bg-surface-hover",
                        )}
                      >
                        <span className="truncate text-body text-text">{result.title}</span>
                        {result.excerpt && (
                          <span className="truncate text-body-sm text-text-muted">{result.excerpt}</span>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}

              {showEmpty && (
                <div role="status" className="px-3 pb-8 pt-6 text-center text-body text-text-secondary">
                  {emptyMessage}
                </div>
              )}
            </div>
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
}
