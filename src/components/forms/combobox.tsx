"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";

export const comboboxSizeClasses: Record<Size, string> = {
  xs: "min-h-control-xs px-2 text-body-sm",
  sm: "min-h-control-sm px-2.5 text-body",
  md: "min-h-control-md px-2.5 text-body",
  lg: "min-h-control-lg px-3 text-body",
};

/** Item data for Combobox and MultiSelect. `label` is a string so it can be
 * searched and echoed in the input. */
export interface ComboboxOption {
  value: string;
  label: string;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

/** Internal: renders `text` with the matched `query` fragment emphasized. */
export function MatchHighlight({ text, query }: { text: string; query: string }) {
  const trimmed = query.trim();
  if (!trimmed) return <>{text}</>;
  const index = text.toLowerCase().indexOf(trimmed.toLowerCase());
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <mark className="bg-transparent font-semibold text-accent">
        {text.slice(index, index + trimmed.length)}
      </mark>
      {text.slice(index + trimmed.length)}
    </>
  );
}

/** Internal: shared option row used by Combobox and MultiSelect popups. */
export function ComboboxItemRow({ item, query }: { item: ComboboxOption; query: string }) {
  return (
    <BaseCombobox.Item
      value={item}
      disabled={item.disabled}
      aria-label={item.label}
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-body-sm text-text outline-none",
        "transition-colors duration-[var(--fdn-dur-fast)]",
        "data-[highlighted]:bg-surface-hover",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
      )}
    >
      {item.icon && <span className="flex shrink-0 items-center text-text-muted [&_svg]:size-4">{item.icon}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate">
          <MatchHighlight text={item.label} query={query} />
        </span>
        {item.description && <span className="truncate text-caption text-text-muted">{item.description}</span>}
      </span>
      <BaseCombobox.ItemIndicator className="flex shrink-0 items-center text-accent">
        <Icon icon={Check} size={14} />
      </BaseCombobox.ItemIndicator>
    </BaseCombobox.Item>
  );
}

/** Internal: popup chrome shared by Combobox and MultiSelect. */
export function ComboboxPopup({ empty, children }: { empty: ReactNode; children: ReactNode }) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner sideOffset={4} className="fdn-z-dropdown outline-none">
        <BaseCombobox.Popup
          className={cn(
            "max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-border bg-surface-raised p-1 shadow-md",
            "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
            "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
            "data-[ending-style]:opacity-0",
          )}
        >
          <BaseCombobox.Empty className="px-2 py-4 text-center text-body-sm text-text-muted empty:hidden">
            {empty}
          </BaseCombobox.Empty>
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

export interface ComboboxProps {
  /** The searchable list. It may grow with data — that is exactly when
   * Combobox beats Select (§17). */
  items: ComboboxOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  placeholder?: string;
  /** Empty-results slot (distinct from "no items at all"). Pass your product
   * copy — e.g. "Sin resultados". */
  empty?: ReactNode;
  /** xs 24 · sm 28 · md 32 · lg 44. Defaults to the density's size. */
  size?: Size;
  /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  /** Accessible name for standalone use — inside a FormField the label wires itself. */
  "aria-label"?: string;
  /** aria-label of the chevron button that opens the list. */
  triggerLabel?: string;
  /** Extra classes for the input box. */
  className?: string;
}

/**
 * Combobox — searchable selection (§10, §17): for more than 7 options, or a
 * list that grows with the data. The match is highlighted, arrows navigate,
 * Enter selects and Esc closes WITHOUT changing the selection — the typed
 * text is never lost on close (§10). For ≤ 7 fixed options use Select.
 *
 * Autocomplete (accepting values outside the list) is a Base UI concern —
 * compose `@base-ui/react/autocomplete` if you need `freeSolo` behavior.
 */
export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    items,
    value,
    defaultValue,
    onValueChange,
    placeholder,
    empty = "No results",
    size,
    invalid,
    disabled,
    readOnly,
    required,
    name,
    id,
    "aria-label": ariaLabel,
    triggerLabel = "Open list",
    className,
  },
  ref,
) {
  const resolvedSize = useDefaultSize(size);

  const toOption = (v: string | null | undefined): ComboboxOption | null | undefined => {
    if (v === undefined) return undefined;
    if (v === null) return null;
    return items.find((item) => item.value === v) ?? { value: v, label: v };
  };
  const selected = useMemo(() => toOption(value), [value, items]); // eslint-disable-line react-hooks/exhaustive-deps
  const [initialDefault] = useState(() => toOption(defaultValue));

  // The input is CONTROLLED so the typed value is never lost on close (§10):
  // Base UI resets a single-mode input to the selected label when the popup
  // unmounts — we ignore programmatic clears and keep what the user typed.
  const [inputValue, setInputValue] = useState<string>(() => selected?.label ?? initialDefault?.label ?? "");
  const selectedKey = selected === undefined ? undefined : (selected?.value ?? null);
  const lastSelectedKeyRef = useRef(selectedKey ?? initialDefault?.value ?? null);
  if (selectedKey !== undefined && lastSelectedKeyRef.current !== selectedKey) {
    lastSelectedKeyRef.current = selectedKey;
    setInputValue(selected?.label ?? "");
  }

  return (
    <BaseCombobox.Root<ComboboxOption, false>
      items={items}
      value={selected}
      defaultValue={initialDefault}
      onValueChange={onValueChange ? (next) => onValueChange(next?.value ?? null) : undefined}
      isItemEqualToValue={(a, b) => a?.value === b?.value}
      autoHighlight
      inputValue={inputValue}
      onInputValueChange={(next, details) => {
        if (next === "" && details.reason !== "input-change" && details.reason !== "clear-press") {
          return; // programmatic clear on close — §10 keeps the typed text
        }
        setInputValue(next);
      }}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      id={id}
    >
      <span
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "flex min-w-0 items-center gap-1.5 rounded-md border border-border-strong bg-surface text-text",
          "transition-colors duration-[var(--fdn-dur-fast)]",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
          "data-[invalid]:border-danger-border",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
          "has-[input[readonly]]:bg-bg-subtle",
          comboboxSizeClasses[resolvedSize],
          className,
        )}
      >
        <BaseCombobox.Input
          ref={ref}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          className="h-full w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed"
        />
        <BaseCombobox.Trigger
          aria-label={triggerLabel}
          tabIndex={-1}
          className="flex shrink-0 items-center text-text-muted transition-colors duration-[var(--fdn-dur-fast)] hover:text-text disabled:cursor-not-allowed"
        >
          <Icon icon={ChevronDown} size={14} />
        </BaseCombobox.Trigger>
      </span>
      <ComboboxPopup empty={empty}>
        <BaseCombobox.List>
          {(item: ComboboxOption) => <ComboboxItemRow key={item.value} item={item} query={inputValue} />}
        </BaseCombobox.List>
      </ComboboxPopup>
    </BaseCombobox.Root>
  );
});
