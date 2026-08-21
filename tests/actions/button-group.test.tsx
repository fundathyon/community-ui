import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/actions/button";
import { ButtonGroup } from "../../src/components/actions/button-group";

describe("ButtonGroup", () => {
  it("renders role=group with the required accessible name", () => {
    render(
      <ButtonGroup label="Paginación">
        <Button>Anterior</Button>
        <Button>Siguiente</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Paginación" });
    expect(group).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anterior" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Siguiente" })).toBeInTheDocument();
  });

  it("children stay independently operable", async () => {
    const user = userEvent.setup();
    const first = vi.fn();
    const second = vi.fn();
    render(
      <ButtonGroup label="Vistas">
        <Button onClick={first}>Lista</Button>
        <Button onClick={second}>Tabla</Button>
      </ButtonGroup>,
    );
    await user.click(screen.getByRole("button", { name: "Tabla" }));
    expect(second).toHaveBeenCalledTimes(1);
    expect(first).not.toHaveBeenCalled();
  });

  it("collapses inner radii and borders (attached segments)", () => {
    render(
      <ButtonGroup label="Zoom">
        <Button>-</Button>
        <Button>+</Button>
      </ButtonGroup>,
    );
    const group = screen.getByRole("group", { name: "Zoom" });
    expect(group.className).toContain("[&>*]:rounded-none");
    expect(group.className).toContain("[&>*:not(:first-child)]:-ml-px");
  });
});
