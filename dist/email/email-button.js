import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Bulletproof CTA — a table-wrapped `<a>` with padded cell and solid
 * background, never a `<button>` (§27). Accent comes from the theme context.
 */
import { useContext } from "react";
import { FONT_SANS, palette } from "./palette";
import { EmailThemeContext } from "./theme";
/**
 * The call to action of an email. One clear primary CTA per message — if a
 * second action exists it is `secondary` (or a plain link). Label follows
 * §17 voice: verb + object ("Reset password"), never "OK". The 22px line in
 * an 11px-padded cell yields a 44px touch target.
 */
export function EmailButton({ href, variant = "primary", align = "left", children, }) {
    const theme = useContext(EmailThemeContext);
    const accent = theme.accent;
    const primary = variant === "primary";
    const textColor = primary ? theme.accentContrast ?? "#ffffff" : accent;
    return (_jsx("table", { role: "presentation", width: "100%", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { align: align, style: { padding: "8px 0 24px" }, children: _jsx("table", { role: "presentation", border: 0, cellPadding: 0, cellSpacing: 0, children: _jsx("tbody", { children: _jsx("tr", { children: _jsx("td", { style: {
                                        borderRadius: "6px",
                                        backgroundColor: primary ? accent : palette.surface,
                                        border: `1px solid ${accent}`,
                                    }, children: _jsx("a", { href: href, style: {
                                            display: "inline-block",
                                            padding: "11px 24px",
                                            fontFamily: FONT_SANS,
                                            fontSize: "14px",
                                            lineHeight: "22px",
                                            fontWeight: 600,
                                            color: textColor,
                                            textDecoration: "none",
                                            borderRadius: "6px",
                                        }, children: children }) }) }) }) }) }) }) }) }));
}
