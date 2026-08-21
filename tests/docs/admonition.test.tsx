import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Admonition, Danger, Important, Note, Tip, Warning } from "../../src/docs/admonition";

describe("Admonitions", () => {
  it("renders the five presets with their default, overridable titles", () => {
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
});
