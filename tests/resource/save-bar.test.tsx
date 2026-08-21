import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SaveBar } from "../../src/components/resource/save-bar";

describe("SaveBar", () => {
  it("shows the unsaved count with the default copy", () => {
    render(<SaveBar count={2} />);
    expect(screen.getByText("2 unsaved changes")).toBeInTheDocument();
  });

  it("accepts product copy for the count", () => {
    render(<SaveBar count={2} countLabel={(n) => `${n} cambios sin guardar`} />);
    expect(screen.getByText("2 cambios sin guardar")).toBeInTheDocument();
  });

  it("fires onSave and onDiscard", async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const onDiscard = vi.fn();
    render(<SaveBar count={1} onSave={onSave} onDiscard={onDiscard} />);
    await user.click(screen.getByRole("button", { name: "Save" }));
    await user.click(screen.getByRole("button", { name: "Discard" }));
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onDiscard).toHaveBeenCalledTimes(1);
  });

  it("shows the save loading state and disables both actions", () => {
    render(<SaveBar count={1} saving onSave={vi.fn()} onDiscard={vi.fn()} />);
    const save = screen.getByRole("button", { name: "Save" });
    expect(save).toHaveAttribute("aria-busy", "true");
    expect(save).toBeDisabled();
    expect(screen.getByRole("button", { name: "Discard" })).toBeDisabled();
  });
});
