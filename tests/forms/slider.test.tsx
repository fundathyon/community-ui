import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Slider } from "../../src/components/forms/slider";

describe("Slider", () => {
  it("always shows the numeric value visible AND editable next to the track (§10)", () => {
    render(<Slider aria-label="Retención" defaultValue={30} min={0} max={90} unit="días" />);
    expect(screen.getByRole("slider")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveValue("30");
    expect(screen.getByText("días")).toBeInTheDocument();
  });

  it("typing in the value box syncs the slider (commit on Enter)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Slider aria-label="Retención" defaultValue={30} min={0} max={90} onValueChange={onValueChange} />);
    const box = screen.getByRole("textbox", { name: "Value" });
    await user.clear(box);
    await user.type(box, "45{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith(45);
    expect(screen.getByRole("slider")).toHaveValue("45");
  });

  it("clamps typed values to min/max and snaps to step", async () => {
    const user = userEvent.setup();
    render(<Slider aria-label="Retención" defaultValue={10} min={0} max={90} step={5} />);
    const box = screen.getByRole("textbox", { name: "Value" });
    await user.clear(box);
    await user.type(box, "500{Enter}");
    expect(box).toHaveValue("90");
    await user.clear(box);
    await user.type(box, "22{Enter}");
    expect(box).toHaveValue("20");
  });

  it("reverts unparseable text to the current value on blur", async () => {
    const user = userEvent.setup();
    render(<Slider aria-label="Retención" defaultValue={30} />);
    const box = screen.getByRole("textbox", { name: "Value" });
    await user.clear(box);
    await user.type(box, "abc");
    await user.tab();
    expect(box).toHaveValue("30");
  });

  it("moving the slider updates the box (two-way sync)", async () => {
    const user = userEvent.setup();
    render(<Slider aria-label="Retención" defaultValue={30} min={0} max={90} />);
    const slider = screen.getByRole("slider");
    (slider as HTMLElement).focus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveValue("31");
    await user.keyboard("{ArrowLeft}{ArrowLeft}");
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveValue("29");
  });

  it("controlled value drives both track and box", () => {
    const { rerender } = render(<Slider aria-label="R" value={10} onValueChange={() => {}} />);
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveValue("10");
    rerender(<Slider aria-label="R" value={60} onValueChange={() => {}} />);
    expect(screen.getByRole("textbox", { name: "Value" })).toHaveValue("60");
  });
});