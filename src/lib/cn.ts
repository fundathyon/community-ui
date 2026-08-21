import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must learn two families of custom utilities so overrides
 * collapse correctly:
 *
 *  1. Our level-named type scale — otherwise `text-h1` would be classified as
 *     a text *color* and wrongly merged against `text-text-muted`.
 *  2. Our named spacing tokens (`control`, `sidebar`, `header`, …) — otherwise
 *     `h-control-sm` and `h-control-lg` look like unrelated custom values and a
 *     consumer's `className="h-control-lg"` would not override a variant's
 *     `h-control-sm` (both would survive, CSS source-order decides — a bug).
 */
const NAMED_SPACING = [
  "control",
  "control-xs",
  "control-sm",
  "control-md",
  "control-lg",
  "sidebar",
  "sidebar-collapsed",
  "header",
  "container-max",
  "prose-max",
  "modal-sm",
  "modal-md",
  "modal-lg",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "body",
            "body-sm",
            "label",
            "caption",
            "overline",
            "code",
          ],
        },
      ],
      // Named spacing tokens participate in the standard h/w/min-*/max-*/size groups.
      h: [{ h: NAMED_SPACING }],
      w: [{ w: NAMED_SPACING }],
      "min-h": [{ "min-h": NAMED_SPACING }],
      "max-h": [{ "max-h": NAMED_SPACING }],
      "min-w": [{ "min-w": NAMED_SPACING }],
      "max-w": [{ "max-w": NAMED_SPACING }],
      size: [{ size: NAMED_SPACING }],
    },
  },
});

/**
 * Merge class names with Tailwind-aware conflict resolution.
 * The single class utility of the design system — every component uses it.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
