import "./setup-polyfills";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Select, SelectItem } from "../../src/components/forms/select";

const roles = [
  { value: "admin", label: "Administrador", description: "Todo el registry." },
  { value: "operator", label: "Operador" },
  { value: "reader", label: "Sólo lectura", disabled: true },
];

describe("Select", () => {
  it("renders an Input-like trigger with a placeholder", () => {
    render(<Select aria-label="Rol" items={roles} placeholder="Selecciona un rol" />);
    const trigger = screen.getByRole("combobox", { name: "Rol" });
    expect(trigger).toHaveTextContent("Selecciona un rol");
  });

  it("opens on click and lists the ≤7 options with descriptions", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="Rol" items={roles} placeholder="Rol" />);
    await user.click(screen.getByRole("combobox"));
    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeInTheDocument();
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(3);
    expect(screen.getByText("Todo el registry.")).toBeInTheDocument();
  });

  it("selects an option by pointer and reports the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select aria-label="Rol" items={roles} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    await screen.findByRole("listbox");
    await user.click(screen.getByRole("option", { name: /Operador/ }));
    expect(onValueChange).toHaveBeenLastCalledWith("operator");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(screen.getByRole("combobox")).toHaveTextContent("Operador");
  });

  it("selects with the keyboard", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Select aria-label="Rol" items={roles} onValueChange={onValueChange} />);
    const trigger = screen.getByRole("combobox");
    trigger.focus();
    await user.keyboard("{Enter}");
    await screen.findByRole("listbox");
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalled();
    const selected = onValueChange.mock.calls.at(-1)?.[0];
    expect(["admin", "operator"]).toContain(selected);
  });

  it("marks the selected option and disables disabled ones", async () => {
    const user = userEvent.setup();
    render(<Select aria-label="Rol" items={roles} defaultValue="admin" />);
    await user.click(screen.getByRole("combobox"));
    await screen.findByRole("listbox");
    expect(screen.getByRole("option", { name: /Administrador/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("option", { name: /Sólo lectura/ })).toHaveAttribute("aria-disabled", "true");
  });

  it("supports composable SelectItem children", async () => {
    const user = userEvent.setup();
    render(
      <Select aria-label="Rol" placeholder="Rol">
        <SelectItem value="a">Opción A</SelectItem>
        <SelectItem value="b" description="Con detalle">
          Opción B
        </SelectItem>
      </Select>,
    );
    await user.click(screen.getByRole("combobox"));
    await screen.findByRole("listbox");
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByText("Con detalle")).toBeInTheDocument();
  });
});