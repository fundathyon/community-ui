import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CopyButton } from "../../src/components/dev";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("CopyButton", () => {
  it("copies the value and calls onCopied", async () => {
    const onCopied = vi.fn();
    render(<CopyButton value="sha256:4a3ed8" onCopied={onCopied} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("sha256:4a3ed8"));
    await waitFor(() => expect(onCopied).toHaveBeenCalledWith("sha256:4a3ed8"));
  });

  it("announces the copied state politely", async () => {
    render(<CopyButton value="token" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(await screen.findByText("Copied", { selector: '[aria-live="polite"]' })).toBeInTheDocument();
  });

  it("accepts a lazy value function", async () => {
    render(<CopyButton value={() => "computed value"} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("computed value"));
  });

  it("uses the overridable label as its accessible name", () => {
    render(<CopyButton value="x" label="Copy digest" />);
    expect(screen.getByRole("button", { name: "Copy digest" })).toBeInTheDocument();
  });
});
