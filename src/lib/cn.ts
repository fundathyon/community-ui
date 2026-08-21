import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge must learn our level-named type scale — otherwise classes
 * like `text-h1` would be classified as text *color* and wrongly merged
 * against `text-text-muted` and friends.
 */
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
