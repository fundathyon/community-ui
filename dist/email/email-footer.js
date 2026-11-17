import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Legal footer below the card — link row, address line, unsubscribe slot.
 * All muted 12/18, centered. Marketing-free by design (§17 voice).
 */
import { useContext } from "react";
import { FONT_SANS, palette, TYPE_SMALL } from "./palette";
import { EmailThemeContext } from "./theme";
const footerText = {
    fontFamily: FONT_SANS,
    fontSize: TYPE_SMALL.fontSize,
    lineHeight: TYPE_SMALL.lineHeight,
    color: palette.textMuted,
};
/**
 * Default `footer` slot of `EmailLayout`. Reads links and address from the
 * theme; pass props to override per email. Renders nothing it doesn't have —
 * an empty theme yields an empty footer, never placeholder text.
 */
export function EmailFooter({ links, address, unsubscribe, children, }) {
    const theme = useContext(EmailThemeContext);
    const resolvedLinks = links ?? theme.footerLinks ?? [];
    const resolvedAddress = address ?? theme.address;
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsxs("td", { align: "center", style: { padding: "20px 8px 0", textAlign: "center" }, children: [resolvedLinks.length > 0 ? (_jsx("div", { style: footerText, children: resolvedLinks.map((link, index) => (_jsxs("span", { children: [_jsx("a", { href: link.href, style: {
                                            ...footerText,
                                            color: palette.textMuted,
                                            textDecoration: "underline",
                                        }, children: link.label }), index < resolvedLinks.length - 1 ? " · " : null] }, link.href))) })) : null, resolvedAddress ? (_jsx("div", { style: { ...footerText, marginTop: "8px" }, children: resolvedAddress })) : null, unsubscribe != null ? (_jsx("div", { style: { ...footerText, marginTop: "8px" }, children: unsubscribe })) : null, children != null ? (_jsx("div", { style: { ...footerText, marginTop: "8px" }, children: children })) : null] }) }) }) }));
}
