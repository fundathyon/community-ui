import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import {
  CommandPalette,
  useCommandPalette,
  type CommandGroup,
} from "../../src/components/overlays/command-palette";

function makeGroups(overrides?: { onSync?: () => void }): CommandGroup[] {
  return [
    {
      heading: "Ir a",
      items: [
        { id: "repos", label: "Repositorios", shortcut: "G R" },
        { id: "members", label: "Miembros", shortcut: "G M" },
      ],
    },
    {
      heading: "Acciones",
      items: [
        { id: "sync", label: "Sincronizar registry", keywords: ["refresh"], onSelect: overrides?.onSync },
        { id: "theme", label: "Cambiar a tema claro" },
      ],
    },
    {
      heading: "Recientes",
      items: [{ id: "recent-1", label: "library/nginx:1.27" }],
    },
  ];
}

describe("CommandPalette", () => {
  it("renders the combobox pattern with grouped options and filters as you type", async () => {
    const user = userEvent.setup();
    render(<CommandPalette open onOpenChange={() => {}} items={makeGroups()} recentLabel="Recientes" />);

    const input = screen.getByRole("combobox");
    await waitFor(() => expect(input).toHaveFocus());
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(5);
    expect(screen.getByText("Ir a")).toBeInTheDocument();

    // diacritic- and case-insensitive substring over label + keywords
    await user.type(input, "SINCRONIZAR");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    expect(screen.getByRole("option", { name: /Sincronizar registry/ })).toBeInTheDocument();
    // the recents group never matches a search
    expect(screen.queryByText("library/nginx:1.27")).not.toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "refresh");
    expect(screen.getByRole("option", { name: /Sincronizar registry/ })).toBeInTheDocument();

    await user.clear(input);
    await user.type(input, "zzz");
    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(screen.getByRole("status")).toHaveTextContent("No results");
  });

  it("moves the active option with the arrow keys (wrapping) via aria-activedescendant", async () => {
    const user = userEvent.setup();
    render(<CommandPalette open onOpenChange={() => {}} items={makeGroups()} />);
    const input = screen.getByRole("combobox");
    await waitFor(() => expect(input).toHaveFocus());

    const options = screen.getAllByRole("option");
    expect(input).toHaveAttribute("aria-activedescendant", options[0]!.id);
    expect(options[0]).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowDown}");
    expect(input).toHaveAttribute("aria-activedescendant", options[1]!.id);
    expect(options[1]).toHaveAttribute("aria-selected", "true");
    expect(options[0]).toHaveAttribute("aria-selected", "false");

    await user.keyboard("{ArrowUp}{ArrowUp}");
    // wraps to the last option
    expect(input).toHaveAttribute("aria-activedescendant", options[options.length - 1]!.id);
  });

  it("selects the active option with Enter, firing both onSelect handlers and closing", async () => {
    const user = userEvent.setup();
    const onSync = vi.fn();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(
      <CommandPalette open onOpenChange={onOpenChange} items={makeGroups({ onSync })} onSelect={onSelect} />,
    );
    const input = screen.getByRole("combobox");
    await waitFor(() => expect(input).toHaveFocus());

    await user.type(input, "sincronizar");
    await user.keyboard("{Enter}");
    expect(onSync).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0]![0]).toMatchObject({ id: "sync" });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("selects an option on click and closes with Escape", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    const onOpenChange = vi.fn();
    render(<CommandPalette open onOpenChange={onOpenChange} items={makeGroups()} onSelect={onSelect} />);
    await screen.findByRole("combobox");

    await user.click(screen.getByRole("option", { name: /Miembros/ }));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0]![0]).toMatchObject({ id: "members" });

    await user.keyboard("{Escape}");
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("opens with ⌘K / Ctrl+K through useCommandPalette and cleans up on unmount", async () => {
    function Harness() {
      const palette = useCommandPalette();
      return <CommandPalette open={palette.open} onOpenChange={palette.setOpen} items={makeGroups()} />;
    }
    const { unmount } = render(<Harness />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(await screen.findByRole("dialog")).toBeInTheDocument();

    // ⌘K toggles
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    unmount();
    // after unmount the listener is gone — dispatching must not throw or reopen
    fireEvent.keyDown(window, { key: "k", metaKey: true });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
