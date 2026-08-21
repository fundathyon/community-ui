/**
 * Template content: key data lands in the HTML, defaults follow the §17
 * voice, and every visible string is overridable (products ship Spanish).
 */
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

const theme: EmailTheme = { ...emailThemes.accounts, productName: "Accounts" };

describe("OtpEmail", () => {
  it("renders code, expiry, request context and security note", () => {
    const html = renderEmail(
      <OtpEmail
        theme={theme}
        recipientName="Rafa"
        code="482 193"
        expiresMinutes={10}
        requestContext={{ device: "Firefox · Linux", ip: "85.61.204.12" }}
      />,
    );
    expect(html).toContain("Hi Rafa,");
    expect(html).toContain("482 193");
    expect(html).toContain("Expires in 10 minutes.");
    expect(html).toContain("Firefox · Linux");
    expect(html).toContain("85.61.204.12");
    expect(html).toContain("Your verification code");
    expect(html).toContain("If you did not request this code");
  });

  it("accepts full Spanish copy through props", () => {
    const html = renderEmail(
      <OtpEmail
        theme={theme}
        code="482 193"
        greeting="Hola Rafa,"
        heading="Verifica tu email"
        body="Introduce este código para terminar de crear tu cuenta."
        expiresText="Caduca en 10 minutos"
        securityNote="Si no has solicitado este código, ignora el mensaje."
        preheader="Tu código de verificación"
      />,
    );
    expect(html).toContain("Verifica tu email");
    expect(html).toContain("Caduca en 10 minutos");
    expect(html).toContain("Hola Rafa,");
    expect(html).not.toContain("Your verification code");
    expect(html).not.toContain("Expires in");
    expect(html).not.toContain("If you did not request");
  });
});

describe("link templates", () => {
  it("EmailVerificationEmail: CTA href plus plain-URL fallback", () => {
    const url = "https://accounts.test/verify/tok123";
    const html = renderEmail(
      <EmailVerificationEmail theme={theme} verifyUrl={url} expiresHours={24} />,
    );
    // once on the button, once as fallback text
    expect(html.split(url).length - 1).toBeGreaterThanOrEqual(3); // 2 hrefs + visible text
    expect(html).toContain("Verify email");
    expect(html).toContain("This link expires in 24 hours.");
    expect(html).toContain("copy and paste this URL");
  });

  it("PasswordResetEmail: reset CTA and unchanged-password note", () => {
    const html = renderEmail(
      <PasswordResetEmail
        theme={theme}
        resetUrl="https://accounts.test/reset/tok"
        expiresMinutes={30}
      />,
    );
    expect(html).toContain('href="https://accounts.test/reset/tok"');
    expect(html).toContain("Reset password");
    expect(html).toContain("This link expires in 30 minutes.");
    expect(html).toContain("Your password remains unchanged.");
  });

  it("MagicLinkEmail: product-named heading and sign-in CTA", () => {
    const html = renderEmail(
      <MagicLinkEmail theme={theme} loginUrl="https://accounts.test/magic/tok" />,
    );
    expect(html).toContain("Sign in to Accounts");
    expect(html).toContain('href="https://accounts.test/magic/tok"');
    expect(html).toContain("The link works once.");
  });

  it("InvitationEmail: inviter, organization, role and accept CTA", () => {
    const html = renderEmail(
      <InvitationEmail
        theme={theme}
        inviterName="Ada Lovelace"
        inviterEmail="ada@acme.dev"
        organizationName="acme"
        role="admin"
        acceptUrl="https://accounts.test/invite/tok"
        expiresDays={7}
      />,
    );
    expect(html).toContain("Join acme");
    expect(html).toContain("Ada Lovelace (ada@acme.dev) invited you to join acme as admin");
    expect(html).toContain("Accept invitation");
    expect(html).toContain("This invitation expires in 7 days.");
  });

  it("WelcomeEmail: product CTA and getting-started links", () => {
    const html = renderEmail(
      <WelcomeEmail
        theme={theme}
        ctaUrl="https://accounts.test/app"
        gettingStarted={[
          { label: "Create your first organization", href: "https://accounts.test/orgs/new" },
        ]}
      />,
    );
    expect(html).toContain("Welcome to Accounts");
    expect(html).toContain("Open Accounts");
    expect(html).toContain("Getting started");
    expect(html).toContain('href="https://accounts.test/orgs/new"');
  });
});

