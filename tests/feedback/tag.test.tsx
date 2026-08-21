import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tag } from "../../src/components/feedback/tag";

describe("Tag", () => {
  it("renders the label and is read-only without onRemove (§09)", () => {
    render(<Tag>v1.27</Tag>);
    expect(screen.getByText("v1.27")).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders a dismiss control when onRemove is passed, labelled from the string label", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<Tag onRemove={onRemove}>latest</Tag>);
    const button = screen.getByRole("button", { name: "Remove latest" });
    await user.click(button);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it("falls back to a generic label when children isn't plain text", () => {
    const onRemove = vi.fn();
    render(
      <Tag onRemove={onRemove}>
        <span>v1.27</span>
      </Tag>,
    );
    expect(screen.getByRole("button", { name: "Remove" })).toBeInTheDocument();
  });

  it("removeLabel overrides the derived default", () => {
    render(<Tag onRemove={vi.fn()} removeLabel="Quitar etiqueta v1.27">v1.27</Tag>);
    expect(screen.getByRole("button", { name: "Quitar etiqueta v1.27" })).toBeInTheDocument();
  });

  it("merges a custom className onto the root", () => {
    render(
      <Tag className="mt-2" data-testid="tag">
        v1.27
      </Tag>,
    );
    expect(screen.getByTestId("tag")).toHaveClass("mt-2");
  });
});
