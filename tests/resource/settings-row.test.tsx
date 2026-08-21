import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SettingsRow } from "../../src/components/resource/settings-row";

describe("SettingsRow", () => {
  it("renders the label, description and control", () => {
    render(
      <SettingsRow
        label="Protección de borrado"
        description="Impide eliminar recursos marcados como protegidos."
        control={<button type="button" role="switch" aria-checked="false" />}
      />,
    );
    expect(screen.getByText("Protección de borrado")).toBeInTheDocument();
    expect(screen.getByText("Impide eliminar recursos marcados como protegidos.")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("associates the label with its control when given htmlFor", () => {
    render(
      <SettingsRow
        label="Requerir 2FA"
        htmlFor="twofa"
        control={<input id="twofa" type="checkbox" />}
      />,
    );
    // the control is reachable by its label text
    expect(screen.getByLabelText("Requerir 2FA")).toBe(screen.getByRole("checkbox"));
  });
});
