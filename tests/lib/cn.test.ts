import { describe, expect, it } from "vitest";
import { cn } from "../../src/lib/cn";

describe("cn — Tailwind-aware conflict resolution", () => {
  it("keeps the level-named type scale separate from text colors", () => {
    // text-h1 is a font-size, text-text-muted is a color: both must survive.
    expect(cn("text-h1 text-text-muted")).toBe("text-h1 text-text-muted");
  });

  it("collapses two type-scale sizes to the last", () => {
    expect(cn("text-body text-h2")).toBe("text-h2");
  });

  it("collapses two text colors to the last", () => {
    expect(cn("text-text-muted text-text")).toBe("text-text");
  });

  it("overrides radius, padding and surface tokens", () => {
    expect(cn("rounded-md rounded-xl")).toBe("rounded-xl");
    expect(cn("px-2 px-3")).toBe("px-3");
    expect(cn("bg-surface bg-surface-raised")).toBe("bg-surface-raised");
  });

  it("collapses named control-height spacing tokens (consumer override wins)", () => {
    // A CVA size variant emits h-control-sm; a consumer className override to
    // h-control-lg must win — not leave both classes fighting on source order.
    expect(cn("h-control-sm h-control-lg")).toBe("h-control-lg");
    expect(cn("w-sidebar w-sidebar-collapsed")).toBe("w-sidebar-collapsed");
    expect(cn("max-w-modal-sm max-w-modal-lg")).toBe("max-w-modal-lg");
  });

  it("dedupes and applies clsx conditionals", () => {
    expect(cn("px-2", false && "px-4", null, "py-1")).toBe("px-2 py-1");
  });
});
