import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SplitButton } from "../../src/components/actions/split-button";

describe("SplitButton", () => {
  it("fires the main action without opening the menu", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <SplitButton onClick={onClick} items={[{ label: "Sincronizar sólo tags", onClick: vi.fn() }]}>
        Sincronizar
      </SplitButton>,
    );
    await user.click(screen.getByRole("button", { name: "Sincronizar" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
  });

  it("chevron trigger has its own accessible name and opens the menu; items fire", async () => {
    const user = userEvent.setup();
    const onSecondary = vi.fn();
    render(
      <SplitButton
        onClick={vi.fn()}
        menuLabel="Más acciones"
        items={[{ label: "Sincronizar sólo tags", onClick: onSecondary }]}
      >
        Sincronizar
      </SplitButton>,
    );
    await user.click(screen.getByRole("button", { name: "Más acciones" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    await user.click(screen.getByRole("menuitem", { name: "Sincronizar sólo tags" }));
    expect(onSecondary).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("moves destructive items last, separated (§12)", async () => {
    const user = userEvent.setup();
    render(
      <SplitButton
        onClick={vi.fn()}
        items={[
          { label: "Eliminar réplica", onClick: vi.fn(), destructive: true },
          { label: "Sincronizar sólo tags", onClick: vi.fn() },
        ]}
      >
        Sincronizar
      </SplitButton>,
    );
    await user.click(screen.getByRole("button", { name: "More actions" }));
    await screen.findByRole("menu");
    const items = screen.getAllByRole("menuitem");
    expect(items[items.length - 1]).toHaveTextContent("Eliminar réplica");
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("loading locks both segments", () => {
    render(
      <SplitButton onClick={vi.fn()} loading items={[{ label: "Otra", onClick: vi.fn() }]}>
        Sincronizar
      </SplitButton>,
    );
    const buttons = screen.getAllByRole("button");
    for (const button of buttons) expect(button).toBeDisabled();
  });
});
