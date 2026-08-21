import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Breadcrumb } from "../../src/components/navigation/breadcrumb";

const fourItems = [
  { label: "Repositorios", href: "/repos" },
  { label: "library", href: "/repos/library" },
  { label: "nginx", href: "/repos/library/nginx" },
  { label: "Tags" },
];

describe("Breadcrumb", () => {
  it("is a labelled navigation landmark", () => {
    render(<Breadcrumb items={fourItems} />);
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
  });

  it("marks only the last item as the current page, as plain text", () => {
    render(<Breadcrumb items={fourItems} />);
    const current = screen.getByText("Tags");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current.tagName).not.toBe("A");
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute("href", "/repos");
  });

  it("does not collapse at 4 items", () => {
    render(<Breadcrumb items={fourItems} />);
    expect(screen.queryByText("…")).not.toBeInTheDocument();
  });

  it("collapses the middle into … past 4 items, keeping the full path in title", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Repositorios", href: "/repos" },
          { label: "library", href: "/repos/library" },
          { label: "nginx", href: "/repos/library/nginx" },
          { label: "Tags", href: "/repos/library/nginx/tags" },
          { label: "v1.27" },
        ]}
      />,
    );
    const ellipsis = screen.getByText("…");
    expect(ellipsis).toHaveAttribute("title", "library / nginx");
    // first + last two survive
    expect(screen.getByRole("link", { name: "Repositorios" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Tags" })).toBeInTheDocument();
    expect(screen.getByText("v1.27")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByText("library")).not.toBeInTheDocument();
    expect(screen.queryByText("nginx")).not.toBeInTheDocument();
  });

  it("supports the render prop for router links", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Repositorios", render: (props) => <a data-router-link {...props} href="/spa/repos" /> },
          { label: "nginx" },
        ]}
      />,
    );
    const link = screen.getByRole("link", { name: "Repositorios" });
    expect(link).toHaveAttribute("data-router-link");
    expect(link).toHaveAttribute("href", "/spa/repos");
  });

  it("accepts an overridable landmark label (Spanish copy)", () => {
    render(<Breadcrumb items={fourItems} label="Miga de pan" />);
    expect(screen.getByRole("navigation", { name: "Miga de pan" })).toBeInTheDocument();
  });
});
