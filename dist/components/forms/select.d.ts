import { Select as BaseSelect } from "@base-ui/react/select";
import { type ComponentProps, type ReactNode } from "react";
import type { Size } from "../../lib/types";
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
export declare const Select: import("react").ForwardRefExoticComponent<SelectProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface SelectItemProps extends Omit<ComponentProps<typeof BaseSelect.Item>, "children"> {
    /** Leading icon slot. */
    icon?: ReactNode;
    /** Secondary line under the label. */
    description?: ReactNode;
    /** The item label. */
    children: ReactNode;
}
/** One option of a Select. Hover uses `surface-hover`; the selected option shows a check. */
export declare function SelectItem({ icon, description, className, children, ...props }: SelectItemProps): import("react").JSX.Element;
