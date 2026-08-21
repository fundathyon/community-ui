import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Hash } from "../../src/components/dev";
import { truncateMiddle } from "../../src/lib/format";

const VALUE = "sha256:4a3ed8f2b1c99f21aa";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("Hash", () => {
  it("displays the middle-truncated value by default", () => {
    render(<Hash value={VALUE} />);
    expect(screen.getByText(truncateMiddle(VALUE, 6, 4))).toBeInTheDocument();
    expect(screen.queryByText(VALUE)).not.toBeInTheDocument();
  });

  it("always copies the FULL value, never the ellipsis version", async () => {
    render(<Hash value={VALUE} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(VALUE));
  });

  it("respects head/tail and truncate=false", () => {
    const { rerender } = render(<Hash value={VALUE} head={10} tail={6} />);
    expect(screen.getByText(truncateMiddle(VALUE, 10, 6))).toBeInTheDocument();
    rerender(<Hash value={VALUE} truncate={false} />);
    expect(screen.getByText(VALUE)).toBeInTheDocument();
  });
});
