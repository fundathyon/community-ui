import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../src/components/overlays/context-menu";

function ExampleContextMenu({ onCopy, onDelete }: { onCopy?: () => void; onDelete?: () => void }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div>library/nginx</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={onCopy} shortcut="⌘C">
          Copiar comando pull
        </ContextMenuItem>
        <ContextMenuItem shortcut="⌘T">Ver tags</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem destructive onClick={onDelete}>
          Eliminar repositorio
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

describe("ContextMenu", () => {
  it("opens on the contextmenu event", async () => {
    render(<ExampleContextMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText("library/nginx"));
    const menu = await screen.findByRole("menu");
    expect(menu).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    expect(screen.getByText("⌘T")).toBeInTheDocument();
  });

  it("fires the item action and closes", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();
    render(<ExampleContextMenu onCopy={onCopy} />);
    fireEvent.contextMenu(screen.getByText("library/nginx"));
    await screen.findByRole("menu");
    await user.click(screen.getByRole("menuitem", { name: "Copiar comando pull" }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("closes with Escape", async () => {
    const user = userEvent.setup();
    render(<ExampleContextMenu />);
    fireEvent.contextMenu(screen.getByText("library/nginx"));
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });
});
