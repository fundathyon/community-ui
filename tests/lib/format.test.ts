import { describe, expect, it } from "vitest";
import { formatNumber } from "../../src/lib/format";

describe("formatNumber", () => {
  it("groups four-digit numbers like the longer ones (es-ES)", () => {
    // Without forcing it, es-ES prints "8210" next to "24.816".
    expect(formatNumber(8210)).toBe("8.210");
    expect(formatNumber(24816)).toBe("24.816");
  });

  it("follows the locale's separator", () => {
    expect(formatNumber(8210, "en")).toBe("8,210");
  });

  it("leaves small numbers alone and dashes what is not a number", () => {
    expect(formatNumber(999)).toBe("999");
    expect(formatNumber(Number.NaN)).toBe("—");
  });
});
