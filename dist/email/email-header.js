import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Brand header of every email — logo (or product name in the accent) on the
 * left, optional muted meta on the right ("Security", an env name).
 */
import { useContext } from "react";
import { FONT_SANS, palette, TYPE_SMALL } from "./palette";
import { EmailThemeContext } from "./theme";
/**
 * Product identity row. Rendered by default at the top of `EmailLayout`'s
 * card; pass a customized instance via the layout's `header` slot. Falls back
 * to `productName` text when `logoUrl` is unset or images are blocked — the
 * message never depends on an image.
 */
export function EmailHeader({ meta }) {
    const theme = useContext(EmailThemeContext);
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsxs("tr", { children: [_jsx("td", { style: { padding: "0 0 24px", verticalAlign: "middle" }, children: theme.logoUrl ? (_jsx("img", { src: theme.logoUrl, alt: theme.productName, height: 28, style: { display: "block", border: "0", maxHeight: "28px" } })) : (_jsx("span", { style: {
                                fontFamily: FONT_SANS,
                                fontSize: "16px",
                                lineHeight: "24px",
                                fontWeight: 700,
                                color: theme.accent,
                            }, children: theme.productName })) }), meta != null ? (_jsx("td", { align: "right", style: {
                            padding: "0 0 24px",
                            fontFamily: FONT_SANS,
                            fontSize: TYPE_SMALL.fontSize,
                            lineHeight: TYPE_SMALL.lineHeight,
                            color: palette.textMuted,
                            textAlign: "right",
                            verticalAlign: "middle",
                            whiteSpace: "nowrap",
                        }, children: meta })) : null] }) }) }));
}
