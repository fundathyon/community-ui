import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LineChart } from "../../src/charts/line-chart";
import type { ChartSeries } from "../../src/charts/types";

const twoSeries: ChartSeries[] = [
  { name: "Correctos", data: [{ x: "00:00", y: 10 }, { x: "01:00", y: 14 }], color: "success" },
  { name: "Fallidos", data: [{ x: "00:00", y: 2 }, { x: "01:00", y: 1 }], color: "danger" },
];

describe("LineChart", () => {
  it("renders each series name in the visible legend when there is more than one", () => {
    render(<LineChart label="Intentos de autenticación" series={twoSeries} width={600} height={200} />);
    // The legend uses <span> for names; the sr-only table uses <th>, so scoping
    // to span targets the visible legend specifically.
    expect(screen.getByText("Correctos", { selector: "span" })).toBeInTheDocument();
    expect(screen.getByText("Fallidos", { selector: "span" })).toBeInTheDocument();
  });

  it("derives the empty state when no series has a real value (§22)", () => {
    const allNull: ChartSeries[] = [{ name: "Logins", data: [{ x: "00:00", y: null }, { x: "01:00", y: null }] }];
    render(<LineChart label="Logins" series={allNull} width={600} height={200} />);
    expect(screen.getByText("Sin datos en este intervalo")).toBeInTheDocument();
  });

  it("adds the partial-data note when a series has a gap (null y)", () => {
    const withGap: ChartSeries[] = [
      { name: "Logins", data: [{ x: "00:00", y: 10 }, { x: "01:00", y: null }, { x: "02:00", y: 12 }] },
    ];
    render(<LineChart label="Logins" series={withGap} width={600} height={200} />);
    expect(screen.getByText(/Datos parciales · faltan 1 de 3 puntos/)).toBeInTheDocument();
  });

  it("wraps everything in a figure named from label + summary", () => {
    render(
      <LineChart label="Logins" summary="Estable" series={twoSeries} width={600} height={200} />,
    );
    expect(screen.getByRole("figure", { name: "Logins. Estable" })).toBeInTheDocument();
  });
});
