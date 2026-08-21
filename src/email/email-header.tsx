/**
 * Brand header of every email — logo (or product name in the accent) on the
 * left, optional muted meta on the right ("Security", an env name).
 */
import { useContext, type ReactNode } from "react";
import { FONT_SANS, palette, TYPE_SMALL } from "./palette";
import { EmailThemeContext } from "./theme";

export interface EmailHeaderProps {
  /** Right-aligned muted meta, e.g. the email category ("Security"). */
  meta?: ReactNode;
}

/**
 * Product identity row. Rendered by default at the top of `EmailLayout`'s
 * card; pass a customized instance via the layout's `header` slot. Falls back
 * to `productName` text when `logoUrl` is unset or images are blocked — the
 * message never depends on an image.
 */
export function EmailHeader({ meta }: EmailHeaderProps) {
  const theme = useContext(EmailThemeContext);
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
          <td style={{ padding: "0 0 24px", verticalAlign: "middle" }}>
            {theme.logoUrl ? (
              <img
                src={theme.logoUrl}
                alt={theme.productName}
                height={28}
                style={{ display: "block", border: "0", maxHeight: "28px" }}
              />
            ) : (
              <span
                style={{
                  fontFamily: FONT_SANS,
                  fontSize: "16px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  color: theme.accent,
                }}
              >
                {theme.productName}
              </span>
            )}
          </td>
          {meta != null ? (
            <td
              align="right"
              style={{
                padding: "0 0 24px",
                fontFamily: FONT_SANS,
                fontSize: TYPE_SMALL.fontSize,
                lineHeight: TYPE_SMALL.lineHeight,
                color: palette.textMuted,
                textAlign: "right",
                verticalAlign: "middle",
                whiteSpace: "nowrap",
              }}
            >
              {meta}
            </td>
          ) : null}
        </tr>
      </tbody>
    </table>
  );
}
