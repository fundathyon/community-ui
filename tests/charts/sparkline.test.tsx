import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Sparkline } from "../../src/charts/sparkline";
import type { ChartPoint } from "../../src/charts/types";

const data: ChartPoint[] = [
  { x: 0, y: 4 },
  { x: 1, y: 8 },
  { x: 2, y: 6 },
  { x: 3, y: 12 },
];

describe("Sparkline", () => {
  it("renders an svg path at a fixed size", async () => {
    const { container } = render(<Sparkline data={data} width={120} height={32} label="Tendencia" />);
    await waitFor(() => expect(container.querySelector("svg")).toBeTruthy());
    expect(container.querySelector("path")).toBeTruthy();
  });

  it("is labelled as an image when given a label, decorative otherwise", () => {
    const { rerender, container } = render(<Sparkline data={data} width={120} label="Tendencia de logins" />);
    expect(screen.getByRole("img", { name: "Tendencia de logins" })).toBeInTheDocument();

    rerender(<Sparkline data={data} width={120} />);
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it("shows a muted placeholder instead of a fake zero line when empty (§22)", () => {
    render(<Sparkline data={[{ x: 0, y: null }, { x: 1, y: null }]} width={120} label="Vacío" />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });
});
