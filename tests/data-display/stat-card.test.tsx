import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard, StatCard } from "../../src/components/data-display/stat-card";

describe("StatCard", () => {
  it("renders label, figure and context", () => {
    render(<StatCard label="Repositorios" value="128" context="media de 7 días" />);
    expect(screen.getByText("Repositorios")).toBeInTheDocument();
    expect(screen.getByText("128")).toBeInTheDocument();
    expect(screen.getByText("media de 7 días")).toBeInTheDocument();
  });

  it("colors the delta success when more is good", () => {
    render(
      <StatCard
        label="Repositorios"
        value="128"
        delta={{ value: "+6 esta semana", direction: "up", positive: true }}
      />,
    );
    const delta = screen.getByText("+6 esta semana");
    expect(delta.className).toContain("text-success");
    // the sign + period copy is preserved verbatim
    expect(delta).toHaveTextContent("+6 esta semana");
  });

  it("colors the delta danger when more is bad", () => {
    render(
      <StatCard
        label="Errores 4xx"
        value="12"
        delta={{ value: "+4 hoy", direction: "up", positive: false }}
      />,
    );
    expect(screen.getByText("+4 hoy").className).toContain("text-danger");
  });

  it("keeps the delta muted when direction is not inherently good or bad", () => {
    render(
      <StatCard label="Pulls" value="2 481" delta={{ value: "−2 % vs ayer", direction: "down" }} />,
    );
    expect(screen.getByText("−2 % vs ayer").className).toContain("text-text-muted");
  });
});

describe("MetricCard", () => {
  it("renders the figure and the visual slot", () => {
    render(
      <MetricCard label="Pulls / día" value="2 481" visual={<div data-testid="spark">chart</div>} />,
    );
    expect(screen.getByText("2 481")).toBeInTheDocument();
    expect(screen.getByTestId("spark")).toBeInTheDocument();
  });
});
