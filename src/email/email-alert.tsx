/**
 * Tone box for state that stays true whether or not it's read (§17 Alert
 * rule): 3px left bar + tinted background + text. Tone means content
 * semantics — never brand (§02: accent ≠ state).
 */
import type { ReactNode } from "react";
import { FONT_SANS, palette, TYPE_BODY } from "./palette";

/** Content semantics of an alert — mirrors the web `Tone` (§18). */
export type EmailTone = "info" | "success" | "warning" | "danger";

export interface EmailAlertProps {
  /** `info` pending/neutral · `success` confirmed · `warning` needs attention · `danger` failed/irreversible. */
  tone?: EmailTone;
  /** Bold first line in the tone color. */
  title?: string;
  children?: ReactNode;
}

/**
 * Inline alert for emails: security events, expirations, consequences.
 * `danger` is reserved for failures and irreversible facts; "expiring soon"
 * is `warning`. Keep to one alert per email — the message IS the alert.
 */
export function EmailAlert({ tone = "info", title, children }: EmailAlertProps) {
  const colors = palette[tone];
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
          <td style={{ padding: "0 0 16px" }}>
            <table
              role="presentation"
              width="100%"
              border={0}
              cellPadding={0}
              cellSpacing={0}
            >
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: colors.bg,
                      borderLeft: `3px solid ${colors.text}`,
                      borderRadius: "8px",
                      padding: "12px 16px",
                    }}
                  >
                    {title ? (
                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: TYPE_BODY.fontSize,
                          lineHeight: TYPE_BODY.lineHeight,
                          fontWeight: 600,
                          color: colors.text,
                          marginBottom: children != null ? "4px" : "0",
                        }}
                      >
                        {title}
                      </div>
                    ) : null}
                    {children != null ? (
                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: TYPE_BODY.fontSize,
                          lineHeight: TYPE_BODY.lineHeight,
                          color: palette.textSecondary,
                        }}
                      >
                        {children}
                      </div>
                    ) : null}
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
