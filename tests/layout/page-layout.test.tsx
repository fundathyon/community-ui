import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageHeader, PageLayout } from "../../src/components/layout/page-layout";

describe("PageLayout", () => {
  it("renders every slot in the fixed order (§15)", () => {
    render(
      <PageLayout
        breadcrumb={<nav aria-label="Breadcrumb">Repositorios</nav>}
        title="Repositorios"
        subtitle="Gestiona las imágenes de la organización."
        actions={<button type="button">Nuevo repositorio</button>}
        toolbar={<input aria-label="Buscar" />}
      >
        <p>Contenido</p>
      </PageLayout>,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument();
    const title = screen.getByRole("heading", { level: 1, name: "Repositorios" });
    expect(title.className).toContain("text-h1");
    expect(screen.getByText("Gestiona las imágenes de la organización.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Nuevo repositorio" })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Buscar" })).toBeInTheDocument();
    expect(screen.getByText("Contenido")).toBeInTheDocument();
  });

  it("omits optional slots cleanly", () => {
    render(<PageLayout title="Tokens" />);
    expect(screen.getByRole("heading", { level: 1, name: "Tokens" })).toBeInTheDocument();
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
  });

  it("PageHeader is composable on its own", () => {
    render(<PageHeader title="Miembros" actions={<button type="button">Invitar</button>} />);
    expect(screen.getByRole("heading", { level: 1, name: "Miembros" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Invitar" })).toBeInTheDocument();
  });
});
