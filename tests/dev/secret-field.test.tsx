import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SecretField } from "../../src/components/dev";
import { maskSecret } from "../../src/lib/format";

const VALUE = "sk_live_de96abcd1234efgh5678ijklm9012j87TzX_l";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("SecretField", () => {
  it("renders masked by default and hides the raw value", () => {
    render(<SecretField value={VALUE} />);
    expect(screen.getByText(maskSecret(VALUE, 8, 6))).toBeInTheDocument();
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
  });

  it("reveals the value with the eye toggle and reports aria-pressed", () => {
    render(<SecretField value={VALUE} />);
    const toggle = screen.getByRole("button", { name: "Reveal" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle);
    expect(screen.getByText(VALUE)).toBeInTheDocument();
    // The label flips to the hide affordance and aria-pressed follows.
    const untoggle = screen.getByRole("button", { name: "Hide" });
    expect(untoggle).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(untoggle);
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
  });

  it("copies the full value even while the field is masked", async () => {
    render(<SecretField value={VALUE} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(VALUE));
  });

  it("supports a controlled reveal state", () => {
    const onRevealChange = vi.fn();
    const { rerender } = render(
      <SecretField value={VALUE} revealed={false} onRevealChange={onRevealChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Reveal" }));
    expect(onRevealChange).toHaveBeenCalledWith(true);
    // Parent hasn't updated `revealed` yet, so the field stays masked.
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
    rerender(<SecretField value={VALUE} revealed={true} onRevealChange={onRevealChange} />);
    expect(screen.getByText(VALUE)).toBeInTheDocument();
  });

  it("hides the copy button when hideCopy is set", () => {
    render(<SecretField value={VALUE} hideCopy />);
    expect(screen.queryByRole("button", { name: "Copy" })).not.toBeInTheDocument();
  });

  it("hides the eye toggle when hideReveal is set", () => {
    render(<SecretField value={VALUE} hideReveal />);
    expect(screen.queryByRole("button", { name: "Reveal" })).not.toBeInTheDocument();
    // Value stays masked because it cannot be revealed.
    expect(screen.getByText(maskSecret(VALUE, 8, 6))).toBeInTheDocument();
  });

  it("disables both actions when disabled", () => {
    render(<SecretField value={VALUE} disabled />);
    const reveal = screen.getByRole("button", { name: "Reveal" });
    const copy = screen.getByRole("button", { name: "Copy" });
    expect(reveal).toBeDisabled();
    expect(copy).toBeDisabled();
    fireEvent.click(reveal);
    // Clicking a disabled button is a no-op — value stays masked.
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
  });

  it("accepts custom reveal / hide / copy labels for i18n", () => {
    render(
      <SecretField value={VALUE} revealLabel="Mostrar" hideLabel="Ocultar" copyLabel="Copiar" />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Mostrar" }));
    expect(screen.getByRole("button", { name: "Ocultar" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copiar" })).toBeInTheDocument();
  });
});
