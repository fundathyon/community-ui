/**
 * One-time verification code email (§27 "Código de verificación").
 */
import { EmailCode } from "../email-code";
import { EmailKeyValue, type EmailKeyValueItem } from "../email-key-value";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailMuted, EmailText } from "../email-typography";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

export interface OtpEmailProps extends EmailTemplateBaseProps {
  /** The code, pre-grouped for reading aloud ("482 193"). */
  code: string;
  /** Minutes until the code expires; feeds the default expiry line. */
  expiresMinutes?: number;
  /** Where the code was requested from — §27 makes origin details mandatory for auth emails. */
  requestContext?: { device?: string; ip?: string };
  heading?: string;
  body?: string;
  /** Full expiry line; overrides the `expiresMinutes` default. */
  expiresText?: string;
  /** The "if you didn't request this" note. Always rendered. */
  securityNote?: string;
  /** Row labels for `requestContext`. */
  labels?: { device?: string; ip?: string };
}

/**
 * OTP email: the code is the single large element of the message. Includes
 * the mandatory security note and, when given, the requesting device/IP.
 */
export function OtpEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  code,
  expiresMinutes,
  requestContext,
  heading = "Your verification code",
  body = "Enter this code to continue.",
  expiresText,
  securityNote,
  labels,
}: OtpEmailProps) {
  const expires =
    expiresText ??
    (expiresMinutes !== undefined
      ? `Expires in ${expiresMinutes} minutes.`
      : undefined);
  const note =
    securityNote ??
    `If you did not request this code, ignore this message. No one from ${theme.productName} will ever ask you for it.`;
  const items: EmailKeyValueItem[] = [];
  if (requestContext?.device) {
    items.push({ label: labels?.device ?? "Device", value: requestContext.device });
  }
  if (requestContext?.ip) {
    items.push({ label: labels?.ip ?? "IP", value: requestContext.ip });
  }
  return (
    <EmailLayout
      theme={theme}
      title={heading}
      preheader={preheader ?? `${code} is your ${theme.productName} verification code`}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{heading}</EmailHeading>
      <EmailText>{body}</EmailText>
      <EmailCode code={code} expiresText={expires} />
      {items.length > 0 ? <EmailKeyValue items={items} /> : null}
      <EmailMuted>{note}</EmailMuted>
    </EmailLayout>
  );
}
