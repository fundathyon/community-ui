import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DocsLayout } from "../../src/docs/docs-layout";
import { DocsHeader } from "../../src/docs/docs-header";
import { DocsSidebar, DocsSidebarItem, DocsSidebarSection } from "../../src/docs/docs-sidebar";
import { TableOfContents } from "../../src/docs/table-of-contents";

describe("DocsLayout", () => {
  it("renders the header, sidebar, main and toc as landmarks", () => {
    render(
      <DocsLayout
        header={<DocsHeader logo={<span>Vault</span>} />}
        sidebar={
          <DocsSidebar>
            <DocsSidebarSection label="Getting started">
              <DocsSidebarItem label="Install" href="/install" active />
            </DocsSidebarSection>
          </DocsSidebar>
        }
        toc={<TableOfContents items={[{ id: "intro", label: "Intro", depth: 2 }]} activeId="intro" />}
      >
        <p>Page body</p>
      </DocsLayout>,
    );

    // main content region
    expect(screen.getByRole("main")).toHaveTextContent("Page body");
    // header → banner
    expect(screen.getByRole("banner")).toBeInTheDocument();
    // sidebar nav + toc nav
    const navs = screen.getAllByRole("navigation");
    expect(navs.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByRole("navigation", { name: "Documentation" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "On this page" })).toBeInTheDocument();
    // the two rail columns are <aside> → complementary
    expect(screen.getAllByRole("complementary").length).toBeGreaterThanOrEqual(2);
  });

  it("renders without a sidebar (no Drawer required)", () => {
    render(
      <DocsLayout header={<DocsHeader />}>
        <p>Only content</p>
      </DocsLayout>,
    );
    expect(screen.getByRole("main")).toHaveTextContent("Only content");
  });
});
