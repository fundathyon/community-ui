import { jsx as _jsx } from "react/jsx-runtime";
import { FONT_SANS, palette, TYPE_BODY, TYPE_HEADING, TYPE_SMALL, } from "./palette";
/**
 * Body paragraph for email content. Use for every sentence of copy; never
 * emit a bare `<p>` (clients strip un-styled defaults). One idea per paragraph.
 */
export function EmailText({ size = "body", color, align, children, }) {
    const type = size === "small" ? TYPE_SMALL : TYPE_BODY;
    return (_jsx("p", { style: {
            margin: "0 0 16px",
            fontFamily: FONT_SANS,
            fontSize: type.fontSize,
            lineHeight: type.lineHeight,
            color: color ?? palette.text,
            textAlign: align,
        }, children: children }));
}
/**
 * The single heading of an email — one per message, right under the header.
 * 20/28 at weight 600 (§03 forbids 700 below 15px; 600 everywhere here).
 */
export function EmailHeading({ align, children }) {
    return (_jsx("h1", { style: {
            margin: "0 0 12px",
            fontFamily: FONT_SANS,
            fontSize: TYPE_HEADING.fontSize,
            lineHeight: TYPE_HEADING.lineHeight,
            fontWeight: TYPE_HEADING.fontWeight,
            color: palette.text,
            textAlign: align,
        }, children: children }));
}
/**
 * Muted small text — security notes, expiry hints, request metadata.
 * 12/18 in `--fdn-text-muted`; still AA on the surface.
 */
export function EmailMuted({ align, children }) {
    return (_jsx(EmailText, { size: "small", color: palette.textMuted, align: align, children: children }));
}
