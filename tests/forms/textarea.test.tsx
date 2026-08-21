import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FormField } from "../../src/components/forms/form-field";
import { Textarea } from "../../src/components/forms/textarea";

describe("Textarea", () => {
  it("integrates with FormField (label + description wired)", () => {
    render(
      <FormField label="Motivo de la revocación" description="Se guarda en el audit log.">
        <Textarea placeholder="Token filtrado…" maxLength={280} />
      </FormField>,
    );
    const textarea = screen.getByRole("textbox", { name: "Motivo de la revocación" });
    expect(textarea).toHaveAccessibleDescription(/Se guarda en el audit log\./);
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("shows a live counter with maxLength (§10: '31 / 280')", async () => {
    const user = userEvent.setup();
    render(<Textarea aria-label="Motivo" maxLength={280} />);
    expect(screen.getByText("0 / 280")).toBeInTheDocument();
    await user.type(screen.getByRole("textbox"), "Token filtrado en un log de CI.");
    expect(screen.getByText("31 / 280")).toBeInTheDocument();
  });

  it("turns the counter to danger when over the soft limit", () => {
    render(<Textarea aria-label="Motivo" maxLength={10} defaultValue="Doce letras…" />);
    const counter = screen.getByText("12 / 10");
    expect(counter.className).toContain("text-danger");
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("counts controlled values too", () => {
    render(<Textarea aria-label="Motivo" maxLength={40} value="Hola" onChange={() => {}} />);
    expect(screen.getByText("4 / 40")).toBeInTheDocument();
  });

  it("renders no counter without maxLength", () => {
    render(<Textarea aria-label="Motivo" defaultValue="abc" />);
    expect(screen.queryByText(/\/\s/)).not.toBeInTheDocument();
  });

  it("respects disabled and read-only", () => {
    const { rerender } = render(<Textarea aria-label="Motivo" disabled />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    rerender(<Textarea aria-label="Motivo" readOnly defaultValue="Calculado" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  });
});
