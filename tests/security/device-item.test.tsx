import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DeviceItem } from "../../src/components/security";

describe("DeviceItem", () => {
  it("gives an unrecognized device a WARNING treatment and both actions (§23)", () => {
    const onReject = vi.fn();
    const onRecognize = vi.fn();
    const { container } = render(
      <DeviceItem
        device="New device"
        browser="Firefox on Linux"
        ip="203.0.113.44"
        time={new Date()}
        onReject={onReject}
        onRecognize={onRecognize}
      />,
    );

    const root = container.firstElementChild!;
    expect(root).toHaveClass("bg-warning-bg");
    expect(root).toHaveClass("border-warning-border");
    // never danger — an unfamiliar device isn't proof of an attack
    expect(root).not.toHaveClass("bg-danger-bg");

    fireEvent.click(screen.getByRole("button", { name: "Not me" }));
    fireEvent.click(screen.getByRole("button", { name: "Recognize" }));
    expect(onReject).toHaveBeenCalledTimes(1);
    expect(onRecognize).toHaveBeenCalledTimes(1);
  });

  it("defaults a missing location to an overridable label", () => {
    render(<DeviceItem device="New device" ip="203.0.113.44" time={new Date()} />);
    expect(screen.getByText("Unknown location")).toBeInTheDocument();
  });

  it("renders a recognized device without warning treatment or actions", () => {
    const { container } = render(
      <DeviceItem device="MacBook" ip="10.0.0.1" time={new Date()} recognized onReject={() => {}} onRecognize={() => {}} />,
    );
    expect(container.firstElementChild).not.toHaveClass("bg-warning-bg");
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
