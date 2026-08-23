import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTableFilterButton } from "../../src/components/data-table/filter-button";

const OPTIONS = [
  { value: "protected", label: "Protegida", count: 12 },
  { value: "syncing", label: "Sincronizando", count: 3 },
  { value: "archived", label: "Eliminada" },
];

describe("DataTableFilterButton", () => {
  it("shows the facet name and a counter badge once something is applied", () => {
    const { rerender } = render(
      <DataTableFilterButton label="Estado" options={OPTIONS} value={[]} onChange={() => {}} />,
    );
    const trigger = screen.getByRole("button", { name: "Estado" });
    expect(trigger).not.toHaveAttribute("data-active");
    expect(trigger.textContent).toBe("Estado");

    rerender(
      <DataTableFilterButton label="Estado" options={OPTIONS} value={["protected"]} onChange={() => {}} />,
    );
    expect(screen.getByRole("button", { name: /Estado/ })).toHaveAttribute("data-active");
    expect(screen.getByRole("button", { name: /Estado/ }).textContent).toBe("Estado1");
  });

  it("toggles options as checkboxes and emits them in option order", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DataTableFilterButton label="Estado" options={OPTIONS} value={["syncing"]} onChange={onChange} />,
    );
    await user.click(screen.getByRole("button", { name: /Estado/ }));
    const group = await screen.findByRole("group", { name: "Estado" });
    expect(group).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: /Protegida/ }));
    expect(onChange).toHaveBeenLastCalledWith(["protected", "syncing"]);

    await user.click(screen.getByRole("checkbox", { name: /Sincronizando/ }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it("replaces the value in single-select mode", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DataTableFilterButton
        label="Estado"
        options={OPTIONS}
        value={["syncing"]}
        onChange={onChange}
        multiple={false}
      />,
    );
    await user.click(screen.getByRole("button", { name: /Estado/ }));
    await user.click(await screen.findByRole("checkbox", { name: /Protegida/ }));
    expect(onChange).toHaveBeenLastCalledWith(["protected"]);
  });

  it("offers a clear control only while something is applied", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <DataTableFilterButton label="Estado" options={OPTIONS} value={[]} onChange={onChange} clearLabel="Limpiar" />,
    );
    await user.click(screen.getByRole("button", { name: /Estado/ }));
    await screen.findByRole("group", { name: "Estado" });
    expect(screen.queryByRole("button", { name: "Limpiar" })).not.toBeInTheDocument();

    rerender(
      <DataTableFilterButton label="Estado" options={OPTIONS} value={["archived"]} onChange={onChange} clearLabel="Limpiar" />,
    );
    await user.click(await screen.findByRole("button", { name: "Limpiar" }));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});
