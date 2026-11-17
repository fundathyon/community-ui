import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Info, Lightbulb, OctagonAlert, Sparkles, StickyNote, TriangleAlert } from "lucide-react";
import { cn } from "../lib/cn";
import { Icon } from "../components/typography/icon";
const KIND = {
    note: { icon: Info, title: "Note", bar: "border-info-border", wash: "bg-info-bg", text: "text-info" },
    // §26 "Consejo … Único uso del acento en docs" — Tip is the ONE accent-toned kind.
    tip: { icon: Lightbulb, title: "Tip", bar: "border-accent-border", wash: "bg-accent-bg", text: "text-accent" },
    warning: {
        icon: TriangleAlert,
        title: "Warning",
        bar: "border-warning-border",
        wash: "bg-warning-bg",
        text: "text-warning",
    },
    danger: {
        icon: OctagonAlert,
        title: "Danger",
        bar: "border-danger-border",
        wash: "bg-danger-bg",
        text: "text-danger",
    },
    important: {
        icon: Sparkles,
        title: "Important",
        bar: "border-accent-border",
        wash: "bg-accent-bg",
        text: "text-accent",
    },
    // §26 "Ejemplo" — neutral/colorless on purpose: explicitly not a warning-family callout.
    aside: {
        icon: StickyNote,
        title: "Aside",
        bar: "border-border",
        wash: "bg-bg-subtle",
        text: "text-text-secondary",
    },
};
/**
 * Admonition — the one callout component behind the docs presets (§26): the
 * spec's five tones (Note/Tip/Warning/Danger/Aside) plus the pre-existing
 * extra `Important`. A 2px side bar (not a full border, which is what
 * separates it from the product Alert), a tonal wash, a fixed icon per kind
 * and an optional title.
 *
 * Docs are static content, so — unlike Alert — an admonition carries NO
 * `role="alert"`/`status`: the icon and title convey the meaning. Max two per
 * page (§26); a third means the prose itself needs rewriting. Server-safe.
 */
export function Admonition({ kind, title, icon, className, children, ...props }) {
    const spec = KIND[kind];
    return (_jsxs("div", { "data-kind": kind, className: cn(
        // 2px left bar + wash, rounded like the app's other surfaces (§26).
        "my-4 rounded-lg border-l-2 p-3 text-sm leading-[1.7]", spec.bar, spec.wash, className), ...props, children: [_jsxs("div", { className: cn("mb-1 flex items-center gap-1.5 font-medium", spec.text), children: [_jsx(Icon, { icon: icon ?? spec.icon, size: 16 }), _jsx("span", { children: title ?? spec.title })] }), _jsx("div", { className: "text-text-secondary [&_a]:text-accent [&>*:first-child]:mt-0 [&>*:last-child]:mb-0", children: children })] }));
}
/** Note (§26) — context worth knowing. Info tone. */
export function Note({ kind: _kind, ...props }) {
    return _jsx(Admonition, { kind: "note", ...props });
}
/** Tip (§26) — an optional recommendation. The one sanctioned accent use in docs. */
export function Tip({ kind: _kind, ...props }) {
    return _jsx(Admonition, { kind: "tip", ...props });
}
/** Warning (§26) — may have consequences. Warning tone. */
export function Warning({ kind: _kind, ...props }) {
    return _jsx(Admonition, { kind: "warning", ...props });
}
/** Danger (§26) — permanently destroys data. Danger tone. */
export function Danger({ kind: _kind, ...props }) {
    return _jsx(Admonition, { kind: "danger", ...props });
}
/** Important (§26) — brand emphasis, a pre-existing kind beyond the spec's 5 tones. */
export function Important({ kind: _kind, ...props }) {
    return _jsx(Admonition, { kind: "important", ...props });
}
/**
 * Aside (§26 "Ejemplo") — the spec's 5th, neutral tone: colorless, "no es un
 * aviso" (not a warning-family callout at all).
 *
 * Named `Aside`, not `Example` — `Example` already names the unrelated
 * tabs+code walkthrough component in this domain (see example.tsx). Reusing
 * that name here would conflate two different things: this is a plain
 * neutral callout, that is a structural preview/code block.
 */
export function Aside({ kind: _kind, ...props }) {
    return _jsx(Admonition, { kind: "aside", ...props });
}
