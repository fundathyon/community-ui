"use client";

import { cn } from "../lib/cn";
import { useMediaQuery } from "../hooks/use-media-query";
import { Button } from "../components/actions/button";
import { ButtonGroup } from "../components/actions/button-group";
import { Select } from "../components/forms/select";

/** One selectable range. */
export interface TimeRangeOption {
  label: string;
  value: string;
}

export interface TimeRangePickerProps {
  value: string;
  /** @default 1h · 24h · 7d · 30d (§22 "Vista general"). */
  options?: TimeRangeOption[];
  onChange: (value: string) => void;
  /** Accessible name for the group / select. @default "Rango de tiempo" */
  label?: string;
  className?: string;
}

/** The §22 default ranges. Labels are Spanish product copy but fully overridable. */
const DEFAULT_OPTIONS: TimeRangeOption[] = [
  { label: "1 h", value: "1h" },
  { label: "24 h", value: "24h" },
  { label: "7 d", value: "7d" },
  { label: "30 d", value: "30d" },
];

/**
 * TimeRangePicker — the dashboard range control (§22). A segmented ButtonGroup
 * at ≥ md; below md it becomes a Select (§22 responsive: "el selector de rango se
 * convierte en select"). The active segment reads by fill AND weight, never
 * colour alone.
 *
 * When to use: switching a dashboard's time window. For picking an arbitrary
 * span use forms/DateRangePicker instead.
 */
export function TimeRangePicker({
  value,
  options = DEFAULT_OPTIONS,
  onChange,
  label = "Rango de tiempo",
  className,
}: TimeRangePickerProps) {
  const isWide = useMediaQuery("(min-width: 48rem)");

  if (!isWide) {
    return (
      <Select
        aria-label={label}
        value={value}
        onValueChange={(v) => v && onChange(v)}
        items={options.map((o) => ({ value: o.value, label: o.label }))}
        size="sm"
        className={className}
      />
    );
  }

  return (
    <ButtonGroup label={label} className={className}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <Button
            key={o.value}
            variant="ghost"
            size="sm"
            aria-pressed={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "border border-border",
              active ? "bg-surface-hover text-text" : "text-text-secondary",
            )}
          >
            {o.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
}
