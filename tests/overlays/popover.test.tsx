import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Button } from "../../src/components/actions/button";
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "../../src/components/overlays/popover";

function ExamplePopover() {
  return (
    <>
      <Popover>
        <PopoverTrigger render={<Button variant="ghost">Filtrar por estado</Button>} />
        <PopoverContent>
          <PopoverTitle>Filtrar por estado</PopoverTitle>
          <Button size="sm">Aplicar</Button>
        </PopoverContent>
      </Popover>
      <button type="button">Después</button>
    </>
  );
}

describe("Popover", () => {
  it("opens from the trigger and admits interactive controls", async () => {
    const user = userEvent.setup();
    render(<ExamplePopover />);
    await user.click(screen.getByRole("button", { name: "Filtrar por estado" }));
    const popup = await screen.findByRole("dialog");
    expect(popup).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Aplicar" })).toBeInTheDocument();
  });

  it("does NOT trap focus: tabbing out closes it (§13)", async () => {
    const user = userEvent.setup();
    render(<ExamplePopover />);
    await user.click(screen.getByRole("button", { name: "Filtrar por estado" }));
    await screen.findByRole("dialog");

    // focus can live inside the popover without closing it…
    const apply = screen.getByRole("button", { name: "Aplicar" });
    await user.click(apply);
    expect(apply).toHaveFocus();
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    // …but tabbing past the last control moves focus out and closes it
    await user.tab();
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes with Escape and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<ExamplePopover />);
    const trigger = screen.getByRole("button", { name: "Filtrar por estado" });
    await user.click(trigger);
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
