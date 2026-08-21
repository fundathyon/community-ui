import { NumberField } from "@base-ui/react/number-field";
import { type ComponentProps } from "react";
import type { Size } from "../../lib/types";
export interface NumberInputProps extends Omit<ComponentProps<typeof NumberField.Root>, "className" | "render"> {
    /** xs 24 · sm 28 · md 32 · lg 36. Defaults to the density's size. */
    size?: Size;
    /** Marks invalid when used standalone. Inside a FormField the field state drives this. */
    invalid?: boolean;
    /** aria-label of the decrement stepper. Pass your product copy. */
    decrementLabel?: string;
    /** aria-label of the increment stepper. Pass your product copy. */
    incrementLabel?: string;
    placeholder?: string;
    className?: string;
}
/**
 * NumberInput — numeric entry with steppers (§10). Keyboard arrows step,
 * Shift+arrow uses the large step, Home/End jump to min/max (Base UI native);
 * `min`/`max` clamp on stepping and blur. The value renders in `tabular-nums`
 * so columns of numbers stay aligned (§03).
 *
 * Always inside a FormField. For a bounded range better explored by drag, use
 * Slider — which still shows this editable number next to it (§10).
 */
export declare const NumberInput: import("react").ForwardRefExoticComponent<Omit<NumberInputProps, "ref"> & import("react").RefAttributes<HTMLInputElement>>;
