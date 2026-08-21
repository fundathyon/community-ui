import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TimelineChart, type TimelineSegment } from "../../src/charts/timeline-chart";

const day = 24 * 60 * 60 * 1000;
const base = new Date("2026-05-01T00:00:00Z").getTime();
const segments: TimelineSegment[] = [
  { start: base, end: base + 30 * day, status: "up" },
  { start: base + 30 * day, end: base + 32 * day, status: "degraded" },
  { start: base + 32 * day, end: base + 90 * day, status: "up" },
];

describe("TimelineChart", () => {
  it("renders one band segment per input with a hover title", () => {
    const { container } = render(
      <TimelineChart label="Salud de Accounts API" segments={segments} />,
    );
    const titled = container.querySelectorAll("[title]");
    expect(titled).toHaveLength(segments.length);
    // The degraded slice reads as degraded, never as danger (§23).
    expect(container.querySelector('[title*="Degradado"]')).toBeTruthy();
  });

  it("shows the overridable end captions and the availability slot", () => {
    render(
      <TimelineChart
        label="Salud"
        segments={segments}
        availabilityLabel="99,98 %"
        startCaption="hace 90 d"
        endCaption="hoy"
      />,
    );
    expect(screen.getByText("hace 90 d")).toBeInTheDocument();
    expect(screen.getByText("hoy")).toBeInTheDocument();
    expect(screen.getByText("99,98 %")).toBeInTheDocument();
  });

  it("backs the strip with the accessible equivalent table", () => {
    render(<TimelineChart label="Salud" segments={segments} />);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("row")).toHaveLength(segments.length + 1);
  });

  it("derives empty with no segments", () => {
    render(<TimelineChart label="Salud" segments={[]} />);
    expect(screen.getByText("Sin datos en este intervalo")).toBeInTheDocument();
  });
});
