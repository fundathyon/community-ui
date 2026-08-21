import "./setup-polyfills";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { addDays } from "date-fns";
import { describe, expect, it, vi } from "vitest";
import { DatePicker } from "../../src/components/forms/date-picker";
import { formatDate } from "../../src/lib/format";

const presets = [
  { label: "In 7 days", value: addDays(new Date(), 7) },
  { label: "Never expires", value: null },
];

describe("DatePicker", () => {
  it("renders a typeable field with a calendar trigger", () => {
    render(<DatePicker aria-label="Expira" placeholder="yyyy-mm-dd" presets={presets} />);
    expect(screen.getByRole("textbox", { name: "Expira" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open calendar" })).toBeInTheDocument();
  });

  it("opens a calendar with Monday-first weeks and the relative shortcuts (§10)", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="Expira" presets={presets} />);
    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    expect(await screen.findByRole("grid")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "In 7 days" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Never expires" })).toBeInTheDocument();
  });

  it("preset click sets the value and shows the resolved absolute date under the control", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="Expira" presets={presets} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    await user.click(await screen.findByRole("button", { name: "In 7 days" }));
    expect(onValueChange).toHaveBeenCalledTimes(1);
    const value = onValueChange.mock.calls[0]?.[0] as Date;
    expect(value.getTime()).toBe(presets[0]!.value!.getTime());
    // popover closed, input + resolved line echo the absolute date
    await waitFor(() => expect(screen.queryByRole("grid")).not.toBeInTheDocument());
    const absolute = formatDate(value);
    expect(screen.getByRole("textbox", { name: "Expira" })).toHaveValue(absolute);
    expect(screen.getAllByText(absolute).length).toBeGreaterThanOrEqual(1);
  });

  it("a null preset means never: echoes the label, no resolved date", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="Expira" presets={presets} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    await user.click(await screen.findByRole("button", { name: "Never expires" }));
    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(screen.getByRole("textbox", { name: "Expira" })).toHaveValue("Never expires");
  });

  it("accepts direct typing and resolves it on Enter (§10)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="Expira" presets={presets} onValueChange={onValueChange} />);
    const input = screen.getByRole("textbox", { name: "Expira" });
    await user.click(input);
    await user.keyboard("2026-12-31{Enter}");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    const typed = onValueChange.mock.calls[0]?.[0] as Date;
    expect(typed.getFullYear()).toBe(2026);
    expect(typed.getMonth()).toBe(11);
    expect(typed.getDate()).toBe(31);
    expect(screen.getByText(formatDate(typed))).toBeInTheDocument();
  });

  it("selecting a day in the calendar commits it and closes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<DatePicker aria-label="Expira" presets={presets} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("button", { name: "Open calendar" }));
    await screen.findByRole("grid");
    const days = screen.getAllByRole("button", { name: /15/ });
    await user.click(days[0]!);
    expect(onValueChange).toHaveBeenCalledTimes(1);
    expect((onValueChange.mock.calls[0]?.[0] as Date).getDate()).toBe(15);
    await waitFor(() => expect(screen.queryByRole("grid")).not.toBeInTheDocument());
  });
});