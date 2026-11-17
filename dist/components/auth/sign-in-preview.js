import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
const DEFAULT_LABELS = {
    title: "Sign in to {app}",
    titleGeneric: "Sign in",
    subtitle: "To continue to {app}",
    passwordlessTitle: "Sign in to {app}",
    passwordlessSubtitle: "We will email you a code",
    email: "Email",
    emailPlaceholder: "you@company.com",
    password: "Password",
    forgotPassword: "Forgot it?",
    submit: "Sign in",
    sendCode: "Send code",
    sendMagicLink: "Email me a sign-in link",
    useCode: "Use an email code",
    continueWith: "Continue with {provider}",
    or: "or",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
    unavailable: "Sign-in is not available right now.",
    protectedBy: "Secured by Foundathyon Accounts",
};
// Documented exception to "tokens only": this draws ANOTHER product's UI — the
// Accounts web component, with its own fixed palette and the app's accent —
// not ours, so it must not follow our theme or flip with it.
const PALETTE = {
    light: {
        canvas: "oklch(0.975 0.002 260)",
        surface: "oklch(1 0 0)",
        border: "oklch(0.9 0.004 260)",
        borderStrong: "oklch(0.84 0.006 260)",
        text: "oklch(0.21 0.006 260)",
        muted: "oklch(0.52 0.01 260)",
    },
    dark: {
        canvas: "oklch(0.16 0.004 260)",
        surface: "oklch(0.205 0.005 260)",
        border: "oklch(0.29 0.006 260)",
        borderStrong: "oklch(0.36 0.008 260)",
        text: "oklch(0.96 0.003 260)",
        muted: "oklch(0.7 0.01 260)",
    },
};
/** CSS colour of the accent, as `<accounts-sign-in>` resolves it. */
export function signInAccentColor(accent, scheme) {
    if (accent === "neutral")
        return scheme === "dark" ? "oklch(0.96 0 0)" : "oklch(0.21 0 0)";
    return `oklch(${accent.l} ${accent.c} ${accent.hue})`;
}
/** Text colour on top of the accent. */
export function signInAccentOnColor(accent, scheme) {
    if (accent === "neutral")
        return scheme === "dark" ? "oklch(0.21 0 0)" : "oklch(0.99 0 0)";
    return accent.l > 0.7 ? "oklch(0.21 0 0)" : "oklch(0.99 0 0)";
}
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);
function safeLogoUrl(raw) {
    const value = raw?.trim() ?? "";
    if (!value)
        return "";
    try {
        const url = new URL(value);
        if (url.protocol === "https:" || (url.protocol === "http:" && LOCAL_HOSTS.has(url.hostname)))
            return value;
    }
    catch {
        // not a URL
    }
    return "";
}
function providerName(provider) {
    return provider.charAt(0).toUpperCase() + provider.slice(1);
}
/**
 * SignInPreview — a static picture of the Accounts embedded `<accounts-sign-in>`
 * first screen (320px card, one primary CTA, alternatives and OAuth under the
 * divider). It draws only: no requests, no inputs, `aria-hidden`. Use it to
 * preview branding/strategy settings or to show the component in marketing.
 * For a working sign-in screen, use LoginForm inside AuthLayout (§16).
 *
 * Server-component safe.
 */
