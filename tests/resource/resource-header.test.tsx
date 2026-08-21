import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResourceHeader, ResourceMeta } from "../../src/components/resource/resource-header";

describe("ResourceHeader", () => {
  it("renders the title as an h1 with the status and action slots", () => {
    render(
      <ResourceHeader
        breadcrumb={<nav>Ajustes / API keys</nav>}
        title="ci-deploy"
        status={<span>Active</span>}
        actions={<button type="button">Rotar</button>}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "ci-deploy" })).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Rotar" })).toBeInTheDocument();
    expect(screen.getByText("Ajustes / API keys")).toBeInTheDocument();
  });

  it("joins metadata as running text with '·' separators (§25)", () => {
    const { container } = render(
      <ResourceHeader
        title="ci-deploy"
        meta={["creada 7 ago 2026 por maria@foundathyon.dev", "último uso hace 4 min", "expira en 2 días"]}
      />,
    );
    const paragraph = container.querySelector("p")!;
    expect(paragraph.textContent).toContain("creada 7 ago 2026 por maria@foundathyon.dev");
    expect(paragraph.textContent).toContain("último uso hace 4 min");
    // three fragments → two separators, and they are decorative
    expect(paragraph.querySelectorAll('[aria-hidden="true"]')).toHaveLength(2);
    expect(paragraph.textContent).toContain("·");
  });
});

describe("ResourceMeta", () => {
  it("renders nothing when there are no items", () => {
    const { container } = render(<ResourceMeta items={[]} />);
    expect(container.querySelector("p")).toBeNull();
  });

  it("renders a single fragment without a separator", () => {
    const { container } = render(<ResourceMeta items={["solo un dato"]} />);
    expect(screen.getByText("solo un dato")).toBeInTheDocument();
    expect(container.querySelectorAll('[aria-hidden="true"]')).toHaveLength(0);
  });
});
