import { type EmailLink } from "../theme";
import { type EmailTemplateBaseProps } from "./shared";
export interface WelcomeEmailProps extends EmailTemplateBaseProps {
    /** Where the CTA lands — usually the product dashboard. */
    ctaUrl: string;
    /** CTA label — verb + object (§17). Defaults to "Open {productName}". */
    ctaLabel?: string;
    /** Optional link list rendered in a "Getting started" card. */
    gettingStarted?: EmailLink[];
    heading?: string;
    body?: string;
    /** Title of the `gettingStarted` card. */
    gettingStartedTitle?: string;
}
/**
 * Welcome email: account is ready, one CTA into the product, optional
 * getting-started links. The only template allowed a warm register — still
 * no exclamation marks (§17).
 */
export declare function WelcomeEmail({ theme, recipientName, greeting, preheader, ctaUrl, ctaLabel, gettingStarted, heading, body, gettingStartedTitle, }: WelcomeEmailProps): import("react").JSX.Element;
