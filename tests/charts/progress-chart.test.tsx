import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProgressChart } from "../../src/charts/progress-chart";

describe("ProgressChart", () => {
  it("announces value/max as a progressbar", () => {
    render(<ProgressChart label="Cuota de peticiones" value={90} max={100} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "90");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
    expect(bar).toHaveAttribute("aria-valuetext", "90 / 100");
  });

  it("renders threshold markers with their tone label (§22 quota)", () => {
    render(
      <ProgressChart
        label="Cuota"
        value={92}
        max={100}
        thresholds={[{ value: 90, tone: "warning", label: "Aviso 90 %" }]}
      />,
    );
    // Marker carries the label as a title, and the caption row shows it.
    expect(screen.getByTitle("Aviso 90 %")).toBeInTheDocument();
    expect(screen.getByText("Aviso 90 %")).toBeInTheDocument();
  });

  it("derives empty when max is not positive", () => {
    render(<ProgressChart label="Cuota" value={0} max={0} />);
    expect(screen.getByText("Sin datos en este intervalo")).toBeInTheDocument();
  });
});
