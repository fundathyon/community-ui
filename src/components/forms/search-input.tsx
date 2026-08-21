"use client";

import { Search, X } from "lucide-react";
import { forwardRef, useRef } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { Input, type InputProps } from "./input";

export interface SearchInputProps
  extends Omit<InputProps, "type" | "leading" | "value" | "defaultValue" | "onValueChange"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** aria-label of the clear button. Pass your product copy. */
  clearLabel?: string;
  /** Keyboard hint rendered as a trailing kbd while empty — e.g. "/" (§17 shortcuts). */
  shortcutHint?: string;
}

/**
 * SearchInput — the search variant of Input (§10): same component with a
 * leading Search icon, not a separate control. `type="search"` provides the
 * searchbox semantics. Esc clears the value (and stops there — it only closes
 * a parent overlay once the field is already empty); a clear button appears
 * while non-empty. Debounce results by ~250ms and never steal focus when they
 * arrive (§16).
 */
export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    clearLabel = "Clear search",
    shortcutHint,
    size,
    disabled,
    onKeyDown,
    trailing,
    ...props
  },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  const [value, setValue] = useControllableState<string>({
    value: valueProp,
    defaultValue: defaultValue ?? "",
    onChange: onValueChange,
  });
  const innerRef = useRef<HTMLInputElement | null>(null);
  const setRefs = (node: HTMLInputElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const handleKeyDown: NonNullable<InputProps["onKeyDown"]> = (event) => {
    if (event.key === "Escape" && value !== "") {
      event.preventDefault();
      event.stopPropagation();
      setValue("");
    }
    onKeyDown?.(event);
  };

  return (
    <Input
      ref={setRefs}
      type="search"
      size={resolvedSize}
      disabled={disabled}
      value={value}
      onValueChange={(next) => setValue(next)}
      onKeyDown={handleKeyDown}
      className="[&::-webkit-search-cancel-button]:hidden"
      leading={<Icon icon={Search} size={resolvedSize === "xs" || resolvedSize === "sm" ? 14 : 16} />}
      trailing={
        trailing ??
        (value !== "" ? (
          <button
            type="button"
            aria-label={clearLabel}
            disabled={disabled}
            onClick={() => {
              setValue("");
              innerRef.current?.focus();
            }}
            className={cn(
              "grid size-5 shrink-0 place-items-center rounded-sm text-text-muted",
              "transition-colors duration-[var(--fdn-dur-fast)] hover:text-text",
              "disabled:cursor-not-allowed",
              "fdn-touch-target",
            )}
          >
            <Icon icon={X} size={14} />
          </button>
        ) : shortcutHint ? (
          <kbd
            aria-hidden
            className="pointer-events-none inline-flex h-4 min-w-4 items-center justify-center rounded-sm border border-border bg-bg-subtle px-1 font-sans text-caption text-text-muted"
          >
            {shortcutHint}
          </kbd>
        ) : undefined)
      }
      {...props}
    />
  );
});
