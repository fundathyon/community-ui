import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricChart } from "../../src/charts/metric-chart";

describe("MetricChart", () => {
  it("lays out label, value, context and the chart child (§22 KPI header)", () => {
    render(
      <MetricChart label="Logins · 24 h" value="8 412" context="+12 % vs ayer">
        <div data-testid="chart">chart</div>
      </MetricChart>,
    );
    expect(screen.getByText("Logins · 24 h")).toBeInTheDocument();
    expect(screen.getByText("8 412")).toBeInTheDocument();
    expect(screen.getByText("+12 % vs ayer")).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("omits the context line when not provided", () => {
    render(<MetricChart label="Sesiones" value="1 204" />);
    expect(screen.getByText("1 204")).toBeInTheDocument();
  });
});
