"use client";

import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { ChevronDown, X } from "lucide-react";
import { forwardRef, useMemo, type ReactNode } from "react";
import { useControllableState } from "../../hooks/use-controllable-state";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { ComboboxItemRow, ComboboxPopup, comboboxSizeClasses, type ComboboxOption } from "./combobox";

export interface MultiSelectProps {
  items: ComboboxOption[];
  /** Selected values. */
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  /** Empty-results slot. Pass your product copy — e.g. "Sin resultados". */
  empty?: ReactNode;
  /** aria-label factory for each chip's remove button. Pass your product copy. */
  removeLabel?: (label: string) => string;
  /** xs 24 · sm 28 · md 32 · lg 44 minimum height — the box grows with chips. */
  size?: Size;
  /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  /** Accessible name for standalone use — inside a FormField the label wires itself. */
  "aria-label"?: string;
  /** aria-label of the chevron button that opens the list. */
  triggerLabel?: string;
  className?: string;
}

/**
 * MultiSelect — multiple selection over a searchable list (§10). Built on Base
 * UI's multi-select Combobox: selected values render as removable chips inside
 * the trigger box; Backspace on the empty input removes the last chip; the
 * check indicator marks selected options in the list.
 *
 * Applied FILTERS are a different pattern — those chips live outside the field
 * and stay always visible (§16).
 */
export const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(function MultiSelect(
  {
    items,
    value: valueProp,
    defaultValue,
    onValueChange,
    placeholder,
    empty = "No results",
    removeLabel = (label) => `Remove ${label}`,
    size,
    invalid,
    disabled,
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
  const [value, setValue] = useControllableState<string[]>({
    value: valueProp,
    defaultValue: defaultValue ?? [],
    onChange: onValueChange,
  });

  const selectedOptions = useMemo(
    () => value.map((v) => items.find((item) => item.value === v) ?? { value: v, label: v }),
    [value, items],
  );

  return (
    <BaseCombobox.Root<ComboboxOption, true>
      multiple
      items={items}
      value={selectedOptions}
      onValueChange={(next) => setValue(next.map((option) => option.value))}
      isItemEqualToValue={(a, b) => a?.value === b?.value}
      autoHighlight
      disabled={disabled}
      required={required}
      name={name}
      id={id}
    >
      <BaseCombobox.Chips
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
        className={cn(
          "flex min-w-0 flex-wrap items-center gap-1.5 rounded-md border border-border-strong bg-surface py-1 pr-8 text-text",
          "relative",
          "transition-colors duration-[var(--fdn-dur-fast)]",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus",
          "data-[invalid]:border-danger-border",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
          comboboxSizeClasses[resolvedSize],
          className,
        )}
      >
        {selectedOptions.map((option) => (
          <BaseCombobox.Chip
            key={option.value}
            aria-label={option.label}
            className="flex shrink-0 cursor-default items-center gap-1 rounded-full border border-border bg-surface-hover py-px pl-2 pr-1 text-caption font-medium text-text-secondary"
          >
            {option.label}
            <BaseCombobox.ChipRemove
              aria-label={removeLabel(option.label)}
              className={cn(
                "grid size-3.5 shrink-0 place-items-center rounded-full text-text-muted",
                "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-border hover:text-text",
              )}
            >
              <Icon icon={X} size={12} />
            </BaseCombobox.ChipRemove>
          </BaseCombobox.Chip>
        ))}
        <BaseCombobox.Input
          ref={ref}
          placeholder={selectedOptions.length === 0 ? placeholder : undefined}
          aria-label={ariaLabel}
          aria-invalid={invalid || undefined}
          className="h-5 w-full min-w-16 flex-1 bg-transparent outline-none placeholder:text-text-muted disabled:cursor-not-allowed"
        />
        <BaseCombobox.Trigger
          aria-label={triggerLabel}
          tabIndex={-1}
          className="absolute inset-y-0 right-0 flex items-center px-2.5 text-text-muted transition-colors duration-[var(--fdn-dur-fast)] hover:text-text disabled:cursor-not-allowed"
        >
          <Icon icon={ChevronDown} size={14} />
        </BaseCombobox.Trigger>
      </BaseCombobox.Chips>
      <ComboboxPopup empty={empty}>
        <BaseCombobox.List>
          {(item: ComboboxOption) => <ComboboxItemRow key={item.value} item={item} query="" />}
        </BaseCombobox.List>
      </ComboboxPopup>
    </BaseCombobox.Root>
  );
});
