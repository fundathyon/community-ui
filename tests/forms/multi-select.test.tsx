import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MultiSelect } from "../../src/components/forms/multi-select";

const scopes = [
  { value: "registry:read", label: "registry:read" },
  { value: "registry:write", label: "registry:write" },
  { value: "registry:delete", label: "registry:delete" },
];

describe("MultiSelect", () => {
  it("renders the selected values as chips with removable X buttons", () => {
    render(
      <MultiSelect
        aria-label="Scopes"
        items={scopes}
        value={["registry:read", "registry:write"]}
        onValueChange={() => {}}
      />,
    );
    expect(screen.getByText("registry:read")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove registry:read" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove registry:write" })).toBeInTheDocument();
  });

  it("removing a chip reports the remaining values", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(
      <MultiSelect
        aria-label="Scopes"
        items={scopes}
        value={["registry:read", "registry:write"]}
        onValueChange={onValueChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Remove registry:read" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["registry:write"]);
  });

  it("selecting an option from the list adds it to the value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<MultiSelect aria-label="Scopes" items={scopes} defaultValue={["registry:read"]} onValueChange={onValueChange} />);
    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "registry:write" }));
    expect(onValueChange).toHaveBeenLastCalledWith(["registry:read", "registry:write"]);
  });

  it("honors the overridable remove label factory", () => {
    render(
      <MultiSelect
        aria-label="Scopes"
        items={scopes}
        value={["registry:read"]}
        onValueChange={() => {}}
        removeLabel={(label) => `Quitar ${label}`}
      />,
    );
    expect(screen.getByRole("button", { name: "Quitar registry:read" })).toBeInTheDocument();
  });
});
