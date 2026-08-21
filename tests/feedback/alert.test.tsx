import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/actions/button";
import { Alert } from "../../src/components/feedback/alert";
import { Banner } from "../../src/components/feedback/banner";

describe("Alert", () => {
  it("non-critical tones are polite (role=status)", () => {
    const { rerender } = render(<Alert tone="info" title="Sincronización programada" />);
    expect(screen.getByRole("status")).toHaveTextContent("Sincronización programada");
    rerender(<Alert tone="success" title="Copia verificada" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    rerender(<Alert tone="warning" title="Almacenamiento al 89 %" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("danger announces with role=alert and cannot be dismissed (§11)", () => {
    render(
      <Alert tone="danger" title="No se pudo conectar con el registry">
        Se agotó el tiempo de espera tras 30 s.
      </Alert>,
    );
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("No se pudo conectar con el registry");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders the single action slot and the tone icon", () => {
    render(
      <Alert
        tone="warning"
        title="Almacenamiento al 89 %"
        action={<Button size="xs">Ver uso por repositorio</Button>}
      >
        Elimina tags sin referencias o amplía el volumen.
      </Alert>,
    );
    expect(screen.getByRole("button", { name: "Ver uso por repositorio" })).toBeInTheDocument();
    expect(screen.getByRole("status").querySelector("svg")).not.toBeNull();
  });

  it("dismisses via onDismiss with an overridable label", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Alert tone="info" title="Sincronización programada" onDismiss={onDismiss} dismissLabel="Descartar" />,
    );
    await user.click(screen.getByRole("button", { name: "Descartar" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});

describe("Banner", () => {
  it("renders a full-width status bar with action and dismiss", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(
      <Banner tone="warning" action={<Button size="xs">Renovar</Button>} onDismiss={onDismiss}>
        Tu plan Community caduca en 5 días.
      </Banner>,
    );
    const banner = screen.getByRole("status");
    expect(banner).toHaveTextContent("Tu plan Community caduca en 5 días.");
    expect(screen.getByRole("button", { name: "Renovar" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("danger banner announces with role=alert", () => {
    render(<Banner tone="danger">El registry está en modo sólo lectura.</Banner>);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
