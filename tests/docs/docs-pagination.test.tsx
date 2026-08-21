import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DocsPagination } from "../../src/docs/docs-pagination";

describe("DocsPagination", () => {
  it("renders prev/next links with their labels and overlines", () => {
    render(
      <DocsPagination
        prev={{ label: "Installation", href: "/docs/install" }}
        next={{ label: "Authentication", href: "/docs/auth" }}
      />,
    );

    const prev = screen.getByRole("link", { name: /Installation/ });
    expect(prev).toHaveAttribute("href", "/docs/install");
    const next = screen.getByRole("link", { name: /Authentication/ });
    expect(next).toHaveAttribute("href", "/docs/auth");

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("overrides the direction labels and supports a single side", () => {
    render(<DocsPagination next={{ label: "Next page", href: "/n" }} nextLabel="Siguiente" />);
    expect(screen.getByText("Siguiente")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Next page/ })).toBeInTheDocument();
    // no previous link
    expect(screen.queryByRole("link", { name: /Previous/ })).not.toBeInTheDocument();
  });

  it("supports a router render substitution", () => {
    render(
      <DocsPagination
        next={{
          label: "Routed",
          href: "/routed",
          render: (props) => <a data-router {...props} />,
        }}
      />,
    );
    const link = screen.getByRole("link", { name: /Routed/ });
    expect(link).toHaveAttribute("data-router");
  });
});
