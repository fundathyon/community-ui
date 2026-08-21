import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../../src/components/actions/button";
import { ToastProvider, useToast, type ToastOptions } from "../../src/components/feedback/toast";

function Demo({ options, onUndo }: { options?: Partial<ToastOptions>; onUndo?: () => void }) {
  const { toast, undo, dismiss } = useToast();
  return (
    <div>
      <Button onClick={() => toast({ title: "Enlace revocado", ...options })}>fire</Button>
      {onUndo && (
        <Button onClick={() => undo({ title: "Enlace revocado", onUndo, undoLabel: "Deshacer" })}>
          fire-undo
        </Button>
      )}
      <Button onClick={() => dismiss()}>clear</Button>
    </div>
  );
}

function renderDemo(props?: Parameters<typeof Demo>[0]) {
  return render(
    <ToastProvider>
      <Demo {...props} />
    </ToastProvider>,
  );
}

describe("Toast", () => {
  it("useToast shows a toast with title and description", async () => {
    const user = userEvent.setup();
    renderDemo({ options: { description: "El enlace dejará de funcionar en 30 s.", tone: "success" } });
    await user.click(screen.getByRole("button", { name: "fire" }));
    expect(await screen.findByText("Enlace revocado")).toBeInTheDocument();
    expect(screen.getByText("El enlace dejará de funcionar en 30 s.")).toBeInTheDocument();
  });

  it("fires the action (§17 undo pattern) ", async () => {
    const user = userEvent.setup();
    const onUndo = vi.fn();
    renderDemo({ onUndo });
    await user.click(screen.getByRole("button", { name: "fire-undo" }));
    await screen.findByText("Enlace revocado");
    await user.click(screen.getByRole("button", { name: "Deshacer" }));
    expect(onUndo).toHaveBeenCalledTimes(1);
    // acting on the toast dismisses it
    await waitFor(() => expect(screen.queryByText("Enlace revocado")).not.toBeInTheDocument());
  });

  it("dismiss() closes the toast manually", async () => {
    const user = userEvent.setup();
    renderDemo();
    await user.click(screen.getByRole("button", { name: "fire" }));
    await screen.findByText("Enlace revocado");
    await user.click(screen.getByRole("button", { name: "clear" }));
    await waitFor(() => expect(screen.queryByText("Enlace revocado")).not.toBeInTheDocument());
  });

  it("renders a close button per toast that closes it", async () => {
    const user = userEvent.setup();
    renderDemo();
    await user.click(screen.getByRole("button", { name: "fire" }));
    await screen.findByText("Enlace revocado");
    // aria-hidden until the stack expands (Base UI), so query by attribute
    const close = document.querySelector<HTMLButtonElement>('button[aria-label="Dismiss"]');
    expect(close).not.toBeNull();
    await user.click(close!);
    await waitFor(() => expect(screen.queryByText("Enlace revocado")).not.toBeInTheDocument());
  });

  it("caps the visible stack at the limit (§11: max 3)", async () => {
    const user = userEvent.setup();
    function Multi() {
      const { toast } = useToast();
      return <Button onClick={() => toast({ title: "Toast", duration: 0 })}>fire</Button>;
    }
    render(
      <ToastProvider>
        <Multi />
      </ToastProvider>,
    );
    const fire = screen.getByRole("button", { name: "fire" });
    for (let i = 0; i < 4; i += 1) await user.click(fire);
    const toasts = await screen.findAllByText("Toast");
    const limited = toasts.filter((el) => el.closest("[data-limited]"));
    expect(toasts.length - limited.length).toBeLessThanOrEqual(3);
  });
});
