import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Copy } from "lucide-react";
import { describe, expect, it, vi } from "vitest";
import { IconButton } from "../../src/components/actions/icon-button";
import { FoundathyonProvider } from "../../src/provider/foundathyon-provider";

describe("IconButton", () => {
  it("has the accessible name from its required label", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<IconButton icon={Copy} label="Copiar digest" onClick={onClick} />);
    const button = screen.getByRole("button", { name: "Copiar digest" });
    await user.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("is square at its control height (§09)", () => {
    render(<IconButton icon={Copy} label="Copiar" />);
    const button = screen.getByRole("button", { name: "Copiar" });
    // compact density default: sm — height and width use the same control token
    expect(button.className).toContain("h-control-sm");
    expect(button.className).toContain("w-control-sm");

    render(
      <FoundathyonProvider density="comfortable" storageKey={null}>
        <IconButton icon={Copy} label="Ampliar" />
      </FoundathyonProvider>,
    );
    const comfortable = screen.getByRole("button", { name: "Ampliar" });
    expect(comfortable.className).toContain("h-control-lg");
    expect(comfortable.className).toContain("w-control-lg");
  });

  it("shows the tooltip with the same text on keyboard focus", async () => {
    const user = userEvent.setup();
    render(<IconButton icon={Copy} label="Copiar digest" />);
    // aria-label is not text content, so this text can only come from the tooltip
    expect(screen.queryByText("Copiar digest")).not.toBeInTheDocument();
    await user.tab();
    expect(screen.getByRole("button", { name: "Copiar digest" })).toHaveFocus();
    expect(await screen.findByText("Copiar digest")).toBeInTheDocument();
  });

  it("loading disables and keeps the square (aria-busy)", () => {
    render(<IconButton icon={Copy} label="Sincronizar" loading />);
    const button = screen.getByRole("button", { name: "Sincronizar" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});
