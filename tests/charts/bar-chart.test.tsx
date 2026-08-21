import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BarChart, StackedBarChart } from "../../src/charts/bar-chart";
import type { ChartSeries } from "../../src/charts/types";

const series: ChartSeries[] = [
  { name: "Correctos", data: [{ x: "Email", y: 62 }, { x: "Google", y: 24 }], color: "success" },
  { name: "Fallidos", data: [{ x: "Email", y: 4 }, { x: "Google", y: 2 }], color: "danger" },
];

describe("BarChart", () => {
  it("renders a figure with a legend and the equivalent table", () => {
    render(<BarChart label="Intentos por provider" series={series} width={600} height={200} />);
    expect(screen.getByRole("figure", { name: "Intentos por provider" })).toBeInTheDocument();
    expect(screen.getByText("Correctos", { selector: "span" })).toBeInTheDocument();
    const table = screen.getByRole("table");
    // header + one row per category (Email, Google).
    expect(within(table).getAllByRole("row")).toHaveLength(3);
  });

  it("supports the horizontal orientation without leaking recharts to the caller", () => {
    render(<BarChart label="Intentos" series={series} horizontal width={600} height={200} />);
    expect(screen.getByRole("figure", { name: "Intentos" })).toBeInTheDocument();
  });

  it("StackedBarChart renders as the stacked preset", () => {
    render(<StackedBarChart label="Intentos apilados" series={series} width={600} height={200} />);
    expect(screen.getByRole("figure", { name: "Intentos apilados" })).toBeInTheDocument();
  });

  it("derives the empty state with no drawable values", () => {
    render(
      <BarChart
        label="Intentos"
        series={[{ name: "X", data: [{ x: "a", y: null }] }]}
        width={600}
        height={200}
      />,
    );
    expect(screen.getByText("Sin datos en este intervalo")).toBeInTheDocument();
  });
});
