/**
 * Root document of every email — html/head/body, canvas background, the
 * 600px centered card and the legal footer. Table layout, inline styles,
 * always light (§27: client dark modes invert colors unpredictably).
 */
import type { ReactNode } from "react";
import { FONT_SANS, palette } from "./palette";
import { EmailFooter } from "./email-footer";
import { EmailHeader } from "./email-header";
import { EmailThemeContext, type EmailTheme } from "./theme";

export interface EmailLayoutProps {
  /** Product theme, provided to every primitive via context. */
  theme: EmailTheme;
  /** Hidden preview text shown by inbox list views. Keep under ~90 chars. */
  preheader?: string;
  /** `<title>` of the document. Defaults to `theme.productName`. */
  title?: string;
  /** BCP 47 language of the copy. Defaults to `"en"`; set when shipping Spanish copy. */
  lang?: string;
  /** Brand row inside the card. Defaults to `<EmailHeader />`; pass `null` to remove. */
  header?: ReactNode;
  /** Below-card slot. Defaults to `<EmailFooter />` (theme links + address); pass `null` to remove. */
  footer?: ReactNode;
  children?: ReactNode;
}

/**
 * Wrap every email in exactly one `EmailLayout`. It renders the full HTML
 * document: hidden preheader, `bg` canvas, a single 600px card on `surface`
 * with the brand header, your content, and the footer below the card.
 * Render the result with `renderEmail` — never mount it in a browser.
 */
export function EmailLayout({
  theme,
  preheader,
  title,
  lang = "en",
  header = <EmailHeader />,
  footer = <EmailFooter />,
  children,
}: EmailLayoutProps) {
  return (
    <EmailThemeContext.Provider value={theme}>
      <html lang={lang}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
          <title>{title ?? theme.productName}</title>
        </head>
        <body
          style={{
            margin: "0",
            padding: "0",
            backgroundColor: palette.bg,
            fontFamily: FONT_SANS,
          }}
        >
          {preheader ? (
            <div
              style={{
                display: "none",
                overflow: "hidden",
                maxHeight: "0",
                maxWidth: "0",
                opacity: 0,
                lineHeight: "1px",
                fontSize: "1px",
                color: "transparent",
              }}
            >
              {preheader}
              {"\u00A0\u200C".repeat(48)}
            </div>
          ) : null}
          <table
            role="presentation"
            width="100%"
            border={0}
            cellPadding={0}
            cellSpacing={0}
            style={{ backgroundColor: palette.bg }}
          >
            <tbody>
              <tr>
                <td align="center" style={{ padding: "32px 16px" }}>
                  <table
                    role="presentation"
                    width={600}
                    align="center"
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    style={{ width: "100%", maxWidth: "600px" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          style={{
                            backgroundColor: palette.surface,
                            border: `1px solid ${palette.border}`,
                            borderRadius: "12px",
                            padding: "32px",
                            textAlign: "left",
                          }}
                        >
                          {header}
                          {children}
                        </td>
                      </tr>
                      <tr>
                        <td>{footer}</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    </EmailThemeContext.Provider>
  );
}
