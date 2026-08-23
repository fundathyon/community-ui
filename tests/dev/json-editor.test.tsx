import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { JsonEditor } from "../../src/components/dev";

let writeText: ReturnType<typeof vi.fn>;

beforeEach(() => {
  writeText = vi.fn().mockResolvedValue(undefined);
  Object.assign(navigator, { clipboard: { writeText } });
});

describe("JsonEditor", () => {
  it("renders a plain textarea overlay so keystrokes reach onChange", () => {
    const onChange = vi.fn();
    render(<JsonEditor value={"{}"} onChange={onChange} aria-label="body" />);
    const ta = screen.getByLabelText("body") as HTMLTextAreaElement;
    fireEvent.change(ta, { target: { value: '{"a":1}' } });
    expect(onChange).toHaveBeenCalledWith('{"a":1}');
  });

  it("flags invalid JSON with a danger border and a line indicator", () => {
    const { container } = render(
      <JsonEditor value={"{ not: valid }"} aria-label="body" />,
    );
    const surface = container.querySelector("[data-invalid]");
    expect(surface).not.toBeNull();
    // Either a line badge or a plain "Invalid" tag surfaces the state.
    expect(screen.getByText(/line \d+|invalid/i)).toBeInTheDocument();
  });

  it("shows a Valid badge for well-formed JSON with content", () => {
    render(<JsonEditor value={'{"ok":true}'} aria-label="body" />);
    expect(screen.getByLabelText("Valid JSON")).toBeInTheDocument();
  });

  it("does not flag validity for an empty value — Save can gate emptiness", () => {
    render(<JsonEditor value={""} aria-label="body" />);
    expect(screen.queryByLabelText("Valid JSON")).not.toBeInTheDocument();
    expect(screen.queryByText(/invalid|line \d+/i)).not.toBeInTheDocument();
  });

  it("pretty-prints on Format when the current value parses", () => {
    const onChange = vi.fn();
    render(<JsonEditor value={'{"a":1,"b":[1,2]}'} onChange={onChange} aria-label="body" />);
    fireEvent.click(screen.getByRole("button", { name: /format/i }));
    expect(onChange).toHaveBeenCalledWith(
      JSON.stringify(JSON.parse('{"a":1,"b":[1,2]}'), null, 2),
    );
  });

  it("disables Format on invalid JSON so the button can't rewrite garbage", () => {
    render(<JsonEditor value={"{ not: valid }"} aria-label="body" />);
    expect(screen.getByRole("button", { name: /format/i })).toBeDisabled();
  });

  it("emits onValidChange with a JsonParseError when the value cannot be parsed", async () => {
    const onValidChange = vi.fn();
    render(
      <JsonEditor value={'{"broken":'} onValidChange={onValidChange} aria-label="body" />,
    );
    await waitFor(() => {
      expect(onValidChange).toHaveBeenCalled();
      const arg = onValidChange.mock.calls[onValidChange.mock.calls.length - 1][0];
      expect(arg).not.toBeNull();
      expect(typeof arg.message).toBe("string");
    });
  });

  it("emits onValidChange with null once the value parses cleanly", async () => {
    const onValidChange = vi.fn();
    const { rerender } = render(
      <JsonEditor value={"{ bad"} onValidChange={onValidChange} aria-label="body" />,
    );
    onValidChange.mockClear();
    rerender(<JsonEditor value={'{"ok":true}'} onValidChange={onValidChange} aria-label="body" />);
    await waitFor(() => {
      const last = onValidChange.mock.calls[onValidChange.mock.calls.length - 1];
      expect(last?.[0]).toBeNull();
    });
  });

  it("copies the raw text via the header toolbar's copy button", async () => {
    render(<JsonEditor value={'{"ok":true}'} copy aria-label="body" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('{"ok":true}'));
  });

  it("respects readOnly by disabling both Format and copy actions", () => {
    render(<JsonEditor value={'{"a":1}'} readOnly copy aria-label="body" />);
    expect(screen.getByRole("button", { name: /format/i })).toBeDisabled();
    // In readOnly, the copy button in the header is hidden.
    expect(screen.queryByRole("button", { name: "Copy" })).not.toBeInTheDocument();
  });

  it("accepts an externalError and paints the invalid state", () => {
    render(
      <JsonEditor
        value={'{"ok":true}'}
        externalError={{ message: "schema: 'name' is required", line: 1 }}
        aria-label="body"
      />,
    );
    expect(screen.getByText(/line 1|invalid/i)).toBeInTheDocument();
  });
});
