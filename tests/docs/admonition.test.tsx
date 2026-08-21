import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Admonition, Aside, Danger, Important, Note, Tip, Warning } from "../../src/docs/admonition";

describe("Admonitions", () => {
  it("renders all six presets with their default, overridable titles", () => {
    const { rerender } = render(<Note>context</Note>);
    expect(screen.getByText("Note")).toBeInTheDocument();
    expect(screen.getByText("context")).toBeInTheDocument();

    rerender(<Tip>tip body</Tip>);
    expect(screen.getByText("Tip")).toBeInTheDocument();

    rerender(<Warning>warn body</Warning>);
    expect(screen.getByText("Warning")).toBeInTheDocument();

    rerender(<Danger>danger body</Danger>);
    expect(screen.getByText("Danger")).toBeInTheDocument();

    rerender(<Important>important body</Important>);
    expect(screen.getByText("Important")).toBeInTheDocument();

    rerender(<Aside>sample body</Aside>);
    expect(screen.getByText("Aside")).toBeInTheDocument();
  });

  it("lets the title be overridden", () => {
    render(<Warning title="Ten cuidado">cuerpo</Warning>);
    expect(screen.getByText("Ten cuidado")).toBeInTheDocument();
    expect(screen.queryByText("Warning")).not.toBeInTheDocument();
  });

  it("renders a fixed icon per kind but no alert/status role (docs are static)", () => {
    const { container } = render(<Danger>boom</Danger>);
    // an icon is present…
    expect(container.querySelector("svg")).toBeInTheDocument();
    // …but unlike the product Alert, no live-region role.
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("exposes the kind on a data attribute", () => {
    const { container } = render(<Admonition kind="important">x</Admonition>);
    expect(container.querySelector('[data-kind="important"]')).toBeInTheDocument();
  });

  it("gives Tip the accent tone — §26's one sanctioned accent use in docs", () => {
    const { container } = render(<Tip>tip body</Tip>);
    const root = container.querySelector('[data-kind="tip"]');
    expect(root).toHaveClass("border-accent-border", "bg-accent-bg");
  });

  it("keeps Note, Warning, and Danger on their existing semantic tones (unaffected by the Tip fix)", () => {
    const { container: noteContainer } = render(<Note>x</Note>);
    expect(noteContainer.querySelector('[data-kind="note"]')).toHaveClass("border-info-border", "bg-info-bg");

    const { container: warningContainer } = render(<Warning>x</Warning>);
    expect(warningContainer.querySelector('[data-kind="warning"]')).toHaveClass(
      "border-warning-border",
      "bg-warning-bg",
    );

    const { container: dangerContainer } = render(<Danger>x</Danger>);
    expect(dangerContainer.querySelector('[data-kind="danger"]')).toHaveClass("border-danger-border", "bg-danger-bg");
  });

  it("renders Aside (§26 'Ejemplo') as the neutral tone — no semantic color, no accent", () => {
    const { container } = render(<Aside>sample body</Aside>);
    const root = container.querySelector('[data-kind="aside"]');
    expect(root).toHaveClass("border-border", "bg-bg-subtle");
    expect(root).not.toHaveClass("border-accent-border");
  });
});
