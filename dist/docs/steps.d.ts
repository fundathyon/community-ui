import { type HTMLAttributes, type ReactNode } from "react";
export interface StepProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
    /** Step heading — a short imperative ("Create a project"). */
    title?: ReactNode;
    /** 1-based number, injected by `Steps`. Set it manually only outside `Steps`. */
    index?: number;
    /** Last step in the list — hides the connecting line. Injected by `Steps`. */
    last?: boolean;
}
/**
 * Step — one item of a numbered procedure (§26). A counter circle, an optional
 * title and the body. Numbering and the connecting line are managed by the
 * parent `Steps`; render `Step`s as its direct children. Server-component safe.
 */
export declare function Step({ title, index, last, className, children, ...props }: StepProps): import("react").JSX.Element;
export interface StepsProps extends HTMLAttributes<HTMLOListElement> {
}
/**
 * Steps — an ordered procedure (§26): a numbered `ol` of `Step`s with counter
 * circles and a connecting line. Numbering is automatic, so author the steps in
 * order and never hard-code the numbers. For non-sequential alternatives use
 * `DocsTabs`; for optional detail use `Expandable`. Server-component safe.
 */
export declare function Steps({ className, children, ...props }: StepsProps): import("react").JSX.Element;
