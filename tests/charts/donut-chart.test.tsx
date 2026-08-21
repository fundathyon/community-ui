import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DonutChart, type DonutSegment } from "../../src/charts/donut-chart";

const segments: DonutSegment[] = [
  { name: "Email + contraseña", value: 62 },
  { name: "Google", value: 24 },
  { name: "WebAuthn", value: 11 },
  { name: "Magic link", value: 3 },
];

describe("DonutChart — list variant (§22 distribución)", () => {
  it("renders each category with its share as a percentage", () => {
    render(<DonutChart label="Distribución por provider" variant="list" segments={segments} />);
    // 62 / 100 = 62.0 %
    expect(screen.getAllByText(/62\.0 %/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/24\.0 %/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/3\.0 %/).length).toBeGreaterThan(0);
  });

  it("provides the equivalent table for screen readers", () => {
    render(<DonutChart label="Distribución por provider" variant="list" segments={segments} />);
    const table = screen.getByRole("table");
    // header + one row per segment.
    expect(within(table).getAllByRole("row")).toHaveLength(segments.length + 1);
  });
});

describe("DonutChart — donut variant", () => {
  it("lists the segments beside the ring and renders the center slot", () => {
    render(
      <DonutChart
        label="Distribución por provider"
        variant="donut"
        segments={segments}
        width={200}
        height={200}
        centerLabel={<span>100</span>}
      />,
    );
    expect(screen.getByText("Email + contraseña", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("derives empty when every value is zero", () => {
    render(
      <DonutChart
        label="Distribución"
        segments={[{ name: "A", value: 0 }, { name: "B", value: 0 }]}
      />,
    );
    expect(screen.getByText("No data in this interval")).toBeInTheDocument();
  });
});
