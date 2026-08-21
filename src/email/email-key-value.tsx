/**
 * Two-column label→value table — the only data layout that survives every
 * email client (§27). Values are mono: they are literal, comparable facts
 * (device, IP, time — §03 "mono is semantics").
 */
import { FONT_MONO, FONT_SANS, palette, TYPE_SMALL } from "./palette";

/** One row of technical detail. */
export interface EmailKeyValueItem {
  label: string;
  value: string;
}

export interface EmailKeyValueProps {
  items: EmailKeyValueItem[];
}

/**
 * Renders request/event details (device, IP, time) as compact rows. Auth and
 * security emails must include origin details (§27) — this is how. Values
 * stay selectable text so the user can compare them character by character.
 */
export function EmailKeyValue({ items }: EmailKeyValueProps) {
  if (items.length === 0) return null;
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
                {items.map((item) => (
                  <tr key={item.label}>
                    <td
                      width={140}
                      style={{
                        padding: "5px 12px 5px 0",
                        fontFamily: FONT_SANS,
                        fontSize: TYPE_SMALL.fontSize,
                        lineHeight: TYPE_SMALL.lineHeight,
                        color: palette.textMuted,
                        verticalAlign: "top",
                        width: "140px",
                      }}
                    >
                      {item.label}
                    </td>
                    <td
                      style={{
                        padding: "5px 0",
                        fontFamily: FONT_MONO,
                        fontSize: TYPE_SMALL.fontSize,
                        lineHeight: TYPE_SMALL.lineHeight,
                        color: palette.text,
                        wordBreak: "break-word",
                      }}
                    >
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
