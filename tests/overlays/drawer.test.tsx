import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../../src/components/actions/button";
import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../src/components/overlays/drawer";

function ExampleDrawer() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="ghost">Ver detalle</Button>} />
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>library/nginx</DrawerTitle>
          <DrawerDescription>sha256:4a3ed8…9f21</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p>Contenido del tag</p>
        </DrawerBody>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost">Cancelar</Button>} />
          <Button variant="primary">Guardar cambios</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("opens from the trigger with dialog semantics and closes from DrawerClose", async () => {
    const user = userEvent.setup();
    render(<ExampleDrawer />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Ver detalle" }));
    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("library/nginx");
    expect(dialog).toHaveAccessibleDescription("sha256:4a3ed8…9f21");
    expect(screen.getByText("Contenido del tag")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Cancelar" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ExampleDrawer />);
    const trigger = screen.getByRole("button", { name: "Ver detalle" });
    await user.click(trigger);
    await screen.findByRole("dialog");

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("renders a corner close button by default", async () => {
    const user = userEvent.setup();
    render(<ExampleDrawer />);
    await user.click(screen.getByRole("button", { name: "Ver detalle" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
