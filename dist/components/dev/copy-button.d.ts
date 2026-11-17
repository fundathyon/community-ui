import { type ButtonHTMLAttributes } from "react";
export type CopyButtonSize = 12 | 14 | 16;
export interface CopyButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "onCopy" | "children"> {
    /** What gets copied — always the FULL value, never a truncated display form (§20). */
    value: string | (() => string);
    /** Accessible name + tooltip. Overridable product copy. */
    label?: string;
    /** Tooltip + polite announcement after copying. */
    copiedLabel?: string;
    /** Icon size; the hit target keeps 44px on coarse pointers via fdn-touch-target. */
    size?: CopyButtonSize;
    onCopied?: (value: string) => void;
}
/**
 * CopyButton — the standalone copy affordance of the Developer UI (§20). A
 * ghost square button with a Copy→Check swap, tooltip and a polite live
 * announcement. Always visible, never hover-only (touch has no hover).
 *
 * Every truncated or masked value in the suite copies through this: the copy
 * is ALWAYS the full value — never the ellipsis, never the mask.
 */
export declare const CopyButton: import("react").ForwardRefExoticComponent<CopyButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
