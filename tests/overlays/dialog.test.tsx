import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../../src/components/actions/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/overlays/dialog";

function ExampleDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button>Nuevo enlace</Button>} />
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Nuevo enlace compartido</DialogTitle>
          <DialogDescription>Cualquiera con el enlace podrá leer esta config.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="primary">Generar enlace</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("opens from the trigger with dialog semantics and a labelled title", async () => {
    const user = userEvent.setup();
    render(<ExampleDialog />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Nuevo enlace" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Nuevo enlace compartido");
    expect(dialog).toHaveAccessibleDescription("Cualquiera con el enlace podrá leer esta config.");
  });

  it("closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ExampleDialog />);
    const trigger = screen.getByRole("button", { name: "Nuevo enlace" });
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("renders a corner close button by default and hides it with hideClose", async () => {
    const user = userEvent.setup();
    const { unmount } = render(<ExampleDialog />);
    await user.click(screen.getByRole("button", { name: "Nuevo enlace" }));
    expect(await screen.findByRole("button", { name: "Close" })).toBeInTheDocument();
    unmount();

    render(
      <Dialog defaultOpen>
        <DialogContent hideClose>
          <DialogTitle>Confirmación</DialogTitle>
        </DialogContent>
      </Dialog>,
    );
    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
