import { Progress as BaseProgress } from "@base-ui/react/progress";
import type { ComponentProps, ReactNode } from "react";
import type { Tone } from "../../lib/types";
export type ProgressVariant = "bar" | "circular";
export type ProgressCircularSize = 16 | 20;
export interface ProgressProps extends Omit<ComponentProps<typeof BaseProgress.Root>, "children"> {
    /** Current value; `null` renders the indeterminate bar. (From Base UI Root.) */
    value: number | null;
    /** Visible label ("Subiendo capas 3 de 7"). */
    label?: ReactNode;
    /** Overrides the visible value text. Defaults to the formatted value ("68%"). */
    valueText?: string;
    /** Fill semantics — quota bars turn `warning`/`danger` at thresholds the APP
     * decides (§11). Default fill is the accent (the user's own action). */
    tone?: Tone;
    /** `circular` only when the progress accompanies a small element — a row, an
     * avatar (§11). Everything else is a bar. */
    variant?: ProgressVariant;
    /** Circular diameter in px (§11). */
    size?: ProgressCircularSize;
}
/**
 * Progress (§11) — HARD RULE: every determinate bar carries its value as
 * visible text; the bar alone is not accessible. Indeterminate (`value={null}`)
 * only when the total is unknown — and >2s waits must say WHAT is happening
 * via `label` (§17). `aria-valuenow`/`aria-valuetext` come from Base UI.
 */
export declare function Progress({ value, max, min, label, valueText, tone, variant, size, format, className, ...props }: ProgressProps): import("react").JSX.Element;
