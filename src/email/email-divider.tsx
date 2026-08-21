/**
 * Horizontal rule for emails — a border-top div inside a table row, because
 * `<hr>` styling is unreliable across clients.
 */
import { palette } from "./palette";

export interface EmailDividerProps {
  /** Vertical breathing room above/below the line, in px. Default 8. */
  spacing?: number;
}

/**
 * Separates blocks of one email when whitespace alone is not enough (e.g.
 * before request metadata). Use sparingly — most emails need zero or one.
 */
export function EmailDivider({ spacing = 8 }: EmailDividerProps) {
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
          <td style={{ padding: `${spacing}px 0 ${spacing + 16}px` }}>
            <div
              style={{
                borderTop: `1px solid ${palette.border}`,
                fontSize: "1px",
                lineHeight: "1px",
              }}
            >
              {" "}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
