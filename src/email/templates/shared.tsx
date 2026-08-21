/**
 * Shared template plumbing — props every template accepts, plus internal
 * blocks (greeting, fallback URL). Only `EmailTemplateBaseProps` is public;
 * `Greeting` and `FallbackUrl` stay out of the barrel.
 */
import { useContext } from "react";
import { FONT_MONO, FONT_SANS, palette, TYPE_SMALL } from "../palette";
import { EmailThemeContext, type EmailTheme } from "../theme";
import { EmailText } from "../email-typography";

/**
 * Props shared by every email template. All copy has English defaults and is
 * overridable — products ship Spanish (or any locale) through these props;
 * defaults never bake in a language other than English (CONVENTIONS §Language).
 */
export interface EmailTemplateBaseProps {
  /** Product theme. Spread an `emailThemes` preset and add `productName`. */
  theme: EmailTheme;
  /** Recipient display name; renders the "Hi {name}," line when present. */
  recipientName?: string;
  /** Replaces the computed greeting line entirely (e.g. "Hola Rafa,"). */
  greeting?: string;
  /** Overrides the hidden inbox preview text. */
  preheader?: string;
}

/** Greeting line — renders nothing without a name or explicit greeting. */
export function Greeting({
  recipientName,
  greeting,
}: Pick<EmailTemplateBaseProps, "recipientName" | "greeting">) {
  const text = greeting ?? (recipientName ? `Hi ${recipientName},` : null);
  if (!text) return null;
  return <EmailText>{text}</EmailText>;
}

export interface FallbackUrlProps {
  /** The same URL as the CTA button. */
  url: string;
  /** Lead-in line above the raw URL. */
  label?: string;
}

/**
 * Plain-text URL under a CTA button, for clients that strip links from
 * styled elements. Mono (literal, copyable — §03) and break-all so long
 * signed URLs never overflow the 600px card.
 */
export function FallbackUrl({ url, label }: FallbackUrlProps) {
  const theme = useContext(EmailThemeContext);
  return (
    <div style={{ margin: "0 0 16px" }}>
      <div
        style={{
          fontFamily: FONT_SANS,
          fontSize: TYPE_SMALL.fontSize,
          lineHeight: TYPE_SMALL.lineHeight,
          color: palette.textMuted,
          marginBottom: "4px",
        }}
      >
        {label ??
          "If the button does not work, copy and paste this URL into your browser:"}
      </div>
      <a
        href={url}
        style={{
          fontFamily: FONT_MONO,
          fontSize: TYPE_SMALL.fontSize,
          lineHeight: TYPE_SMALL.lineHeight,
          color: theme.accent,
          textDecoration: "underline",
          wordBreak: "break-all",
        }}
      >
        {url}
      </a>
    </div>
  );
}
