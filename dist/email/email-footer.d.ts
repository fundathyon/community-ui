/**
 * Legal footer below the card — link row, address line, unsubscribe slot.
 * All muted 12/18, centered. Marketing-free by design (§17 voice).
 */
import { type ReactNode } from "react";
import { type EmailLink } from "./theme";
export interface EmailFooterProps {
    /** Overrides `theme.footerLinks`. */
    links?: EmailLink[];
    /** Overrides `theme.address`. */
    address?: string;
    /** Unsubscribe / notification-settings line. Transactional auth emails omit it. */
    unsubscribe?: ReactNode;
    /** Extra footer content below everything else. */
    children?: ReactNode;
}
/**
 * Default `footer` slot of `EmailLayout`. Reads links and address from the
 * theme; pass props to override per email. Renders nothing it doesn't have —
 * an empty theme yields an empty footer, never placeholder text.
 */
export declare function EmailFooter({ links, address, unsubscribe, children, }: EmailFooterProps): import("react").JSX.Element;
