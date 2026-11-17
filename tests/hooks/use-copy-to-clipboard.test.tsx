import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { copyText, useCopyToClipboard } from "../../src/hooks";

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");
let execCommand: ReturnType<typeof vi.fn>;

function setClipboard(value: unknown) {
  Object.defineProperty(navigator, "clipboard", { value, configurable: true });
}

beforeEach(() => {
  execCommand = vi.fn().mockReturnValue(true);
  Object.defineProperty(document, "execCommand", { value: execCommand, configurable: true, writable: true });
});

afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, "clipboard", originalClipboard);
  else setClipboard(undefined);
  vi.useRealTimers();
});

describe("copyText", () => {
  it("uses the Clipboard API when it exists", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard({ writeText });
    await expect(copyText("sha256:4a3ed8")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("sha256:4a3ed8");
    expect(execCommand).not.toHaveBeenCalled();
  });

  it("falls back to execCommand on plain HTTP, where the API is missing", async () => {
    setClipboard(undefined);
    let copied: string | null = null;
    execCommand.mockImplementation(() => {
      const area = document.querySelector("textarea")!;
      copied = area.value.slice(area.selectionStart, area.selectionEnd);
      return true;
    });
    await expect(copyText("http://app.example/coupon/X")).resolves.toBe(true);
    expect(execCommand).toHaveBeenCalledWith("copy");
    expect(copied).toBe("http://app.example/coupon/X");
    expect(document.querySelector("textarea")).toBeNull();
  });

  it("falls back to execCommand when the API rejects", async () => {
    setClipboard({ writeText: vi.fn().mockRejectedValue(new Error("NotAllowedError")) });
    await expect(copyText("token")).resolves.toBe(true);
    expect(execCommand).toHaveBeenCalledWith("copy");
  });

  it("resolves false when nothing can copy", async () => {
    setClipboard(undefined);
    execCommand.mockReturnValue(false);
    await expect(copyText("token")).resolves.toBe(false);
  });

  it("copies inside an open dialog and gives focus back", async () => {
    setClipboard(undefined);
    const dialog = document.createElement("div");
    dialog.setAttribute("role", "dialog");
    const button = document.createElement("button");
    dialog.appendChild(button);
    document.body.appendChild(dialog);
    button.focus();
    let parent: Element | null = null;
    execCommand.mockImplementation(() => {
      parent = document.querySelector("textarea")!.parentElement;
      return true;
    });
    await copyText("x");
    expect(parent).toBe(dialog);
    expect(document.activeElement).toBe(button);
    dialog.remove();
  });
});

describe("useCopyToClipboard", () => {
  it("flags copied on success and resets it", async () => {
    vi.useFakeTimers();
    setClipboard(undefined);
    const { result } = renderHook(() => useCopyToClipboard({ resetAfter: 500 }));
    await act(async () => {
      await expect(result.current.copy("x")).resolves.toBe(true);
    });
    expect(result.current.copied).toBe(true);
    act(() => vi.advanceTimersByTime(500));
    expect(result.current.copied).toBe(false);
  });

  it("stays not-copied when copying fails", async () => {
    setClipboard(undefined);
    execCommand.mockReturnValue(false);
    const { result } = renderHook(() => useCopyToClipboard());
    await act(async () => {
      await expect(result.current.copy("x")).resolves.toBe(false);
    });
    expect(result.current.copied).toBe(false);
  });
});
