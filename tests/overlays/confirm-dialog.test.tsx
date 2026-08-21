import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/actions/button";
import { ConfirmDialog } from "../../src/components/overlays/confirm-dialog";

describe("ConfirmDialog", () => {
  it("gives initial focus to the SAFE action (cancel), and the button says the verb", async () => {
    const user = userEvent.setup();
    render(
      <ConfirmDialog
        trigger={<Button variant="destructive-subtle">Eliminar</Button>}
        title="Eliminar repositorio"
        description="library/nginx y sus 12 tags se eliminarán. No se puede deshacer."
        verb="Eliminar repositorio"
        onConfirm={() => {}}
        cancelLabel="Cancelar"
      />,
    );
    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    const dialog = await screen.findByRole("alertdialog");
    expect(dialog).toHaveAccessibleName("Eliminar repositorio");
    expect(screen.getByRole("button", { name: "Eliminar repositorio" })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Cancelar" })).toHaveFocus());
    // no corner close: a confirmation forces a choice (§13)
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });

  it("fires onConfirm and closes", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        trigger={<Button>Revocar</Button>}
        title="Revocar enlace"
        description="El enlace dejará de funcionar."
        verb="Revocar enlace"
        onConfirm={onConfirm}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Revocar" }));
    await screen.findByRole("alertdialog");
    await user.click(screen.getByRole("button", { name: "Revocar enlace" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  });

  it("type-to-confirm gates the confirm button until the exact text is typed", async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Eliminar repositorio"
        description="Afecta a datos de otros."
        verb="Eliminar repositorio"
        confirmText="library/nginx"
        onConfirm={onConfirm}
      />,
    );
    const confirm = screen.getByRole("button", { name: "Eliminar repositorio" });
    expect(confirm).toBeDisabled();
    expect(screen.getByText(/to confirm/)).toBeInTheDocument();

    const input = screen.getByRole("textbox");
    await user.type(input, "library/ngin");
    expect(confirm).toBeDisabled();
    await user.type(input, "x");
    expect(confirm).toBeEnabled();
    await user.click(confirm);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("shows a loading confirm button while the promise is pending and disables dismissal", async () => {
    const user = userEvent.setup();
    let resolveConfirm!: () => void;
    const onConfirm = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveConfirm = resolve;
        }),
    );
    render(
      <ConfirmDialog
        trigger={<Button>Eliminar</Button>}
        title="Eliminar tag"
        description="El tag se eliminará."
        verb="Eliminar tag"
        onConfirm={onConfirm}
        cancelLabel="Cancelar"
      />,
    );
    await user.click(screen.getByRole("button", { name: "Eliminar" }));
    await screen.findByRole("alertdialog");
    const confirm = screen.getByRole("button", { name: "Eliminar tag" });
    await user.click(confirm);

    expect(confirm).toBeDisabled();
    expect(confirm).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: "Cancelar" })).toBeDisabled();
    // Esc must not dismiss a confirmation in flight
    await user.keyboard("{Escape}");
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();

    resolveConfirm();
    await waitFor(() => expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument());
  });
});
