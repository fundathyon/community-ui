import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Copy } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

// jsdom has no PointerEvent constructor; Base UI dispatches one when a menu
// item is activated with the keyboard.
if (typeof window !== "undefined" && typeof window.PointerEvent !== "function") {
  class PointerEventPolyfill extends MouseEvent {
    pointerId: number;
    pointerType: string;
    isPrimary: boolean;
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
      this.pointerId = params.pointerId ?? 0;
      this.pointerType = params.pointerType ?? "";
      this.isPrimary = params.isPrimary ?? false;
    }
  }
  window.PointerEvent = PointerEventPolyfill as unknown as typeof PointerEvent;
}
import { Button } from "../../src/components/actions/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../src/components/actions/dropdown-menu";

function ExampleMenu({
  onCopy = () => {},
  onProtect = () => {},
  onDelete = () => {},
}: {
  onCopy?: () => void;
  onProtect?: () => void;
  onDelete?: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>Acciones</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem icon={Copy} shortcut="⌘C" onClick={onCopy}>
          Copiar comando pull
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onProtect}>Proteger</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive onClick={onDelete}>
          Eliminar repositorio
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("opens on click with menu semantics and its items", async () => {
    const user = userEvent.setup();
    render(<ExampleMenu />);
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Acciones" }));
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    expect(screen.getAllByRole("menuitem")).toHaveLength(3);
    // shortcut hint is right-aligned display text (§12)
    expect(screen.getByText("⌘C")).toBeInTheDocument();
  });

  it("navigates with arrows and selects with Enter", async () => {
    const user = userEvent.setup();
    const onProtect = vi.fn();
    render(<ExampleMenu onProtect={onProtect} />);
    await user.click(screen.getByRole("button", { name: "Acciones" }));
    await screen.findByRole("menu");
    await user.keyboard("{ArrowDown}");
    await waitFor(() =>
      expect(screen.getByRole("menuitem", { name: /Copiar comando pull/ })).toHaveFocus(),
    );
    await user.keyboard("{ArrowDown}");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Proteger" })).toHaveFocus());
    await user.keyboard("{Enter}");
    expect(onProtect).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
  });

  it("supports first-letter typeahead (Base UI native)", async () => {
    const user = userEvent.setup();
    render(<ExampleMenu />);
    await user.click(screen.getByRole("button", { name: "Acciones" }));
    await screen.findByRole("menu");
    await user.keyboard("p");
    await waitFor(() => expect(screen.getByRole("menuitem", { name: "Proteger" })).toHaveFocus());
  });

  it("marks the destructive item and keeps it last (§12)", async () => {
    const user = userEvent.setup();
    render(<ExampleMenu />);
    await user.click(screen.getByRole("button", { name: "Acciones" }));
    await screen.findByRole("menu");
    const items = screen.getAllByRole("menuitem");
    const last = items[items.length - 1]!;
    expect(last).toHaveTextContent("Eliminar repositorio");
    expect(last).toHaveAttribute("data-destructive");
    expect(last.className).toContain("text-danger");
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ExampleMenu />);
    const trigger = screen.getByRole("button", { name: "Acciones" });
    await user.click(trigger);
    await screen.findByRole("menu");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it("disabled items do not fire", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button>Más</Button>} />
        <DropdownMenuContent>
          <DropdownMenuItem disabled onClick={onClick}>
            Proteger
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Más" }));
    await screen.findByRole("menu");
    await user.click(screen.getByRole("menuitem", { name: "Proteger" }));
    expect(onClick).not.toHaveBeenCalled();
  });
});
