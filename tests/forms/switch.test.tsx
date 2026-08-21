import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Switch } from "../../src/components/forms/switch";

describe("Switch", () => {
  it("renders a switch with accessible name and description", () => {
    render(<Switch label="Registro público" description="Cualquiera puede hacer pull." />);
    const switchEl = screen.getByRole("switch", { name: "Registro público" });
    expect(switchEl).toHaveAccessibleDescription("Cualquiera puede hacer pull.");
    expect(switchEl).not.toBeChecked();
  });

  it("applies its effect immediately on click — whole row clickable (§10)", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Cifrado en reposo" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText("Cifrado en reposo"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenLastCalledWith(true, expect.anything());
    expect(screen.getByRole("switch")).toBeChecked();
  });

  it("toggles with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Switch label="Protección" defaultChecked />);
    await user.tab();
    expect(screen.getByRole("switch")).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("switch")).not.toBeChecked();
  });

  it("does nothing when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Switch label="Bloqueado" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText("Bloqueado")).catch(() => {});
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});