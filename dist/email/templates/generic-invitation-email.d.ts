import { type EmailKeyValueItem } from "../email-key-value";
import { type EmailTemplateBaseProps } from "./shared";
export interface GenericInvitationEmailProps extends EmailTemplateBaseProps {
    /** Display name of the person inviting. */
    inviterName: string;
    /** Shown next to the name so the recipient can verify who is asking. */
    inviterEmail?: string;
    /** What the recipient is invited to — a team, project or resource. Not necessarily an organization; see `InvitationEmail` for that case. */
    targetName: string;
    /** Single-line summary of the access granted, e.g. "developer". */
    role?: string;
    /** Itemized access grants, one row per product/resource — mirrors T04's product-by-product breakdown ("Vault · read and write configs"). */
    access?: EmailKeyValueItem[];
    /** Signed acceptance URL. */
    acceptUrl: string;
    /** Signed decline URL. When omitted, only the accept CTA renders. */
    declineUrl?: string;
    /** Days until the invitation expires; feeds the default expiry line. */
    expiresDays?: number;
    heading?: string;
    body?: string;
    /** Accept CTA label — verb + object (§17). */
    ctaLabel?: string;
    /** Decline CTA label. */
    declineLabel?: string;
    expiresText?: string;
    securityNote?: string;
    fallbackLabel?: string;
}
/**
 * "You are invited to {target}" — states exactly what access is granted,
 * item by item, before the recipient accepts (T04). The only one of the
 * three Organización invites with a decline action alongside accept.
 */
export declare function GenericInvitationEmail({ theme, recipientName, greeting, preheader, inviterName, inviterEmail, targetName, role, access, acceptUrl, declineUrl, expiresDays, heading, body, ctaLabel, declineLabel, expiresText, securityNote, fallbackLabel, }: GenericInvitationEmailProps): import("react").JSX.Element;
