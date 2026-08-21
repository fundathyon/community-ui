import "./setup-polyfills";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FormField } from "../../src/components/forms/form-field";
import { PasswordInput } from "../../src/components/forms/password-input";

describe("PasswordInput", () => {
  it("hides the value and never autocapitalizes/autocorrects", () => {
    render(
      <FormField label="Contraseña">
        <PasswordInput defaultValue="s3cret" />
      </FormField>,
    );
    const input = screen.getByLabelText("Contraseña");
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("autocapitalize", "none");
    expect(input).toHaveAttribute("autocorrect", "off");
    expect(input).toHaveAttribute("spellcheck", "false");
  });

  it("toggles visibility with aria-pressed and overridable labels", async () => {
    const user = userEvent.setup();
    render(
      <FormField label="Contraseña">
        <PasswordInput defaultValue="s3cret" showPasswordLabel="Mostrar" hidePasswordLabel="Ocultar" />
      </FormField>,
    );
    const toggle = screen.getByRole("button", { name: "Mostrar" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    await user.click(toggle);
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "text");
    const hide = screen.getByRole("button", { name: "Ocultar" });
    expect(hide).toHaveAttribute("aria-pressed", "true");
    await user.click(hide);
    expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
  });

  it("disables the toggle together with the input", () => {
    render(<PasswordInput aria-label="Contraseña" disabled />);
    expect(screen.getByLabelText("Contraseña")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Show password" })).toBeDisabled();
  });
});
