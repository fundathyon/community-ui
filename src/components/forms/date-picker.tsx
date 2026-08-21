"use client";

import { Popover as BasePopover } from "@base-ui/react/popover";
import { addDays, addHours, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef, useRef, useState, type ComponentProps } from "react";
import { DayPicker } from "react-day-picker";
import { useControllableState } from "../../hooks/use-controllable-state";
import { Button } from "../actions/button";
import { cn } from "../../lib/cn";
import { formatDate } from "../../lib/format";
import type { Size } from "../../lib/types";
import { Icon } from "../typography/icon";
import { CalendarChevron, calendarClassNames, datePopupClasses } from "./calendar";
import { Input } from "./input";

/** A relative shortcut: `value: null` means "never" (e.g. "Nunca expira"). */
export interface DatePickerPreset {
  label: string;
  value: Date | null;
}

const PARSE_FORMATS = ["yyyy-MM-dd", "d/M/yyyy", "d-M-yyyy", "d MMM yyyy"];

function parseTyped(text: string): Date | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  for (const pattern of PARSE_FORMATS) {
    const parsed = parse(trimmed, pattern, new Date());
    if (isValid(parsed)) return parsed;
  }
  const fallback = new Date(trimmed);
  return isValid(fallback) ? fallback : null;
}

function defaultPresets(): DatePickerPreset[] {
  const now = new Date();
  return [
    { label: "In 24 hours", value: addHours(now, 24) },
    { label: "In 7 days", value: addDays(now, 7) },
    { label: "In 30 days", value: addDays(now, 30) },
    { label: "Never expires", value: null },
  ];
}

export interface DatePickerProps {
  /** `null` = no date / "never" (chosen via a null preset or by clearing). */
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  /**
   * Relative shortcuts — ALWAYS shown (§10): in these products nobody wants
   * "August 25th", they want "in 7 days". Defaults to In 24 hours / In 7
   * days / In 30 days / Never expires; pass your product copy.
   */
  presets?: DatePickerPreset[];
  placeholder?: string;
  /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
  size?: Size;
  /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
  invalid?: boolean;
  disabled?: boolean;
  /** react-day-picker locale for month/weekday names. */
  locale?: ComponentProps<typeof DayPicker>["locale"];
  /** Accessible name for standalone use — inside a FormField the label wires itself. */
  "aria-label"?: string;
  /** aria-label of the calendar button. Pass your product copy. */
  openCalendarLabel?: string;
  /** Formats the resolved absolute date (input echo + line under the control). */
  format?: (date: Date) => string;
  className?: string;
}

/**
 * DatePicker (§10) — a date field that is ALWAYS accompanied by relative
 * shortcuts, accepts direct typing (ISO or d/m/yyyy, committed on blur or
 * Enter) and shows the resolved absolute date under the control, so "in 7
 * days" never stays ambiguous. Weeks start on Monday.
 *
 * Always inside a FormField, which owns the label and messages.
 */
export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
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
    openCalendarLabel = "Open calendar",
    format = formatDate,
    className,
  },
  ref,
) {
  const [value, setValue] = useControllableState<Date | null>({
    value: valueProp,
    defaultValue: defaultValue ?? null,
    onChange: onValueChange,
  });
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(() => (value ? format(value) : ""));
  const [month, setMonth] = useState<Date | undefined>(undefined);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  // Reflect external value changes into the input while the user is not typing.
  const editingRef = useRef(false);
  const lastValueRef = useRef(value);
  if (!editingRef.current && (lastValueRef.current?.getTime() ?? null) !== (value?.getTime() ?? null)) {
    lastValueRef.current = value;
    setText(value ? format(value) : "");
  }

  const commitDate = (next: Date | null, echo?: string) => {
    lastValueRef.current = next;
    setValue(next);
    setText(echo ?? (next ? format(next) : ""));
    if (next) setMonth(next);
  };

  const commitTyped = () => {
    const parsed = parseTyped(text);
    if (parsed) {
      lastValueRef.current = parsed;
      setValue(parsed);
      setMonth(parsed);
    } else if (text.trim() === "") {
      lastValueRef.current = null;
      setValue(null);
    } else {
      // unparseable → restore the last resolved value
      setText(value ? format(value) : "");
    }
  };

  const resolvedPresets = presets ?? defaultPresets();

  return (
    <div className={cn("flex min-w-0 flex-col gap-1", className)}>
      <BasePopover.Root open={open} onOpenChange={setOpen}>
        <div ref={anchorRef}>
          <Input
            ref={ref}
            size={size}
            invalid={invalid}
            disabled={disabled}
            aria-label={ariaLabel}
            placeholder={placeholder}
            value={text}
            onValueChange={(next) => setText(next)}
            onFocus={() => {
              editingRef.current = true;
            }}
            onBlur={() => {
              editingRef.current = false;
              commitTyped();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                commitTyped();
              }
            }}
            trailing={
              <BasePopover.Trigger
                aria-label={openCalendarLabel}
                disabled={disabled}
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-sm text-text-muted",
                  "transition-colors duration-[var(--fdn-dur-fast)] hover:text-text",
                  "disabled:cursor-not-allowed",
                  "fdn-touch-target",
                )}
              >
                <Icon icon={CalendarIcon} size={14} />
              </BasePopover.Trigger>
            }
          />
        </div>
        <BasePopover.Portal>
          <BasePopover.Positioner anchor={anchorRef} side="bottom" align="start" sideOffset={4} className="fdn-z-dropdown">
            <BasePopover.Popup className={datePopupClasses} aria-label={openCalendarLabel}>
              <div className="flex items-start gap-3">
                <DayPicker
                  mode="single"
                  selected={value ?? undefined}
                  onSelect={(selected) => {
                    commitDate(selected ?? null);
                    setOpen(false);
                  }}
                  month={month ?? value ?? undefined}
                  onMonthChange={setMonth}
                  weekStartsOn={1}
                  showOutsideDays
                  autoFocus
                  locale={locale}
                  classNames={calendarClassNames}
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
                        commitDate(preset.value, preset.value ? undefined : preset.label);
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
      {value && (
        <p className="text-caption tabular-nums text-text-muted">{format(value)}</p>
      )}
    </div>
  );
});
