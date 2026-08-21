import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Heatmap, type HeatmapCell } from "../../src/charts/heatmap";

const data: HeatmapCell[] = [
  { x: "L", y: "AM", value: 0 },
  { x: "M", y: "AM", value: 5 },
  { x: "L", y: "PM", value: 10 },
  { x: "M", y: "PM", value: 20 },
];

describe("Heatmap", () => {
  it("renders one cell per datum and buckets each onto the 5-step ramp", () => {
    const { container } = render(
      <Heatmap label="Actividad" data={data} xLabels={["L", "M"]} yLabels={["AM", "PM"]} />,
    );
    const cells = container.querySelectorAll(".fdn-heatmap-cell");
    expect(cells).toHaveLength(4);
    for (const cell of Array.from(cells)) {
      const level = Number(cell.getAttribute("data-level"));
      expect(level).toBeGreaterThanOrEqual(0);
      expect(level).toBeLessThanOrEqual(4);
    }
    // Highest value lands on the top of the ramp, lowest at the bottom.
    const levels = Array.from(cells).map((c) => Number(c.getAttribute("data-level")));
    expect(Math.max(...levels)).toBe(4);
    expect(Math.min(...levels)).toBe(0);
  });

  it("renders a min→max ramp legend of five swatches", () => {
    const { container } = render(
      <Heatmap label="Actividad" data={data} xLabels={["L", "M"]} yLabels={["AM", "PM"]} />,
    );
    // The legend keeps its five ramp swatches; min and max readouts flank them
    // (the same numbers also appear in the hidden table, hence getAllByText).
    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
    expect(screen.getAllByText("20").length).toBeGreaterThan(0);
    const swatches = container.querySelectorAll(".size-3");
    expect(swatches.length).toBe(5);
  });

  it("backs the grid with the accessible equivalent table", () => {
    render(<Heatmap label="Actividad" data={data} xLabels={["L", "M"]} yLabels={["AM", "PM"]} />);
    const table = screen.getByRole("table");
    // header + one row per y label.
    expect(within(table).getAllByRole("row")).toHaveLength(3);
  });
});
