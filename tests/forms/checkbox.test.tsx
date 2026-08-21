import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Checkbox } from "../../src/components/forms/checkbox";

describe("Checkbox", () => {
  it("renders with an accessible name and description", () => {
    render(<Checkbox label="Cifrado en reposo" description="AES-256 sobre el volumen." />);
    const checkbox = screen.getByRole("checkbox", { name: "Cifrado en reposo" });
    expect(checkbox).toHaveAccessibleDescription("AES-256 sobre el volumen.");
    expect(checkbox).not.toBeChecked();
  });

  it("toggles by clicking the LABEL text — the whole row is clickable (§10)", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Registro público" onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText("Registro público"));
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenLastCalledWith(true, expect.anything());
    expect(screen.getByRole("checkbox")).toBeChecked();
    await user.click(screen.getByText("Registro público"));
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("toggles with the keyboard", async () => {
    const user = userEvent.setup();
    render(<Checkbox label="Protección de borrado" />);
    await user.tab();
    expect(screen.getByRole("checkbox")).toHaveFocus();
    await user.keyboard(" ");
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("supports the indeterminate state (aria-checked=mixed)", () => {
    render(<Checkbox label="Todos los scopes" indeterminate />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-checked", "mixed");
  });

  it("does not toggle when disabled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Heredado" disabled onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText("Heredado")).catch(() => {});
    expect(onCheckedChange).not.toHaveBeenCalled();
    expect(screen.getByRole("checkbox")).toHaveAttribute("data-disabled");
  });

  it("works controlled", async () => {
    const user = userEvent.setup();
    const onCheckedChange = vi.fn();
    const { rerender } = render(<Checkbox label="Firma" checked={false} onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByText("Firma"));
    expect(onCheckedChange).toHaveBeenLastCalledWith(true, expect.anything());
    // parent did not accept the change yet
    expect(screen.getByRole("checkbox")).not.toBeChecked();
    rerender(<Checkbox label="Firma" checked onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });
});