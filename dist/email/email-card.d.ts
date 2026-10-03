/**
 * Bordered section box inside an email body — groups secondary content
 * (getting-started links, next steps) apart from the main copy.
 */
import type { ReactNode } from "react";
export interface EmailCardProps {
    /** Small 600-weight title above the content. */
    title?: string;
    children?: ReactNode;
}
/**
 * Secondary content container. Use for supporting material, never for the
 * email's main message — the layout card already frames that. One level of
 * nesting only: cards never contain cards.
 */
export declare function EmailCard({ title, children }: EmailCardProps): import("react").JSX.Element;
