"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "../forms/checkbox";
import { Card, CardBody } from "../layout/card";
import { TokenDisplay } from "../dev/token-display";
/**
 * TokenReveal — the one-time reveal of a freshly created token (§20), composed
 * from the dev TokenDisplay plus an "I've stored it safely" checkbox that gates
 * the app's Continue. After this screen the token is only ever shown masked
 * (render the stored value with Secret from then on).
 */
export function TokenReveal({ value, warning, expiryNote, confirmLabel = "I've stored this token safely", onConfirmed, copyLabel, copiedLabel, }) {
    const [confirmed, setConfirmed] = useState(false);
    return (_jsx(Card, { children: _jsxs(CardBody, { className: "flex flex-col gap-3", children: [_jsx(TokenDisplay, { value: value, warning: warning, copyLabel: copyLabel, copiedLabel: copiedLabel }), expiryNote != null && _jsx("p", { className: "text-caption text-text-muted", children: expiryNote }), _jsx(Checkbox, { label: confirmLabel, checked: confirmed, onCheckedChange: (checked) => {
                        const next = checked === true;
                        setConfirmed(next);
                        onConfirmed?.(next);
                    } })] }) }));
}
