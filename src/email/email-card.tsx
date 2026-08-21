/**
 * Bordered section box inside an email body — groups secondary content
 * (getting-started links, next steps) apart from the main copy.
 */
import type { ReactNode } from "react";
import { FONT_SANS, palette, TYPE_BODY } from "./palette";

export interface EmailCardProps {
  /** Small 600-weight title above the content. */
  title?: string;
  children?: ReactNode;
}

/**
 * Secondary content container. Use for supporting material, never for the
 * email's main message — the layout card already frames that. One level of
 * nesting only: cards never contain cards.
 */
export function EmailCard({ title, children }: EmailCardProps) {
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
                      backgroundColor: palette.surface,
                      border: `1px solid ${palette.border}`,
                      borderRadius: "8px",
                      padding: "16px 20px",
                    }}
                  >
                    {title ? (
                      <div
                        style={{
                          fontFamily: FONT_SANS,
                          fontSize: TYPE_BODY.fontSize,
                          lineHeight: TYPE_BODY.lineHeight,
                          fontWeight: 600,
                          color: palette.text,
                          marginBottom: children != null ? "8px" : "0",
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
