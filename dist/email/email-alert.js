import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FONT_SANS, palette, TYPE_BODY } from "./palette";
/**
 * Inline alert for emails: security events, expirations, consequences.
 * `danger` is reserved for failures and irreversible facts; "expiring soon"
 * is `warning`. Keep to one alert per email — the message IS the alert.
 */
export function EmailAlert({ tone = "info", title, children }) {
    const colors = palette[tone];
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { style: { padding: "0 0 16px" }, children: _jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsxs("td", { style: {
                                        backgroundColor: colors.bg,
                                        borderLeft: `3px solid ${colors.text}`,
                                        borderRadius: "8px",
                                        padding: "12px 16px",
                                    }, children: [title ? (_jsx("div", { style: {
                                                fontFamily: FONT_SANS,
                                                fontSize: TYPE_BODY.fontSize,
                                                lineHeight: TYPE_BODY.lineHeight,
                                                fontWeight: 600,
                                                color: colors.text,
                                                marginBottom: children != null ? "4px" : "0",
                                            }, children: title })) : null, children != null ? (_jsx("div", { style: {
                                                fontFamily: FONT_SANS,
                                                fontSize: TYPE_BODY.fontSize,
                                                lineHeight: TYPE_BODY.lineHeight,
                                                color: palette.textSecondary,
                                            }, children: children })) : null] }) }) }) }) }) }) }) }));
}
