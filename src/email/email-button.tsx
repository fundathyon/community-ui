/**
 * Bulletproof CTA — a table-wrapped `<a>` with padded cell and solid
 * background, never a `<button>` (§27). Accent comes from the theme context.
 */
import { useContext, type ReactNode } from "react";
import { FONT_SANS, palette } from "./palette";
import { EmailThemeContext } from "./theme";

export interface EmailButtonProps {
  /** Absolute destination URL. */
  href: string;
  /** `primary` = accent fill (the one CTA); `secondary` = accent border + text. */
  variant?: "primary" | "secondary";
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

/**
 * The call to action of an email. One clear primary CTA per message — if a
 * second action exists it is `secondary` (or a plain link). Label follows
 * §17 voice: verb + object ("Reset password"), never "OK". The 22px line in
 * an 11px-padded cell yields a 44px touch target.
 */
export function EmailButton({
  href,
  variant = "primary",
  align = "left",
  children,
}: EmailButtonProps) {
  const theme = useContext(EmailThemeContext);
  const accent = theme.accent;
  const primary = variant === "primary";
  const textColor = primary ? theme.accentContrast ?? "#ffffff" : accent;
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
          <td align={align} style={{ padding: "8px 0 24px" }}>
            <table role="presentation" border={0} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td
                    style={{
                      borderRadius: "6px",
                      backgroundColor: primary ? accent : palette.surface,
                      border: `1px solid ${accent}`,
                    }}
                  >
                    <a
                      href={href}
                      style={{
                        display: "inline-block",
                        padding: "11px 24px",
                        fontFamily: FONT_SANS,
                        fontSize: "14px",
                        lineHeight: "22px",
                        fontWeight: 600,
                        color: textColor,
                        textDecoration: "none",
                        borderRadius: "6px",
                      }}
                    >
                      {children}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
