/**
 * Template content: key data lands in the HTML, defaults follow the §17
 * voice, and every visible string is overridable (products ship Spanish).
 */
import { describe, expect, it } from "vitest";
import {
  AccountLockedEmail,
  ApiKeyCreatedEmail,
  ApiKeyRevokedEmail,
  EmailVerificationEmail,
  GenericInvitationEmail,
  InvitationEmail,
  JobCompletedEmail,
  JobFailedEmail,
  MagicLinkEmail,
  NewDeviceEmail,
  NewLoginEmail,
  OtpEmail,
  PasswordChangedEmail,
  PasswordResetEmail,
  ResourceExpirationEmail,
  ResourceSharedEmail,
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

describe("authentication additions", () => {
  it("AccountLockedEmail: attempt count, IP and an explicit unlock deadline", () => {
    const html = renderEmail(
      <AccountLockedEmail
        theme={theme}
        recipientName="Rafa"
        attempts={5}
        unlockMinutes={15}
        ip="203.0.113.44"
        actionUrl="https://accounts.test/reset"
      />,
    );
    expect(html).toContain("Account locked");
    expect(html).toContain("5 failed attempts");
    expect(html).toContain("203.0.113.44");
    expect(html).toContain("In 15 minutes.");
    expect(html).toContain("Reset password");
    expect(html).toContain('href="https://accounts.test/reset"');
  });
});

describe("security additions", () => {
  it("NewDeviceEmail: device identity facts and trust/report actions", () => {
    const html = renderEmail(
      <NewDeviceEmail
        theme={theme}
        deviceName="iPhone 15"
        os="iOS 18"
        browser="Safari"
        ip="203.0.113.44"
        location="Lisbon, PT"
        time="21 Aug 2026, 09:14 UTC"
        trustUrl="https://accounts.test/devices/trust/tok"
        reportUrl="https://accounts.test/devices/report/tok"
      />,
    );
    expect(html).toContain("New device on your account");
    expect(html).toContain("New device detected");
    expect(html).toContain("iPhone 15");
    expect(html).toContain("iOS 18");
    expect(html).toContain("Lisbon, PT");
    expect(html).toContain("21 Aug 2026, 09:14 UTC");
    expect(html).toContain("Trust this device");
    expect(html).toContain("Report device");
    expect(html).toContain('href="https://accounts.test/devices/trust/tok"');
  });
});

describe("organization additions", () => {
  it("GenericInvitationEmail: inviter, itemized access, accept and decline", () => {
    const html = renderEmail(
      <GenericInvitationEmail
        theme={theme}
        inviterName="Maria"
        inviterEmail="maria@foundathyon.dev"
        targetName="acme"
        access={[
          { label: "Vault", value: "read and write configs" },
          { label: "Dokgistry", value: "pull and push images" },
        ]}
        acceptUrl="https://accounts.test/invite/accept/tok"
        declineUrl="https://accounts.test/invite/decline/tok"
        expiresDays={7}
      />,
    );
    expect(html).toContain("You are invited to acme");
    expect(html).toContain("Maria (maria@foundathyon.dev) invited you to acme");
    expect(html).toContain("read and write configs");
    expect(html).toContain("pull and push images");
    expect(html).toContain("Accept invitation");
    expect(html).toContain("Decline");
    expect(html).toContain('href="https://accounts.test/invite/decline/tok"');
    expect(html).toContain("This invitation expires in 7 days.");
  });
});

describe("credential templates", () => {
  it("ApiKeyCreatedEmail: name, scopes, creator and creation time — never the secret", () => {
    const html = renderEmail(
      <ApiKeyCreatedEmail
        theme={theme}
        keyName="ci-deploy"
        scopes={["registry:read", "registry:write"]}
        creatorName="maria@foundathyon.dev"
        createdAt="7 Aug 2026, 14:45 UTC"
        actionUrl="https://accounts.test/keys"
      />,
    );
    expect(html).toContain("API key created");
    expect(html).toContain("ci-deploy");
    expect(html).toContain("registry:read, registry:write");
    expect(html).toContain("maria@foundathyon.dev");
    expect(html).toContain("7 Aug 2026, 14:45 UTC");
    expect(html).not.toContain("sk_live_");
    expect(html).not.toContain("fdn_ci_");
  });

  it("ApiKeyRevokedEmail: revoker, time and a factual, non-alarming consequence", () => {
    const html = renderEmail(
      <ApiKeyRevokedEmail
        theme={theme}
        keyName="ci-deploy"
        revokerName="maria@foundathyon.dev"
        revokedAt="21 Aug 2026, 09:14 UTC"
      />,
    );
    expect(html).toContain("API key revoked");
    expect(html).toContain("ci-deploy");
    expect(html).toContain("maria@foundathyon.dev");
    expect(html).toContain("21 Aug 2026, 09:14 UTC");
    expect(html).toContain("Requests authenticated with this key are rejected within 30 seconds.");
  });
});

describe("operations additions", () => {
  it("ResourceSharedEmail: resource, sharer and expiry with a fallback URL", () => {
    const url = "https://vault.test/share/config/tok";
    const html = renderEmail(
      <ResourceSharedEmail
        theme={theme}
        resourceName="prod-registry"
        resourceType="config"
        sharerName="Ada Lovelace"
        shareUrl={url}
        expiresAt="In 7 days"
      />,
    );
    expect(html).toContain("prod-registry was shared with you");
    expect(html).toContain("Ada Lovelace");
    expect(html).toContain("In 7 days");
    expect(html).toContain("Open config");
    expect(html.split(url).length - 1).toBeGreaterThanOrEqual(2);
  });

  it("JobFailedEmail: cause, schedule and retry guidance", () => {
    const html = renderEmail(
      <JobFailedEmail
        theme={theme}
        jobName="rotate-credentials"
        schedule="0 3 1 * *"
        reason="Connection to the vault backend timed out."
        exitInfo="exit 1"
        failedAt="21 Aug 2026, 09:14 UTC"
        retryUrl="https://cronify.test/jobs/rotate-credentials"
      />,
    );
    expect(html).toContain("Job failed");
    expect(html).toContain("rotate-credentials failed");
    expect(html).toContain("Connection to the vault backend timed out.");
    expect(html).toContain("0 3 1 * *");
    expect(html).toContain("exit 1");
    expect(html).toContain("Retry job");
    expect(html).toContain("Fix the underlying issue and retry the job");
  });

  it("JobCompletedEmail: schedule, duration and completion time", () => {
    const html = renderEmail(
      <JobCompletedEmail
        theme={theme}
        jobName="cleanup-orphans"
        schedule="0 0 * * 0"
        duration="1 m 42 s"
        completedAt="21 Aug 2026, 09:14 UTC"
        actionUrl="https://cronify.test/jobs/cleanup-orphans"
      />,
    );
    expect(html).toContain("Job completed");
    expect(html).toContain("cleanup-orphans completed");
    expect(html).toContain("1 m 42 s");
    expect(html).toContain("21 Aug 2026, 09:14 UTC");
    expect(html).toContain("View job");
  });
});
