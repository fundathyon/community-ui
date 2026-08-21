import { type LucideIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
/**
 * The five admonition kinds (§26). Four map to the semantic tones; `important`
 * maps to the ACCENT — the only sanctioned use of the brand color in docs
 * (§26 "Consejo … Único uso del acento en docs" is extended to the emphatic
 * "Important" callout): it is brand emphasis, never a state, so it never uses a
 * tone token.
 */
export type AdmonitionKind = "note" | "tip" | "warning" | "danger" | "important";
export interface AdmonitionProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Which of the five callouts. Prefer the named presets (Note/Tip/…). */
    kind: AdmonitionKind;
    /** Heading of the callout. Defaults to the kind's name; always overridable. */
    title?: ReactNode;
    /** Override the kind's fixed icon — rarely justified (§07). */
    icon?: LucideIcon;
}
/**
 * Admonition — the one callout component behind the five docs presets (§26).
 * A 2px side bar (not a full border, which is what separates it from the
 * product Alert), a tonal wash, a fixed icon per kind and an optional title.
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
/** Tip (§26) — an optional recommendation. Success tone. */
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
/** Important (§26) — brand emphasis, the sanctioned docs use of the accent. */
export declare function Important({ kind: _kind, ...props }: Omit<AdmonitionProps, "kind"> & {
    kind?: never;
}): import("react").JSX.Element;
