import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FormField } from "../../src/components/forms/form-field";
import { NumberInput } from "../../src/components/forms/number-input";

describe("NumberInput", () => {
  it("renders inside a FormField with the label wired", () => {
    render(
      <FormField label="Retención (días)">
        <NumberInput defaultValue={30} />
      </FormField>,
    );
    expect(screen.getByLabelText("Retención (días)")).toHaveValue("30");
  });

  it("steps with the increment/decrement buttons", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Cantidad">
        <NumberInput defaultValue={1} step={1} onValueChange={onValueChange} />
      </FormField>,
    );
    await user.click(screen.getByRole("button", { name: "Increase" }));
    expect(onValueChange).toHaveBeenLastCalledWith(2, expect.anything());
    await user.click(screen.getByRole("button", { name: "Decrease" }));
    expect(onValueChange).toHaveBeenLastCalledWith(1, expect.anything());
  });

  it("honors overridable stepper labels", () => {
    render(
      <FormField label="Cantidad">
        <NumberInput decrementLabel="Menos" incrementLabel="Más" />
      </FormField>,
    );
    expect(screen.getByRole("button", { name: "Menos" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Más" })).toBeInTheDocument();
  });

  it("clamps stepping at min/max", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Cantidad">
        <NumberInput defaultValue={2} min={0} max={3} onValueChange={onValueChange} />
      </FormField>,
    );
    const increase = screen.getByRole("button", { name: "Increase" });
    await user.click(increase);
    expect(onValueChange).toHaveBeenLastCalledWith(3, expect.anything());
    await user.click(increase).catch(() => {});
    // still clamped to the max
    const last = onValueChange.mock.calls.at(-1)?.[0];
    expect(last).toBe(3);
  });

  it("steps with keyboard arrows (Base UI native)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <FormField label="Cantidad">
        <NumberInput defaultValue={5} onValueChange={onValueChange} />
      </FormField>,
    );
    const input = screen.getByLabelText("Cantidad");
    await user.click(input);
    await user.keyboard("{ArrowUp}");
    expect(onValueChange).toHaveBeenLastCalledWith(6, expect.anything());
    await user.keyboard("{ArrowDown}");
    expect(onValueChange).toHaveBeenLastCalledWith(5, expect.anything());
  });

  it("disabled blocks the whole group", () => {
    render(
      <FormField label="Cantidad">
        <NumberInput defaultValue={1} disabled />
      </FormField>,
    );
    expect(screen.getByLabelText("Cantidad")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Increase" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Decrease" })).toBeDisabled();
  });
});