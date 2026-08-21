import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TimeRangePicker } from "../../src/charts/time-range-picker";

const original = window.matchMedia;

/** Force the md breakpoint query to a given result (the setup mock returns false,
 * i.e. below md → Select; passing true exercises the segmented variant). */
function setWide(matches: boolean) {
  window.matchMedia = ((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  window.matchMedia = original;
});

describe("TimeRangePicker — responsive variant (§22)", () => {
  it("below md it renders a Select (matchMedia mocked to false)", () => {
    render(<TimeRangePicker value="24h" onChange={() => {}} />);
    // The segmented group must NOT be present; the labelled select trigger is.
    expect(screen.queryByRole("group", { name: "Rango de tiempo" })).not.toBeInTheDocument();
    expect(screen.getByLabelText("Rango de tiempo")).toBeInTheDocument();
  });

  it("at ≥ md it renders a segmented button group and fires onChange", async () => {
    setWide(true);
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TimeRangePicker value="24h" onChange={onChange} />);

    const group = await screen.findByRole("group", { name: "Rango de tiempo" });
    expect(group).toBeInTheDocument();
    // Active segment is marked pressed and readable without colour.
    expect(screen.getByRole("button", { name: "24 h" })).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: "7 d" }));
    expect(onChange).toHaveBeenCalledWith("7d");
  });

  it("accepts custom options and labels", async () => {
    setWide(true);
    render(
      <TimeRangePicker
        value="live"
        onChange={() => {}}
        options={[
          { label: "En vivo", value: "live" },
          { label: "Histórico", value: "hist" },
        ]}
      />,
    );
    expect(await screen.findByRole("button", { name: "En vivo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Histórico" })).toBeInTheDocument();
  });
});
