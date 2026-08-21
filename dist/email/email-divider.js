import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Horizontal rule for emails — a border-top div inside a table row, because
 * `<hr>` styling is unreliable across clients.
 */
import { palette } from "./palette";
/**
 * Separates blocks of one email when whitespace alone is not enough (e.g.
 * before request metadata). Use sparingly — most emails need zero or one.
 */
export function EmailDivider({ spacing = 8 }) {
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { style: { padding: `${spacing}px 0 ${spacing + 16}px` }, children: _jsx("div", { style: {
                            borderTop: `1px solid ${palette.border}`,
                            fontSize: "1px",
                            lineHeight: "1px",
                        }, children: " " }) }) }) }) }));
}
