import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SearchInput } from "../../src/components/forms/search-input";

describe("SearchInput", () => {
  it("renders a searchbox with the leading icon baked in (§10: same Input, slots)", () => {
    render(<SearchInput aria-label="Buscar" placeholder="Buscar repositorios" />);
    expect(screen.getByRole("searchbox", { name: "Buscar" })).toBeInTheDocument();
  });

  it("shows the shortcut hint while empty and swaps it for a clear button when non-empty", async () => {
    const user = userEvent.setup();
    render(<SearchInput aria-label="Buscar" shortcutHint="/" />);
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();
    await user.type(screen.getByRole("searchbox"), "nginx");
    expect(screen.queryByText("/")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Clear search" })).toBeInTheDocument();
  });

  it("Esc clears the value and reports it", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SearchInput aria-label="Buscar" defaultValue="nginx" onValueChange={onValueChange} />);
    const input = screen.getByRole("searchbox");
    await user.click(input);
    await user.keyboard("{Escape}");
    expect(onValueChange).toHaveBeenLastCalledWith("");
    expect(input).toHaveValue("");
  });

  it("the clear button empties and refocuses the field", async () => {
    const user = userEvent.setup();
    render(<SearchInput aria-label="Buscar" defaultValue="redis" clearLabel="Limpiar búsqueda" />);
    await user.click(screen.getByRole("button", { name: "Limpiar búsqueda" }));
    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("");
    expect(input).toHaveFocus();
  });

  it("works controlled", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<SearchInput aria-label="Buscar" value="fijo" onValueChange={onValueChange} />);
    const input = screen.getByRole("searchbox");
    await user.type(input, "x");
    expect(onValueChange).toHaveBeenLastCalledWith("fijox");
    // parent did not accept the change
    expect(input).toHaveValue("fijo");
  });
});
