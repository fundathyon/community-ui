import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Container } from "../../src/components/layout/container";
import { Grid } from "../../src/components/layout/grid";
import { Inline } from "../../src/components/layout/inline";
import { Stack } from "../../src/components/layout/stack";

describe("Stack", () => {
  it("maps gap through the fixed record (no dynamic classes)", () => {
    const { rerender } = render(<Stack data-testid="stack" gap={6} />);
    expect(screen.getByTestId("stack").className).toContain("gap-6");
    expect(screen.getByTestId("stack").className).toContain("flex-col");
    rerender(<Stack data-testid="stack" gap={1.5} />);
    expect(screen.getByTestId("stack").className).toContain("gap-1.5");
  });

  it("defaults to gap 4 (16px) and supports align", () => {
    render(<Stack data-testid="stack" align="center" />);
    expect(screen.getByTestId("stack").className).toContain("gap-4");
    expect(screen.getByTestId("stack").className).toContain("items-center");
  });
});

describe("Inline", () => {
  it("is a row aligned center by default with 8px gap", () => {
    render(<Inline data-testid="inline" />);
    const el = screen.getByTestId("inline");
    expect(el.className).toContain("flex");
    expect(el.className).toContain("items-center");
    expect(el.className).toContain("gap-2");
    expect(el.className).not.toContain("flex-wrap");
  });

  it("supports wrap and justify", () => {
    render(<Inline data-testid="inline" wrap justify="between" gap={3} />);
    const el = screen.getByTestId("inline");
    expect(el.className).toContain("flex-wrap");
    expect(el.className).toContain("justify-between");
    expect(el.className).toContain("gap-3");
  });
});

describe("Grid", () => {
  it("builds auto-fit minmax columns without media queries (§15)", () => {
    render(<Grid data-testid="grid" min="16rem" />);
    expect(screen.getByTestId("grid").style.gridTemplateColumns).toBe(
      "repeat(auto-fit, minmax(min(16rem, 100%), 1fr))",
    );
  });

  it("respects a custom min and merges user style", () => {
    render(<Grid data-testid="grid" min="12rem" style={{ maxWidth: "40rem" }} />);
    const el = screen.getByTestId("grid");
    expect(el.style.gridTemplateColumns).toContain("12rem");
    expect(el.style.maxWidth).toBe("40rem");
  });
});

describe("Container", () => {
  it("content width centers at 1360 with page padding (§04)", () => {
    render(<Container data-testid="container">página</Container>);
    const el = screen.getByTestId("container");
    expect(el.className).toContain("max-w-container-max");
    expect(el.className).toContain("mx-auto");
    expect(el.className).toContain("px-4");
    expect(el.className).toContain("md:px-6");
  });

  it("prose width caps at 720", () => {
    render(
      <Container data-testid="container" width="prose">
        docs
      </Container>,
    );
    expect(screen.getByTestId("container").className).toContain("max-w-prose-max");
  });
});
