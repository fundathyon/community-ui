import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FONT_SANS, palette, TYPE_BODY } from "./palette";
/**
 * Secondary content container. Use for supporting material, never for the
 * email's main message — the layout card already frames that. One level of
 * nesting only: cards never contain cards.
 */
export function EmailCard({ title, children }) {
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { style: { padding: "0 0 16px" }, children: _jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsxs("td", { style: {
                                        backgroundColor: palette.surface,
                                        border: `1px solid ${palette.border}`,
                                        borderRadius: "8px",
                                        padding: "16px 20px",
                                    }, children: [title ? (_jsx("div", { style: {
                                                fontFamily: FONT_SANS,
                                                fontSize: TYPE_BODY.fontSize,
                                                lineHeight: TYPE_BODY.lineHeight,
                                                fontWeight: 600,
                                                color: palette.text,
                                                marginBottom: children != null ? "8px" : "0",
                                            }, children: title })) : null, children != null ? (_jsx("div", { style: {
                                                fontFamily: FONT_SANS,
                                                fontSize: TYPE_BODY.fontSize,
                                                lineHeight: TYPE_BODY.lineHeight,
                                                color: palette.textSecondary,
                                            }, children: children })) : null] }) }) }) }) }) }) }) }));
}
