import { describe, expect, it } from "vitest";
import { describeSchedule, looksLikeCron } from "../../src/components/crons/schedule";
import { logLineTone } from "../../src/components/crons/log-lines";

describe("describeSchedule", () => {
  it("names presets, keeps raw expressions and labels manual jobs", () => {
    expect(describeSchedule("*/5 * * * *")).toBe("Every 5 minutes");
    expect(describeSchedule("7 4 * * 2")).toBe("7 4 * * 2");
    expect(describeSchedule(undefined)).toBe("Manual");
    expect(describeSchedule("", { manualLabel: "A mano" })).toBe("A mano");
    expect(describeSchedule("0 * * * *", { presets: [{ value: "0 * * * *", label: "Cada hora" }] })).toBe("Cada hora");
  });
});

describe("looksLikeCron", () => {
  it("accepts 5-field expressions and descriptors only", () => {
    expect(looksLikeCron("*/15 * * * *")).toBe(true);
    expect(looksLikeCron("@daily")).toBe(true);
    expect(looksLikeCron("* * * *")).toBe(false);
    expect(looksLikeCron("@sometimes")).toBe(false);
  });
});

describe("logLineTone", () => {
  it("tints by text, not by stream", () => {
    expect(logLineTone("Cloning into 'repo'...")).toBe("default");
    expect(logLineTone("error: connection refused")).toBe("danger");
    expect(logLineTone("npm WARN deprecated")).toBe("warning");
  });
});
