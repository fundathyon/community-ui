import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FormActions } from "../../src/components/forms/form-actions";
import { FormSection } from "../../src/components/forms/form-section";

describe("FormSection", () => {
  it("renders title, description, children and section actions (§16 save-per-section)", () => {
    render(
      <FormSection
        title="Perfil"
        description="Identidad visible del usuario."
        actions={<button type="button">Guardar</button>}
      >
        <p>campo</p>
      </FormSection>,
    );
    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
    expect(screen.getByText("Identidad visible del usuario.")).toBeInTheDocument();
    expect(screen.getByText("campo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Guardar" })).toBeInTheDocument();
  });
});

describe("FormActions", () => {
  it("renders right-aligned actions with the leading info slot", () => {
    render(
      <FormActions leading="2 cambios sin guardar">
        <button type="button">Cancelar</button>
        <button type="button">Guardar</button>
      </FormActions>,
    );
    expect(screen.getByText("2 cambios sin guardar")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("sticky variant pins to the bottom with a top border", () => {
    const { container } = render(
      <FormActions sticky>
        <button type="button">Guardar</button>
      </FormActions>,
    );
    const row = container.firstElementChild!;
    expect(row.className).toContain("sticky");
    expect(row.className).toContain("bottom-0");
    expect(row.className).toContain("border-t");
  });
});
