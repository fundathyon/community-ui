/**
 * Internal: the 4px-scale gaps the layout primitives accept (§04).
 * A fixed record — never build `gap-${n}` dynamically, Tailwind can't see it.
 * Not exported from the barrel.
 */
export type GapScale = 1 | 1.5 | 2 | 3 | 4 | 6 | 8 | 10;

export const gapClasses: Record<GapScale, string> = {
  1: "gap-1",
  1.5: "gap-1.5",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
};
