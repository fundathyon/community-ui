import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * Regression guard for the double focus-ring bug.
 *
 * `base.css` is `@import`ed by consumers unlayered. An UNLAYERED rule beats
 * every cascade layer regardless of specificity — so if the global
 * `:focus-visible` ring is unlayered, a composite control's inner
 * `outline-none` (in Tailwind's `utilities` layer) can never suppress it, and
 * the inner element paints a SECOND ring on top of the wrapper's. The ring MUST
 * live in `@layer base` so `outline-none` in `utilities` wins.
 */
describe("global focus ring", () => {
  const base = readFileSync(join(__dirname, "../../src/styles/base.css"), "utf8");

  it("declares the :focus-visible ring inside @layer base", () => {
    // The focus-visible ring block must be wrapped by an @layer base { … }.
    const layerBase = base.match(/@layer\s+base\s*\{[\s\S]*?:focus-visible[\s\S]*?\}/);
    expect(layerBase, "expected an `@layer base { … :focus-visible … }` block").not.toBeNull();
  });

  it("never declares :focus-visible with an outline at the top level (unlayered)", () => {
    // Strip every @layer block, then assert no bare :focus-visible{outline…} remains.
    // The only :focus-visible outline rule must be preceded (in the same file) by
    // `@layer base` and not appear outside any layer.
    const withoutLayers = base.replace(/@layer[^{]*\{(?:[^{}]|\{[^{}]*\})*\}/g, "");
    expect(withoutLayers).not.toMatch(/:focus-visible\s*\{[^}]*outline/);
  });
});