describe("security templates", () => {
  it("SecurityAlertEmail: danger alert, details and review CTA", () => {
    const html = renderEmail(
      <SecurityAlertEmail
        theme={theme}
        eventTitle="API key revoked"
        eventDescription="The key ci-deploy was revoked by an administrator."
        details={[
          { label: "IP", value: "203.0.113.44" },
          { label: "Time", value: "21 Aug 2026, 09:14 UTC" },
        ]}
        actionUrl="https://accounts.test/security"
      />,
    );
    expect(html).toContain("Security alert");
    expect(html).toContain("API key revoked");
    expect(html).toContain("203.0.113.44");
    expect(html).toContain('href="https://accounts.test/security"');
    expect(html).toContain("Review activity");
    // header meta defaults to the category
    expect(html).toContain("Security");
  });

  it("NewLoginEmail: warning alert with device, IP, time and hint", () => {
    const html = renderEmail(
      <NewLoginEmail
        theme={theme}
        device="Linux"
        browser="Firefox"
        ip="203.0.113.44"
        location="Madrid, ES"
        time="21 Aug 2026, 09:14 UTC"
        reviewUrl="https://accounts.test/sessions"
      />,
    );
    expect(html).toContain("New sign-in to your account");
    expect(html).toContain("Firefox · Linux");
    expect(html).toContain("Madrid, ES");
    expect(html).toContain("21 Aug 2026, 09:14 UTC");
    expect(html).toContain("If this was you, no action is needed.");
    expect(html).toContain('href="https://accounts.test/sessions"');
  });

  it("PasswordChangedEmail: facts plus secondary support CTA", () => {
    const html = renderEmail(
      <PasswordChangedEmail
        theme={theme}
        time="21 Aug 2026, 09:14 UTC"
        ip="203.0.113.44"
        supportUrl="https://accounts.test/support"
      />,
    );
    expect(html).toContain("Your password was changed");
    expect(html).toContain("21 Aug 2026, 09:14 UTC");
    expect(html).toContain("Contact support");
    expect(html).toContain('href="https://accounts.test/support"');
  });
});

describe("expiration templates", () => {
  it("TokenExpirationEmail: token name, date, consequence, renew CTA", () => {
    const html = renderEmail(
      <TokenExpirationEmail
        theme={theme}
        tokenName="deploy-bot"
        expiresAt="28 Aug 2026, 00:00 UTC"
        renewUrl="https://accounts.test/tokens/deploy-bot"
      />,
    );
    expect(html).toContain("deploy-bot expires soon");
    expect(html).toContain("28 Aug 2026, 00:00 UTC");
    expect(html).toContain("will fail after it expires");
    expect(html).toContain("Renew token");
  });

  it("ResourceExpirationEmail: typed default CTA and consequence alert", () => {
    const html = renderEmail(
      <ResourceExpirationEmail
        theme={theme}
        resourceName="prod-registry"
        resourceType="repository"
        expiresAt="28 Aug 2026"
        renewUrl="https://accounts.test/repos/prod-registry"
        consequence="Pulls from this repository stop working after expiry."
      />,
    );
    expect(html).toContain("prod-registry expires soon");
    expect(html).toContain("The repository prod-registry expires on 28 Aug 2026.");
    expect(html).toContain("Renew repository");
    expect(html).toContain("Pulls from this repository stop working after expiry.");
  });

  it("overrides CTA labels and headings", () => {
    const html = renderEmail(
      <TokenExpirationEmail
        theme={theme}
        tokenName="deploy-bot"
        expiresAt="28 Aug 2026"
        renewUrl="https://accounts.test/tokens"
        heading="El token caduca pronto"
        ctaLabel="Renovar token"
        alertText="Las peticiones con este token fallarán."
      />,
    );
    expect(html).toContain("El token caduca pronto");
    expect(html).toContain("Renovar token");
    expect(html).not.toContain("Renew token");
    expect(html).not.toContain("expires soon");
  });
});
