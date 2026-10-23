import { type EmailTemplateBaseProps } from "./shared";
export interface OtpEmailProps extends EmailTemplateBaseProps {
    /** The code, pre-grouped for reading aloud ("482 193"). */
    code: string;
    /** Minutes until the code expires; feeds the default expiry line. */
    expiresMinutes?: number;
    /** Where the code was requested from — §27 makes origin details mandatory for auth emails. */
    requestContext?: {
        device?: string;
        ip?: string;
    };
    heading?: string;
    body?: string;
    /** Full expiry line; overrides the `expiresMinutes` default. */
    expiresText?: string;
    /** The "if you didn't request this" note. Always rendered. */
    securityNote?: string;
    /** Row labels for `requestContext`. */
    labels?: {
        device?: string;
        ip?: string;
    };
}
/**
 * OTP email: the code is the single large element of the message. Includes
 * the mandatory security note and, when given, the requesting device/IP.
 */
export declare function OtpEmail({ theme, recipientName, greeting, preheader, code, expiresMinutes, requestContext, heading, body, expiresText, securityNote, labels, }: OtpEmailProps): import("react").JSX.Element;
