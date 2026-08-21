import type { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

/** Body copy variants of the type scale (§03). */
export type TextVariant = "body" | "body-sm" | "label" | "caption" | "overline" | "code";

/** Text color role — a hierarchy of emphasis, never a semantic state. */
export type TextTone = "default" | "secondary" | "muted" | "disabled";

/** Elements Text may render as. Defaults to `p` for `body`, `span` otherwise. */
export type TextElement = "p" | "span" | "div" | "dt" | "dd" | "figcaption";

const variantClasses: Record<TextVariant, string> = {
  body: "text-body",
  "body-sm": "text-body-sm",
  label: "text-label",
  caption: "text-caption",
  // The scale's tracking comes from the token; caps are part of the style.
  overline: "text-overline uppercase",
  // Mono means "literal and copyable" (§03) — never decorative.
  code: "text-code font-mono",
};

const toneClasses: Record<TextTone, string> = {
  default: "text-text",
  secondary: "text-text-secondary",
  muted: "text-text-muted",
  disabled: "text-text-disabled",
};

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
export function Text({ variant = "body", tone = "default", as, tabular = false, className, ...props }: TextProps) {
  const Tag = as ?? (variant === "body" ? "p" : "span");
  return (
    <Tag
      className={cn(variantClasses[variant], toneClasses[tone], tabular && "tabular-nums", className)}
      {...props}
    />
  );
}
