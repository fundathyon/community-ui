import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "../../src/components/forms/radio-group";

function renderGroup(onValueChange = vi.fn()) {
  render(
    <RadioGroup aria-label="Rol" defaultValue="admin" onValueChange={onValueChange}>
      <Radio value="admin" label="Administrador" description="Todo el registry." />
      <Radio value="operator" label="Operador" />
      <Radio value="reader" label="Sólo lectura" />
    </RadioGroup>,
  );
  return onValueChange;
}

describe("RadioGroup + Radio", () => {
  it("renders a radiogroup with named radios and the default selection", () => {
    renderGroup();
    expect(screen.getByRole("radiogroup", { name: "Rol" })).toBeInTheDocument();
    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(3);
    expect(screen.getByRole("radio", { name: "Administrador" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "Administrador" })).toHaveAccessibleDescription(
      "Todo el registry.",
    );
  });

  it("selects by clicking the label row (§10)", async () => {
    const user = userEvent.setup();
    const onValueChange = renderGroup();
    await user.click(screen.getByText("Operador"));
    expect(onValueChange).toHaveBeenLastCalledWith("operator", expect.anything());
    expect(screen.getByRole("radio", { name: "Operador" })).toBeChecked();
  });

  it("moves the selection with arrow keys", async () => {
    const user = userEvent.setup();
    const onValueChange = renderGroup();
    await user.click(screen.getByText("Administrador"));
    await user.keyboard("{ArrowDown}");
    expect(onValueChange).toHaveBeenLastCalledWith("operator", expect.anything());
    expect(screen.getByRole("radio", { name: "Operador" })).toBeChecked();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Sólo lectura" })).toBeChecked();
    await user.keyboard("{ArrowUp}");
    expect(screen.getByRole("radio", { name: "Operador" })).toBeChecked();
  });

  it("skips disabled radios from interaction", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <RadioGroup aria-label="Rol" onValueChange={onValueChange}>
        <Radio value="a" label="Activo" />
        <Radio value="b" label="Bloqueado" disabled />
      </RadioGroup>,
    );
    await user.click(screen.getByText("Bloqueado")).catch(() => {});
    expect(onValueChange).not.toHaveBeenCalled();
  });
});