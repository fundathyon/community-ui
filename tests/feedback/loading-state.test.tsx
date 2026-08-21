import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LoadingState } from "../../src/components/feedback/loading-state";

describe("LoadingState", () => {
  it("announces the busy region with role=status, aria-busy and a default English label", () => {
    render(<LoadingState data-testid="loading" />);
    const region = screen.getByRole("status");
    expect(region).toHaveAttribute("aria-busy", "true");
    expect(region).toHaveAttribute("data-testid", "loading");
    expect(screen.getByText("Loading")).toHaveClass("sr-only");
  });

  it("label is overridable product copy", () => {
    render(<LoadingState label="Cargando repositorios" />);
    expect(screen.getByText("Cargando repositorios")).toHaveClass("sr-only");
  });

  it("defaults to 3 text-line skeleton rows mirroring unknown shape", () => {
    render(<LoadingState data-testid="loading" />);
    const bones = screen.getByTestId("loading").querySelector('[aria-hidden="true"]');
    expect(bones?.children).toHaveLength(3);
  });

  it("rows controls the number of default skeleton lines", () => {
    render(<LoadingState rows={5} data-testid="loading" />);
    const bones = screen.getByTestId("loading").querySelector('[aria-hidden="true"]');
    expect(bones?.children).toHaveLength(5);
  });

  it("children replaces the default skeleton with a custom shape", () => {
    render(
      <LoadingState data-testid="loading">
        <div data-testid="table-shape">custom shape</div>
      </LoadingState>,
    );
    expect(screen.getByTestId("table-shape")).toBeInTheDocument();
  });
});
