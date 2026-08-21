import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Post-signup welcome (§27 Organización group). Direct, no marketing tone.
 */
import { useContext } from "react";
import { EmailButton } from "../email-button";
import { EmailCard } from "../email-card";
import { EmailLayout } from "../email-layout";
import { EmailHeading, EmailText } from "../email-typography";
import { FONT_SANS, TYPE_BODY } from "../palette";
import { EmailThemeContext } from "../theme";
import { Greeting } from "./shared";
/** Accent-colored link row inside the getting-started card. */
function GettingStartedLink({ link }) {
    const theme = useContext(EmailThemeContext);
    return (_jsx("div", { style: {
            fontFamily: FONT_SANS,
            fontSize: TYPE_BODY.fontSize,
            lineHeight: TYPE_BODY.lineHeight,
            marginBottom: "4px",
        }, children: _jsx("a", { href: link.href, style: { color: theme.accent, textDecoration: "underline" }, children: link.label }) }));
}
/**
 * Welcome email: account is ready, one CTA into the product, optional
 * getting-started links. The only template allowed a warm register — still
 * no exclamation marks (§17).
 */
export function WelcomeEmail({ theme, recipientName, greeting, preheader, ctaUrl, ctaLabel, gettingStarted, heading, body = "Your account is ready.", gettingStartedTitle = "Getting started", }) {
    const resolvedHeading = heading ?? `Welcome to ${theme.productName}`;
    return (_jsxs(EmailLayout, { theme: theme, title: resolvedHeading, preheader: preheader ?? resolvedHeading, children: [_jsx(Greeting, { recipientName: recipientName, greeting: greeting }), _jsx(EmailHeading, { children: resolvedHeading }), _jsx(EmailText, { children: body }), _jsx(EmailButton, { href: ctaUrl, children: ctaLabel ?? `Open ${theme.productName}` }), gettingStarted && gettingStarted.length > 0 ? (_jsx(EmailCard, { title: gettingStartedTitle, children: gettingStarted.map((link) => (_jsx(GettingStartedLink, { link: link }, link.href))) })) : null] }));
}
