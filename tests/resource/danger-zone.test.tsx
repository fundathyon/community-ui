import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { DangerZone, DangerZoneAction } from "../../src/components/resource/danger-zone";

describe("DangerZone", () => {
  it("renders the action title, its consequence and the control", () => {
    render(
      <DangerZone title="Zona peligrosa">
        <DangerZoneAction
          title="Revocar esta clave"
          description="Los pipelines que la usen empezarán a recibir 401 en menos de 30 s."
          action={<button type="button">Revocar clave</button>}
        />
      </DangerZone>,
    );
    expect(screen.getByText("Zona peligrosa")).toBeInTheDocument();
    expect(screen.getByText("Revocar esta clave")).toBeInTheDocument();
    // the consequence is spelled out (§25)
    expect(
      screen.getByText("Los pipelines que la usen empezarán a recibir 401 en menos de 30 s."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Revocar clave" })).toBeInTheDocument();
  });

  it("defaults its heading when none is given", () => {
    render(
      <DangerZone>
        <DangerZoneAction title="Eliminar" description="No se puede deshacer." action={<button type="button">Eliminar</button>} />
      </DangerZone>,
    );
    expect(screen.getByText("Danger zone")).toBeInTheDocument();
  });
});
