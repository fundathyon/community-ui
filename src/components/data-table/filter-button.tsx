"use client";

import { Filter, type LucideIcon } from "lucide-react";
import type { Size } from "../../lib/types";
import { Button } from "../actions/button";
import { Badge } from "../feedback/badge";
import { Checkbox } from "../forms/checkbox";
import { Popover, PopoverContent, PopoverTrigger, type PopoverAlign } from "../overlays/popover";
import { Icon } from "../typography/icon";
import type { DataTableFilterOption } from "./types";

export interface DataTableFilterButtonProps {
  /** Facet name — "Estado", "Rol". Also names the option group for AT. */
  label: string;
  options: DataTableFilterOption[];
  /** Selected option values. */
  value: string[];
  onChange: (next: string[]) => void;
  /** Allow several options at once. @default true */
  multiple?: boolean;
  /** Trigger icon. @default Filter */
  icon?: LucideIcon;
  /** Copy of the clear control. @default "Clear" */
  clearLabel?: string;
  /** Copy shown when there are no options. @default "No options" */
  emptyLabel?: string;
  size?: Size;
  disabled?: boolean;
  align?: PopoverAlign;
  className?: string;
}

/**
 * DataTableFilterButton — a faceted filter for a DataTable's toolbar (§14, §16):
 * a secondary button with the facet name and, once something is applied, a
 * counter badge — so an applied filter is never hidden behind a closed panel.
 * The popover lists the options as checkboxes (a Popover, not a menu: it admits
 * controls and focus, §13) with a clear control at the bottom.
 *
 * The app owns the value — persist it in the URL (§16 "la URL es el estado")
 * and pre-filter the rows it hands to the table.
 */
export function DataTableFilterButton({
  label,
  options,
  value,
  onChange,
  multiple = true,
  icon = Filter,
  clearLabel = "Clear",
  emptyLabel = "No options",
  size,
  disabled,
  align = "start",
  className,
}: DataTableFilterButtonProps) {
  const selected = new Set(value);

  const toggle = (optionValue: string, checked: boolean) => {
    if (!multiple) {
      onChange(checked ? [optionValue] : []);
      return;
    }
    const next = new Set(selected);
    if (checked) next.add(optionValue);
    else next.delete(optionValue);
    // Emit in option order so the value is stable (and URL-friendly).
    onChange(options.map((option) => option.value).filter((candidate) => next.has(candidate)));
  };

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="secondary"
            size={size}
            disabled={disabled}
            data-active={value.length > 0 || undefined}
            leading={<Icon icon={icon} size={14} />}
            trailing={
              value.length > 0 ? <Badge variant="counter">{value.length}</Badge> : undefined
            }
            className={className}
          >
            {label}
          </Button>
        }
      />
      <PopoverContent align={align} className="w-56 p-1">
        <div role="group" aria-label={label} className="flex max-h-72 flex-col overflow-y-auto">
          {options.length === 0 && (
            <span className="px-2 py-1.5 text-body-sm text-text-muted">{emptyLabel}</span>
          )}
          {options.map((option) => (
            <Checkbox
              key={option.value}
              checked={selected.has(option.value)}
              onCheckedChange={(checked) => toggle(option.value, checked === true)}
              className="w-full items-center rounded-md px-2 py-1.5 hover:bg-surface-hover"
              label={
                <span className="flex items-center gap-2">
                  {option.icon && <Icon icon={option.icon} size={14} className="text-text-muted" />}
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="tabular-nums text-caption text-text-muted">{option.count}</span>
                  )}
                </span>
              }
            />
          ))}
        </div>
        {value.length > 0 && (
          <>
            <div role="separator" className="my-1 h-px bg-border" />
            <Button variant="ghost" size="sm" className="w-full" onClick={() => onChange([])}>
              {clearLabel}
            </Button>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}
