import { type LucideIcon } from "lucide-react";
import type { Size } from "../../lib/types";
import { type PopoverAlign } from "../overlays/popover";
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
export declare function DataTableFilterButton({ label, options, value, onChange, multiple, icon, clearLabel, emptyLabel, size, disabled, align, className, }: DataTableFilterButtonProps): import("react").JSX.Element;
