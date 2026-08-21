"use client";

import { Check } from "lucide-react";
import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";

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
export function Stepper({ steps, active, onStepClick, className, ...props }: StepperProps) {
  return (
    <ol className={cn("flex items-center gap-2", className)} {...props}>
      {steps.map((step, index) => {
        const completed = index < active;
        const isActive = index === active;
        const clickable = completed && onStepClick !== undefined;

        const circle = (
          <span
            aria-hidden
            className={cn(
              "grid size-6 shrink-0 place-items-center rounded-full text-caption font-medium",
              "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]",
              completed && "bg-accent-solid text-accent-on-solid",
              isActive && "border border-accent-border bg-accent-bg text-accent",
              !completed && !isActive && "border border-border-strong text-text-muted",
            )}
          >
            {completed ? <Icon icon={Check} size={12} /> : index + 1}
          </span>
        );

        const text = (
          <span className="flex min-w-0 flex-col text-left">
            <span className={cn("text-body", isActive ? "font-medium text-text" : completed ? "text-text" : "text-text-muted")}>
              {step.label}
            </span>
            {step.description && <span className="text-caption text-text-muted">{step.description}</span>}
          </span>
        );

        return (
          <li
            key={step.label}
            aria-current={isActive ? "step" : undefined}
            className={cn("flex items-center gap-2", index < steps.length - 1 && "flex-1")}
          >
            {clickable ? (
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={cn(
                  "flex items-center gap-2 rounded-md px-1 py-0.5 text-left",
                  "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover",
                  "fdn-touch-target",
                )}
              >
                {circle}
                {text}
              </button>
            ) : (
              <span className="flex items-center gap-2 px-1 py-0.5">
                {circle}
                {text}
              </span>
            )}
            {index < steps.length - 1 && (
              <span aria-hidden className={cn("h-px min-w-4 flex-1", completed ? "bg-accent-solid" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
