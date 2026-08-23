"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { subDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useState, type ComponentProps } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { useControllableState } from "../../hooks/use-controllable-state";
import { Button } from "../actions/button";
import { cn } from "../../lib/cn";
import { formatDate } from "../../lib/format";
import type { Size } from "../../lib/types";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Icon } from "../typography/icon";
import { CalendarChevron, datePopupClasses, rangeCalendarClassNames } from "./calendar";

export type { DateRange };

/** A relative shortcut: `range: null` clears the selection. */
export interface DateRangePickerPreset {
  label: string;
  range: DateRange | null;
}

const triggerSizeClasses: Record<Size, string> = {
  xs: "h-control-xs px-2 text-body-sm",
  sm: "h-control-sm px-2.5 text-body",
  md: "h-control-md px-2.5 text-body",
  lg: "h-control-lg px-3 text-body",
};

function defaultPresets(): DateRangePickerPreset[] {
  const today = new Date();
  return [
    { label: "Last 7 days", range: { from: subDays(today, 6), to: today } },
    { label: "Last 30 days", range: { from: subDays(today, 29), to: today } },
    { label: "Last 90 days", range: { from: subDays(today, 89), to: today } },
  ];
}

export interface DateRangePickerProps {
  value?: DateRange | null;
  defaultValue?: DateRange | null;
  onValueChange?: (value: DateRange | null) => void;
  /** Relative shortcuts — ALWAYS shown (§10), "Últimos 7 días" style.
   * Defaults to Last 7/30/90 days; pass your product copy. */
  presets?: DateRangePickerPreset[];
  placeholder?: string;
  /** xs 24 · sm 28 · md 32 · lg 44. Defaults to the density's size. */
  size?: Size;
  /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
  invalid?: boolean;
  disabled?: boolean;
  /** react-day-picker locale for month/weekday names. */
  locale?: ComponentProps<typeof DayPicker>["locale"];
  /** Accessible name for standalone use — inside a FormField the label wires itself. */
  "aria-label"?: string;
  /** Formats each endpoint of the resolved range. */
  format?: (date: Date) => string;
  className?: string;
}

/**
 * DateRangePicker (§10) — period selection on the DatePicker foundation:
 * calendar in `range` mode plus relative shortcuts ("Últimos 7 días" style).
 * The trigger looks like an Input and always echoes the resolved absolute
 * range; endpoints render solid, in-between days as an accent wash.
 *
 * Always inside a FormField, which owns the label and messages.
 */
export const DateRangePicker = forwardRef<HTMLButtonElement, DateRangePickerProps>(function DateRangePicker(
  {
    value: valueProp,
    defaultValue,
    onValueChange,
    presets,
    placeholder,
    size,
    invalid,
    disabled,
    locale,
    "aria-label": ariaLabel,
    format = formatDate,
    className,
  },
  ref,
) {
  const resolvedSize = useDefaultSize(size);
  const [value, setValue] = useControllableState<DateRange | null>({
    value: valueProp,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  });
  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState<Date | undefined>(undefined);

  const echo =
    value?.from != null ? `${format(value.from)} – ${format(value.to ?? value.from)}` : null;
  const resolvedPresets = presets ?? defaultPresets();

  return (
    <BasePopover.Root open={open} onOpenChange={setOpen}>
      <BasePopover.Trigger
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={invalid || undefined}
        data-invalid={invalid || undefined}
        className={cn(
          "flex w-full min-w-0 select-none items-center justify-between gap-1.5 rounded-md border border-border-strong bg-surface text-left text-text",
          "transition-colors duration-[var(--fdn-dur-fast)]",
          "disabled:cursor-not-allowed disabled:opacity-45",
          "data-[invalid]:border-danger-border",
          triggerSizeClasses[resolvedSize],
          className,
        )}
      >
        <span className={cn("truncate tabular-nums", !echo && "text-text-muted")}>
          {echo ?? placeholder}
        </span>
        <Icon icon={CalendarIcon} size={14} className="text-text-muted" />
      </BasePopover.Trigger>
      <BasePopover.Portal>
        <BasePopover.Positioner side="bottom" align="start" sideOffset={4} className="fdn-z-dropdown">
          <BasePopover.Popup className={datePopupClasses}>
            <div className="flex items-start gap-3">
              <DayPicker
                mode="range"
                selected={value ?? undefined}
                onSelect={(selected) => {
                  setValue(selected ?? null);
                  if (selected?.from && selected.to && selected.from.getTime() !== selected.to.getTime()) {
                    setOpen(false);
                  }
                }}
                month={month ?? value?.from ?? undefined}
                onMonthChange={setMonth}
                weekStartsOn={1}
                showOutsideDays
                autoFocus
                locale={locale}
                classNames={rangeCalendarClassNames}
                components={{ Chevron: CalendarChevron }}
              />
              <div className="flex min-w-28 flex-col gap-0.5 self-stretch border-l border-border pl-3">
                {resolvedPresets.map((preset) => (
                  <Button
                    key={preset.label}
                    variant="ghost"
                    size="sm"
                    className="justify-start"
                    onClick={() => {
                      setValue(preset.range);
                      if (preset.range?.from) setMonth(preset.range.from);
                      setOpen(false);
                    }}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          </BasePopover.Popup>
        </BasePopover.Positioner>
      </BasePopover.Portal>
    </BasePopover.Root>
  );
});
