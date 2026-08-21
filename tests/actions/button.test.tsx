import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/actions/button";
import { FoundathyonProvider } from "../../src/provider/foundathyon-provider";

describe("Button", () => {
  it("renders an accessible button and fires onClick", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Sincronizar</Button>);
    const button = screen.getByRole("button", { name: "Sincronizar" });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("activates with the keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Guardar</Button>);
    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it("does not fire when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Revocar
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Revocar" });
    expect(button).toBeDisabled();
    await user.click(button).catch(() => {});
    expect(onClick).not.toHaveBeenCalled();
  });

  it("loading disables, sets aria-busy and keeps the label in the DOM (stable width)", () => {
    render(<Button loading>Sincronizar</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    // the label stays rendered (invisible) so the button keeps its width
    expect(button).toHaveTextContent("Sincronizar");
  });

  it("defaults to type=button (never submits by accident)", () => {
    render(<Button>Crear</Button>);
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("respects comfortable density for its default size", () => {
    render(
      <FoundathyonProvider density="comfortable" storageKey={null}>
        <Button>Entrar</Button>
      </FoundathyonProvider>,
    );
    expect(screen.getByRole("button").className).toContain("h-control-lg");
  });

  it("applies the five variants", () => {
    const { rerender } = render(<Button variant="primary">A</Button>);
    expect(screen.getByRole("button").className).toContain("bg-accent-solid");
    rerender(<Button variant="destructive">A</Button>);
    expect(screen.getByRole("button").className).toContain("bg-danger-solid");
    rerender(<Button variant="destructive-subtle">A</Button>);
    expect(screen.getByRole("button").className).toContain("text-danger");
    rerender(<Button variant="ghost">A</Button>);
    expect(screen.getByRole("button").className).toContain("text-text-secondary");
  });
});
