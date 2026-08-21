import { describe, expect, it } from "vitest";
import { accentAtOpacity, resolveSeriesColor, resolveSeriesColors } from "../../src/charts/color";
import type { ChartSeries } from "../../src/charts/types";

describe("resolveSeriesColor", () => {
  it("maps the accent to its solid token (neutral volume series, §02)", () => {
    expect(resolveSeriesColor("accent")).toBe("var(--fdn-accent-solid)");
    expect(resolveSeriesColor()).toBe("var(--fdn-accent-solid)");
  });

  it("maps each semantic tone to its own token (state, never the accent)", () => {
    expect(resolveSeriesColor("success")).toBe("var(--fdn-success-text)");
    expect(resolveSeriesColor("warning")).toBe("var(--fdn-warning-text)");
    expect(resolveSeriesColor("danger")).toBe("var(--fdn-danger-text)");
    expect(resolveSeriesColor("info")).toBe("var(--fdn-info-text)");
  });

  it("fades one hue down the categorical opacity ladder (§22 single hue)", () => {
    // Index 0 is full-strength accent; the rest fade the SAME token.
    expect(resolveSeriesColor({ categorical: 0 })).toBe("var(--fdn-accent-solid)");
    expect(resolveSeriesColor({ categorical: 1 })).toBe(
      "color-mix(in oklab, var(--fdn-accent-solid) 75%, transparent)",
    );
    expect(resolveSeriesColor({ categorical: 2 })).toBe(
      "color-mix(in oklab, var(--fdn-accent-solid) 55%, transparent)",
    );
    // Wraps around the 5-step ladder rather than inventing new hues.
    expect(resolveSeriesColor({ categorical: 5 })).toBe(resolveSeriesColor({ categorical: 0 }));
  });
});

describe("resolveSeriesColors", () => {
  it("defaults uncoloured series onto the descending-opacity ramp by position", () => {
    const series: ChartSeries[] = [
      { name: "A", data: [] },
      { name: "B", data: [] },
    ];
    expect(resolveSeriesColors(series)).toEqual([
      "var(--fdn-accent-solid)",
      "color-mix(in oklab, var(--fdn-accent-solid) 75%, transparent)",
    ]);
  });

  it("lets an explicit semantic colour win over the ramp", () => {
    const series: ChartSeries[] = [
      { name: "Correctos", data: [], color: "success" },
      { name: "Fallidos", data: [], color: "danger" },
    ];
    expect(resolveSeriesColors(series)).toEqual([
      "var(--fdn-success-text)",
      "var(--fdn-danger-text)",
    ]);
  });
});

describe("accentAtOpacity", () => {
  it("returns the solid token at full strength and a color-mix below it", () => {
    expect(accentAtOpacity(1)).toBe("var(--fdn-accent-solid)");
    expect(accentAtOpacity(0.4)).toBe(
      "color-mix(in oklab, var(--fdn-accent-solid) 40%, transparent)",
    );
  });
});
