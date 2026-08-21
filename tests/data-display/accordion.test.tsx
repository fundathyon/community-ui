import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Accordion } from "../../src/components/data-display/accordion";

const items = [
  { value: "a", title: "Question A", content: "Answer A" },
  { value: "b", title: "Question B", content: "Answer B" },
];

describe("Accordion", () => {
  it("opens exactly one panel by default", () => {
    render(<Accordion defaultValue="a" items={items} />);
    expect(screen.getByText("Answer A")).toBeInTheDocument();
    expect(screen.queryByText("Answer B")).toBeNull();
  });

  it("opens a panel on click", async () => {
    const user = userEvent.setup();
    render(<Accordion defaultValue="a" items={items} />);
    await user.click(screen.getByRole("button", { name: /Question B/ }));
    expect(await screen.findByText("Answer B")).toBeInTheDocument();
  });

  it("toggles a panel with the keyboard (Enter)", async () => {
    const user = userEvent.setup();
    render(<Accordion items={items} />);
    const triggerB = screen.getByRole("button", { name: /Question B/ });
    triggerB.focus();
    expect(triggerB).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(await screen.findByText("Answer B")).toBeInTheDocument();
  });
});
