import type { HTMLAttributes } from "react";
/** Body copy variants of the type scale (§03). */
export type TextVariant = "body" | "body-sm" | "label" | "caption" | "overline" | "code";
/** Text color role — a hierarchy of emphasis, never a semantic state. */
export type TextTone = "default" | "secondary" | "muted" | "disabled";
/** Elements Text may render as. Defaults to `p` for `body`, `span` otherwise. */
export type TextElement = "p" | "span" | "div" | "dt" | "dd" | "figcaption";
export interface TextProps extends HTMLAttributes<HTMLElement> {
    /** body 13 (UI base) · body-sm 12 · label 12/500 · caption 11 (hints) ·
     * overline caps · code mono (§03). */
    variant?: TextVariant;
    tone?: TextTone;
    /** Rendered element. Defaults to `p` for `body`, `span` for the rest. */
    as?: TextElement;
    /** Tabular figures — numbers in data are ALWAYS tabular (§03). */
    tabular?: boolean;
}
/**
 * Text — body copy on the level-named type scale (§03). `variant` is the level,
 * `tone` the emphasis. `code` is semantic: mono means "literal and copyable"
 * (paths, digests, commands, IDs) — if the user won't copy or compare it
 * character by character, it belongs in Inter.
 *
 * Server-component safe.
 */
export declare function Text({ variant, tone, as, tabular, className, ...props }: TextProps): import("react").JSX.Element;
