/**
 * Email hard constraints, swept across every template: full document with
 * doctype, table-based layout, inline styles only — no classes, no CSS
 * variables — and the light email palette.
 */
import type { ReactElement } from "react";
import { describe, expect, it } from "vitest";
import {
  EmailVerificationEmail,
  InvitationEmail,
  MagicLinkEmail,
  NewLoginEmail,
  OtpEmail,
  PasswordChangedEmail,
  PasswordResetEmail,
  ResourceExpirationEmail,
  SecurityAlertEmail,
  TokenExpirationEmail,
  WelcomeEmail,
  emailThemes,
  renderEmail,
  type EmailTheme,
} from "../../src/email";

const theme: EmailTheme = {
  ...emailThemes.accounts,
  productName: "Accounts",
  footerLinks: [
    { label: "Privacy", href: "https://foundathyon.com/privacy" },
    { label: "Security", href: "https://foundathyon.com/security" },
  ],
  address: "Foundathyon Community",
};

const templates: Array<[string, ReactElement]> = [
  ["OtpEmail", <OtpEmail theme={theme} code="482 193" expiresMinutes={10} />],
  [
    "EmailVerificationEmail",
    <EmailVerificationEmail theme={theme} verifyUrl="https://accounts.test/verify/abc" />,
  ],
  [
    "PasswordResetEmail",
    <PasswordResetEmail theme={theme} resetUrl="https://accounts.test/reset/abc" />,
  ],
  [
    "MagicLinkEmail",
    <MagicLinkEmail theme={theme} loginUrl="https://accounts.test/magic/abc" />,
  ],
  [
    "InvitationEmail",
    <InvitationEmail
      theme={theme}
      inviterName="Ada"
      organizationName="acme"
      acceptUrl="https://accounts.test/invite/abc"
    />,
  ],
  ["WelcomeEmail", <WelcomeEmail theme={theme} ctaUrl="https://accounts.test/app" />],
  [
    "SecurityAlertEmail",
    <SecurityAlertEmail
      theme={theme}
      eventTitle="API key revoked"
      details={[{ label: "IP", value: "203.0.113.44" }]}
      actionUrl="https://accounts.test/security"
    />,
  ],
  [
    "NewLoginEmail",
    <NewLoginEmail
      theme={theme}
      device="Linux"
      ip="203.0.113.44"
      time="21 Aug 2026, 09:14 UTC"
      reviewUrl="https://accounts.test/sessions"
    />,
  ],
  [
    "PasswordChangedEmail",
    <PasswordChangedEmail theme={theme} time="21 Aug 2026, 09:14 UTC" />,
  ],
  [
    "TokenExpirationEmail",
    <TokenExpirationEmail
      theme={theme}
      tokenName="deploy-bot"
      expiresAt="28 Aug 2026"
      renewUrl="https://accounts.test/tokens"
    />,
  ],
  [
    "ResourceExpirationEmail",
    <ResourceExpirationEmail
      theme={theme}
      resourceName="prod-registry"
      expiresAt="28 Aug 2026"
      renewUrl="https://accounts.test/resources"
    />,
  ],
];

describe.each(templates)("%s constraints", (_name, element) => {
  const html = renderEmail(element);

  it("renders a full document with doctype", () => {
    expect(html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(html).toContain("<html lang=\"en\"");
    expect(html).toContain('name="color-scheme" content="light"');
  });

  it("uses table layout with presentation semantics", () => {
    expect(html).toContain('<table role="presentation"');
  });

  it("never emits classes or CSS variables", () => {
    expect(html).not.toContain("class=");
    expect(html).not.toContain("var(--");
    expect(html).not.toContain("oklch(");
  });

  it("carries the product name and the 600px container", () => {
    expect(html).toContain("Accounts");
    expect(html).toContain('width="600"');
    expect(html).toContain("max-width:600px");
  });

  it("renders the theme footer", () => {
    expect(html).toContain("https://foundathyon.com/privacy");
    expect(html).toContain("Foundathyon Community");
  });
});

describe("renderEmail", () => {
  it("emits static markup without React runtime artifacts", () => {
    const html = renderEmail(
      <OtpEmail theme={theme} code="482 193" expiresMinutes={10} />,
    );
    expect(html).not.toContain("data-reactroot");
    expect(html).not.toContain("<!-- -->");
  });

  it("puts the accent of every product preset on the primary button", () => {
    for (const preset of Object.values(emailThemes)) {
      const html = renderEmail(
        <EmailVerificationEmail
          theme={{ ...preset, productName: "X" }}
          verifyUrl="https://x.test/verify"
        />,
      );
      expect(html).toContain(`background-color:${preset.accent}`);
    }
  });
});
