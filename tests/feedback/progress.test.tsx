import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Progress } from "../../src/components/feedback/progress";

describe("Progress", () => {
  it("determinate exposes aria-valuenow and ALWAYS shows the value as text (§11)", () => {
    render(<Progress value={68} label="Almacenamiento" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "68");
    expect(screen.getByText("68%")).toBeInTheDocument();
    expect(screen.getByText("Almacenamiento")).toBeInTheDocument();
  });

  it("valueText overrides the visible value", () => {
    render(<Progress value={44.5} max={50} label="Almacenamiento" valueText="44.5 / 50 GB" />);
    expect(screen.getByText("44.5 / 50 GB")).toBeInTheDocument();
  });

  it("value=null renders the indeterminate bar without a value", () => {
    render(<Progress value={null} label="Subiendo capas" />);
    const bar = screen.getByRole("progressbar");
    expect(bar).not.toHaveAttribute("aria-valuenow");
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
    expect(bar.querySelector(".fdn-indeterminate")).not.toBeNull();
  });

  it("circular variant keeps the visible value text next to the circle", () => {
    render(<Progress variant="circular" size={16} value={68} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "68");
    expect(bar.querySelector("svg")).not.toBeNull();
    expect(screen.getByText("68%")).toBeInTheDocument();
  });

  it("tone recolors the fill (quota thresholds are the app's decision)", () => {
    render(<Progress value={89} tone="warning" label="Almacenamiento" />);
    const bar = screen.getByRole("progressbar");
    expect(bar.querySelector(".bg-warning-solid")).not.toBeNull();
  });
});
