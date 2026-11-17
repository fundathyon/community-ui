import { type EmailTheme } from "../theme";
/**
 * Props shared by every email template. All copy has English defaults and is
 * overridable — products ship Spanish (or any locale) through these props;
 * defaults never bake in a language other than English (CONVENTIONS §Language).
 */
export interface EmailTemplateBaseProps {
    /** Product theme. Spread an `emailThemes` preset and add `productName`. */
    theme: EmailTheme;
    /** Recipient display name; renders the "Hi {name}," line when present. */
    recipientName?: string;
    /** Replaces the computed greeting line entirely (e.g. "Hola Rafa,"). */
    greeting?: string;
    /** Overrides the hidden inbox preview text. */
    preheader?: string;
}
/** Greeting line — renders nothing without a name or explicit greeting. */
export declare function Greeting({ recipientName, greeting, }: Pick<EmailTemplateBaseProps, "recipientName" | "greeting">): import("react").JSX.Element | null;
export interface FallbackUrlProps {
    /** The same URL as the CTA button. */
    url: string;
    /** Lead-in line above the raw URL. */
    label?: string;
}
/**
 * Plain-text URL under a CTA button, for clients that strip links from
 * styled elements. Mono (literal, copyable — §03) and break-all so long
 * signed URLs never overflow the 600px card.
 */
export declare function FallbackUrl({ url, label }: FallbackUrlProps): import("react").JSX.Element;
