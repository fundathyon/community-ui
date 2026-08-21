import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ValueDiff } from "../../src/components/security";

describe("ValueDiff", () => {
  it("renders the old value struck through, before an arrow, then the new value", () => {
    render(<ValueDiff from="member" to="admin" />);
    const oldValue = screen.getByText("member");
    const newValue = screen.getByText("admin");
    expect(oldValue.tagName).toBe("DEL");
    expect(newValue.tagName).toBe("INS");
    // position: old comes before new in document order (§24 "en línea con flecha")
    expect(oldValue.compareDocumentPosition(newValue) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("gives the old and new values distinct tones — strikethrough is never the only signal (§M-01)", () => {
    render(<ValueDiff from="member" to="admin" />);
    expect(screen.getByText("member")).toHaveClass("text-danger", "line-through");
    expect(screen.getByText("admin")).toHaveClass("text-success");
    expect(screen.getByText("admin")).not.toHaveClass("line-through");
  });

  it("exposes a screen-reader sentence that doesn't depend on the visual strikethrough", () => {
    render(<ValueDiff from="member" to="admin" />);
    expect(screen.getByText("changed from member to admin")).toHaveClass("sr-only");
  });

  it("hides the redundant visual old/arrow/new group from the accessibility tree", () => {
    render(<ValueDiff from="member" to="admin" />);
    const oldValue = screen.getByText("member");
    expect(oldValue.closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it("renders numeric values with tabular-nums", () => {
    render(<ValueDiff from={2} to={4} />);
    expect(screen.getByText("2")).toHaveClass("tabular-nums");
    expect(screen.getByText("4")).toHaveClass("tabular-nums");
  });

  it("renders an optional label for context", () => {
    render(<ValueDiff label="replicas" from={2} to={4} />);
    expect(screen.getByText("replicas")).toBeInTheDocument();
  });
});
