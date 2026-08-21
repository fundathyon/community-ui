import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "../../src/components/feedback/error-state";

describe("ErrorState", () => {
  it("announces with role=alert and a human headline", () => {
    render(
      <ErrorState
        title="No se pudieron cargar los repositorios"
        description="El registry devolvió un error. Suele resolverse solo en unos segundos."
      />,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("No se pudieron cargar los repositorios");
    expect(alert).toHaveTextContent("Suele resolverse solo");
  });

  it("retry is the exit (§17)", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ErrorState
        title="No se pudieron cargar los repositorios"
        retry={{ label: "Reintentar", onClick: onRetry }}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Reintentar" }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("shows the four technical facts in mono and copies them (§25)", async () => {
    const user = userEvent.setup();
    render(
      <ErrorState
        title="No se pudo crear el repositorio"
        details={{
          status: "409 Conflict",
          requestId: "req_01J8XQ4M2",
          traceId: "4a7f2e91",
          timestamp: "21 ago 2026, 09:14 UTC",
        }}
        copyLabel="Copiar detalles"
        copiedLabel="Copiado"
      />,
    );
    expect(
      screen.getByText("409 Conflict · req req_01J8XQ4M2 · trace 4a7f2e91 · 21 ago 2026, 09:14 UTC"),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Copiar detalles" }));
    expect(await screen.findByRole("button", { name: "Copiado" })).toBeInTheDocument();
    expect(await window.navigator.clipboard.readText()).toBe(
      "409 Conflict · req req_01J8XQ4M2 · trace 4a7f2e91 · 21 ago 2026, 09:14 UTC",
    );
  });

  it("without details there is no copy button", () => {
    render(<ErrorState title="No se pudo conectar" retry={{ label: "Reintentar", onClick: vi.fn() }} />);
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });
});
