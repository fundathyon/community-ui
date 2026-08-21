import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ChartFrame } from "../../src/charts/chart-frame";

const child = <div data-testid="plot">plot</div>;

describe("ChartFrame — the four shared chart states (§22)", () => {
  it("loading renders a skeleton block and announces the wait (not the plot)", () => {
    render(
      <ChartFrame label="Logins" height={200} state="loading">
        {child}
      </ChartFrame>,
    );
    const busy = screen.getByRole("status");
    expect(busy).toHaveAttribute("aria-busy", "true");
    expect(busy.querySelector(".fdn-skeleton")).toBeTruthy();
    expect(screen.queryByTestId("plot")).not.toBeInTheDocument();
  });

  it("empty shows the overridable message — never a flat zero line", () => {
    const { rerender } = render(
      <ChartFrame label="Logins" height={200} state="empty">
        {child}
      </ChartFrame>,
    );
    expect(screen.getByText("No data in this interval")).toBeInTheDocument();
    expect(screen.queryByTestId("plot")).not.toBeInTheDocument();

    rerender(
      <ChartFrame label="Logins" height={200} state="empty" emptyLabel="Sin actividad">
        {child}
      </ChartFrame>,
    );
    expect(screen.getByText("Sin actividad")).toBeInTheDocument();
  });

  it("error announces via role=alert and fires onRetry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ChartFrame label="Logins" height={200} state="error" onRetry={onRetry}>
        {child}
      </ChartFrame>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows the partial-data note above the plot when data has gaps", () => {
    render(
      <ChartFrame
        label="Logins"
        height={200}
        state="ready"
        partialNote="Datos parciales · faltan 2 de 24 puntos"
      >
        {child}
      </ChartFrame>,
    );
    expect(screen.getByText("Datos parciales · faltan 2 de 24 puntos")).toBeInTheDocument();
    expect(screen.getByTestId("plot")).toBeInTheDocument();
  });
});

describe("ChartFrame — accessibility (§22)", () => {
  it("builds the figure aria-label from label + summary", () => {
    render(
      <ChartFrame label="Logins · 24 h" height={200} summary="Sube un 12 % respecto a ayer">
        {child}
      </ChartFrame>,
    );
    expect(
      screen.getByRole("figure", { name: "Logins · 24 h. Sube un 12 % respecto a ayer" }),
    ).toBeInTheDocument();
  });

  it("renders the visually-hidden equivalent table with a row per x", () => {
    render(
      <ChartFrame
        label="Logins"
        height={200}
        table={{
          columns: ["Hora", "Correctos"],
          rows: [
            ["00:00", "12"],
            ["01:00", "8"],
          ],
        }}
      >
        {child}
      </ChartFrame>,
    );
    const table = screen.getByRole("table");
    // header row + 2 data rows.
    expect(within(table).getAllByRole("row")).toHaveLength(3);
    expect(within(table).getByText("00:00")).toBeInTheDocument();
  });

  it("exposes the optional Ver datos affordance", async () => {
    const user = userEvent.setup();
    const onViewData = vi.fn();
    render(
      <ChartFrame label="Logins" height={200} viewDataLabel="Ver datos" onViewData={onViewData}>
        {child}
      </ChartFrame>,
    );
    await user.click(screen.getByRole("button", { name: "Ver datos" }));
    expect(onViewData).toHaveBeenCalledTimes(1);
  });
});
