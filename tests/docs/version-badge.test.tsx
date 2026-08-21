import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DeprecationNotice, VersionBadge } from "../../src/docs/version-badge";

describe("VersionBadge", () => {
  it("shows 'New in {version}' for the new state", () => {
    render(<VersionBadge state="new" version="2.4" />);
    expect(screen.getByText("New in 2.4")).toBeInTheDocument();
  });

  it("falls back to a bare 'New' when no version is given", () => {
    render(<VersionBadge state="new" />);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("shows 'Beta' for the beta state", () => {
    render(<VersionBadge state="beta" />);
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("shows 'Deprecated' for the deprecated state, matching the old flag's warning-outline treatment", () => {
    render(<VersionBadge state="deprecated" />);
    const badge = screen.getByText("Deprecated");
    expect(badge).toHaveClass("text-warning");
  });

  it("lets the label be overridden (products ship Spanish copy)", () => {
    render(<VersionBadge state="new" version="2.4" label="Nuevo en 2.4" />);
    expect(screen.getByText("Nuevo en 2.4")).toBeInTheDocument();
    expect(screen.queryByText("New in 2.4")).not.toBeInTheDocument();
  });
});

describe("DeprecationNotice", () => {
  it("composes version, removal version, ETA and alternative into one sentence", () => {
    const { container } = render(
      <DeprecationNotice
        version="2.4"
        removedIn="3.0"
        removedInEta="Q1 2027"
        alternative={<code>/v1/configs?environment=</code>}
      />,
    );
    expect(screen.getByText("Deprecated")).toBeInTheDocument(); // default title
    const text = container.querySelector('[data-kind="warning"]')?.textContent ?? "";
    expect(text).toContain("Deprecated in 2.4");
    expect(text).toContain("Removed in 3.0");
    expect(text).toContain("Q1 2027");
    expect(text).toContain("/v1/configs?environment=");
  });

  it("omits the ETA parenthetical when none is given", () => {
    render(<DeprecationNotice version="2.4" removedIn="3.0" alternative="the v2 endpoint" />);
    expect(screen.queryByText(/expected/)).not.toBeInTheDocument();
  });

  it("lets the title and body be fully overridden with custom copy", () => {
    render(
      <DeprecationNotice version="2.4" removedIn="3.0" alternative="x" title="Obsoleto">
        Copy en español.
      </DeprecationNotice>,
    );
    expect(screen.getByText("Obsoleto")).toBeInTheDocument();
    expect(screen.getByText("Copy en español.")).toBeInTheDocument();
    expect(screen.queryByText(/Deprecated in/)).not.toBeInTheDocument();
  });

  it("reuses the warning Admonition for its visuals (2px bar, wash, icon)", () => {
    const { container } = render(<DeprecationNotice version="2.4" removedIn="3.0" alternative="x" />);
    const root = container.querySelector('[data-kind="warning"]');
    expect(root).toBeInTheDocument();
    expect(root).toHaveClass("border-warning-border", "bg-warning-bg");
    expect(root?.querySelector("svg")).toBeInTheDocument();
  });
});
