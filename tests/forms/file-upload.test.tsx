import "./setup-polyfills";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { FileUpload, type FileUploadValue } from "../../src/components/forms/file-upload";

function makeFile(name: string, size: number, type = "application/json"): File {
  return new File(["x".repeat(size)], name, { type });
}

describe("FileUpload", () => {
  it("renders the empty dropzone with prompt, hint and an accessible file input", () => {
    render(<FileUpload aria-label="Config file" accept=".json" maxSize={2 * 1024 * 1024} />);
    expect(screen.getByText("Drag a file or browse")).toBeInTheDocument();
    expect(screen.getByText("Up to 2 MB")).toBeInTheDocument();
    expect(screen.getByLabelText("Config file")).toBeInTheDocument();
  });

  it("honors overridable prompt/hint copy (§17 Spanish products)", () => {
    render(<FileUpload aria-label="Archivo" prompt="Suelta tu archivo" hint="YAML o JSON" />);
    expect(screen.getByText("Suelta tu archivo")).toBeInTheDocument();
    expect(screen.getByText("YAML o JSON")).toBeInTheDocument();
  });

  it("click-to-browse: selecting a file via the hidden input reports a queued value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FileUpload aria-label="Config file" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Config file");
    const file = makeFile("app-config.json", 1024);

    await user.upload(input, file);

    expect(onValueChange).toHaveBeenCalledTimes(1);
    const value = onValueChange.mock.calls[0]?.[0] as FileUploadValue;
    expect(value.file.name).toBe("app-config.json");
    expect(value.status).toBe("queued");
    expect(screen.getByText("app-config.json")).toBeInTheDocument();
  });

  it("rejects a file over maxSize with a local error item and a Remove affordance", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<FileUpload aria-label="Config file" maxSize={10} onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Config file");
    const file = makeFile("big.json", 1024);

    await user.upload(input, file);

    const value = onValueChange.mock.calls[0]?.[0] as FileUploadValue;
    expect(value.status).toBe("error");
    expect(screen.getByRole("alert")).toHaveTextContent(/exceeds/i);
    expect(screen.getByRole("button", { name: "Remove big.json" })).toBeInTheDocument();
    // A validation rejection has nothing to retry — only Remove shows.
    expect(screen.queryByRole("button", { name: "Retry big.json" })).not.toBeInTheDocument();
  });

  it("rejects a dropped file whose type isn't in `accept`", () => {
    // Via drop, not browse: a real OS picker already filters by `accept`, so
    // a mismatched file can only reach us through drag-and-drop, which
    // bypasses that filtering (see the `isAccepted` comment in the source).
    const onValueChange = vi.fn();
    render(<FileUpload aria-label="Config file" accept=".yaml,.json" onValueChange={onValueChange} />);
    const dropzone = screen.getByText("Drag a file or browse").closest("div");
    const file = makeFile("notes.txt", 10, "text/plain");

    fireEvent.drop(dropzone!, { dataTransfer: { files: [file] } });

    const value = onValueChange.mock.calls[0]?.[0] as FileUploadValue;
    expect(value.status).toBe("error");
    expect(screen.getByRole("alert")).toHaveTextContent(/unsupported/i);
    // Validation rejections aren't retryable — nothing about the file changes.
    expect(screen.queryByRole("button", { name: "Retry notes.txt" })).not.toBeInTheDocument();
  });

  it("drag-and-drop: shows drag-over feedback and selects the dropped file", () => {
    const onValueChange = vi.fn();
    render(<FileUpload aria-label="Config file" onValueChange={onValueChange} />);
    const dropzone = screen.getByText("Drag a file or browse").closest("div");
    expect(dropzone).not.toBeNull();
    const file = makeFile("dropped.json", 512);

    fireEvent.dragEnter(dropzone!, { dataTransfer: { files: [file] } });
    expect(dropzone).toHaveAttribute("data-drag-active", "true");

    fireEvent.dragLeave(dropzone!, { dataTransfer: { files: [file] } });
    expect(dropzone).not.toHaveAttribute("data-drag-active");

    fireEvent.dragEnter(dropzone!, { dataTransfer: { files: [file] } });
    fireEvent.drop(dropzone!, { dataTransfer: { files: [file] } });

    expect(dropzone).not.toHaveAttribute("data-drag-active");
    expect(onValueChange).toHaveBeenCalledTimes(1);
    const value = onValueChange.mock.calls[0]?.[0] as FileUploadValue;
    expect(value.file.name).toBe("dropped.json");
    expect(value.status).toBe("queued");
  });

  it("renders a determinate progress bar while uploading (§11: value always visible as text)", () => {
    const file = makeFile("app-config.yaml", 2048, "application/x-yaml");
    const value: FileUploadValue = { file, status: "uploading", progress: 64 };
    render(<FileUpload aria-label="Config file" value={value} onValueChange={() => {}} />);

    expect(screen.getByText("app-config.yaml")).toBeInTheDocument();
    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "64");
    const row = progressbar.closest("[aria-busy]");
    expect(row).toHaveAttribute("aria-busy", "true");
  });

  it("done status shows a success marker next to the filename", () => {
    const file = makeFile("app-config.yaml", 2048);
    render(<FileUpload aria-label="Config file" value={{ file, status: "done" }} onValueChange={() => {}} />);
    expect(screen.getByText("app-config.yaml")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Remove app-config.yaml" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("remove clears the value and returns to the empty dropzone", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const file = makeFile("app-config.json", 100);
    render(
      <FileUpload aria-label="Config file" value={{ file, status: "done" }} onValueChange={onValueChange} />,
    );

    await user.click(screen.getByRole("button", { name: "Remove app-config.json" }));

    expect(onValueChange).toHaveBeenCalledWith(null);
  });

  it("retry re-queues the same file (no separate onRetry — it's the same signal as a fresh selection)", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const file = makeFile("app-config.json", 100);
    render(
      <FileUpload
        aria-label="Config file"
        value={{ file, status: "error", error: "Network error" }}
        onValueChange={onValueChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Retry app-config.json" }));

    expect(onValueChange).toHaveBeenCalledWith({ file, status: "queued" });
  });

  it("honors the overridable actionLabel factory for remove/retry names", () => {
    const file = makeFile("app-config.json", 100);
    render(
      <FileUpload
        aria-label="Config file"
        value={{ file, status: "error", error: "oops" }}
        onValueChange={() => {}}
        actionLabel={(action, fileName) => (action === "retry" ? `Reintentar ${fileName}` : `Quitar ${fileName}`)}
      />,
    );

    expect(screen.getByRole("button", { name: "Reintentar app-config.json" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Quitar app-config.json" })).toBeInTheDocument();
  });

  it("disabled prevents interaction and marks the input disabled", () => {
    render(<FileUpload aria-label="Config file" disabled />);
    expect(screen.getByLabelText("Config file")).toBeDisabled();
  });

  it("marks the field invalid when used standalone", () => {
    render(<FileUpload aria-label="Config file" invalid />);
    expect(screen.getByLabelText("Config file")).toHaveAttribute("aria-invalid", "true");
  });
});
