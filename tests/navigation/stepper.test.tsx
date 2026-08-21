import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Stepper } from "../../src/components/navigation/stepper";

const steps = [
  { label: "Endpoint", description: "URL del registry" },
  { label: "Credenciales" },
  { label: "Verificar" },
];

describe("Stepper", () => {
  it("marks the active step with aria-current='step'", () => {
    render(<Stepper steps={steps} active={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items[1]).toHaveAttribute("aria-current", "step");
    expect(items[0]).not.toHaveAttribute("aria-current");
    expect(items[2]).not.toHaveAttribute("aria-current");
  });

  it("completed steps are clickable BACK; active and future are not (§12)", async () => {
    const user = userEvent.setup();
    const onStepClick = vi.fn();
    render(<Stepper steps={steps} active={1} onStepClick={onStepClick} />);
    // only the completed step renders as a button
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0]).toHaveTextContent("Endpoint");
    await user.click(buttons[0]!);
    expect(onStepClick).toHaveBeenCalledWith(0);
    // the future step is plain content
    expect(screen.queryByRole("button", { name: /Verificar/ })).not.toBeInTheDocument();
  });

  it("renders no buttons without onStepClick", () => {
    render(<Stepper steps={steps} active={2} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows numbers for pending steps and descriptions when given", () => {
    render(<Stepper steps={steps} active={0} />);
    // future steps show their 1-based number
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("URL del registry")).toBeInTheDocument();
  });

  it("renders all steps as list items in order", () => {
    render(<Stepper steps={steps} active={1} />);
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items[0]).toHaveTextContent("Endpoint");
    expect(items[2]).toHaveTextContent("Verificar");
  });
});
