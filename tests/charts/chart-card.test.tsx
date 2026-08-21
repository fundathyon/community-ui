import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChartCard } from "../../src/charts/chart-card";

describe("ChartCard", () => {
  it("renders the title, toolbar slot and the chart body when ready", () => {
    render(
      <ChartCard title="Tasa de error" toolbar={<button type="button">Refrescar</button>}>
        <div data-testid="chart">chart</div>
      </ChartCard>,
    );
    expect(screen.getByText("Tasa de error")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Refrescar" })).toBeInTheDocument();
    expect(screen.getByTestId("chart")).toBeInTheDocument();
  });

  it("handles the loading state in one place (skeleton instead of the chart)", () => {
    render(
      <ChartCard title="Tasa de error" state="loading">
        <div data-testid="chart">chart</div>
      </ChartCard>,
    );
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByTestId("chart")).not.toBeInTheDocument();
  });

  it("handles the error state with a working retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ChartCard title="Tasa de error" state="error" onRetry={onRetry}>
        <div data-testid="chart">chart</div>
      </ChartCard>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
