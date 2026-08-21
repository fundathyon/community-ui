import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Shared template plumbing — props every template accepts, plus internal
 * blocks (greeting, fallback URL). Only `EmailTemplateBaseProps` is public;
 * `Greeting` and `FallbackUrl` stay out of the barrel.
 */
import { useContext } from "react";
import { FONT_MONO, FONT_SANS, palette, TYPE_SMALL } from "../palette";
import { EmailThemeContext } from "../theme";
import { EmailText } from "../email-typography";
/** Greeting line — renders nothing without a name or explicit greeting. */
export function Greeting({ recipientName, greeting, }) {
    const text = greeting ?? (recipientName ? `Hi ${recipientName},` : null);
    if (!text)
        return null;
    return _jsx(EmailText, { children: text });
}
/**
 * Plain-text URL under a CTA button, for clients that strip links from
 * styled elements. Mono (literal, copyable — §03) and break-all so long
 * signed URLs never overflow the 600px card.
 */
export function FallbackUrl({ url, label }) {
    const theme = useContext(EmailThemeContext);
    return (_jsxs("div", { style: { margin: "0 0 16px" }, children: [_jsx("div", { style: {
                    fontFamily: FONT_SANS,
                    fontSize: TYPE_SMALL.fontSize,
                    lineHeight: TYPE_SMALL.lineHeight,
                    color: palette.textMuted,
                    marginBottom: "4px",
                }, children: label ??
                    "If the button does not work, copy and paste this URL into your browser:" }), _jsx("a", { href: url, style: {
                    fontFamily: FONT_MONO,
                    fontSize: TYPE_SMALL.fontSize,
                    lineHeight: TYPE_SMALL.lineHeight,
                    color: theme.accent,
                    textDecoration: "underline",
                    wordBreak: "break-all",
                }, children: url })] }));
}
