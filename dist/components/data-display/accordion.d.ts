import type { ReactNode } from "react";
export interface AccordionItemData {
    /** Stable value; auto-generated when omitted. Needed to match `defaultValue`. */
    value?: string;
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
}
export interface AccordionProps {
    /** Data-driven items. Alternatively pass AccordionItem children. */
    items?: AccordionItemData[];
    /** Allow several panels open at once — ONLY when the panels are comparable (§14). */
    multiple?: boolean;
    /** Which item(s) start open. By default one panel is open (§14). */
    defaultValue?: string | string[];
    /** Controlled open value(s). */
    value?: string[];
    onValueChange?: (value: string[]) => void;
    className?: string;
    children?: ReactNode;
}
/**
 * Accordion — for secondary content most people do not need (§14). It NEVER hides
 * something required to complete a form: if the user must act on it, it stays
 * visible. By default one panel is open; allow `multiple` only when the panels
 * are comparable to one another. Built on Base UI Accordion.
 */
export declare function Accordion({ items, multiple, defaultValue, value, onValueChange, className, children, }: AccordionProps): import("react").JSX.Element;
export interface AccordionItemProps {
    value?: string;
    title: ReactNode;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}
/** AccordionItem — a titled disclosure: a trigger with a rotating chevron and an
 * animated panel. Compose these inside `<Accordion>` when not using `items`. */
export declare function AccordionItem({ value, title, disabled, className, children }: AccordionItemProps): import("react").JSX.Element;
