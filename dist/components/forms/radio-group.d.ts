import { Radio as BaseRadio } from "@base-ui/react/radio";
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import { type ComponentProps, type ReactNode } from "react";
export interface RadioGroupProps extends Omit<ComponentProps<typeof BaseRadioGroup>, "className" | "render"> {
    className?: string;
}
/**
 * RadioGroup — 2 to 5 mutually exclusive options that benefit from being
 * compared at a glance (§10, §17). Above 5 use Select; searchable or growing
 * lists use Combobox. Arrow keys move the selection (native radio semantics).
 *
 * Compose with `Radio` children; always inside a FormField, which owns the
 * group label and messages.
 */
export declare const RadioGroup: import("react").ForwardRefExoticComponent<Omit<RadioGroupProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export interface RadioProps extends Omit<ComponentProps<typeof BaseRadio.Root>, "className" | "render"> {
    /** Visible label — the WHOLE label row is clickable (§10). */
    label: ReactNode;
    /** Secondary line under the label. */
    description?: ReactNode;
    className?: string;
}
/**
 * One option of a RadioGroup. The entire label + description row selects it;
 * the checked dot uses the accent (action), never a state tone (§02).
 */
export declare const Radio: import("react").ForwardRefExoticComponent<Omit<RadioProps, "ref"> & import("react").RefAttributes<HTMLElement>>;
