/**
 * Big OTP/code display — the single large element of a verification email
 * (§27): mono, wide tracking, centered in a bordered box on a subtle bg.
 */
import { FONT_MONO, FONT_SANS, palette, TYPE_SMALL } from "./palette";

export interface EmailCodeProps {
  /** The code exactly as it should read. Pre-group it ("482 193") so it can be read aloud. */
  code: string;
  /** Expiry line under the box, e.g. "Expires in 10 minutes." */
  expiresText?: string;
}

/**
 * One-time code block for `OtpEmail`-style messages. Selectable text — never
 * an image — so it survives blocked images and copy/paste. Pair it with a
 * security note; auth emails must say what to do when the code wasn't requested.
 */
export function EmailCode({ code, expiresText }: EmailCodeProps) {
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
          <td align="center" style={{ padding: "8px 0 4px" }}>
            <table role="presentation" border={0} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: palette.bgSubtle,
                      border: `1px solid ${palette.border}`,
                      borderRadius: "8px",
                      padding: "20px 32px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: "28px",
                        lineHeight: "36px",
                        fontWeight: 700,
                        letterSpacing: "6px",
                        color: palette.text,
                      }}
                    >
                      {code}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        {expiresText ? (
          <tr>
            <td
              align="center"
              style={{
                padding: "8px 0 0",
                fontFamily: FONT_SANS,
                fontSize: TYPE_SMALL.fontSize,
                lineHeight: TYPE_SMALL.lineHeight,
                color: palette.textMuted,
                textAlign: "center",
              }}
            >
              {expiresText}
            </td>
          </tr>
        ) : null}
        <tr>
          <td style={{ padding: "0 0 16px", fontSize: "1px", lineHeight: "1px" }}>
            {" "}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
