"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check } from "lucide-react";
import { cn } from "../../lib/cn";
import { Icon } from "../typography/icon";
/**
 * Stepper — 3 to 5 linear steps with state saved between them: onboarding,
 * registry connection (§12). Completed steps (accent circle + check) can be
 * revisited; future steps cannot be jumped to. The active step announces
 * itself with `aria-current="step"`.
 */
export function Stepper({ steps, active, onStepClick, className, ...props }) {
    return (_jsx("ol", { className: cn("flex items-center gap-2", className), ...props, children: steps.map((step, index) => {
            const completed = index < active;
            const isActive = index === active;
            const clickable = completed && onStepClick !== undefined;
            const circle = (_jsx("span", { "aria-hidden": true, className: cn("grid size-6 shrink-0 place-items-center rounded-full text-caption font-medium", "transition-colors duration-[var(--fdn-dur-fast)] ease-[var(--fdn-ease-standard)]", completed && "bg-accent-solid text-accent-on-solid", isActive && "border border-accent-border bg-accent-bg text-accent", !completed && !isActive && "border border-border-strong text-text-muted"), children: completed ? _jsx(Icon, { icon: Check, size: 12 }) : index + 1 }));
            const text = (_jsxs("span", { className: "flex min-w-0 flex-col text-left", children: [_jsx("span", { className: cn("text-body", isActive ? "font-medium text-text" : completed ? "text-text" : "text-text-muted"), children: step.label }), step.description && _jsx("span", { className: "text-caption text-text-muted", children: step.description })] }));
            return (_jsxs("li", { "aria-current": isActive ? "step" : undefined, className: cn("flex items-center gap-2", index < steps.length - 1 && "flex-1"), children: [clickable ? (_jsxs("button", { type: "button", onClick: () => onStepClick(index), className: cn("flex items-center gap-2 rounded-md px-1 py-0.5 text-left", "transition-colors duration-[var(--fdn-dur-fast)] hover:bg-surface-hover", "fdn-touch-target"), children: [circle, text] })) : (_jsxs("span", { className: "flex items-center gap-2 px-1 py-0.5", children: [circle, text] })), index < steps.length - 1 && (_jsx("span", { "aria-hidden": true, className: cn("h-px min-w-4 flex-1", completed ? "bg-accent-solid" : "bg-border") }))] }, step.label));
        }) }));
}
