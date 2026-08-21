/**
 * Post-signup welcome (§27 Organización group). Direct, no marketing tone.
 */
import { useContext } from "react";
import { EmailButton } from "../email-button";
import { EmailCard } from "../email-card";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { FONT_SANS, TYPE_BODY } from "../palette";
import { EmailThemeContext, type EmailLink } from "../theme";
import { Greeting, type EmailTemplateBaseProps } from "./shared";

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

/** Accent-colored link row inside the getting-started card. */
function GettingStartedLink({ link }: { link: EmailLink }) {
  const theme = useContext(EmailThemeContext);
  return (
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: TYPE_BODY.fontSize,
        lineHeight: TYPE_BODY.lineHeight,
        marginBottom: "4px",
      }}
    >
      <a
        href={link.href}
        style={{ color: theme.accent, textDecoration: "underline" }}
      >
        {link.label}
      </a>
    </div>
  );
}

/**
 * Welcome email: account is ready, one CTA into the product, optional
 * getting-started links. The only template allowed a warm register — still
 * no exclamation marks (§17).
 */
export function WelcomeEmail({
  theme,
  recipientName,
  greeting,
  preheader,
  ctaUrl,
  ctaLabel,
  gettingStarted,
  heading,
  body = "Your account is ready.",
  gettingStartedTitle = "Getting started",
}: WelcomeEmailProps) {
  const resolvedHeading = heading ?? `Welcome to ${theme.productName}`;
  return (
    <EmailLayout
      theme={theme}
      title={resolvedHeading}
      preheader={preheader ?? resolvedHeading}
    >
      <Greeting recipientName={recipientName} greeting={greeting} />
      <EmailHeading>{resolvedHeading}</EmailHeading>
      <EmailText>{body}</EmailText>
      <EmailButton href={ctaUrl}>
        {ctaLabel ?? `Open ${theme.productName}`}
      </EmailButton>
      {gettingStarted && gettingStarted.length > 0 ? (
        <EmailCard title={gettingStartedTitle}>
          {gettingStarted.map((link) => (
            <GettingStartedLink key={link.href} link={link} />
          ))}
        </EmailCard>
      ) : null}
    </EmailLayout>
  );
}
