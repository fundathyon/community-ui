import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusIndicator } from "../../src/components/data-display/status-indicator";

describe("StatusIndicator", () => {
  it("dot treatment shows a tonal dot plus text", () => {
    const { container } = render(<StatusIndicator status="active" treatment="dot" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
    // the dot carries the success tone
    const dot = container.querySelector('[aria-hidden].rounded-full');
    expect(dot).not.toBeNull();
    expect(dot!.className).toContain("bg-success");
  });

  it("dot treatment accepts overridden copy", () => {
    render(<StatusIndicator status="active" treatment="dot" label="Activo" />);
    expect(screen.getByText("Activo")).toBeInTheDocument();
  });

  it("icon treatment is icon-only but carries an accessible name (required tooltip)", () => {
    render(<StatusIndicator status="failed" treatment="icon" label="Fallido" />);
    const indicator = screen.getByRole("img", { name: "Fallido" });
    expect(indicator).toBeInTheDocument();
    // reachable by keyboard so the tooltip can open on focus
    expect(indicator).toHaveAttribute("tabindex", "0");
  });

  it("keeps the same tone across treatments (§19)", () => {
    const { container: dotC } = render(<StatusIndicator status="failed" treatment="dot" />);
    const { container: iconC } = render(<StatusIndicator status="failed" treatment="icon" />);
    expect(dotC.querySelector('[data-status="failed"]')!.className).toContain("text-danger");
    expect(iconC.querySelector('[data-status="failed"]')!.className).toContain("text-danger");
  });
});
