import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Separator } from "../../src/components/layout/separator";

describe("Separator", () => {
  it("renders an accessible horizontal separator by default", () => {
    render(<Separator />);
    const separator = screen.getByRole("separator");
    expect(separator).toBeInTheDocument();
    expect(separator.className).toContain("bg-border");
  });

  it("supports vertical orientation", () => {
    render(<Separator orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("renders the labeled variant with a centered muted caption (§09)", () => {
    render(<Separator label="o" />);
    const separator = screen.getByRole("separator");
    const label = screen.getByText("o");
    expect(separator).toContainElement(label);
    expect(label.className).toContain("text-caption");
    expect(label.className).toContain("text-text-muted");
  });
});
