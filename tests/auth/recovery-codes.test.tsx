import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { RecoveryCodes } from "../../src/components/auth";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

const CODES = ["AAAA-1111", "BBBB-2222", "CCCC-3333", "DDDD-4444"];

describe("RecoveryCodes", () => {
  it("renders every code in the grid", () => {
    render(<RecoveryCodes codes={CODES} />);
    for (const code of CODES) {
      expect(screen.getByText(code)).toBeInTheDocument();
    }
  });

  it("copies all the codes at once (newline-joined, full values)", async () => {
    const onCopyAll = vi.fn();
    render(<RecoveryCodes codes={CODES} onCopyAll={onCopyAll} />);
    fireEvent.click(screen.getByRole("button", { name: "Copy all" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith(CODES.join("\n")));
    await waitFor(() => expect(onCopyAll).toHaveBeenCalledWith(CODES.join("\n")));
  });

  it("marks a used code with a badge and dims it — never a strike-through (§M-01)", () => {
    render(<RecoveryCodes codes={CODES} markUsed={["AAAA-1111"]} usedLabel="used" />);
    expect(screen.getByText("used")).toBeInTheDocument();
    const codeEl = screen.getByText("AAAA-1111");
    expect(codeEl).not.toHaveClass("line-through");
    const row = codeEl.closest("li");
    expect(row).not.toHaveClass("line-through");
    expect(row).toHaveClass("opacity-60");
  });
});
