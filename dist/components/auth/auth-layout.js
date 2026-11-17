import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "../../lib/cn";
import { Card, CardBody } from "../layout/card";
import { Heading } from "../typography/heading";
import { Text } from "../typography/text";
/**
 * AuthLayout — the single centered layout for login, registro, recuperación
 * and verificación (§16): a 320px (`w-80`) card on the page background, the
 * product brand on top, an optional title + subtitle, and a muted footer below
 * the card. Same skeleton for every auth screen — only the card content
 * changes, so the five products feel like the same house (§29).
 *
 * It RESPECTS the user's theme — v1's forced-dark login was a bug (§16). The
 * tokens flip themselves, so this renders light when the system asks for light.
 * Never hard-code a dark surface here.
 *
 * Server-component safe.
 */
export function AuthLayout({ logo, title, subtitle, children, footer, className, ...props }) {
    return (_jsx("div", { className: cn("grid min-h-dvh place-items-center bg-bg p-4", className), ...props, children: _jsxs("div", { className: "flex w-80 flex-col gap-6", children: [logo != null && _jsx("div", { className: "flex justify-center", children: logo }), _jsx(Card, { children: _jsxs(CardBody, { className: "flex flex-col gap-5", children: [(title != null || subtitle != null) && (_jsxs("div", { className: "flex flex-col gap-1 text-center", children: [title != null && (_jsx(Heading, { level: 1, visual: "h3", children: title })), subtitle != null && _jsx(Text, { tone: "secondary", children: subtitle })] })), children] }) }), footer != null && (_jsx("div", { className: "flex flex-col items-center gap-2 text-center text-caption text-text-muted", children: footer }))] }) }));
}
