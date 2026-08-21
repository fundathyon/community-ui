import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormField } from "../../src/components/forms/form-field";
import { Input } from "../../src/components/forms/input";

describe("FormField + Input", () => {
  it("links label and description to the control", () => {
    render(
      <FormField label="Nombre del recurso" description="Único dentro de su nivel.">
        <Input placeholder="mi-recurso" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Nombre del recurso" });
    expect(input).toHaveAccessibleDescription(/Único dentro de su nivel\./);
  });

  it("adds the error without replacing the description (§C-04)", () => {
    render(
      <FormField
        label="Nombre del recurso"
        description="Único dentro de su nivel."
        error="Ya existe un recurso con ese nombre."
      >
        <Input defaultValue="production" />
      </FormField>,
    );
    const input = screen.getByRole("textbox", { name: "Nombre del recurso" });
    expect(screen.getByRole("alert")).toHaveTextContent("Ya existe un recurso con ese nombre.");
    expect(screen.getByText("Único dentro de su nivel.")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("marks required with an asterisk and disables through the field", () => {
    render(
      <FormField label="Digest" required disabled>
        <Input />
      </FormField>,
    );
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden");
  });

  it("renders leading/trailing slots inside the input box", () => {
    render(
      <FormField label="URL">
        <Input leading={<span data-testid="prefix">https://</span>} trailing={<span data-testid="suffix">.dev</span>} />
      </FormField>,
    );
    expect(screen.getByTestId("prefix")).toBeInTheDocument();
    expect(screen.getByTestId("suffix")).toBeInTheDocument();
  });
});
