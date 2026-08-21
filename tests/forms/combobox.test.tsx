import "./setup-polyfills";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Combobox } from "../../src/components/forms/combobox";

const images = [
  { value: "nginx", label: "nginx" },
  { value: "nginx-ingress", label: "nginx-ingress" },
  { value: "redis", label: "redis" },
  { value: "postgres", label: "postgres" },
];

describe("Combobox", () => {
  it("renders a searchbox-style combobox input", () => {
    render(<Combobox aria-label="Imagen" items={images} placeholder="Busca una imagen" />);
    expect(screen.getByRole("combobox")).toHaveAttribute("placeholder", "Busca una imagen");
  });

  it("filters the list while typing", async () => {
    const user = userEvent.setup();
    render(<Combobox items={images} placeholder="Imagen" />);
    await user.click(screen.getByRole("combobox"));
    await user.keyboard("ngin");
    await waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(2);
    });
    expect(screen.getByRole("option", { name: /nginx-ingress/ })).toBeInTheDocument();
  });

  it("shows the (overridable) empty state on no matches", async () => {
    const user = userEvent.setup();
    render(<Combobox items={images} placeholder="Imagen" empty="Sin resultados" />);
    await user.click(screen.getByRole("combobox"));
    await user.keyboard("zzzz");
    expect(await screen.findByText("Sin resultados")).toBeInTheDocument();
  });

  it("selects the highlighted match with Enter", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox items={images} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.keyboard("redi");
    await screen.findByRole("option", { name: /redis/ });
    await user.keyboard("{Enter}");
    expect(onValueChange).toHaveBeenLastCalledWith("redis");
    expect(screen.getByRole("combobox")).toHaveValue("redis");
  });

  it("navigates with arrows and selects", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox items={images} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    await screen.findByRole("listbox");
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");
    expect(onValueChange).toHaveBeenCalled();
  });

  it("Esc closes WITHOUT changing and the typed value is never lost (§10)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Combobox items={images} onValueChange={onValueChange} />);
    const input = screen.getByRole("combobox");
    await user.click(input);
    await user.keyboard("ngin");
    await screen.findByRole("listbox");
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
    expect(onValueChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("ngin");
  });
});