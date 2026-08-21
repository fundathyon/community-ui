import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Secret } from "../../src/components/dev";
import { maskSecret } from "../../src/lib/format";

const VALUE = "sk_live_de96abcd1234j87TzX";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("Secret", () => {
  it("is masked by default and shows the badge marker", () => {
    render(<Secret value={VALUE} />);
    expect(screen.getByText(maskSecret(VALUE, 8, 6))).toBeInTheDocument();
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
    expect(screen.getByText("Secret")).toBeInTheDocument();
  });

  it("reveals and hides again with the eye toggle (aria-pressed)", () => {
    render(<Secret value={VALUE} revealable />);
    const toggle = screen.getByRole("button", { name: "Reveal secret" });
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(VALUE)).toBeInTheDocument();
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
  });

  it("copies the FULL value even while masked", async () => {
    render(<Secret value={VALUE} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(VALUE));
  });

  it("supports an overridable badge label", () => {
    render(<Secret value={VALUE} label="Secreto" />);
    expect(screen.getByText("Secreto")).toBeInTheDocument();
  });
});
