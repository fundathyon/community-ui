import type { ReactNode } from "react";
export interface ExpandableProps {
    /** Summary shown on the trigger row ("Ver más" / "Show advanced options"). */
    title: ReactNode;
    /** Open on first render. */
    defaultOpen?: boolean;
    /** Controlled open state. */
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
    className?: string;
}
/**
 * Expandable — a single collapsible disclosure for long, optional detail (§26):
 * the docs "accordion", but deliberately one item, not a set. Built on Base UI
 * Collapsible; the chevron rotates and the panel animates open.
 *
 * For a numbered procedure use `Steps`; for switching between equivalents use
 * `DocsTabs`. Use Expandable when the content is skippable by most readers.
 */
export declare function Expandable({ title, defaultOpen, open, onOpenChange, children, className }: ExpandableProps): import("react").JSX.Element;
