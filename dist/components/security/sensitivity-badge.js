import { jsx as _jsx } from "react/jsx-runtime";
import { Building2, Globe, Lock, ShieldAlert } from "lucide-react";
import { cn } from "../../lib/cn";
import { Badge } from "../feedback/badge";
const SENSITIVITY_LABEL = {
    public: "Public",
    private: "Private",
    sensitive: "Sensitive",
    secret: "Secret",
};
const SENSITIVITY_ICON = {
    public: Globe,
    private: Building2,
    sensitive: ShieldAlert,
    secret: Lock,
};
/**
 * Runtime guard for the four §20 levels — the one place that knows the set,
 * so a caller fed unvalidated data (e.g. a table cell) can fall back safely
 * instead of guessing.
 */
export function isSensitivityLevel(value) {
    return value === "public" || value === "private" || value === "sensitive" || value === "secret";
}
/**
 * Tone of a sensitivity level by its exposure (§20): public is neutral,
 * private (org members only) is info, sensitive (explicit permission,
 * audit-logged) is warning, secret (masked, never logged or in a URL) is
 * danger. Fixed per level — a system token, not a per-screen decision.
 */
export function sensitivityTone(level) {
    switch (level) {
        case "public":
            return "neutral";
        case "private":
            return "info";
        case "sensitive":
            return "warning";
        case "secret":
            return "danger";
    }
}
/**
 * SensitivityBadge — the §20 sensitivity-level chip: público (neutral),
 * privado (info, org members only), sensible (warning, explicit permission +
 * audit-logged) and secreto (danger, masked by default, never logged or in a
 * URL). The four levels are "un token del sistema, no una decisión por
 * pantalla" — use this anywhere a resource's sensitivity is surfaced (a
 * resource detail header, a form), not only inside DataTable's `sensitivity`
 * cell, which composes this same badge. Use `sensitivityTone(level)` alone
 * when you need the tone without the badge.
 */
export function SensitivityBadge({ level, tone, showIcon = false, children, className, ...props }) {
    return (_jsx(Badge, { tone: tone ?? sensitivityTone(level), icon: showIcon ? SENSITIVITY_ICON[level] : undefined, className: cn(className), ...props, children: children ?? SENSITIVITY_LABEL[level] }));
}
