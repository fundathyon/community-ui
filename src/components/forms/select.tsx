"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { forwardRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "../../lib/cn";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";

const triggerSizeClasses: Record<Size, string> = {
  xs: "h-control-xs px-2 text-body-sm",
  sm: "h-control-sm px-2.5 text-body",
  md: "h-control-md px-2.5 text-body",
  lg: "h-control-lg px-3 text-body",
};

/** Item data for the `items` prop of Select. */
export interface SelectOption {
  value: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  /** Data-driven items. Alternatively compose `SelectItem` children. */
  items?: SelectOption[];
  /** Composable alternative to `items`: `SelectItem` elements. */
  children?: ReactNode;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  /** Shown in the trigger while nothing is selected. Never a label substitute (§10). */
  placeholder?: ReactNode;
  /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
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
  /** Extra classes for the trigger (the Input-look box). */
  className?: string;
}

/**
 * Select — a closed choice among ≤ 7 KNOWN AND STABLE options (§10, §17).
 * Above 7, or when the list grows with data, use Combobox with search; for
 * 2–5 options worth comparing at a glance use RadioGroup instead (§17).
 *
 * The trigger looks and sizes exactly like an Input; the selected state shows
 * a check indicator. Always inside a FormField, which owns the label.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    items,
    children,
    value,
    defaultValue,
    onValueChange,
    placeholder,
    size,
    invalid,
    disabled,
    readOnly,
    required,
    name,
    id,
    "aria-label": ariaLabel,
    className,
  },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  return (
    <BaseSelect.Root<string, false>
      items={items?.map(({ value: v, label }) => ({ value: v, label }))}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange ? (next) => onValueChange(next) : undefined}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      id={id}
    >
      <BaseSelect.Trigger
        ref={ref}
        aria-label={ariaLabel}
        data-invalid={invalid || undefined}
        aria-invalid={invalid || undefined}
        className={cn(
          "flex w-full min-w-0 select-none items-center justify-between gap-1.5 rounded-md border border-border-strong bg-surface text-left text-text",
          "transition-colors duration-[var(--fdn-dur-fast)]",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
          "data-[readonly]:bg-bg-subtle",
          "data-[invalid]:border-danger-border",
          triggerSizeClasses[resolvedSize],
          className,
        )}
      >
        <BaseSelect.Value
          placeholder={placeholder}
          className="truncate data-[placeholder]:text-text-muted"
        />
        <BaseSelect.Icon className="flex shrink-0 items-center text-text-muted">
          <Icon icon={ChevronDown} size={14} />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Portal>
        <BaseSelect.Positioner sideOffset={4} alignItemWithTrigger={false} className="fdn-z-dropdown outline-none">
          <BaseSelect.Popup
            className={cn(
              "max-h-[min(24rem,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-lg border border-border bg-surface-raised p-1 shadow-md",
              "transition-[opacity,transform] duration-[var(--fdn-dur-base)] ease-[var(--fdn-ease-enter)]",
              "data-[starting-style]:translate-y-1 data-[starting-style]:opacity-0",
              "data-[ending-style]:opacity-0",
            )}
          >
            {items
              ? items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    icon={item.icon}
                    description={item.description}
                  >
                    {item.label}
                  </SelectItem>
                ))
              : children}
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
});

export interface SelectItemProps extends Omit<ComponentProps<typeof BaseSelect.Item>, "children"> {
  /** Leading icon slot. */
  icon?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  /** The item label. */
  children: ReactNode;
}

/** One option of a Select. Hover uses `surface-hover`; the selected option shows a check. */
export function SelectItem({ icon, description, className, children, ...props }: SelectItemProps) {
  return (
    <BaseSelect.Item
      className={cn(
        "flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-body-sm text-text outline-none",
        "transition-colors duration-[var(--fdn-dur-fast)]",
        "data-[highlighted]:bg-surface-hover",
        "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-45",
        className,
      )}
      {...props}
    >
      {icon && <span className="flex shrink-0 items-center text-text-muted [&_svg]:size-4">{icon}</span>}
      <span className="flex min-w-0 flex-1 flex-col">
        <BaseSelect.ItemText className="truncate">{children}</BaseSelect.ItemText>
        {description && <span className="truncate text-caption text-text-muted">{description}</span>}
      </span>
      <BaseSelect.ItemIndicator className="flex shrink-0 items-center text-accent">
        <Icon icon={Check} size={14} />
      </BaseSelect.ItemIndicator>
    </BaseSelect.Item>
  );
}
