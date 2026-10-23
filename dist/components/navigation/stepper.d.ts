import type { HTMLAttributes } from "react";
export interface StepperStep {
    label: string;
    description?: string;
}
export interface StepperProps extends Omit<HTMLAttributes<HTMLOListElement>, "onClick"> {
    /** 3–5 linear steps (§12). More, or non-linear → this is not a Stepper. */
    steps: StepperStep[];
    /** Index (0-based) of the active step. */
    active: number;
    /** Completed steps are clickable BACK only; future steps never are (§12). */
    onStepClick?: (index: number) => void;
}
/**
 * Stepper — 3 to 5 linear steps with state saved between them: onboarding,
 * registry connection (§12). Completed steps (accent circle + check) can be
 * revisited; future steps cannot be jumped to. The active step announces
 * itself with `aria-current="step"`.
 */
export declare function Stepper({ steps, active, onStepClick, className, ...props }: StepperProps): import("react").JSX.Element;
