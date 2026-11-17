import { type EmailTemplateBaseProps } from "./shared";
export interface InvitationEmailProps extends EmailTemplateBaseProps {
    /** Display name of the person inviting. */
    inviterName: string;
    /** Shown next to the name so the recipient can verify who is asking. */
    inviterEmail?: string;
    organizationName: string;
    /** Role granted on acceptance, e.g. "admin". */
    role?: string;
    /** Signed acceptance URL. */
    acceptUrl: string;
    /** Days until the invitation expires; feeds the default expiry line. */
    expiresDays?: number;
    heading?: string;
    body?: string;
    /** CTA label — verb + object (§17). */
    ctaLabel?: string;
    expiresText?: string;
    securityNote?: string;
    fallbackLabel?: string;
}
/**
 * "Join {organization}" invitation. The default body names inviter, email,
 * organization and role so the recipient can judge legitimacy before clicking.
 */
export declare function InvitationEmail({ theme, recipientName, greeting, preheader, inviterName, inviterEmail, organizationName, role, acceptUrl, expiresDays, heading, body, ctaLabel, expiresText, securityNote, fallbackLabel, }: InvitationEmailProps): import("react").JSX.Element;
