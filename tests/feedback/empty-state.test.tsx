import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/actions/button";
import { EmptyState } from "../../src/components/feedback/empty-state";

describe("EmptyState", () => {
  it("renders title, description and both exits (§11: always one exit)", async () => {
    const user = userEvent.setup();
    const onSync = vi.fn();
    render(
      <EmptyState
        title="Aún no hay repositorios"
        description="Haz push de una imagen o sincroniza el registry para empezar."
        action={
          <Button variant="primary" onClick={onSync}>
            Sincronizar
          </Button>
        }
        secondaryAction={<Button variant="ghost">Ver docs</Button>}
      />,
    );
    expect(screen.getByRole("heading", { name: "Aún no hay repositorios" })).toBeInTheDocument();
    expect(
      screen.getByText("Haz push de una imagen o sincroniza el registry para empezar."),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Sincronizar" }));
    expect(onSync).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: "Ver docs" })).toBeInTheDocument();
  });

  it("no-results is a distinct state (§11) with its own default icon", () => {
    render(
      <EmptyState
        kind="no-results"
        title="Sin resultados"
        action={<Button variant="secondary">Limpiar filtros</Button>}
        data-testid="empty"
      />,
    );
    expect(screen.getByTestId("empty")).toHaveAttribute("data-kind", "no-results");
    expect(screen.getByRole("button", { name: "Limpiar filtros" })).toBeInTheDocument();
  });
});
