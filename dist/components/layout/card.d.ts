import type { HTMLAttributes, ReactNode } from "react";
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Fully clickable card: surface hover + focus ring when its inner link is
     * focused. The card's TITLE is the real link — the card itself never gets
     * an onClick (§15).
     */
    interactive?: boolean;
}
/**
 * Card — bordered surface for grouped content (§15). Cards do NOT float: in
 * this suite elevation means "floats over the page", so a card has a border
 * and NO shadow. Header and footer are optional; the body is not.
 *
 * Server-component safe.
 */
export declare function Card({ interactive, className, ...props }: CardProps): import("react").JSX.Element;
export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    /** Row actions on the right (ghost buttons, a menu). */
    actions?: ReactNode;
}
/** Card header — title (text-h5, §03) plus optional right-aligned actions. */
export declare function CardHeader({ actions, className, children, ...props }: CardHeaderProps): import("react").JSX.Element;
/** Card body — 16px padding (§04). The only mandatory region of a card. */
export declare function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
/** Card footer — separated by a border, actions aligned right. */
export declare function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
