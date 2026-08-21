/**
 * Root document of every email — html/head/body, canvas background, the
 * 600px centered card and the legal footer. Table layout, inline styles,
 * always light (§27: client dark modes invert colors unpredictably).
 */
import type { ReactNode } from "react";
import { type EmailTheme } from "./theme";
export interface EmailLayoutProps {
    /** Product theme, provided to every primitive via context. */
    theme: EmailTheme;
    /** Hidden preview text shown by inbox list views. Keep under ~90 chars. */
    preheader?: string;
    /** `<title>` of the document. Defaults to `theme.productName`. */
    title?: string;
    /** BCP 47 language of the copy. Defaults to `"en"`; set when shipping Spanish copy. */
    lang?: string;
    /** Brand row inside the card. Defaults to `<EmailHeader />`; pass `null` to remove. */
    header?: ReactNode;
    /** Below-card slot. Defaults to `<EmailFooter />` (theme links + address); pass `null` to remove. */
    footer?: ReactNode;
    children?: ReactNode;
}
/**
 * Wrap every email in exactly one `EmailLayout`. It renders the full HTML
 * document: hidden preheader, `bg` canvas, a single 600px card on `surface`
 * with the brand header, your content, and the footer below the card.
 * Render the result with `renderEmail` — never mount it in a browser.
 */
export declare function EmailLayout({ theme, preheader, title, lang, header, footer, children, }: EmailLayoutProps): import("react").JSX.Element;
