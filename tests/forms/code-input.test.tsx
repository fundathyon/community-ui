import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CodeInput, OTPInput } from "../../src/components/forms/code-input";

function slots(): HTMLInputElement[] {
  return screen.getAllByRole("textbox") as HTMLInputElement[];
}

describe("CodeInput", () => {
  it("renders one slot per character (default 6)", () => {
    render(<CodeInput />);
    expect(slots()).toHaveLength(6);
  });

  it("advances focus while typing and reports the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<CodeInput length={4} onValueChange={onValueChange} />);
    const inputs = slots();
    await user.click(inputs[0]!);
    await user.keyboard("1");
    expect(inputs[1]).toHaveFocus();
    await user.keyboard("2");
    expect(inputs[2]).toHaveFocus();
    expect(onValueChange).toHaveBeenLastCalledWith("12");
  });

  it("fires onComplete when every slot is filled", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<CodeInput length={4} onComplete={onComplete} />);
    await user.click(slots()[0]!);
    await user.keyboard("1234");
    expect(onComplete).toHaveBeenCalledWith("1234");
  });

  it("NEVER blocks paste — a full code distributes across the slots (§23)", async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<CodeInput length={6} onComplete={onComplete} />);
    const inputs = slots();
    await user.click(inputs[0]!);
    await user.paste("493817");
    expect(onComplete).toHaveBeenCalledWith("493817");
    expect(inputs.map((input) => input.value).join("")).toBe("493817");
  });

  it("Backspace clears and moves back a slot (§10)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<CodeInput length={4} onValueChange={onValueChange} />);
    const inputs = slots();
    await user.click(inputs[0]!);
    await user.keyboard("12");
    expect(inputs[2]).toHaveFocus();
    await user.keyboard("{Backspace}");
    // last character removed, focus retreats
    expect(onValueChange).toHaveBeenLastCalledWith("1");
    expect(inputs[1]).toHaveFocus();
    await user.keyboard("{Backspace}");
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(inputs[0]).toHaveFocus();
    expect(inputs.map((input) => input.value).join("")).toBe("");
  });

  it("numeric type rejects letters", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<CodeInput length={4} type="numeric" onValueChange={onValueChange} />);
    await user.click(slots()[0]!);
    await user.keyboard("a");
    expect(onValueChange).not.toHaveBeenCalled();
    await user.keyboard("7");
    expect(onValueChange).toHaveBeenLastCalledWith("7");
  });

  it("alphanumeric type accepts letters", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<CodeInput length={4} type="alphanumeric" onValueChange={onValueChange} />);
    await user.click(slots()[0]!);
    await user.keyboard("a7");
    expect(onValueChange).toHaveBeenLastCalledWith("a7");
  });
});

describe("OTPInput", () => {
  it("is the numeric one-time-code preset with 3+3 grouping (§23)", () => {
    const { container } = render(<OTPInput />);
    const inputs = slots();
    expect(inputs).toHaveLength(6);
    expect(inputs[0]).toHaveAttribute("autocomplete", "one-time-code");
    expect(inputs[0]).toHaveAttribute("inputmode", "numeric");
    // two optical groups of three, not six identical boxes
    const root = container.firstElementChild!;
    const groups = Array.from(root.children).filter((child) => child.tagName === "DIV");
    expect(groups).toHaveLength(2);
    expect(groups[0]!.querySelectorAll("input")).toHaveLength(3);
    expect(groups[1]!.querySelectorAll("input")).toHaveLength(3);
  });
});