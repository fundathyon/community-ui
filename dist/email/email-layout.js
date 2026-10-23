import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FONT_SANS, palette } from "./palette";
import { EmailFooter } from "./email-footer";
import { EmailHeader } from "./email-header";
import { EmailThemeContext } from "./theme";
/**
 * Wrap every email in exactly one `EmailLayout`. It renders the full HTML
 * document: hidden preheader, `bg` canvas, a single 600px card on `surface`
 * with the brand header, your content, and the footer below the card.
 * Render the result with `renderEmail` — never mount it in a browser.
 */
export function EmailLayout({ theme, preheader, title, lang = "en", header = _jsx(EmailHeader, {}), footer = _jsx(EmailFooter, {}), children, }) {
    return (_jsx(EmailThemeContext.Provider, { value: theme, children: _jsxs("html", { lang: lang, children: [_jsxs("head", { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx("meta", { name: "color-scheme", content: "light" }), _jsx("meta", { name: "supported-color-schemes", content: "light" }), _jsx("title", { children: title ?? theme.productName })] }), _jsxs("body", { style: {
                        margin: "0",
                        padding: "0",
                        backgroundColor: palette.bg,
                        fontFamily: FONT_SANS,
                    }, children: [preheader ? (_jsxs("div", { style: {
                                display: "none",
                                overflow: "hidden",
                                maxHeight: "0",
                                maxWidth: "0",
                                opacity: 0,
                                lineHeight: "1px",
                                fontSize: "1px",
                                color: "transparent",
                            }, children: [preheader, "\u00A0\u200C".repeat(48)] })) : null, _jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, style: { backgroundColor: palette.bg }, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { align: "center", style: { padding: "32px 16px" }, children: _jsx("table", { role: "presentation", width: 600, align: "center", border: 0, cellPadding: 0, cellSpacing: 0, style: { width: "100%", maxWidth: "600px" }, children: _jsxs("tbody", { children: [_jsx("tr", { children: _jsxs("td", { style: {
                                                                backgroundColor: palette.surface,
                                                                border: `1px solid ${palette.border}`,
                                                                borderRadius: "12px",
                                                                padding: "32px",
                                                                textAlign: "left",
                                                            }, children: [header, children] }) }), _jsx("tr", { children: _jsx("td", { children: footer }) })] }) }) }) }) }) })] })] }) }));
}
