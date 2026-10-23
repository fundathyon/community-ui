import { type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
/**
 * The admonition kinds (§26). `note`, `warning`, and `danger` map to their
 * matching semantic tone. `tip` maps to the ACCENT — §26 "Consejo … Único uso
 * del acento en docs": Tip is the spec's one sanctioned use of the brand
 * color in the docs callout system (this was previously wired to `important`
 * by mistake; fixed below). `aside` (§26 "Ejemplo") is intentionally
 * neutral/colorless — "no es un aviso", not a warning-family callout at all.
 * `important` is a pre-existing kind beyond the spec's 5 tones, kept for
 * emphatic brand callouts; it also renders in the accent, a known second use
 * left as-is (out of scope for this pass — see admonition.test.tsx).
 */
export type AdmonitionKind = "note" | "tip" | "warning" | "danger" | "important" | "aside";
export interface AdmonitionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Which callout kind. Prefer the named presets (Note/Tip/Warning/Danger/Aside/Important). */
    kind: AdmonitionKind;
    /** Heading of the callout. Defaults to the kind's name; always overridable. */
    title?: ReactNode;
    /** Override the kind's fixed icon — rarely justified (§07). */
    icon?: LucideIcon;
}
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
export declare function Admonition({ kind, title, icon, className, children, ...props }: AdmonitionProps): import("react").JSX.Element;
/** Note (§26) — context worth knowing. Info tone. */
export declare function Note({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
/** Tip (§26) — an optional recommendation. The one sanctioned accent use in docs. */
export declare function Tip({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
/** Warning (§26) — may have consequences. Warning tone. */
export declare function Warning({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
/** Danger (§26) — permanently destroys data. Danger tone. */
export declare function Danger({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
/** Important (§26) — brand emphasis, a pre-existing kind beyond the spec's 5 tones. */
export declare function Important({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
/**
 * Aside (§26 "Ejemplo") — the spec's 5th, neutral tone: colorless, "no es un
 * aviso" (not a warning-family callout at all).
 *
 * Named `Aside`, not `Example` — `Example` already names the unrelated
 * tabs+code walkthrough component in this domain (see example.tsx). Reusing
 * that name here would conflate two different things: this is a plain
 * neutral callout, that is a structural preview/code block.
 */
export declare function Aside({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
