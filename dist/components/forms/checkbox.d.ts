import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { type ComponentProps, type ReactNode } from "react";
export interface CheckboxProps extends Omit<ComponentProps<typeof BaseCheckbox.Root>, "className" | "render"> {
    /** Visible label — the WHOLE label row is clickable (§10). */
    label: ReactNode;
    /** Secondary line under the label. */
    description?: ReactNode;
    className?: string;
}
/**
 * Checkbox — an option that is SAVED with the form (§10). If toggling it must
 * apply immediately with no Save button, it is a Switch instead. 16px box,
 * accent-solid fill with a white check when ticked; `indeterminate` covers the
 * mixed "parent of a partial group" state.
 *
 * The entire label + description row toggles it — never just the box (§10).
 */
export declare const Checkbox: import("react").ForwardRefExoticComponent<Omit<CheckboxProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
