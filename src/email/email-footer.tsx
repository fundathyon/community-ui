/**
 * Legal footer below the card — link row, address line, unsubscribe slot.
 * All muted 12/18, centered. Marketing-free by design (§17 voice).
 */
import { useContext, type ReactNode } from "react";
import { FONT_SANS, palette, TYPE_SMALL } from "./palette";
import { EmailThemeContext, type EmailLink } from "./theme";

export interface EmailFooterProps {
  /** Overrides `theme.footerLinks`. */
  links?: EmailLink[];
  /** Overrides `theme.address`. */
  address?: string;
  /** Unsubscribe / notification-settings line. Transactional auth emails omit it. */
  unsubscribe?: ReactNode;
  /** Extra footer content below everything else. */
  children?: ReactNode;
}

const footerText = {
  fontFamily: FONT_SANS,
  fontSize: TYPE_SMALL.fontSize,
  lineHeight: TYPE_SMALL.lineHeight,
  color: palette.textMuted,
} as const;

/**
 * Default `footer` slot of `EmailLayout`. Reads links and address from the
 * theme; pass props to override per email. Renders nothing it doesn't have —
 * an empty theme yields an empty footer, never placeholder text.
 */
export function EmailFooter({
  links,
  address,
  unsubscribe,
  children,
}: EmailFooterProps) {
  const theme = useContext(EmailThemeContext);
  const resolvedLinks = links ?? theme.footerLinks ?? [];
  const resolvedAddress = address ?? theme.address;
  return (
    <table
      role="presentation"
      width="100%"
      border={0}
      cellPadding={0}
      cellSpacing={0}
    >
      <tbody>
        <tr>
          <td align="center" style={{ padding: "20px 8px 0", textAlign: "center" }}>
            {resolvedLinks.length > 0 ? (
              <div style={footerText}>
                {resolvedLinks.map((link, index) => (
                  <span key={link.href}>
                    <a
                      href={link.href}
                      style={{
                        ...footerText,
                        color: palette.textMuted,
                        textDecoration: "underline",
                      }}
                    >
                      {link.label}
                    </a>
                    {index < resolvedLinks.length - 1 ? " · " : null}
                  </span>
                ))}
              </div>
            ) : null}
            {resolvedAddress ? (
              <div style={{ ...footerText, marginTop: "8px" }}>
                {resolvedAddress}
              </div>
            ) : null}
            {unsubscribe != null ? (
              <div style={{ ...footerText, marginTop: "8px" }}>{unsubscribe}</div>
            ) : null}
            {children != null ? (
              <div style={{ ...footerText, marginTop: "8px" }}>{children}</div>
            ) : null}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
