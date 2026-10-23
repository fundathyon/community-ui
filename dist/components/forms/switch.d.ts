import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { type ComponentProps, type ReactNode } from "react";
export interface SwitchProps extends Omit<ComponentProps<typeof BaseSwitch.Root>, "className" | "render"> {
    /** Visible label — the WHOLE row is clickable (§10). */
    label: ReactNode;
    /** Secondary line under the label. */
    description?: ReactNode;
    className?: string;
}
/**
 * Switch — applies its effect IMMEDIATELY, no Save button involved (§10). If
 * the change must be saved with the form, it is a Checkbox. The whole
 * label + description row toggles it; checked uses the accent because it is
 * an action, not a state tone (§02).
 *
 * On failure of the immediate operation, revert the switch visually and
 * explain the error in place — never leave it lying (§16).
 */
export declare const Switch: import("react").ForwardRefExoticComponent<Omit<SwitchProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
