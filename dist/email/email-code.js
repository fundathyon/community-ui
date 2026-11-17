import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Big OTP/code display — the single large element of a verification email
 * (§27): mono, wide tracking, centered in a bordered box on a subtle bg.
 */
import { FONT_MONO, FONT_SANS, palette, TYPE_SMALL } from "./palette";
/**
 * One-time code block for `OtpEmail`-style messages. Selectable text — never
 * an image — so it survives blocked images and copy/paste. Pair it with a
 * security note; auth emails must say what to do when the code wasn't requested.
 */
export function EmailCode({ code, expiresText }) {
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsxs("tbody", { children: [_jsx("tr", { children: _jsx("td", { align: "center", style: { padding: "8px 0 4px" }, children: _jsx("table", { role: "presentation", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { style: {
                                            backgroundColor: palette.bgSubtle,
                                            border: `1px solid ${palette.border}`,
                                            borderRadius: "8px",
                                            padding: "20px 32px",
                                            textAlign: "center",
                                        }, children: _jsx("div", { style: {
                                                fontFamily: FONT_MONO,
                                                fontSize: "28px",
                                                lineHeight: "36px",
                                                fontWeight: 700,
                                                letterSpacing: "6px",
                                                color: palette.text,
                                            }, children: code }) }) }) }) }) }) }), expiresText ? (_jsx("tr", { children: _jsx("td", { align: "center", style: {
                            padding: "8px 0 0",
                            fontFamily: FONT_SANS,
                            fontSize: TYPE_SMALL.fontSize,
                            lineHeight: TYPE_SMALL.lineHeight,
                            color: palette.textMuted,
                            textAlign: "center",
                        }, children: expiresText }) })) : null, _jsx("tr", { children: _jsx("td", { style: { padding: "0 0 16px", fontSize: "1px", lineHeight: "1px" }, children: " " }) })] }) }));
}
