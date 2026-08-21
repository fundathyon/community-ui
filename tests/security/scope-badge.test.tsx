import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScopeBadge, scopeTone } from "../../src/components/security";

describe("scopeTone", () => {
  it("maps the scope suffix to a tone by effect (§23)", () => {
    expect(scopeTone("registry:read")).toBe("info");
    expect(scopeTone("registry:write")).toBe("success");
    expect(scopeTone("registry:delete")).toBe("danger");
    expect(scopeTone("org:admin")).toBe("warning");
    expect(scopeTone("registry:weird")).toBe("neutral");
  });

  it("classifies a bare suffix", () => {
    expect(scopeTone("read")).toBe("info");
  });
});

describe("ScopeBadge", () => {
  it("renders the scope string in mono", () => {
    render(<ScopeBadge scope="registry:read" />);
    const badge = screen.getByText("registry:read");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("font-mono");
  });

  it("allows a tone override", () => {
    render(<ScopeBadge scope="registry:read" tone="danger" data-testid="scope" />);
    expect(screen.getByTestId("scope")).toHaveClass("text-danger");
  });
});