export function SignInPreview({ branding, strategies, scheme = "light", hideBranding = false, labels, className, style, ...props }) {
    const copy = { ...DEFAULT_LABELS, ...labels };
    const m = (key, params = {}) => {
        let value = copy[key];
        for (const [k, v] of Object.entries(params))
            value = value.replace(`{${k}}`, v);
        return value;
    };
    const c = PALETTE[scheme];
    const accent = signInAccentColor(branding.accent, scheme);
    const onAccent = signInAccentOnColor(branding.accent, scheme);
    const name = branding.name.trim();
    const logo = safeLogoUrl(branding.logoUrl);
    const passwordless = !strategies.password && (strategies.emailCode || strategies.magicLink);
    const nothing = !strategies.password && !strategies.emailCode && !strategies.magicLink && strategies.oauth.length === 0;
    const title = passwordless
        ? name
            ? m("passwordlessTitle", { app: name })
            : m("titleGeneric")
        : name
            ? m("title", { app: name })
            : m("titleGeneric");
    const subtitle = passwordless
        ? strategies.emailCode
            ? m("passwordlessSubtitle")
            : ""
        : name
            ? m("subtitle", { app: name })
            : "";
    const field = {
        height: 32,
        borderRadius: 6,
        border: `1px solid ${c.borderStrong}`,
        background: c.surface,
        padding: "0 10px",
        display: "flex",
        alignItems: "center",
        fontSize: 13,
        color: c.muted,
    };
    const primary = {
        height: 32,
        borderRadius: 6,
        background: accent,
        color: onAccent,
        fontSize: 12,
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };
    const secondary = {
        ...primary,
        background: c.surface,
        color: c.text,
        border: `1px solid ${c.borderStrong}`,
        gap: 8,
    };
    const label = { fontSize: 12, fontWeight: 500, color: c.text, marginBottom: 6 };
    const alternatives = [];
    if (strategies.password && strategies.emailCode) {
        alternatives.push(_jsx("div", { style: secondary, children: m("useCode") }, "code"));
    }
    if ((strategies.password || strategies.emailCode) && strategies.magicLink) {
        alternatives.push(_jsx("div", { style: secondary, children: m("sendMagicLink") }, "magic"));
    }
    for (const provider of strategies.oauth) {
        alternatives.push(_jsx("div", { style: secondary, children: m("continueWith", { provider: providerName(provider) }) }, provider));
    }
    const hasPrimaryForm = strategies.password || strategies.emailCode || strategies.magicLink;
    return (_jsxs("div", { "data-scheme": scheme, "aria-hidden": true, className: cn(className), style: {
            background: c.canvas,
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            ...style,
        }, ...props, children: [branding.layout === "split" && (_jsx("div", { style: {
                    width: 320,
                    maxWidth: "100%",
                    borderRadius: 12,
                    padding: "18px 20px",
                    background: accent,
                    color: onAccent,
                    fontSize: 15,
                    fontWeight: 600,
                }, children: name || m("titleGeneric") })), _jsxs("div", { style: {
                    width: 320,
                    maxWidth: "100%",
                    background: c.surface,
                    border: `1px solid ${c.border}`,
                    borderRadius: 12,
                    padding: 24,
                    boxShadow: scheme === "dark" ? "none" : "0 1px 2px oklch(0 0 0 / 0.06)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    color: c.text,
                }, children: [_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [logo ? (_jsx("img", { src: logo, alt: "", style: { height: 32, width: "auto", maxWidth: 140, objectFit: "contain", alignSelf: "flex-start" } })) : name ? (_jsx("div", { style: {
                                    height: 32,
                                    width: 32,
                                    borderRadius: 8,
                                    background: accent,
                                    color: onAccent,
                                    display: "grid",
                                    placeItems: "center",
                                    fontWeight: 600,
                                    fontSize: 14,
                                }, children: name.charAt(0).toUpperCase() })) : null, _jsxs("div", { children: [_jsx("div", { "data-slot": "title", style: { fontSize: 17, fontWeight: 600, lineHeight: 1.3 }, children: title }), subtitle && _jsx("div", { style: { fontSize: 13, color: c.muted, marginTop: 4 }, children: subtitle })] })] }), nothing ? (_jsx("div", { style: { fontSize: 12, color: c.muted, border: `1px solid ${c.border}`, borderRadius: 8, padding: 12 }, children: m("unavailable") })) : (_jsxs(_Fragment, { children: [hasPrimaryForm && (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [_jsxs("div", { children: [_jsx("div", { style: label, children: m("email") }), _jsx("div", { style: field, children: m("emailPlaceholder") })] }), strategies.password && (_jsxs("div", { children: [_jsxs("div", { style: { ...label, display: "flex", justifyContent: "space-between" }, children: [_jsx("span", { children: m("password") }), _jsx("span", { style: { color: c.muted, fontWeight: 400 }, children: m("forgotPassword") })] }), _jsx("div", { style: field, children: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })] })), _jsx("div", { "data-slot": "cta", style: primary, children: strategies.password ? m("submit") : strategies.emailCode ? m("sendCode") : m("sendMagicLink") })] })), alternatives.length > 0 && (_jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [hasPrimaryForm && (_jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8, color: c.muted, fontSize: 11 }, children: [_jsx("span", { style: { flex: 1, height: 1, background: c.border } }), m("or"), _jsx("span", { style: { flex: 1, height: 1, background: c.border } })] })), alternatives] })), strategies.password && (_jsxs("div", { style: { fontSize: 12, color: c.muted, textAlign: "center" }, children: [m("noAccount"), " ", _jsx("span", { style: { color: c.text, fontWeight: 500 }, children: m("createAccount") })] }))] }))] }), !hideBranding && _jsx("div", { style: { fontSize: 11, color: c.muted }, children: m("protectedBy") })] }));
}
