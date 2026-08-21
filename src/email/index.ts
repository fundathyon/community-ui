/**
 * `@foundathyon/community-ui/email` — transactional email layer (§27).
 *
 * SERVER-ONLY entry: `renderEmail` statically imports `react-dom/server`.
 * Plain React, table layout, inline styles, compiled hex tokens — no hooks
 * beyond context, no DOM APIs, no Tailwind, no CSS variables. Always light.
 *
 * Explicit exports only. `palette.ts` and the template helper blocks are
 * internal and stay out of this barrel.
 */

// Theme
export { emailThemes, EmailThemeContext } from "./theme";
export type {
  EmailLink,
  EmailProduct,
  EmailTheme,
  EmailThemePreset,
} from "./theme";

// Primitives
export { EmailLayout } from "./email-layout";
export type { EmailLayoutProps } from "./email-layout";
export { EmailHeader } from "./email-header";
export type { EmailHeaderProps } from "./email-header";
export { EmailFooter } from "./email-footer";
export type { EmailFooterProps } from "./email-footer";
export { EmailButton } from "./email-button";
export type { EmailButtonProps } from "./email-button";
export { EmailCode } from "./email-code";
export type { EmailCodeProps } from "./email-code";
export { EmailAlert } from "./email-alert";
export type { EmailAlertProps, EmailTone } from "./email-alert";
export { EmailCard } from "./email-card";
export type { EmailCardProps } from "./email-card";
export { EmailDivider } from "./email-divider";
export type { EmailDividerProps } from "./email-divider";
export { EmailHeading, EmailMuted, EmailText } from "./email-typography";
export type {
  EmailHeadingProps,
  EmailMutedProps,
  EmailTextProps,
} from "./email-typography";
export { EmailKeyValue } from "./email-key-value";
export type { EmailKeyValueItem, EmailKeyValueProps } from "./email-key-value";

// Templates
export type { EmailTemplateBaseProps } from "./templates/shared";
export { OtpEmail } from "./templates/otp-email";
export type { OtpEmailProps } from "./templates/otp-email";
export { EmailVerificationEmail } from "./templates/email-verification-email";
export type { EmailVerificationEmailProps } from "./templates/email-verification-email";
export { PasswordResetEmail } from "./templates/password-reset-email";
export type { PasswordResetEmailProps } from "./templates/password-reset-email";
export { MagicLinkEmail } from "./templates/magic-link-email";
export type { MagicLinkEmailProps } from "./templates/magic-link-email";
export { InvitationEmail } from "./templates/invitation-email";
export type { InvitationEmailProps } from "./templates/invitation-email";
export { WelcomeEmail } from "./templates/welcome-email";
export type { WelcomeEmailProps } from "./templates/welcome-email";
export { SecurityAlertEmail } from "./templates/security-alert-email";
export type { SecurityAlertEmailProps } from "./templates/security-alert-email";
export { NewLoginEmail } from "./templates/new-login-email";
export type { NewLoginEmailProps } from "./templates/new-login-email";
export { PasswordChangedEmail } from "./templates/password-changed-email";
export type { PasswordChangedEmailProps } from "./templates/password-changed-email";
export { TokenExpirationEmail } from "./templates/token-expiration-email";
export type { TokenExpirationEmailProps } from "./templates/token-expiration-email";
export { ResourceExpirationEmail } from "./templates/resource-expiration-email";
export type { ResourceExpirationEmailProps } from "./templates/resource-expiration-email";
export { AccountLockedEmail } from "./templates/account-locked-email";
export type { AccountLockedEmailProps } from "./templates/account-locked-email";
export { NewDeviceEmail } from "./templates/new-device-email";
export type { NewDeviceEmailProps } from "./templates/new-device-email";
export { GenericInvitationEmail } from "./templates/generic-invitation-email";
export type { GenericInvitationEmailProps } from "./templates/generic-invitation-email";
export { ApiKeyCreatedEmail } from "./templates/api-key-created-email";
export type { ApiKeyCreatedEmailProps } from "./templates/api-key-created-email";
export { ApiKeyRevokedEmail } from "./templates/api-key-revoked-email";
export type { ApiKeyRevokedEmailProps } from "./templates/api-key-revoked-email";
export { ResourceSharedEmail } from "./templates/resource-shared-email";
export type { ResourceSharedEmailProps } from "./templates/resource-shared-email";
export { JobFailedEmail } from "./templates/job-failed-email";
export type { JobFailedEmailProps } from "./templates/job-failed-email";
export { JobCompletedEmail } from "./templates/job-completed-email";
export type { JobCompletedEmailProps } from "./templates/job-completed-email";

// Rendering
export { renderEmail } from "./render";
